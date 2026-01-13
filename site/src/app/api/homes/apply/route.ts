import { NextResponse } from "next/server";
import type { HomesFunnelData } from "@/types/homes-funnel";
import { submitHomesForm } from "@/lib/forms";

/**
 * POST /api/homes/apply
 *
 * Handles home verification application submissions.
 * Validates and forwards to Google Sheets webhook.
 */
export async function POST(request: Request) {
  try {
    const data: HomesFunnelData = await request.json();

    // Validate required fields
    const validationErrors = validateSubmission(data);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    // Log submission
    console.log("=== New Home Verification Application ===");
    console.log("Submitted at:", new Date().toISOString());
    console.log("Home Name:", data.about.homeName);
    console.log("Contact:", data.about.contactName);
    console.log("Email:", data.about.email);
    console.log("Phone:", data.about.phone);
    console.log("Location:", `${data.location.city}, ${data.location.state}`);
    console.log("Capacity:", data.location.totalCapacity);
    console.log("==========================================");

    // Submit to Google Sheets
    const result = await submitHomesForm({
      eligibility: {
        isRecoveryHome: data.eligibility.isRecoveryHome,
        hasCapacity: data.eligibility.hasCapacity,
        acceptsReferrals: data.eligibility.acceptsReferrals,
        hasHouseRules: data.eligibility.hasHouseRules,
      },
      about: {
        homeName: data.about.homeName,
        contactName: data.about.contactName,
        email: data.about.email,
        phone: data.about.phone,
        website: data.about.website || "",
        operatingLength: data.about.operatingLength || "",
        description: data.about.description || "",
      },
      location: {
        streetAddress: data.location.streetAddress,
        city: data.location.city,
        state: data.location.state,
        zip: data.location.zip,
        totalCapacity: data.location.totalCapacity,
        currentOpenings: data.location.currentOpenings || "",
        genderServed: data.location.genderServed,
        monthlyCost: data.location.monthlyCost || "",
      },
      policies: {
        recoveryProgramRequired: data.policies.recoveryProgramRequired,
        matAllowed: data.policies.matAllowed || "",
        houseRules: data.policies.houseRules,
        staffingLevel: data.policies.staffingLevel,
        relapseApproach: data.policies.relapseApproach || "",
        certifications: data.policies.certifications,
        additionalNotes: data.policies.additionalNotes || "",
      },
      consent: {
        confirmAccurate: data.consent.confirmAccurate,
        allowContact: data.consent.allowContact,
        notifyChanges: data.consent.notifyChanges,
      },
    });

    if (!result.ok) {
      console.error("Google Sheets error:", result.error);
      // Still return success to user if Google Sheets fails but log it
      // In production, you might want to queue this for retry
      console.warn(
        "Note: Google Sheets submission failed but allowing user flow to continue"
      );
    }

    // TODO: Send confirmation email to applicant
    // await sendConfirmationEmail(data.about.email, data.about.homeName);

    // TODO: Send notification email to Heart Forward team
    // await sendNotificationEmail(data);

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Home application submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process application. Please try again.",
      },
      { status: 500 }
    );
  }
}

/**
 * Validates the submission data
 */
function validateSubmission(data: HomesFunnelData): string[] {
  const errors: string[] = [];

  // Eligibility checks
  if (data.eligibility.isRecoveryHome !== "yes") {
    errors.push("Must be a recovery home");
  }
  if (data.eligibility.hasCapacity !== "yes") {
    errors.push("Must have capacity for at least 2 residents");
  }
  if (data.eligibility.acceptsReferrals !== "yes") {
    errors.push("Must accept referrals");
  }
  if (data.eligibility.hasHouseRules !== "yes") {
    errors.push("Must have house rules");
  }

  // About section
  if (!data.about.homeName?.trim()) {
    errors.push("Home name is required");
  }
  if (!data.about.contactName?.trim()) {
    errors.push("Contact name is required");
  }
  if (!data.about.email?.trim()) {
    errors.push("Email is required");
  }
  if (!isValidEmail(data.about.email)) {
    errors.push("Valid email is required");
  }
  if (!data.about.phone?.trim()) {
    errors.push("Phone is required");
  }

  // Location section
  if (!data.location.streetAddress?.trim()) {
    errors.push("Street address is required");
  }
  if (!data.location.city?.trim()) {
    errors.push("City is required");
  }
  if (!data.location.state?.trim()) {
    errors.push("State is required");
  }
  if (!data.location.zip?.trim()) {
    errors.push("ZIP code is required");
  }
  if (!data.location.totalCapacity?.trim()) {
    errors.push("Total capacity is required");
  }
  if (!data.location.genderServed) {
    errors.push("Gender served is required");
  }

  // Policies section
  if (!data.policies.recoveryProgramRequired) {
    errors.push("Recovery program requirement is required");
  }
  if (!data.policies.staffingLevel) {
    errors.push("Staffing level is required");
  }

  // Consent section
  if (!data.consent.confirmAccurate) {
    errors.push("Must confirm information is accurate");
  }
  if (!data.consent.allowContact) {
    errors.push("Must allow contact for verification");
  }
  if (!data.consent.notifyChanges) {
    errors.push("Must agree to notify of changes");
  }

  return errors;
}

/**
 * Simple email validation
 */
function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}
