# Teacher setup: Fields Driller reporting

One-time setup, about five minutes. After this every answer a signed-in student gives gets logged as a row in your spreadsheet.

## Step 1: Create the target spreadsheet

1. Go to https://sheets.google.com and create a new spreadsheet. Name it whatever you like (e.g., "Fields Driller results 2026-27").
2. Copy the spreadsheet's id from the URL. It's the long string between `/d/` and `/edit`. Keep this tab open or save the id somewhere you can paste from in a minute.

You don't need to add headers; the script writes them on the first POST.

## Step 2: Create the Apps Script project

1. Go to https://script.google.com and click **New project**.
2. The default file is called `Code.gs`. Replace its entire contents with the contents of `teacher-setup.gs` from the Driller folder.
3. Find the line near the top that says:
   ```js
   const SHEET_ID = '';
   ```
   Paste your spreadsheet id between the quotes:
   ```js
   const SHEET_ID = '1A2b3CdEfGh...your-id-here';
   ```
4. Click the floppy-disk **Save** icon at the top.
5. Name the project something memorable, e.g., "Fields Driller reporting".

## Step 3: Deploy as a Web App

1. Click **Deploy** (top right) → **New deployment**.
2. Click the gear icon next to "Select type", choose **Web app**.
3. Fill in:
   - **Description**: "Fields Driller v1"
   - **Execute as**: Me (your own account)
   - **Who has access**: Anyone

   The "Anyone" setting is what lets the Driller POST to it without students having Google accounts. The script still runs *as you*, so it can write to your sheet; students never see your account or get write access themselves.

4. Click **Deploy**.
5. The first time you do this you'll see Google's "back to safety" security warning. This is the friction we mentioned. Click **Advanced**, then **Go to ... (unsafe)**. It says "unsafe" because Google doesn't know this script yet; it's just yours. Click through, authorise the requested permissions (it needs to read and write your sheets).
6. Copy the **Web app URL** that appears. It looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

## Step 4: Plug the URL into the Driller

Open `engine.js` and find:
```js
const REPORT_URL = '';
```
Paste your Web app URL between the quotes:
```js
const REPORT_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
```
Save the file. That's it.

## Step 5: Test it

1. Open `index.html` in a browser.
2. The sign-in modal should appear. Enter a test name and cohort (e.g., "Test Student", "2026-28").
3. Answer one question.
4. Open your spreadsheet. Within a few seconds a new row should appear in the `attempts_quick` tab.

If nothing appears, check:
- The Apps Script **Executions** dashboard (in the script editor: "Executions" tab on the left). Errors land there with stack traces.
- The browser console for fetch errors.
- That `REPORT_URL` in engine.js doesn't have stray quotes or whitespace.

## Re-deploying after edits

If you ever change `teacher-setup.gs`, you need to re-deploy:
1. **Deploy** → **Manage deployments**
2. Click the pencil icon next to your existing deployment
3. **Version**: New version
4. Click **Deploy**

The URL stays the same; the new version of the code is now live.

## What's in the spreadsheet

Two tabs are created automatically as rows come in:

- **attempts_quick**: rows from students who signed in with name + cohort only (no Google account).
- **attempts_google**: rows from students who signed in with their school Google account. Empty until Google sign-in is wired into the Driller.

Each row has 20 columns. The interesting ones:
- `display_name`, `cohort`, `google_email` — who the student is.
- `question_id`, `subtag`, `atoms`, `type`, `level` — what they answered.
- `marks_awarded`, `marks_possible`, `status` — how they did.
- `misconceptions_fired` — which named errors the engine detected (pipe-delimited).
- `phases_json` — for phased questions, the per-phase breakdown as JSON.
- `anonymous_id`, `session_id` — for grouping rows across attempts within a session.

You can pivot, sort, filter, or feed into Looker Studio from there.

## Privacy notes

Worth being clear about, even briefly. With this script deployed:
- Every signed-in student's answers go to your spreadsheet, owned by your Google account.
- Students can sign in with any name they like (the Quick path is name + cohort, not verified).
- The script doesn't store anything outside your sheet. No third-party server.
- The `anonymous_id` is a UUID generated in the student's browser; it persists across sessions in localStorage and lets you group their attempts even if they vary the typed name slightly.

If this gets used by other teachers' classes, the data-handling story is whatever each teacher's deployment does. Each teacher runs their own Apps Script against their own sheet; there's no central server.
