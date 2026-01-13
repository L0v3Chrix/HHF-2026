/**
 * Code.gs - Main Entry Point for Apps Script Web App
 *
 * Heart Forward Foundation Form Submission Handler
 *
 * Handles two modes:
 * 1. Setup mode: { secret, action: "setup" } - Initialize all sheets with headers
 * 2. Append mode: { secret, type, submittedAt, data } - Append form submission
 *
 * Deployment URL:
 * https://script.google.com/a/macros/heartfwd.info/s/AKfycbxNoBvZ0OtrSg0V5DXgEGvmOIRHMYpQ6TON7k500JsVuQKMu934hBolLzB4xCzO1tk4/exec
 */

/**
 * Handle POST requests from Next.js API routes
 *
 * @param {Object} e - Event object with postData
 * @returns {ContentService.TextOutput} JSON response
 */
function doPost(e) {
  try {
    // Parse request body
    if (!e || !e.postData || !e.postData.contents) {
      return errorResponse('Missing request body', 400);
    }

    var payload = safeJsonParse(e.postData.contents);
    if (!payload) {
      return errorResponse('Invalid JSON', 400);
    }

    // Validate secret
    if (!validateSecret(payload.secret)) {
      Logger.log('Unauthorized request - invalid secret');
      return errorResponse('Unauthorized', 401);
    }

    // Route to appropriate handler
    if (payload.action === 'setup') {
      return handleSetup();
    }

    if (payload.type) {
      return handleSubmission(payload);
    }

    return errorResponse('Missing action or type', 400);

  } catch (error) {
    Logger.log('doPost error: ' + error.message);
    Logger.log('Stack: ' + error.stack);
    return errorResponse('Internal error: ' + error.message, 500);
  }
}

/**
 * Handle GET requests (for health check / info)
 *
 * @param {Object} e - Event object
 * @returns {ContentService.TextOutput} JSON response
 */
function doGet(e) {
  return jsonResponse({
    ok: true,
    service: 'Heart Forward Foundation Forms',
    version: '2.0.0',
    types: getValidTypes(),
    message: 'Use POST to submit forms or run setup'
  });
}

/**
 * Handle setup action - initialize all sheets
 *
 * @returns {ContentService.TextOutput} JSON response with setup results
 */
function handleSetup() {
  Logger.log('Running setup for all sheet types...');

  try {
    var results = setupAllSheets();

    Logger.log('Setup complete. Results: ' + JSON.stringify(results));

    return successResponse({
      message: 'Setup complete',
      results: results
    });

  } catch (error) {
    Logger.log('Setup error: ' + error.message);
    return errorResponse('Setup failed: ' + error.message, 500);
  }
}

/**
 * Handle form submission
 *
 * @param {Object} payload - { secret, type, submittedAt, data }
 * @returns {ContentService.TextOutput} JSON response
 */
function handleSubmission(payload) {
  var type = payload.type;
  var submittedAt = payload.submittedAt || getCurrentTimestamp();
  var data = payload.data;

  // Validate type
  var config = getTypeConfig(type);
  if (!config) {
    Logger.log('Invalid type: ' + type);
    return errorResponse('Invalid type: ' + type + '. Valid types: ' + getValidTypes().join(', '), 400);
  }

  // Validate data exists
  if (!data || typeof data !== 'object') {
    return errorResponse('Missing or invalid data', 400);
  }

  Logger.log('Processing ' + type + ' submission...');
  Logger.log('Data keys: ' + Object.keys(data).join(', '));

  try {
    // Append the row
    var result = appendSubmissionRow(type, submittedAt, data);

    Logger.log('Successfully appended row ' + result.rowNumber + ' to ' + result.sheetName);

    return successResponse({
      message: 'Submission recorded',
      rowNumber: result.rowNumber,
      sheetName: result.sheetName
    });

  } catch (error) {
    Logger.log('Submission error: ' + error.message);
    return errorResponse('Failed to record submission: ' + error.message, 500);
  }
}

/**
 * Manual test function - run from Apps Script editor
 * Tests the setup functionality
 */
function testSetup() {
  var results = setupAllSheets();
  Logger.log('Setup Results:');
  Logger.log(JSON.stringify(results, null, 2));
}

/**
 * Manual test function - run from Apps Script editor
 * Tests a sample contact submission
 */
function testContactSubmission() {
  var testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '512-555-1234',
    topic: 'scholarships',
    message: 'This is a test message from the Apps Script editor.',
    newsletterOptIn: true
  };

  try {
    var result = appendSubmissionRow('contact', getCurrentTimestamp(), testData);
    Logger.log('Test contact submission result:');
    Logger.log(JSON.stringify(result, null, 2));
  } catch (e) {
    Logger.log('Test failed: ' + e.message);
  }
}

/**
 * Manual test function - run from Apps Script editor
 * Tests a sample apply submission
 */
function testApplySubmission() {
  var testData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '512-555-9876',
    programType: 'scholarship',
    applicationReason: 'I am seeking support for my recovery journey.',
    recoveryStatus: 'In recovery for 6 months',
    sobrietyDate: '2024-07-01',
    currentHousing: 'Transitional',
    referralSource: 'Friend',
    additionalNotes: 'Thank you for considering my application.',
    consentToContact: true,
    consentToTerms: true
  };

  try {
    var result = appendSubmissionRow('apply', getCurrentTimestamp(), testData);
    Logger.log('Test apply submission result:');
    Logger.log(JSON.stringify(result, null, 2));
  } catch (e) {
    Logger.log('Test failed: ' + e.message);
  }
}

/**
 * Manual test function - run from Apps Script editor
 * Tests a sample homes-verification submission (nested structure)
 */
function testHomesVerificationSubmission() {
  var testData = {
    eligibility: {
      isRecoveryHome: 'yes',
      hasCapacity: 'yes',
      acceptsReferrals: 'yes',
      hasHouseRules: 'yes'
    },
    about: {
      homeName: 'Hope Recovery House',
      contactName: 'Jane Manager',
      email: 'jane@hoperecovery.com',
      phone: '512-555-4321',
      website: 'https://hoperecovery.com',
      operatingLength: '3-5',
      description: 'A supportive recovery environment.'
    },
    location: {
      streetAddress: '123 Recovery Lane',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      totalCapacity: '12',
      currentOpenings: '3',
      genderServed: 'all',
      monthlyCost: '$800'
    },
    policies: {
      recoveryProgramRequired: 'encouraged but not required',
      matAllowed: 'yes',
      houseRules: ['No drugs or alcohol', 'Curfew at 10pm', 'Weekly meetings required'],
      staffingLevel: 'part-time',
      relapseApproach: 'Case by case evaluation with support plan',
      certifications: ['NARR Level 2', 'State Licensed'],
      additionalNotes: 'We focus on long-term recovery success.'
    },
    consent: {
      confirmAccurate: true,
      allowContact: true,
      notifyChanges: true
    }
  };

  try {
    var result = appendSubmissionRow('homes-verification', getCurrentTimestamp(), testData);
    Logger.log('Test homes-verification submission result:');
    Logger.log(JSON.stringify(result, null, 2));
  } catch (e) {
    Logger.log('Test failed: ' + e.message);
  }
}

/**
 * Get header info for all types - useful for debugging
 */
function debugHeaderInfo() {
  var types = getValidTypes();
  types.forEach(function(type) {
    var info = getHeaderInfo(type);
    Logger.log('=== ' + type + ' ===');
    Logger.log(JSON.stringify(info, null, 2));
  });
}
