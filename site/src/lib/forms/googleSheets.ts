/**
 * Google Sheets Form Submission Utility
 *
 * Posts form data to the Google Apps Script webhook
 */

export type FormType = "contact" | "volunteer" | "partner" | "homes-verification";

export interface WebhookResponse {
  ok: boolean;
  message?: string;
  error?: string;
}

interface SubmitOptions<T> {
  formType: FormType;
  data: T;
}

/**
 * Submit form data to the Google Apps Script webhook
 */
export async function submitToGoogleSheets<T>({
  formType,
  data,
}: SubmitOptions<T>): Promise<WebhookResponse> {
  // Support both legacy and current env var names
  const webhookUrl = process.env.APPS_SCRIPT_WEBHOOK_URL || process.env.GOOGLE_APPS_SCRIPT_WEBHOOK;
  const secret = process.env.APPS_SCRIPT_SHARED_SECRET || process.env.HFF_SHEETS_SECRET;

  if (!webhookUrl) {
    console.error("GOOGLE_APPS_SCRIPT_WEBHOOK not configured");
    return {
      ok: false,
      error: "Form submission is not configured. Please contact support.",
    };
  }

  if (!secret) {
    console.error("HFF_SHEETS_SECRET not configured");
    return {
      ok: false,
      error: "Form submission is not configured. Please contact support.",
    };
  }

  try {
    const payload = {
      formType,
      data,
      secret,
    };

    console.log(`[GoogleSheets] Submitting ${formType} form...`);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Apps Script returns 200 even for errors, check the body
    const result: WebhookResponse = await response.json();

    if (result.ok) {
      console.log(`[GoogleSheets] ${formType} form submitted successfully`);
      return result;
    } else {
      console.error(`[GoogleSheets] ${formType} form error:`, result.error);
      return {
        ok: false,
        error: result.error || "Failed to submit form",
      };
    }
  } catch (error) {
    console.error(`[GoogleSheets] ${formType} form exception:`, error);
    return {
      ok: false,
      error: "Failed to connect to form service. Please try again.",
    };
  }
}

/**
 * Contact form submission
 */
export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
  newsletterOptIn: boolean;
}

export async function submitContactForm(
  data: ContactFormPayload
): Promise<WebhookResponse> {
  return submitToGoogleSheets({
    formType: "contact",
    data,
  });
}

/**
 * Volunteer form submission
 */
export interface VolunteerFormPayload {
  fullName: string;
  email: string;
  phone?: string;
  preferredContactMethod?: string | null;
  interests: string[];
  availability: string;
  notes?: string;
  consentAcknowledged: boolean;
}

export async function submitVolunteerForm(
  data: VolunteerFormPayload
): Promise<WebhookResponse> {
  return submitToGoogleSheets({
    formType: "volunteer",
    data,
  });
}

/**
 * Partner form submission
 */
export interface PartnerFormPayload {
  organizationName: string;
  contactName: string;
  email: string;
  partnershipInterest: string;
  notes?: string;
}

export async function submitPartnerForm(
  data: PartnerFormPayload
): Promise<WebhookResponse> {
  return submitToGoogleSheets({
    formType: "partner",
    data,
  });
}

/**
 * Homes verification form submission
 */
export interface HomesFormPayload {
  eligibility: {
    isRecoveryHome: string;
    hasCapacity: string;
    acceptsReferrals: string;
    hasHouseRules: string;
  };
  about: {
    homeName: string;
    contactName: string;
    email: string;
    phone: string;
    website?: string;
    operatingLength?: string;
    description?: string;
  };
  location: {
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
    totalCapacity: string;
    currentOpenings?: string;
    genderServed: string;
    monthlyCost?: string;
  };
  policies: {
    recoveryProgramRequired: string;
    matAllowed?: string;
    houseRules: string[];
    staffingLevel: string;
    relapseApproach?: string;
    certifications: string[];
    additionalNotes?: string;
  };
  consent: {
    confirmAccurate: boolean;
    allowContact: boolean;
    notifyChanges: boolean;
  };
}

export async function submitHomesForm(
  data: HomesFormPayload
): Promise<WebhookResponse> {
  return submitToGoogleSheets({
    formType: "homes-verification",
    data,
  });
}
