/**
 * Heart Forward Foundation — Google Sheets Form Webhook
 *
 * Combined webhook handler for all 4 forms:
 * - Contact Form
 * - Volunteer Form
 * - Partner Form
 * - Homes Verification Application
 *
 * Deploy as Web App with:
 * - Execute as: Me
 * - Who has access: Anyone
 *
 * Set Script Properties:
 * - HFF_SECRET: Your shared secret (must match site .env)
 * - CONTACT_SHEET_ID: 1lr9dNdS1_rnJR5qaA1d7NrWNeC4Em2LtrGI4VZ_Uwgo
 * - VOLUNTEER_SHEET_ID: 1BIQwrLomRHYElzDqVQ3XNA_B0xqbyGx7UEwyclEpr-o
 * - PARTNER_SHEET_ID: 1bW27Ud_Uuey4vtL2Dn8eZyPJg94Ip5zcXy6d9Bdk7xM
 * - HOMES_SHEET_ID: 19c7LE2eJz_Zsrr5_zS40N3SrEqSeGcM5SooGhgkajEA
 */

// ============================================================================
// SCHEMA DEFINITIONS
// ============================================================================

const SCHEMAS = {
  contact: {
    sheetIdKey: 'CONTACT_SHEET_ID',
    headers: [
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Topic',
      'Message',
      'Newsletter Opt-in'
    ],
    required: ['name', 'email', 'topic', 'message'],
    topicValues: ['Scholarships', 'Resources', 'Events', 'Volunteering', 'Partnership', 'Other']
  },

  volunteer: {
    sheetIdKey: 'VOLUNTEER_SHEET_ID',
    headers: [
      'Timestamp',
      'Full Name',
      'Email',
      'Phone',
      'Preferred Contact Method',
      'Interests',
      'Availability',
      'Notes',
      'Consent Acknowledged'
    ],
    required: ['fullName', 'email', 'availability', 'consentAcknowledged'],
    contactMethods: ['Email', 'Text', 'Phone'],
    interestValues: ['Events', 'Outreach', 'Admin support', 'Community education', 'Other']
  },

  partner: {
    sheetIdKey: 'PARTNER_SHEET_ID',
    headers: [
      'Timestamp',
      'Organization Name',
      'Contact Name',
      'Email',
      'Partnership Interest',
      'Notes'
    ],
    required: ['organizationName', 'contactName', 'email', 'partnershipInterest'],
    interestValues: ['Sponsorship', 'In-kind', 'Referral partner', 'Other']
  },

  homes: {
    sheetIdKey: 'HOMES_SHEET_ID',
    headers: [
      'Timestamp',
      // Eligibility
      'Is Recovery Home',
      'Has Capacity (2+)',
      'Accepts Referrals',
      'Has House Rules',
      // About
      'Home Name',
      'Contact Name',
      'Email',
      'Phone',
      'Website',
      'Operating Length',
      'Description',
      // Location
      'Street Address',
      'City',
      'State',
      'ZIP Code',
      'Total Capacity',
      'Current Openings',
      'Gender Served',
      'Monthly Cost',
      // Policies
      'Recovery Program Required',
      'MAT Allowed',
      'House Rules',
      'Staffing Level',
      'Relapse Approach',
      'Certifications',
      'Additional Notes',
      // Consent
      'Confirmed Accurate',
      'Allow Contact',
      'Notify Changes'
    ],
    required: [
      'isRecoveryHome', 'hasCapacity', 'acceptsReferrals', 'hasHouseRules',
      'homeName', 'contactName', 'email', 'phone',
      'streetAddress', 'city', 'state', 'zip', 'totalCapacity', 'genderServed',
      'recoveryProgramRequired', 'staffingLevel',
      'confirmAccurate', 'allowContact', 'notifyChanges'
    ]
  }
};

// ============================================================================
// MAIN HANDLERS
// ============================================================================

/**
 * Handle POST requests
 */
