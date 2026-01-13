/**
 * sheets.gs - Sheet Management Functions
 *
 * Functions for:
 * - Ensuring sheets and headers exist
 * - Appending rows with proper column mapping
 * - Header repair/migration
 */

/**
 * Ensure a sheet tab exists with the correct headers
 *
 * @param {string} type - Form type (e.g., 'contact', 'apply')
 * @returns {Object} Report of changes made
 */
function ensureSheetAndHeaders(type) {
  var config = getTypeConfig(type);
  if (!config) {
    throw new Error('Unknown type: ' + type);
  }

  var report = {
    type: type,
    spreadsheetId: config.spreadsheetId,
    tabName: config.tabName,
    createdTab: false,
    wroteHeaders: false,
    appendedMissingHeaders: [],
    finalHeaderCount: 0
  };

  try {
    // Open spreadsheet
    var spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);

    // Get or create the tab
    var sheet = spreadsheet.getSheetByName(config.tabName);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(config.tabName);
      report.createdTab = true;
      Logger.log('Created tab: ' + config.tabName + ' in spreadsheet ' + config.spreadsheetId);
    }

    // Check existing headers
    var lastCol = sheet.getLastColumn();
    var existingHeaders = [];

    if (lastCol > 0) {
      existingHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
      // Filter out empty values
      existingHeaders = existingHeaders.filter(function(h) { return h && h.toString().trim(); });
    }

    // If no headers exist, write all headers
    if (existingHeaders.length === 0) {
      sheet.getRange(1, 1, 1, config.headers.length).setValues([config.headers]);
      report.wroteHeaders = true;
      report.finalHeaderCount = config.headers.length;
      Logger.log('Wrote ' + config.headers.length + ' headers to ' + config.tabName);

      // Format header row
      formatHeaderRow(sheet, config.headers.length);

      return report;
    }

    // Check for missing headers (append to right, don't reorder)
    var existingSet = {};
    existingHeaders.forEach(function(h) {
      existingSet[h.toString().trim()] = true;
    });

    var missingHeaders = config.headers.filter(function(h) {
      return !existingSet[h];
    });

    if (missingHeaders.length > 0) {
      // Append missing headers to the right
      var startCol = lastCol + 1;
      sheet.getRange(1, startCol, 1, missingHeaders.length).setValues([missingHeaders]);
      report.appendedMissingHeaders = missingHeaders;
      Logger.log('Appended ' + missingHeaders.length + ' missing headers: ' + missingHeaders.join(', '));
    }

    report.finalHeaderCount = existingHeaders.length + missingHeaders.length;

    return report;

  } catch (e) {
    Logger.log('Error in ensureSheetAndHeaders for ' + type + ': ' + e.message);
    throw e;
  }
}

/**
 * Format the header row (bold, frozen)
 * @param {Sheet} sheet - Sheet to format
 * @param {number} numCols - Number of columns
 */
function formatHeaderRow(sheet, numCols) {
  try {
    var headerRange = sheet.getRange(1, 1, 1, numCols);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#f3f3f3');
    sheet.setFrozenRows(1);
  } catch (e) {
    Logger.log('Error formatting header row: ' + e.message);
  }
}

/**
 * Append a submission row to the appropriate sheet
 *
 * @param {string} type - Form type
 * @param {string} submittedAt - ISO timestamp from envelope
 * @param {Object} data - Form data (may be nested)
 * @returns {Object} Result with row number
 */
function appendSubmissionRow(type, submittedAt, data) {
  var config = getTypeConfig(type);
  if (!config) {
    throw new Error('Unknown type: ' + type);
  }

  // Ensure headers exist
  ensureSheetAndHeaders(type);

  // Open sheet
  var spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);
  var sheet = spreadsheet.getSheetByName(config.tabName);

  if (!sheet) {
    throw new Error('Sheet not found: ' + config.tabName);
  }

  // Get current headers from sheet (to match exact order)
  var lastCol = sheet.getLastColumn();
  var currentHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

  // Flatten nested data
  var flatData = flattenObject(data);

  // Build row based on current header order
  var row = currentHeaders.map(function(header) {
    header = header.toString().trim();

    // Handle universal columns
    if (header === 'submittedAt') {
      return submittedAt || getCurrentTimestamp();
    }
    if (header === 'sourceType') {
      return type;
    }
    if (header === 'status') {
      return 'Submitted';
    }
    if (header === 'adminNotes') {
      return '';
    }
    if (header === 'rawJson') {
      return JSON.stringify({ submittedAt: submittedAt, type: type, data: data });
    }

    // Look up value in flattened data
    var value = flatData[header];

    // If not found in flat data, try getting nested value directly
    if (value === undefined && header.indexOf('.') > -1) {
      value = getNestedValue(data, header);
    }

    // Format the value
    if (Array.isArray(value)) {
      return formatArray(value);
    }

    return formatValue(value);
  });

  // Append the row
  sheet.appendRow(row);

  var rowNum = sheet.getLastRow();
  Logger.log('Appended row ' + rowNum + ' to ' + config.tabName + ' for type ' + type);

  return {
    rowNumber: rowNum,
    sheetName: config.tabName
  };
}

/**
 * Run setup for all types
 * @returns {Object} Report of all setup operations
 */
function setupAllSheets() {
  var types = getValidTypes();
  var results = {};

  types.forEach(function(type) {
    try {
      results[type] = ensureSheetAndHeaders(type);
    } catch (e) {
      results[type] = {
        type: type,
        error: e.message
      };
    }
  });

  return results;
}

/**
 * Get header info for a specific type
 * @param {string} type - Form type
 * @returns {Object} Header information
 */
function getHeaderInfo(type) {
  var config = getTypeConfig(type);
  if (!config) {
    return { error: 'Unknown type: ' + type };
  }

  try {
    var spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);
    var sheet = spreadsheet.getSheetByName(config.tabName);

    if (!sheet) {
      return {
        type: type,
        tabExists: false,
        expectedHeaders: config.headers
      };
    }

    var lastCol = sheet.getLastColumn();
    var currentHeaders = lastCol > 0
      ? sheet.getRange(1, 1, 1, lastCol).getValues()[0]
      : [];

    return {
      type: type,
      tabExists: true,
      tabName: config.tabName,
      expectedHeaders: config.headers,
      currentHeaders: currentHeaders,
      rowCount: sheet.getLastRow() - 1 // Exclude header
    };

  } catch (e) {
    return {
      type: type,
      error: e.message
    };
  }
}
