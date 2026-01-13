/**
 * util.gs - Utility Functions
 *
 * Helper functions for:
 * - JSON response formatting
 * - Object flattening (nested -> dot notation)
 * - Array formatting
 */

/**
 * Create a JSON response with proper content type
 * @param {Object} data - Response data
 * @param {number} [statusCode] - HTTP status code (informational only, GAS always returns 200)
 * @returns {ContentService.TextOutput} JSON response
 */
function jsonResponse(data, statusCode) {
  // Log the status for debugging (GAS web apps always return 200)
  if (statusCode && statusCode !== 200) {
    Logger.log('Response status (logical): ' + statusCode);
  }

  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Create an error response
 * @param {string} message - Error message
 * @param {number} [statusCode=500] - Logical status code
 * @returns {ContentService.TextOutput} JSON error response
 */
function errorResponse(message, statusCode) {
  return jsonResponse({
    ok: false,
    error: message
  }, statusCode || 500);
}

/**
 * Create a success response
 * @param {Object} [extra] - Additional data to include
 * @returns {ContentService.TextOutput} JSON success response
 */
function successResponse(extra) {
  var response = { ok: true };
  if (extra) {
    for (var key in extra) {
      if (extra.hasOwnProperty(key)) {
        response[key] = extra[key];
      }
    }
  }
  return jsonResponse(response);
}

/**
 * Flatten a nested object into dot-notation keys
 *
 * Example:
 *   { about: { name: "John", email: "j@e.com" } }
 *   becomes:
 *   { "about.name": "John", "about.email": "j@e.com" }
 *
 * @param {Object} obj - Object to flatten
 * @param {string} [prefix=''] - Key prefix for recursion
 * @returns {Object} Flattened object
 */
function flattenObject(obj, prefix) {
  prefix = prefix || '';
  var result = {};

  if (obj === null || obj === undefined) {
    return result;
  }

  for (var key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    var fullKey = prefix ? prefix + '.' + key : key;
    var value = obj[key];

    if (Array.isArray(value)) {
      // Convert arrays to comma-separated strings
      result[fullKey] = formatArray(value);
    } else if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
      // Recursively flatten nested objects
      var nested = flattenObject(value, fullKey);
      for (var nestedKey in nested) {
        if (nested.hasOwnProperty(nestedKey)) {
          result[nestedKey] = nested[nestedKey];
        }
      }
    } else {
      // Primitive value
      result[fullKey] = formatValue(value);
    }
  }

  return result;
}

/**
 * Format an array for spreadsheet storage
 * @param {Array} arr - Array to format
 * @returns {string} Comma-separated string
 */
function formatArray(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) {
    return '';
  }
  return arr.map(function(item) {
    return String(item).trim();
  }).filter(function(item) {
    return item.length > 0;
  }).join(', ');
}

/**
 * Format a value for spreadsheet storage
 * @param {*} value - Value to format
 * @returns {string} Formatted string
 */
function formatValue(value) {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  return String(value);
}

/**
 * Get a nested value from an object using dot notation
 * @param {Object} obj - Source object
 * @param {string} path - Dot-notation path (e.g., "about.email")
 * @returns {*} Value at path or undefined
 */
function getNestedValue(obj, path) {
  if (!obj || !path) return undefined;

  var parts = path.split('.');
  var current = obj;

  for (var i = 0; i < parts.length; i++) {
    if (current === null || current === undefined) {
      return undefined;
    }
    current = current[parts[i]];
  }

  return current;
}

/**
 * Safe JSON parse
 * @param {string} str - JSON string
 * @returns {Object|null} Parsed object or null on error
 */
function safeJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    Logger.log('JSON parse error: ' + e.message);
    return null;
  }
}

/**
 * Get current timestamp in ISO format
 * @returns {string} ISO timestamp
 */
function getCurrentTimestamp() {
  return new Date().toISOString();
}
