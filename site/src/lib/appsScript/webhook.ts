/**
 * Apps Script Webhook Client
 *
 * Server-to-server communication with Google Apps Script Web App.
 * IMPORTANT: Never call this from browser code - Apps Script doesn't support CORS preflight.
 */

export interface WebhookPayload {
  secret: string;
  type: string;
  submittedAt: string;
  data: unknown;
}

export interface WebhookResponse {
  ok: boolean;
  message?: string;
  error?: string;
}

const WEBHOOK_TIMEOUT_MS = 10_000; // 10 seconds

/**
 * Post data to the Apps Script webhook
 *
 * @param type - Form type identifier (e.g., "contact", "volunteer", "apply")
 * @param data - Validated form data to submit
 * @returns Promise with success/error status
 */
export async function postToAppsScript(
  type: string,
  data: unknown
): Promise<WebhookResponse> {
  const webhookUrl = process.env.APPS_SCRIPT_WEBHOOK_URL;
  const secret = process.env.APPS_SCRIPT_SHARED_SECRET;

  if (!webhookUrl) {
    console.error("[AppsScript] APPS_SCRIPT_WEBHOOK_URL not configured");
    return {
      ok: false,
      error: "Form submission is not configured. Please contact support.",
    };
  }

  if (!secret) {
    console.error("[AppsScript] APPS_SCRIPT_SHARED_SECRET not configured");
    return {
      ok: false,
      error: "Form submission is not configured. Please contact support.",
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const payload: WebhookPayload = {
      secret,
      type,
      submittedAt: new Date().toISOString(),
      data,
    };

    console.log(`[AppsScript] Submitting ${type} form...`);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Apps Script always returns 200, check the response body
    const result: WebhookResponse = await response.json();

    if (result.ok) {
      console.log(`[AppsScript] ${type} form submitted successfully`);
      return result;
    } else {
      console.error(`[AppsScript] ${type} form error:`, result.error);
      return {
        ok: false,
        error: result.error || "Failed to submit form",
      };
    }
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === "AbortError") {
      console.error(`[AppsScript] ${type} form timeout after ${WEBHOOK_TIMEOUT_MS}ms`);
      return {
        ok: false,
        error: "Request timed out. Please try again.",
      };
    }

    console.error(`[AppsScript] ${type} form exception:`, error);
    return {
      ok: false,
      error: "Failed to connect to form service. Please try again.",
    };
  }
}
