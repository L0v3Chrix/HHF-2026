import { NextResponse } from "next/server";
import { z } from "zod";
import { postToAppsScript } from "@/lib/appsScript/webhook";
import { runAbuseChecks } from "@/lib/security/abuse";

/**
 * Application Form Schema
 *
 * Generic scholarship/program application form.
 */
const applyFormSchema = z.object({
  // Applicant Info
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),

  // Application Details
  programType: z.enum(["scholarship", "housing", "support", "other"]).optional(),
  applicationReason: z.string().min(10, "Please provide more detail about your application"),

  // Recovery Info (optional)
  recoveryStatus: z.string().optional(),
  sobrietyDate: z.string().optional(),
  currentHousing: z.string().optional(),

  // Additional
  referralSource: z.string().optional(),
  additionalNotes: z.string().optional(),

  // Consent
  consentToContact: z.boolean().refine((val) => val === true, {
    message: "You must consent to be contacted",
  }),
  consentToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),

  // Honeypot field (should be empty)
  website: z.string().optional(),
});

export type ApplyFormData = z.infer<typeof applyFormSchema>;

/**
 * POST /api/apply
 *
 * Handles general application form submissions.
 * Validates data, runs abuse checks, and forwards to Apps Script webhook.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Run abuse protection checks
    const abuseCheck = runAbuseChecks(body, request.headers);
    if (!abuseCheck.passed) {
      return NextResponse.json(
        { ok: false, error: abuseCheck.reason },
        { status: abuseCheck.status || 400 }
      );
    }

    // Validate with Zod
    const validation = applyFormSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed",
          errors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Remove honeypot field before submission
    const { website: _honeypot, ...cleanData } = data;

    // Log submission (server-side only)
    console.log("=== New Application Submission ===");
    console.log("Name:", `${data.firstName} ${data.lastName}`);
    console.log("Email:", data.email);
    console.log("Program:", data.programType || "Not specified");
    console.log("==================================");

    // Post to Apps Script webhook
    const webhookResult = await postToAppsScript("apply", cleanData);

    if (!webhookResult.ok) {
      console.error("[Apply] Webhook submission failed:", webhookResult.error);
      return NextResponse.json(
        {
          ok: false,
          error: webhookResult.error || "Failed to submit application",
        },
        { status: 500 }
      );
    }

    // TODO: Send confirmation email AFTER webhook success
    // await sendConfirmationEmail(data.email, data.firstName);

    // TODO: Send notification email to HFF team
    // await sendNotificationEmail(data);

    return NextResponse.json({
      ok: true,
      message: "Application submitted successfully. We'll be in touch soon!",
    });
  } catch (error) {
    console.error("[Apply] Submission error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
