import "server-only";

import { CONTACT_LIMITS } from "./constants.js";

export class RequestError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "RequestError";
    this.status = status;
  }
}

export class SecurityConfigurationError extends Error {
  constructor(message) {
    super(message);
    this.name = "SecurityConfigurationError";
  }
}

function normalizeOrigin(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}

function configuredOrigins() {
  return [process.env.APP_ORIGIN, ...(process.env.ALLOWED_ORIGINS ?? "").split(",")]
    .map((value) => value?.trim())
    .filter(Boolean)
    .map(normalizeOrigin)
    .filter(Boolean);
}

export function assertSameOrigin(request) {
  const requestOrigin = normalizeOrigin(request.headers.get("origin"));
  if (!requestOrigin) {
    throw new RequestError("Request origin was rejected.", 403);
  }

  let allowed = configuredOrigins();
  if (allowed.length === 0) {
    if (process.env.NODE_ENV === "production") {
      throw new SecurityConfigurationError(
        "APP_ORIGIN or ALLOWED_ORIGINS must be configured in production.",
      );
    }
    allowed = [new URL(request.url).origin];
  }

  if (!allowed.includes(requestOrigin)) {
    throw new RequestError("Request origin was rejected.", 403);
  }
}

export async function readJsonBody(request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!/^application\/json(?:\s*;|$)/iu.test(contentType)) {
    throw new RequestError("Content-Type must be application/json.", 415);
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > CONTACT_LIMITS.bodyBytes) {
    throw new RequestError("Payload is too large.", 413);
  }

  if (!request.body) {
    throw new RequestError("Invalid payload.", 400);
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let byteCount = 0;
  let text = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      byteCount += value.byteLength;
      if (byteCount > CONTACT_LIMITS.bodyBytes) {
        await reader.cancel();
        throw new RequestError("Payload is too large.", 413);
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } catch (error) {
    if (error instanceof RequestError) throw error;
    throw new RequestError("Invalid payload.", 400);
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new RequestError("Invalid payload.", 400);
  }
}

export function looksAutomated(input) {
  if (typeof input?.company === "string" && input.company.trim()) return true;

  const startedAt = Number(input?.startedAt);
  return Number.isFinite(startedAt) && Date.now() - startedAt < 1_200;
}
