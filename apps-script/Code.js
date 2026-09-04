/**
 * Web App entry points for the meeting booking widget.
 *
 * IMPORTANT: Apps Script Web Apps always respond with HTTP 200 at the
 * transport level — there is no way to set a custom status code from
 * doGet/doPost. "Error" states are conveyed inside the JSON body itself
 * (`{ success: false, error: '<code>' }`); the frontend branches on that,
 * never on response.status.
 */

function doGet() {
  try {
    var now = new Date();
    var candidates = generateCandidateSlots_(now);

    if (candidates.length === 0) {
      return jsonResponse_({ slots: [] });
    }

    var rangeStart = candidates[0].start;
    var rangeEnd = candidates[candidates.length - 1].end;
    var busy = getBusyIntervals_(rangeStart, rangeEnd);
    var free = candidates.filter(function (slot) {
      return isSlotFree_(slot, busy);
    });

    var slots = free.map(function (slot) {
      return { start: slot.start.toISOString(), end: slot.end.toISOString() };
    });

    return jsonResponse_({ slots: slots });
  } catch (err) {
    return jsonResponse_({ error: 'server_error', message: String(err) });
  }
}

function doPost(e) {
  try {
    var body = parseRequestBody_(e);
    var errors = validateBookingPayload_(body);
    if (errors.length > 0) {
      return jsonResponse_({ success: false, error: 'invalid_request', details: errors });
    }

    if (isRateLimited_(body.email)) {
      return jsonResponse_({ success: false, error: 'rate_limited' });
    }

    // Never trust the client-supplied slot on its own: re-derive the current
    // valid candidates server-side and require an exact match.
    var requestedStart = new Date(body.slotStart);
    var candidates = generateCandidateSlots_(new Date());
    var matched = candidates.filter(function (candidate) {
      return candidate.start.getTime() === requestedStart.getTime();
    })[0];

    if (!matched) {
      return jsonResponse_({ success: false, error: 'invalid_slot' });
    }

    // Re-check busy time right before inserting to narrow the race window
    // between "visitor loaded availability" and "visitor submitted".
    var busy = getBusyIntervals_(matched.start, matched.end);
    if (!isSlotFree_(matched, busy)) {
      return jsonResponse_({ success: false, error: 'slot_taken' });
    }

    var event = createBookingEvent_(
      matched,
      { name: body.name, email: body.email, message: body.message },
      body.env
    );

    return jsonResponse_({
      success: true,
      start: matched.start.toISOString(),
      meetLink: extractMeetLink_(event),
    });
  } catch (err) {
    return jsonResponse_({ success: false, error: 'server_error', message: String(err) });
  }
}

function jsonResponse_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
