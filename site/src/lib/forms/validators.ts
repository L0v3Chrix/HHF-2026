/**
 * Zod validation schemas for all Heart Forward forms
 */
import { z } from "zod";

// ============================================================================
// COMMON VALIDATORS
// ============================================================================

const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

const phoneSchema = z
  .string()
  .optional()
  .transform((val) => val?.trim() || "");

const requiredString = (fieldName: string) =>
  z.string().min(1, `${fieldName} is required`).transform((val) => val.trim());

// ============================================================================
// CONTACT FORM
// ============================================================================

export const CONTACT_TOPICS = [
  "scholarships",
  "resources",
  "events",
  "volunteering",
  "partnership",
  "other",
] as const;

export const contactFormSchema = z.object({
  name: requiredString("Name"),
  email: emailSchema,
  phone: phoneSchema,
  topic: z.enum(CONTACT_TOPICS, {
    errorMap: () => ({ message: "Please select a topic" }),
  }),
  message: requiredString("Message"),
  newsletterOptIn: z.boolean().default(false),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ============================================================================
// VOLUNTEER FORM
// ============================================================================

export const CONTACT_METHODS = ["email", "text", "phone"] as const;

export const VOLUNTEER_INTERESTS = [
  "events",
  "outreach",
  "admin support",
  "community education",
  "other",
] as const;

export const volunteerFormSchema = z.object({
  fullName: requiredString("Full name"),
  email: emailSchema,
  phone: phoneSchema,
  preferredContactMethod: z
    .enum(CONTACT_METHODS)
    .optional()
    .nullable()
    .transform((val) => val || null),
  interests: z.array(z.string()).default([]),
  availability: requiredString("Availability"),
  notes: z.string().optional().default(""),
  consentAcknowledged: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the consent to continue",
  }),
});

export type VolunteerFormData = z.infer<typeof volunteerFormSchema>;

// ============================================================================
// PARTNER FORM
// ============================================================================

export const PARTNERSHIP_INTERESTS = [
  "sponsorship",
  "in-kind",
  "referral",
  "other",
] as const;

export const partnerFormSchema = z.object({
  organizationName: requiredString("Organization name"),
  contactName: requiredString("Contact name"),
  email: emailSchema,
  partnershipInterest: z.enum(PARTNERSHIP_INTERESTS, {
    errorMap: () => ({ message: "Please select a partnership interest" }),
  }),
  notes: z.string().optional().default(""),
});

export type PartnerFormData = z.infer<typeof partnerFormSchema>;

// ============================================================================
// HOMES VERIFICATION FORM
// ============================================================================

const yesNoRequired = z.enum(["yes", "no"], {
  errorMap: () => ({ message: "Please select Yes or No" }),
});

const yesNoOptional = z
  .enum(["yes", "no", ""])
  .optional()
  .nullable()
  .transform((val) => val || "");

export const homesEligibilitySchema = z.object({
  isRecoveryHome: z.literal("yes", {
    errorMap: () => ({ message: "Must be a recovery home" }),
  }),
  hasCapacity: z.literal("yes", {
    errorMap: () => ({ message: "Must have capacity for at least 2 residents" }),
  }),
  acceptsReferrals: z.literal("yes", {
    errorMap: () => ({ message: "Must accept referrals" }),
  }),
  hasHouseRules: z.literal("yes", {
    errorMap: () => ({ message: "Must have house rules" }),
  }),
});

export const homesAboutSchema = z.object({
  homeName: requiredString("Home name"),
  contactName: requiredString("Contact name"),
  email: emailSchema,
  phone: requiredString("Phone"),
  website: z.string().optional().default(""),
  operatingLength: z
    .enum(["", "less-than-1", "1-2", "3-5", "5-plus"])
    .optional()
    .default(""),
  description: z.string().optional().default(""),
});

export const homesLocationSchema = z.object({
  streetAddress: requiredString("Street address"),
  city: requiredString("City"),
  state: requiredString("State"),
  zip: requiredString("ZIP code"),
  totalCapacity: requiredString("Total capacity"),
  currentOpenings: z.string().optional().default(""),
  genderServed: z.enum(["men", "women", "all", "other"], {
    errorMap: () => ({ message: "Please select who you serve" }),
  }),
  monthlyCost: z.string().optional().default(""),
});

export const homesPoliciesSchema = z.object({
  recoveryProgramRequired: z.enum(["yes", "no", "encouraged but not required"], {
    errorMap: () => ({ message: "Please select recovery program requirement" }),
  }),
  matAllowed: z
    .enum(["", "yes", "no", "case by case"])
    .optional()
    .default(""),
  houseRules: z.array(z.string()).default([]),
  staffingLevel: z.enum(["24/7", "part-time", "on-call", "no"], {
    errorMap: () => ({ message: "Please select staffing level" }),
  }),
  relapseApproach: z.string().optional().default(""),
  certifications: z.array(z.string()).default([]),
  additionalNotes: z.string().optional().default(""),
});

export const homesConsentSchema = z.object({
  confirmAccurate: z.boolean().refine((val) => val === true, {
    message: "You must confirm the information is accurate",
  }),
  allowContact: z.boolean().refine((val) => val === true, {
    message: "You must allow contact for verification",
  }),
  notifyChanges: z.boolean().refine((val) => val === true, {
    message: "You must agree to notify of changes",
  }),
});

export const homesFunnelSchema = z.object({
  eligibility: homesEligibilitySchema,
  about: homesAboutSchema,
  location: homesLocationSchema,
  policies: homesPoliciesSchema,
  consent: homesConsentSchema,
});

export type HomesFunnelFormData = z.infer<typeof homesFunnelSchema>;

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

export type ValidationError = {
  field: string;
  message: string;
};

/**
 * Validate form data and return typed result
 */
export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: ValidationError[] } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: ValidationError[] = result.error.errors.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));

  return { success: false, errors };
}

/**
 * Get field-level error map from Zod errors
 */
export function getFieldErrors(
  errors: ValidationError[]
): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const error of errors) {
    if (!fieldErrors[error.field]) {
      fieldErrors[error.field] = error.message;
    }
  }
  return fieldErrors;
}
