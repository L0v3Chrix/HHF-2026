/**
 * Abuse Protection Utilities
 *
 * Honeypot detection and rate limiting for form submissions.
 */

// ============================================================================
// HONEYPOT DETECTION
// ============================================================================

/**
 * Check if honeypot field was filled (indicates bot)
 *
 * @param body - Request body to check
 * @param fieldName - Name of honeypot field (default: "website")
 * @returns true if honeypot was triggered (bot detected)
 */
export function isHoneypotTriggered(
  body: Record<string, unknown>,
  fieldName: string = "website"
): boolean {
  const value = body[fieldName];
  // If field exists and has a non-empty value, it's a bot
  return typeof value === "string" && value.trim().length > 0;
}

// ============================================================================
// RATE LIMITING (In-Memory Stub)
// ============================================================================

/**
 * Rate limit configuration
 */
interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

/**
 * Rate limit entry
 */
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store (will reset on server restart)
// TODO: Replace with Upstash Redis for production persistence
const rateLimitStore = new Map<string, RateLimitEntry>();

// Default: 10 requests per minute
const DEFAULT_RATE_LIMIT: RateLimitConfig = {
  maxRequests: 10,
  windowMs: 60 * 1000, // 1 minute
};

/**
 * Check if an IP has exceeded the rate limit
 *
 * @param ip - Client IP address
 * @param config - Optional rate limit configuration
 * @returns Object with allowed status and remaining requests
 */
export function checkRateLimit(
  ip: string,
  config: RateLimitConfig = DEFAULT_RATE_LIMIT
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const key = `rl:${ip}`;

  let entry = rateLimitStore.get(key);

  // Clean up expired entry
  if (entry && now >= entry.resetAt) {
    rateLimitStore.delete(key);
    entry = undefined;
  }

  // First request from this IP
  if (!entry) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + config.windowMs,
    });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetIn: config.windowMs,
    };
  }

  // Increment count
  entry.count += 1;

  if (entry.count > config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: entry.resetAt - now,
    };
  }

  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetIn: entry.resetAt - now,
  };
}

/**
 * Extract client IP from request headers
 *
 * Checks common proxy headers in order of preference.
 *
 * @param headers - Request headers
 * @returns Client IP or "unknown"
 */
export function getClientIP(headers: Headers): string {
  // Vercel/Cloudflare headers
  const cfConnectingIP = headers.get("cf-connecting-ip");
  if (cfConnectingIP) return cfConnectingIP;

  const xRealIP = headers.get("x-real-ip");
  if (xRealIP) return xRealIP;

  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    // Take the first IP in the chain (original client)
    return xForwardedFor.split(",")[0].trim();
  }

  return "unknown";
}

// ============================================================================
// COMBINED ABUSE CHECK
// ============================================================================

export interface AbuseCheckResult {
  passed: boolean;
  reason?: string;
  status?: number;
}

/**
 * Run all abuse protection checks
 *
 * @param body - Request body
 * @param headers - Request headers
 * @returns Check result with status
 */
export function runAbuseChecks(
  body: Record<string, unknown>,
  headers: Headers
): AbuseCheckResult {
  // Check honeypot
  if (isHoneypotTriggered(body)) {
    console.warn("[Abuse] Honeypot triggered");
    return {
      passed: false,
      reason: "Invalid request",
      status: 400,
    };
  }

  // Check rate limit
  const ip = getClientIP(headers);
  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    console.warn(`[Abuse] Rate limit exceeded for IP: ${ip}`);
    return {
      passed: false,
      reason: `Too many requests. Please try again in ${Math.ceil(rateLimit.resetIn / 1000)} seconds.`,
      status: 429,
    };
  }

  return { passed: true };
}
