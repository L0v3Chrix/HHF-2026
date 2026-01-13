import { NextResponse } from "next/server";
import { homesFunnelSchema, validateForm, submitHomesForm } from "@/lib/forms";

/**
 * POST /api/forms/homes-verify
 *
 * Handles homes verification application submissions and forwards to Google Sheets
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validation = validateForm(homesFunnelSchema, body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Log submission
    console.log("=== Homes Verification Submission ===");
    console.log("Home Name:", data.about.homeName);
    console.log("Contact:", data.about.contactName);
    console.log("Email:", data.about.email);
    console.log("Location:", `${data.location.city}, ${data.location.state}`);
    console.log("Capacity:", data.location.totalCapacity);
    console.log("=====================================");

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
        houseRules: data.policies.houseRules ?? [],
        staffingLevel: data.policies.staffingLevel,
        relapseApproach: data.policies.relapseApproach || "",
        certifications: data.policies.certifications ?? [],
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
      return NextResponse.json(
        {
          success: false,
          message: result.error || "Failed to submit application",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully. We'll review and be in touch within 5-7 business days.",
    });
  } catch (error) {
    console.error("Homes verification submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
