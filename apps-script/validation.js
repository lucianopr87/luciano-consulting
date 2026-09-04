/**
 * Request parsing and validation for doPost. The client sends the JSON body
 * as Content-Type: text/plain (see Booking.astro) so the browser never
 * issues a CORS preflight against the Web App, which doesn't handle OPTIONS.
 */

function parseRequestBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('missing_body');
  }
  try {
    return JSON.parse(e.postData.contents);
  } catch (err) {
    throw new Error('invalid_json');
  }
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ''));
}

/**
 * Returns a list of validation error codes (empty if the payload is valid).
 * Never trust client-supplied slot data beyond this — the caller must still
 * re-derive valid candidate slots server-side and match against them.
 */
function validateBookingPayload_(body) {
  var errors = [];

  if (body.botcheck) errors.push('bot_detected');
  if (!body.name || String(body.name).trim().length === 0) errors.push('missing_name');
  if (!isValidEmail_(body.email)) errors.push('invalid_email');
  if (!body.slotStart || isNaN(new Date(body.slotStart).getTime())) errors.push('invalid_slot');

  return errors;
}

/**
 * Best-effort rate limiting, keyed by email since Apps Script doesn't expose
 * the caller's IP in doPost. Not robust against a determined abuser using
 * throwaway addresses — acceptable for this site's traffic level.
 */
function isRateLimited_(email) {
  var cache = CacheService.getScriptCache();
  var key = 'booking_' + String(email).toLowerCase();
  if (cache.get(key)) return true;
  cache.put(key, '1', 600); // 10 minutes
  return false;
}
