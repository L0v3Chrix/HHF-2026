import { NextResponse } from "next/server";
import { partnerFormSchema, validateForm, submitPartnerForm } from "@/lib/forms";

/**
 * POST /api/forms/partner
 *
 * Handles partnership inquiry form submissions and forwards to Google Sheets
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validation = validateForm(partnerFormSchema, body);

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
    console.log("=== Partner Form Submission ===");
    console.log("Organization:", data.organizationName);
    console.log("Contact:", data.contactName);
    console.log("Email:", data.email);
    console.log("Interest:", data.partnershipInterest);
    console.log("================================");

    // Submit to Google Sheets
    const result = await submitPartnerForm({
      organizationName: data.organizationName,
      contactName: data.contactName,
      email: data.email,
      partnershipInterest: data.partnershipInterest,
      notes: data.notes || "",
    });

    if (!result.ok) {
      console.error("Google Sheets error:", result.error);
      return NextResponse.json(
        {
          success: false,
          message: result.error || "Failed to submit form",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your partnership inquiry. We'll respond with clarity and care.",
    });
  } catch (error) {
    console.error("Partner form submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