function doPost(e) {
  try {
    // Verify secret
    const props = PropertiesService.getScriptProperties();
    const expectedSecret = props.getProperty('HFF_SECRET');

    // Parse request
    const payload = JSON.parse(e.postData.contents);
    const { formType, data, secret } = payload;

    // Validate secret
    if (secret !== expectedSecret) {
      return jsonResponse({ ok: false, error: 'Invalid secret' }, 401);
    }

    // Validate form type
    if (!SCHEMAS[formType]) {
      return jsonResponse({ ok: false, error: `Unknown form type: ${formType}` }, 400);
    }

    // Process based on form type
    const result = processForm(formType, data);

    if (result.success) {
      return jsonResponse({ ok: true, message: result.message });
    } else {
      return jsonResponse({ ok: false, error: result.error }, 400);
    }

  } catch (error) {
    console.error('doPost error:', error);
    return jsonResponse({ ok: false, error: error.message }, 500);
  }
}

/**
 * Handle GET requests (for testing/verification)
 */
function doGet(e) {
  const action = e.parameter.action;

  if (action === 'verify-schemas') {
    return verifyAllSchemas();
  }

  return jsonResponse({
    ok: true,
    message: 'HFF Forms Webhook is running',
    version: '1.0.0',
    forms: Object.keys(SCHEMAS),
    usage: 'POST with { formType, data, secret }'
  });
}

// ============================================================================
// FORM PROCESSORS
// ============================================================================

/**
 * Process a form submission
 */
function processForm(formType, data) {
  const schema = SCHEMAS[formType];
  const props = PropertiesService.getScriptProperties();
  const sheetId = props.getProperty(schema.sheetIdKey);

  if (!sheetId) {
    return { success: false, error: `Sheet ID not configured for ${formType}` };
  }

  // Validate required fields
  const validationErrors = validateRequired(data, schema.required, formType);
  if (validationErrors.length > 0) {
    return { success: false, error: `Missing required fields: ${validationErrors.join(', ')}` };
  }

  // Open sheet and ensure headers
  const spreadsheet = SpreadsheetApp.openById(sheetId);
  const sheet = spreadsheet.getSheets()[0]; // Use first sheet

  // Verify/fix headers
  ensureHeaders(sheet, schema.headers);

  // Build row data
  const rowData = buildRowData(formType, data, schema);

  // Append row
  sheet.appendRow(rowData);

  return { success: true, message: `${formType} form submitted successfully` };
}

/**
 * Validate required fields
 */
function validateRequired(data, requiredFields, formType) {
  const errors = [];

  for (const field of requiredFields) {
    const value = getNestedValue(data, field);

    if (value === undefined || value === null || value === '') {
      errors.push(field);
    }

    // Special validation for booleans that must be true
    if (formType === 'homes' && ['confirmAccurate', 'allowContact', 'notifyChanges'].includes(field)) {
      if (value !== true && value !== 'true' && value !== 'yes') {
        errors.push(field);
      }
    }

    if (formType === 'volunteer' && field === 'consentAcknowledged') {
      if (value !== true && value !== 'true') {
        errors.push(field);
      }
    }
  }

  return [...new Set(errors)]; // Remove duplicates
}

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

/**
 * Ensure sheet has correct headers
 */
function ensureHeaders(sheet, expectedHeaders) {
  const currentHeaders = sheet.getRange(1, 1, 1, expectedHeaders.length).getValues()[0];

  // Check if headers match
  let needsUpdate = false;
  for (let i = 0; i < expectedHeaders.length; i++) {
    if (currentHeaders[i] !== expectedHeaders[i]) {
      needsUpdate = true;
      break;
    }
  }

  if (needsUpdate || currentHeaders[0] === '') {
    // Clear row 1 and set headers
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);

    // Bold headers
    sheet.getRange(1, 1, 1, expectedHeaders.length).setFontWeight('bold');

    // Freeze header row
    sheet.setFrozenRows(1);
  }
}

/**
 * Build row data array based on form type
 */
