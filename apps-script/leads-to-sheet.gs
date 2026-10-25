/**
 * Summit Lighting Systems Inc. - Website leads
 * Add as a second file (e.g. "Website.gs") in the Quote Calculator's existing
 * lead-tracking script. Reuses LEADS, NCOLS, lastDataRow_, sortByDue, digits_,
 * fmtPhone_ and dateOnly_ from that file.
 *
 * What it does:
 *  - doPost(): the website quote form (/quote/) posts here alongside its
 *    Web3Forms email. Each request lands in Leads as Source = Website,
 *    Stage = New, due today. A phone number already on Leads gets a note
 *    instead of a duplicate row.
 *  - Deploy > New deployment > Web app (Execute as: Me, Access: Anyone).
 *    The /exec URL goes in LEADS_SHEET_URL in the website's Assets/site.js.
 */

function doPost(e) {
  var p = (e && e.parameter) || {};
  if (p.botcheck) return webOk_();                       // honeypot ticked: bot
  if (!webClean_(p.name) || !digits_(p.phone)) return webOk_();

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var ss = SpreadsheetApp.getActive();
    var sh = ss.getSheetByName(LEADS);
    var today = dateOnly_(new Date());

    var note = ['Website form: ' + (webClean_(p.instant_estimate) || 'Sizer not used'),
                p.email && 'Email: ' + webClean_(p.email),
                p.referrer && 'Referred by: ' + webClean_(p.referrer),
                p.notes && 'Details: ' + webClean_(p.notes)]
      .filter(Boolean).join('. ');

    // Same phone already on Leads: add a note to that row, like the Meta sync does
    var last = lastDataRow_(sh);
    var phones = last > 1 ? sh.getRange(2, 3, last - 1, 1).getValues() : [];
    for (var i = 0; i < phones.length; i++) {
      if (digits_(phones[i][0]) === digits_(p.phone)) {
        var cell = sh.getRange(i + 2, 12);
        cell.setValue((cell.getValue() ? cell.getValue() + ' | ' : '') +
          'Came in again via website ' + Utilities.formatDate(today, ss.getSpreadsheetTimeZone(), 'MMM d') + '. ' + webSafe_(note));
        return webOk_();
      }
    }

    var where = [webClean_(p.address), webClean_(p.town)].filter(String).join(', ');
    sh.getRange(last + 1, 1, 1, NCOLS).setValues([[
      today, webSafe_(webClean_(p.name)), fmtPhone_(p.phone), webSafe_(where), 'Website', 'New',
      'Text back (aim for 5 min)', today, 'Eric', '', '', webSafe_(note)]]);
    sortByDue();
  } finally {
    lock.releaseLock();
  }
  return webOk_();
}

/* Opening the /exec URL in a browser just confirms the deployment is live. */
function doGet() {
  return ContentService.createTextOutput('Summit website lead endpoint is running.');
}

function webOk_() {
  return ContentService.createTextOutput('{"ok":true}').setMimeType(ContentService.MimeType.JSON);
}

function webClean_(v) {
  return String(v || '').replace(/\s+/g, ' ').trim().slice(0, 1000);
}

// Keep form input from being read as a formula
function webSafe_(v) {
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}
