/**
 * Fields Driller — teacher reporting endpoint.
 *
 * Deploy as a Google Apps Script Web App. Accepts POSTed attempt JSON from
 * the Driller and appends a row to a target spreadsheet.
 *
 * Two destination tabs:
 *   attempts_quick   — anonymous rows (Quick sign-in: name + cohort only).
 *   attempts_google  — Google-authenticated rows (filled once OAuth is wired).
 *
 * Setup steps live in teacher-setup.md.
 */

// ── Configuration ──────────────────────────────────────────────────────────
// Paste the target Google Sheet's id here (the long string between /d/ and
// /edit in the spreadsheet URL).
const SHEET_ID = '';

// Tab names. Created automatically on first POST if they don't exist.
const SHEET_QUICK  = 'attempts_quick';
const SHEET_GOOGLE = 'attempts_google';

// Column order. Stable across versions so old rows stay readable. If you add
// a new field to the Driller payload, append it here rather than inserting,
// or existing rows will misalign.
const HEADERS = [
  'timestamp',          // ISO8601 string from the client
  'anonymous_id',       // client-generated UUID, persisted in localStorage
  'display_name',       // student's typed name
  'cohort',             // e.g. "2026-28"
  'google_email',       // filled only on Google sign-in (else empty)
  'session_id',         // sessionStorage UUID, new tab = new session
  'question_id',        // e.g. "D.1.1-A1.001"
  'level',              // "SL" or "HL"
  'subtag',             // primary coverage subtag, e.g. "D.1.1"
  'atoms',              // pipe-delimited atom codes attached to this question
  'type',               // "mcq" | "short" | "long" | "numeric" | "widget" | "multi_select" | "phased"
  'marks_awarded',
  'marks_possible',
  'status',             // "full" | "partial" | "none"
  'raw_response',       // student's raw typed answer (or JSON for widget/multi-select)
  'chosen_index',       // MCQ choice index, else blank
  'hints_used',         // number of hints opened
  'peeked',             // 1 if topic was revealed pre-answer, else 0
  'misconceptions_fired', // pipe-delimited list of misconception ids
  'phases_json'         // JSON-stringified per-phase breakdown for phased questions
];

// ── HTTP handlers ──────────────────────────────────────────────────────────

function doPost(e) {
  try {
    if (!SHEET_ID) {
      return jsonOut({ ok: false, error: 'SHEET_ID not set in teacher-setup.gs' });
    }

    const body = JSON.parse(e.postData.contents || '{}');

    // Route Google-authenticated rows to a separate tab. For now (no token
    // verification) we trust the client; once OAuth is wired we'll verify
    // the ID token here and reject mismatched emails.
    const sheetName = body.google_email ? SHEET_GOOGLE : SHEET_QUICK;
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sh = ss.getSheetByName(sheetName);
    if (!sh) sh = ss.insertSheet(sheetName);

    // First-time header row.
    if (sh.getLastRow() === 0) sh.appendRow(HEADERS);

    // Map payload to column order. Missing fields write as empty strings so
    // the column count is constant.
    const row = HEADERS.map(function (h) {
      if (h === 'phases_json') {
        return Array.isArray(body.phases) ? JSON.stringify(body.phases) : '';
      }
      if (h === 'atoms') {
        return Array.isArray(body.atoms) ? body.atoms.join('|') : '';
      }
      if (h === 'misconceptions_fired') {
        return Array.isArray(body.misconceptions_fired) ? body.misconceptions_fired.join('|') : '';
      }
      return body[h] != null ? body[h] : '';
    });
    sh.appendRow(row);

    return jsonOut({ ok: true });
  } catch (err) {
    // Errors land in the Apps Script Executions dashboard with stack traces.
    return jsonOut({ ok: false, error: String(err && err.message || err) });
  }
}

// Healthcheck. Visit the /exec URL in a browser to confirm deployment.
function doGet(e) {
  return ContentService
    .createTextOutput('Fields Driller report endpoint, ok. Sheet configured: ' + (SHEET_ID ? 'yes' : 'NO'))
    .setMimeType(ContentService.MimeType.TEXT);
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
