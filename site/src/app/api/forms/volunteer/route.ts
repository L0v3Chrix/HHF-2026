import { NextResponse } from "next/server";
import { volunteerFormSchema, validateForm, submitVolunteerForm } from "@/lib/forms";

/**
 * POST /api/forms/volunteer
 *
 * Handles volunteer interest form submissions and forwards to Google Sheets
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validation = validateForm(volunteerFormSchema, body);

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

    const interests = data.interests ?? [];

    // Log submission
    console.log("=== Volunteer Form Submission ===");
    console.log("Name:", data.fullName);
    console.log("Email:", data.email);
    console.log("Interests:", interests.join(", ") || "None selected");
    console.log("=================================");

    // Submit to Google Sheets
    const result = await submitVolunteerForm({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || "",
      preferredContactMethod: data.preferredContactMethod || null,
      interests,
      availability: data.availability,
      notes: data.notes || "",
      consentAcknowledged: data.consentAcknowledged,
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
      message: "Thank you for your interest in volunteering. We'll follow up with next steps.",
    });
  } catch (error) {
    console.error("Volunteer form submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