function buildRowData(formType, data, schema) {
  const timestamp = new Date().toISOString();

  switch (formType) {
    case 'contact':
      return buildContactRow(data, timestamp);
    case 'volunteer':
      return buildVolunteerRow(data, timestamp);
    case 'partner':
      return buildPartnerRow(data, timestamp);
    case 'homes':
      return buildHomesRow(data, timestamp);
    default:
      throw new Error(`Unknown form type: ${formType}`);
  }
}

/**
 * Build contact form row
 */
function buildContactRow(data, timestamp) {
  return [
    timestamp,
    data.name || '',
    data.email || '',
    data.phone || '',
    capitalizeFirst(data.topic) || '',
    data.message || '',
    data.newsletterOptIn ? 'Yes' : 'No'
  ];
}

/**
 * Build volunteer form row
 */
function buildVolunteerRow(data, timestamp) {
  return [
    timestamp,
    data.fullName || '',
    data.email || '',
    data.phone || '',
    capitalizeFirst(data.preferredContactMethod) || '',
    Array.isArray(data.interests) ? data.interests.join(', ') : (data.interests || ''),
    data.availability || '',
    data.notes || '',
    data.consentAcknowledged ? 'Yes' : 'No'
  ];
}

/**
 * Build partner form row
 */
function buildPartnerRow(data, timestamp) {
  return [
    timestamp,
    data.organizationName || '',
    data.contactName || '',
    data.email || '',
    formatPartnershipInterest(data.partnershipInterest),
    data.notes || ''
  ];
}

/**
 * Build homes verification row
 */
function buildHomesRow(data, timestamp) {
  // Flatten nested structure
  const e = data.eligibility || {};
  const a = data.about || {};
  const l = data.location || {};
  const p = data.policies || {};
  const c = data.consent || {};

  return [
    timestamp,
    // Eligibility
    formatYesNo(e.isRecoveryHome),
    formatYesNo(e.hasCapacity),
    formatYesNo(e.acceptsReferrals),
    formatYesNo(e.hasHouseRules),
    // About
    a.homeName || '',
    a.contactName || '',
    a.email || '',
    a.phone || '',
    a.website || '',
    formatOperatingLength(a.operatingLength),
    a.description || '',
    // Location
    l.streetAddress || '',
    l.city || '',
    l.state || '',
    l.zip || '',
    l.totalCapacity || '',
    l.currentOpenings || '',
    formatGenderServed(l.genderServed),
    l.monthlyCost ? `$${l.monthlyCost}` : '',
    // Policies
    formatRecoveryProgram(p.recoveryProgramRequired),
    formatMATAllowed(p.matAllowed),
    Array.isArray(p.houseRules) ? p.houseRules.join(', ') : (p.houseRules || ''),
    formatStaffingLevel(p.staffingLevel),
    p.relapseApproach || '',
    Array.isArray(p.certifications) ? p.certifications.join(', ') : (p.certifications || ''),
    p.additionalNotes || '',
    // Consent
    c.confirmAccurate ? 'Yes' : 'No',
    c.allowContact ? 'Yes' : 'No',
    c.notifyChanges ? 'Yes' : 'No'
  ];
}

// ============================================================================
// FORMATTERS
// ============================================================================

function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatYesNo(value) {
  if (value === 'yes' || value === true) return 'Yes';
  if (value === 'no' || value === false) return 'No';
  return '';
}

function formatPartnershipInterest(value) {
  const map = {
    'sponsorship': 'Sponsorship',
    'in-kind': 'In-kind',
    'referral': 'Referral partner',
    'other': 'Other'
  };
  return map[value] || capitalizeFirst(value) || '';
}

function formatOperatingLength(value) {
  const map = {
    'less-than-1': 'Less than 1 year',
    '1-2': '1-2 years',
    '3-5': '3-5 years',
    '5-plus': '5+ years'
  };
  return map[value] || '';
}

function formatGenderServed(value) {
  const map = {
    'men': 'Men only',
    'women': 'Women only',
    'all': 'All genders',
    'other': 'Other'
  };
  return map[value] || '';
}

