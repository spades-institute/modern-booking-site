import "server-only";

import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

import { sendContactEmail } from "./mailer.js";
import { checkRateLimit } from "./rate-limit.js";
import {
  assertSameOrigin,
  looksAutomated,
  readJsonBody,
  RequestError,
  SecurityConfigurationError,
} from "./request-security.js";
import { validateContactPayload } from "./validation.js";

const BASE_HEADERS = Object.freeze({
  "Cache-Control": "no-store, max-age=0",
  "X-Content-Type-Options": "nosniff",
  Vary: "Origin",
});

function json(body, status, extraHeaders = {}) {
  return NextResponse.json(body, {
    status,
    headers: { ...BASE_HEADERS, ...extraHeaders },
  });
}

function accepted(requestId) {
  return json({ ok: true, requestId }, 202);
}

function safeErrorCode(error) {
  const code = typeof error?.code === "string" ? error.code : "UNKNOWN";
  return /^[A-Z0-9_]{1,40}$/u.test(code) ? code : "UNKNOWN";
}

export async function handleContactRequest(request, kind) {
  const requestId = randomUUID();

  try {
    assertSameOrigin(request);

    const rate = checkRateLimit(request);
    const rateHeaders = {
      "RateLimit-Limit": String(rate.limit),
      "RateLimit-Remaining": String(rate.remaining),
      "RateLimit-Reset": String(rate.resetAt),
    };

    if (!rate.allowed) {
      return json(
        { ok: false, error: "Too many requests. Please try again later." },
        429,
        { ...rateHeaders, "Retry-After": String(rate.retryAfter) },
      );
    }

    const payload = await readJsonBody(request);

    // Return a normal response to bots so the trap does not teach them how to evade it.
    if (looksAutomated(payload)) return accepted(requestId);

    const result = validateContactPayload(payload, kind);
    if (!result.ok) {
      return json(
        {
          ok: false,
          error: "Please check the form fields.",
          fields: result.fields,
        },
        422,
        rateHeaders,
      );
    }

    await sendContactEmail({ kind, data: result.data, requestId });
    return json({ ok: true, requestId }, 202, rateHeaders);
  } catch (error) {
    if (error instanceof RequestError) {
      return json({ ok: false, error: error.message }, error.status);
    }

    const configurationError =
      error instanceof SecurityConfigurationError ||
      error?.name === "MailConfigurationError";

    // Deliberately exclude form contents, SMTP responses, and credentials from logs.
    console.error("Contact email delivery failed", {
      requestId,
      category: configurationError ? "configuration" : "delivery",
      code: safeErrorCode(error),
    });

    return json(
      {
        ok: false,
        error: "We could not send your request. Please call or try again later.",
      },
      503,
    );
  }
}
