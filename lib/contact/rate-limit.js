import "server-only";

import { createHmac, randomBytes } from "node:crypto";
import { isIP } from "node:net";

const WINDOW_MS = 15 * 60 * 1000;
const IDENTIFIED_LIMIT = 5;
const FALLBACK_LIMIT = 20;
const MAX_BUCKETS = 10_000;
const STORE_KEY = Symbol.for("booking.contactRateLimitStore");

function createStore() {
  return {
    buckets: new Map(),
    secret: randomBytes(32),
  };
}

const store = globalThis[STORE_KEY] ?? createStore();
globalThis[STORE_KEY] = store;

function trustedClientIp(request) {
  const headerName = process.env.TRUSTED_PROXY_IP_HEADER?.trim().toLowerCase();
  if (!headerName) return "";

  if (!/^[a-z0-9-]{1,64}$/u.test(headerName)) return "";

  const raw = request.headers.get(headerName) ?? "";
  const firstValue = raw.split(",", 1)[0].trim();
  return isIP(firstValue) ? firstValue : "";
}

function hashIdentifier(value) {
  return createHmac("sha256", store.secret).update(value).digest("base64url");
}

function removeExpiredBuckets(now) {
  for (const [key, bucket] of store.buckets) {
    if (bucket.resetAt <= now) store.buckets.delete(key);
  }

  while (store.buckets.size >= MAX_BUCKETS) {
    const oldest = store.buckets.keys().next().value;
    if (!oldest) break;
    store.buckets.delete(oldest);
  }
}

export function checkRateLimit(request) {
  const now = Date.now();
  const ip = trustedClientIp(request);
  const fallbackFingerprint = [
    request.headers.get("user-agent") ?? "unknown-agent",
    request.headers.get("accept-language") ?? "unknown-language",
  ].join("|");
  const key = hashIdentifier(ip || fallbackFingerprint);
  const limit = ip ? IDENTIFIED_LIMIT : FALLBACK_LIMIT;

  removeExpiredBuckets(now);
  const current = store.buckets.get(key);
  const bucket =
    !current || current.resetAt <= now
      ? { count: 0, resetAt: now + WINDOW_MS }
      : current;

  bucket.count += 1;
  store.buckets.set(key, bucket);

  return {
    allowed: bucket.count <= limit,
    limit,
    remaining: Math.max(0, limit - bucket.count),
    retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    resetAt: Math.ceil(bucket.resetAt / 1000),
  };
}
