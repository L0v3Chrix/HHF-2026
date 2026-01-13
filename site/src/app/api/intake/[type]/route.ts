import { NextResponse } from "next/server";
import { postToAppsScript } from "@/lib/appsScript/webhook";
import { runAbuseChecks } from "@/lib/security/abuse";
import {
  isValidIntakeType,
  validateIntake,
  INTAKE_TYPES,
  type IntakeType,
} from "@/lib/validators/intake";

interface RouteParams {
  params: Promise<{ type: string }>;
}

/**
 * POST /api/intake/[type]
 *
 * Dynamic endpoint for all intake form types:
 * - contact
 * - volunteer
 * - partner
 * - homes-verification
 *
 * Validates data against the appropriate schema and forwards to Apps Script.
 */
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { type } = await params;

    // Validate intake type
    if (!isValidIntakeType(type)) {
      return NextResponse.json(
        {
          ok: false,
          error: `Invalid intake type. Supported types: ${INTAKE_TYPES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Run abuse protection checks
    const abuseCheck = runAbuseChecks(body, request.headers);
    if (!abuseCheck.passed) {
      return NextResponse.json(
        { ok: false, error: abuseCheck.reason },
        { status: abuseCheck.status || 400 }
      );
    }

    // Validate against the appropriate schema
    const validation = validateIntake(type as IntakeType, body);

    if (!validation.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Log submission
    console.log(`=== New ${type} Intake ===`);
    console.log("Type:", type);
    console.log("Data:", JSON.stringify(validation.data, null, 2).slice(0, 500));
    console.log("=========================");

    // Post to Apps Script webhook
    const webhookResult = await postToAppsScript(type, validation.data);

    if (!webhookResult.ok) {
      console.error(`[Intake/${type}] Webhook failed:`, webhookResult.error);
      return NextResponse.json(
        {
          ok: false,
          error: webhookResult.error || "Failed to submit form",
        },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      ok: true,
      message: getSuccessMessage(type as IntakeType),
    });
  } catch (error) {
    console.error("[Intake] Submission error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}

/**
 * Get appropriate success message for each intake type
 */
function getSuccessMessage(type: IntakeType): string {
  switch (type) {
    case "contact":
      return "Thank you for reaching out. We'll respond within 24-48 hours.";
    case "volunteer":
      return "Thank you for your interest in volunteering. We'll follow up with next steps.";
    case "partner":
      return "Thank you for your partnership interest. Our team will be in touch soon.";
    case "homes-verification":
      return "Application submitted. We'll review and contact you within 5-7 business days.";
    default:
      return "Form submitted successfully.";
  }
}
