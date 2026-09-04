/**
 * Business rules for the meeting booking widget: single source of truth for
 * which days/hours are offered. The frontend never hardcodes this — it only
 * renders whatever the /availability response returns.
 *
 * Argentina does not currently observe DST, so a fixed -03:00 offset is used
 * throughout instead of relying on the executing environment's timezone.
 */

var TIMEZONE = 'America/Argentina/Buenos_Aires';
var TZ_OFFSET = '-03:00';
var SLOT_MINUTES = 30;
var BOOKING_HORIZON_DAYS = 14;

// ISO weekday numbers (1 = Monday ... 7 = Sunday). Monday and weekends are
// intentionally absent — no slots are offered on those days.
var WEEKLY_TEMPLATE = {
  2: [{ start: '10:00', end: '17:00' }], // Tuesday
  3: [{ start: '10:00', end: '17:00' }], // Wednesday
  4: [{ start: '10:00', end: '17:00' }], // Thursday
  5: [{ start: '11:00', end: '15:00' }], // Friday
};

/**
 * Calendar-day dates (yyyy-MM-dd, in TIMEZONE) from tomorrow through
 * +BOOKING_HORIZON_DAYS, inclusive. "Tomorrow" is a calendar-day cutoff based
 * on `now`'s date in Argentina — not a rolling 24h window.
 */
function getCandidateDates_(now) {
  var todayStr = Utilities.formatDate(now, TIMEZONE, 'yyyy-MM-dd');
  var todayMidnight = new Date(todayStr + 'T00:00:00' + TZ_OFFSET);

  var dates = [];
  for (var i = 1; i <= BOOKING_HORIZON_DAYS; i++) {
    var d = new Date(todayMidnight.getTime() + i * 24 * 60 * 60 * 1000);
    dates.push(Utilities.formatDate(d, TIMEZONE, 'yyyy-MM-dd'));
  }
  return dates;
}

function buildDaySlots_(dateStr, window) {
  var slots = [];
  var cursor = new Date(dateStr + 'T' + window.start + ':00' + TZ_OFFSET);
  var windowEnd = new Date(dateStr + 'T' + window.end + ':00' + TZ_OFFSET);

  while (cursor.getTime() + SLOT_MINUTES * 60000 <= windowEnd.getTime()) {
    var start = new Date(cursor.getTime());
    var end = new Date(start.getTime() + SLOT_MINUTES * 60000);
    slots.push({ start: start, end: end });
    cursor = end;
  }
  return slots;
}

/**
 * Generates every candidate 30-minute slot within the booking horizon,
 * independent of the owner's calendar (busy-time filtering happens
 * separately in calendar.js, using this list as the base to filter down).
 */
function generateCandidateSlots_(now) {
  var dates = getCandidateDates_(now);
  var slots = [];

  dates.forEach(function (dateStr) {
    var dayMidnight = new Date(dateStr + 'T00:00:00' + TZ_OFFSET);
    var weekday = Number(Utilities.formatDate(dayMidnight, TIMEZONE, 'u'));
    var windows = WEEKLY_TEMPLATE[weekday];
    if (!windows) return;

    windows.forEach(function (window) {
      slots = slots.concat(buildDaySlots_(dateStr, window));
    });
  });

  return slots;
}
