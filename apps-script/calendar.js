/**
 * Wraps the Calendar Advanced Service (enabled in appsscript.json). Because
 * this script runs "as me" (the deploying account), there is no OAuth
 * client/secret/refresh token to manage — Apps Script handles auth for its
 * own owner automatically.
 */

/**
 * Returns merged busy intervals for the owner's primary calendar within
 * [rangeStart, rangeEnd), using a single freebusy.query call.
 */
function getBusyIntervals_(rangeStart, rangeEnd) {
  var response = Calendar.Freebusy.query({
    timeMin: rangeStart.toISOString(),
    timeMax: rangeEnd.toISOString(),
    items: [{ id: 'primary' }],
  });

  var busy = (response.calendars && response.calendars.primary && response.calendars.primary.busy) || [];
  return busy.map(function (interval) {
    return { start: new Date(interval.start), end: new Date(interval.end) };
  });
}

function isSlotFree_(slot, busyIntervals) {
  return !busyIntervals.some(function (busy) {
    return slot.start < busy.end && slot.end > busy.start;
  });
}

/**
 * Creates the calendar event with an auto-generated Meet link and sends the
 * native Calendar invite (with the Meet link + .ics) to the visitor via
 * sendUpdates: 'all' — no separate email service for v1.
 */
function createBookingEvent_(slot, visitor, envTag) {
  var titlePrefix = envTag === 'staging' ? '[STAGING TEST] ' : '';

  var event = {
    summary: titlePrefix + 'Reunión con ' + visitor.name,
    description: visitor.message || '',
    start: { dateTime: slot.start.toISOString(), timeZone: TIMEZONE },
    end: { dateTime: slot.end.toISOString(), timeZone: TIMEZONE },
    attendees: [{ email: visitor.email }],
    conferenceData: {
      createRequest: {
        requestId: Utilities.getUuid(),
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  // conferenceDataVersion must be passed as an option here, NOT just set in
  // the event body — otherwise conferenceData is silently ignored and no
  // Meet link gets created.
  return Calendar.Events.insert(event, 'primary', {
    conferenceDataVersion: 1,
    sendUpdates: 'all',
  });
}

function extractMeetLink_(event) {
  if (!event.conferenceData || !event.conferenceData.entryPoints) return null;
  var video = event.conferenceData.entryPoints.filter(function (entryPoint) {
    return entryPoint.entryPointType === 'video';
  })[0];
  return video ? video.uri : null;
}
