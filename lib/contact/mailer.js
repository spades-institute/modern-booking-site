import "server-only";

import { isIP } from "node:net";
import nodemailer from "nodemailer";

import { buildContactEmail } from "./mail-template.js";

const TRANSPORT_KEY = Symbol.for("booking.smtpTransport");
const EMAIL_PATTERN =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/iu;

export class MailConfigurationError extends Error {
  constructor(message) {
    super(message);
    this.name = "MailConfigurationError";
  }
}

function requiredEnvironment(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new MailConfigurationError(`${name} is required.`);
  return value;
}

function validEmail(name) {
  const value = requiredEnvironment(name);
  if (!EMAIL_PATTERN.test(value) || /[\r\n]/u.test(value)) {
    throw new MailConfigurationError(`${name} is not a valid single email address.`);
  }
  return value;
}

function mailConfiguration() {
  const host = requiredEnvironment("SMTP_HOST");
  const port = Number(requiredEnvironment("SMTP_PORT"));
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new MailConfigurationError("SMTP_PORT must be a valid TCP port.");
  }

  const secureSetting = process.env.SMTP_SECURE?.trim().toLowerCase();
  if (secureSetting && secureSetting !== "true" && secureSetting !== "false") {
    throw new MailConfigurationError("SMTP_SECURE must be true or false.");
  }

  const fromName = process.env.SMTP_FROM_NAME?.trim() || "Website bookings";
  if (fromName.length > 100 || /[\r\n\u0000-\u001F\u007F]/u.test(fromName)) {
    throw new MailConfigurationError("SMTP_FROM_NAME contains invalid characters.");
  }

  return {
    host,
    port,
    secure: secureSetting ? secureSetting === "true" : port === 465,
    user: requiredEnvironment("SMTP_USER"),
    pass: requiredEnvironment("SMTP_PASS"),
    from: validEmail("SMTP_FROM"),
    to: validEmail("ADMIN_EMAIL"),
    fromName,
  };
}

function getTransport(config) {
  if (globalThis[TRANSPORT_KEY]) return globalThis[TRANSPORT_KEY];

  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: !config.secure,
    auth: { user: config.user, pass: config.pass },
    pool: true,
    maxConnections: 3,
    maxMessages: 100,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    disableFileAccess: true,
    disableUrlAccess: true,
    tls: {
      minVersion: "TLSv1.2",
      rejectUnauthorized: true,
      ...(isIP(config.host) ? {} : { servername: config.host }),
    },
  });

  globalThis[TRANSPORT_KEY] = transport;
  return transport;
}

export async function sendContactEmail({ kind, data, requestId }) {
  const config = mailConfiguration();
  const content = buildContactEmail({ kind, data, receivedAt: new Date() });

  await getTransport(config).sendMail({
    envelope: { from: config.from, to: [config.to] },
    from: { name: config.fromName, address: config.from },
    to: config.to,
    subject: content.subject,
    text: content.text,
    html: content.html,
    headers: {
      "Auto-Submitted": "auto-generated",
      "X-Auto-Response-Suppress": "All",
      "X-Website-Request-ID": requestId,
    },
    disableFileAccess: true,
    disableUrlAccess: true,
  });
}
