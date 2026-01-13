/**
 * Form utilities barrel export
 */

// Validators
export {
  // Contact form
  contactFormSchema,
  CONTACT_TOPICS,
  type ContactFormData,

  // Volunteer form
  volunteerFormSchema,
  CONTACT_METHODS,
  VOLUNTEER_INTERESTS,
  type VolunteerFormData,

  // Partner form
  partnerFormSchema,
  PARTNERSHIP_INTERESTS,
  type PartnerFormData,

  // Homes verification form
  homesFunnelSchema,
  homesEligibilitySchema,
  homesAboutSchema,
  homesLocationSchema,
  homesPoliciesSchema,
  homesConsentSchema,
  type HomesFunnelFormData,

  // Helpers
  validateForm,
  getFieldErrors,
  type ValidationError,
} from "./validators";

// Google Sheets
export {
  submitToGoogleSheets,
  submitContactForm,
  submitVolunteerForm,
  submitPartnerForm,
  submitHomesForm,
  type FormType,
  type WebhookResponse,
  type ContactFormPayload,
  type VolunteerFormPayload,
  type PartnerFormPayload,
  type HomesFormPayload,
} from "./googleSheets";
