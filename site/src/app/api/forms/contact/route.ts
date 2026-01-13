import { NextResponse } from "next/server";
import { contactFormSchema, validateForm, submitContactForm } from "@/lib/forms";

/**
 * POST /api/forms/contact
 *
 * Handles contact form submissions and forwards to Google Sheets
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validation = validateForm(contactFormSchema, body);

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
    console.log("=== Contact Form Submission ===");
    console.log("Name:", data.name);
    console.log("Email:", data.email);
    console.log("Topic:", data.topic);
    console.log("================================");

    // Submit to Google Sheets
    const result = await submitContactForm({
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      topic: data.topic,
      message: data.message,
      newsletterOptIn: data.newsletterOptIn ?? false,
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
      message: "Thank you for reaching out. We'll be in touch soon.",
    });
  } catch (error) {
    console.error("Contact form submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