function formatRecoveryProgram(value) {
  const map = {
    'yes': 'Yes',
    'no': 'No',
    'encouraged but not required': 'Encouraged but not required'
  };
  return map[value] || '';
}

function formatMATAllowed(value) {
  const map = {
    'yes': 'Yes',
    'no': 'No',
    'case by case': 'Case by case'
  };
  return map[value] || '';
}

function formatStaffingLevel(value) {
  const map = {
    '24/7': '24/7',
    'part-time': 'Part-time',
    'on-call': 'On-call',
    'no': 'No'
  };
  return map[value] || '';
}

// ============================================================================
// SCHEMA VERIFICATION
// ============================================================================

/**
 * Verify all sheet schemas and return report
 */
function verifyAllSchemas() {
  const props = PropertiesService.getScriptProperties();
  const report = {
    ok: true,
    timestamp: new Date().toISOString(),
    sheets: {}
  };

  for (const [formType, schema] of Object.entries(SCHEMAS)) {
    const sheetId = props.getProperty(schema.sheetIdKey);

    if (!sheetId) {
      report.sheets[formType] = {
        configured: false,
        error: `${schema.sheetIdKey} not set in Script Properties`
      };
      report.ok = false;
      continue;
    }

    try {
      const spreadsheet = SpreadsheetApp.openById(sheetId);
      const sheet = spreadsheet.getSheets()[0];
      const currentHeaders = sheet.getRange(1, 1, 1, schema.headers.length).getValues()[0];

      const headerMatch = [];
      const mismatches = [];

      for (let i = 0; i < schema.headers.length; i++) {
        const expected = schema.headers[i];
        const actual = currentHeaders[i] || '';

        if (expected === actual) {
          headerMatch.push({ column: i + 1, expected, actual, match: true });
        } else {
          headerMatch.push({ column: i + 1, expected, actual, match: false });
          mismatches.push(`Column ${i + 1}: expected "${expected}", found "${actual}"`);
        }
      }

      report.sheets[formType] = {
        configured: true,
        sheetId: sheetId,
        sheetName: spreadsheet.getName(),
        expectedColumns: schema.headers.length,
        headersValid: mismatches.length === 0,
        mismatches: mismatches,
        headerDetails: headerMatch
      };

      if (mismatches.length > 0) {
        report.ok = false;
      }

    } catch (error) {
      report.sheets[formType] = {
        configured: true,
        sheetId: sheetId,
        error: error.message
      };
      report.ok = false;
    }
  }

  return jsonResponse(report);
}

/**
 * Initialize all sheets with correct headers
 * Run this function manually to set up headers
 */
function initializeAllSheets() {
  const props = PropertiesService.getScriptProperties();
  const results = {};

  for (const [formType, schema] of Object.entries(SCHEMAS)) {
    const sheetId = props.getProperty(schema.sheetIdKey);

    if (!sheetId) {
      results[formType] = { success: false, error: `${schema.sheetIdKey} not configured` };
      continue;
    }

    try {
      const spreadsheet = SpreadsheetApp.openById(sheetId);
      const sheet = spreadsheet.getSheets()[0];

      // Set headers
      ensureHeaders(sheet, schema.headers);

      // Auto-resize columns
      sheet.autoResizeColumns(1, schema.headers.length);

      results[formType] = {
        success: true,
        message: `Headers set for ${formType}`,
        columns: schema.headers.length
      };

    } catch (error) {
      results[formType] = { success: false, error: error.message };
    }
  }

  console.log('Initialization results:', JSON.stringify(results, null, 2));
  return results;
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Create JSON response
 */
function jsonResponse(data, statusCode = 200) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function - run manually to test
 */
function testContactSubmission() {
  const testData = {
    formType: 'contact',
    data: {
      name: 'Test User',
      email: 'test@example.com',
      phone: '512-555-1234',
      topic: 'scholarships',
      message: 'This is a test message',
      newsletterOptIn: true
    },
    secret: PropertiesService.getScriptProperties().getProperty('HFF_SECRET')
  };

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}
