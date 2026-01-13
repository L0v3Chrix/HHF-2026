/**
 * config.gs - Type Configuration for All Form Types
 *
 * Central configuration mapping each intake type to its:
 * - Spreadsheet ID
 * - Tab name
 * - Column headers (in exact order)
 *
 * Headers follow this structure:
 * 1. Universal columns: submittedAt, sourceType, status, adminNotes
 * 2. Form-specific fields (matching Zod schema keys exactly)
 * 3. rawJson (for debugging/auditing)
 */

// Shared secret - must match APPS_SCRIPT_SHARED_SECRET in Next.js
var SHARED_SECRET = PropertiesService.getScriptProperties().getProperty('HFF_SHARED_SECRET') || '';

// Spreadsheet IDs
var SPREADSHEET_IDS = {
  apply: '1SlW2d3qnOIO4gOFt_C683UrcZv7bl7f9nadbj01QQhA',
  contact: '1lr9dNdS1_rnJR5qaA1d7NrWNeC4Em2LtrGI4VZ_Uwgo',
  volunteer: '1BIQwrLomRHYElzDqVQ3XNA_B0xqbyGx7UEwyclEpr-o',
  partner: '1bW27Ud_Uuey4vtL2Dn8eZyPJg94Ip5zcXy6d9Bdk7xM',
  'homes-verification': '19c7LE2eJz_Zsrr5_zS40N3SrEqSeGcM5SooGhgkajEA'
};

// Universal columns (first in every sheet)
var UNIVERSAL_HEADERS = [
  'submittedAt',
  'sourceType',
  'status',
  'adminNotes'
];

// Type-specific configurations
var TYPE_CONFIG = {

  // ============================================================================
  // APPLY (Main Application Form)
  // Schema from: site/src/app/api/apply/route.ts
  // ============================================================================
  'apply': {
    spreadsheetId: SPREADSHEET_IDS.apply,
    tabName: 'Submissions',
    headers: UNIVERSAL_HEADERS.concat([
      // Applicant Info
      'firstName',
      'lastName',
      'email',
      'phone',
      // Application Details
      'programType',
      'applicationReason',
      // Recovery Info
      'recoveryStatus',
      'sobrietyDate',
      'currentHousing',
      // Additional
      'referralSource',
      'additionalNotes',
      // Consent
      'consentToContact',
      'consentToTerms',
      // Debug
      'rawJson'
    ])
  },

  // ============================================================================
  // CONTACT
  // Schema from: contactFormSchema in validators.ts
  // ============================================================================
  'contact': {
    spreadsheetId: SPREADSHEET_IDS.contact,
    tabName: 'Submissions',
    headers: UNIVERSAL_HEADERS.concat([
      'name',
      'email',
      'phone',
      'topic',
      'message',
      'newsletterOptIn',
      // Debug
      'rawJson'
    ])
  },

  // ============================================================================
  // VOLUNTEER
  // Schema from: volunteerFormSchema in validators.ts
  // ============================================================================
  'volunteer': {
    spreadsheetId: SPREADSHEET_IDS.volunteer,
    tabName: 'Submissions',
    headers: UNIVERSAL_HEADERS.concat([
      'fullName',
      'email',
      'phone',
      'preferredContactMethod',
      'interests',           // Array -> comma-separated string
      'availability',
      'notes',
      'consentAcknowledged',
      // Debug
      'rawJson'
    ])
  },

  // ============================================================================
  // PARTNER
  // Schema from: partnerFormSchema in validators.ts
  // ============================================================================
  'partner': {
    spreadsheetId: SPREADSHEET_IDS.partner,
    tabName: 'Submissions',
    headers: UNIVERSAL_HEADERS.concat([
      'organizationName',
      'contactName',
      'email',
      'partnershipInterest',
      'notes',
      // Debug
      'rawJson'
    ])
  },

  // ============================================================================
  // HOMES VERIFICATION
  // Schema from: homesFunnelSchema in validators.ts (nested structure)
  // Flattened with dot notation: eligibility.isRecoveryHome, about.homeName, etc.
  // ============================================================================
  'homes-verification': {
    spreadsheetId: SPREADSHEET_IDS['homes-verification'],
    tabName: 'Submissions',
    headers: UNIVERSAL_HEADERS.concat([
      // Eligibility section
      'eligibility.isRecoveryHome',
      'eligibility.hasCapacity',
      'eligibility.acceptsReferrals',
      'eligibility.hasHouseRules',
      // About section
      'about.homeName',
      'about.contactName',
      'about.email',
      'about.phone',
      'about.website',
      'about.operatingLength',
      'about.description',
      // Location section
      'location.streetAddress',
      'location.city',
      'location.state',
      'location.zip',
      'location.totalCapacity',
      'location.currentOpenings',
      'location.genderServed',
      'location.monthlyCost',
      // Policies section
      'policies.recoveryProgramRequired',
      'policies.matAllowed',
      'policies.houseRules',        // Array -> comma-separated
      'policies.staffingLevel',
      'policies.relapseApproach',
      'policies.certifications',    // Array -> comma-separated
      'policies.additionalNotes',
      // Consent section
      'consent.confirmAccurate',
      'consent.allowContact',
      'consent.notifyChanges',
      // Debug
      'rawJson'
    ])
  }
};

/**
 * Get configuration for a specific type
 * @param {string} type - The form type
 * @returns {Object|null} Configuration object or null if not found
 */
function getTypeConfig(type) {
  return TYPE_CONFIG[type] || null;
}

/**
 * Get all valid type names
 * @returns {string[]} Array of valid type names
 */
function getValidTypes() {
  return Object.keys(TYPE_CONFIG);
}

/**
 * Validate the shared secret
 * @param {string} secret - Secret to validate
 * @returns {boolean} True if valid
 */
function validateSecret(secret) {
  if (!SHARED_SECRET) {
    Logger.log('WARNING: HFF_SHARED_SECRET not set in Script Properties');
    return false;
  }
  return secret === SHARED_SECRET;
}
