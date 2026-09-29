/**
 * LoanAI — Google Apps Script Web App
 * Deploy this as a Web App in Google Apps Script to enable
 * serverless data storage to Google Sheets.
 *
 * HOW TO DEPLOY:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Paste this entire code
 * 4. Click Deploy → New Deployment → Web App
 * 5. Set "Who has access" to "Anyone"
 * 6. Copy the Web App URL
 * 7. Paste it in LoanAI's AI Tips page → Google Sheets Webhook URL field
 */

// ── CONFIG: Replace with your Google Sheet ID ────────────────
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';

// ── Sheet Tab Names ───────────────────────────────────────────
const TABS = {
  eligibility: 'Eligibility_Records',
  emi:         'EMI_Records',
  chat:        'AI_Conversations'
};

// ── POST Handler (receives data from LoanAI frontend) ─────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const type = data.type || 'eligibility';

    let result;
    switch (type) {
      case 'eligibility': result = saveEligibilityRecord(data); break;
      case 'emi':         result = saveEMIRecord(data);         break;
      case 'chat':        result = saveChatRecord(data);        break;
      default:            result = saveEligibilityRecord(data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: result }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── GET Handler (health check / CORS preflight) ───────────────
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'LoanAI Sheets API is running', timestamp: new Date().toISOString() }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Save Eligibility Record ───────────────────────────────────
function saveEligibilityRecord(data) {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  let sheet   = ss.getSheetByName(TABS.eligibility);

  // Create sheet with headers if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(TABS.eligibility);
    sheet.appendRow([
      'Timestamp', 'Name', 'Monthly Salary (₹)', 'Credit Score',
      'Existing EMI (₹)', 'Age', 'Loan Type', 'Employment Type',
      'Status', 'Eligible Amount (₹)', 'Risk Level', 'Credit Band'
    ]);
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, 12);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#1a1a2e');
    headerRange.setFontColor('#ffffff');
  }

  // Append record
  sheet.appendRow([
    new Date(data.timestamp || Date.now()),
    data.name         || 'Unknown',
    data.salary       || 0,
    data.score        || 0,
    data.emi          || 0,
    data.age          || 0,
    data.loanType     || 'N/A',
    data.employment   || 'N/A',
    data.status       || 'Unknown',
    data.eligibleAmount || 0,
    data.riskLevel    || 'N/A',
    data.creditBand   || 'N/A'
  ]);

  // Auto-resize columns
  sheet.autoResizeColumns(1, 12);

  return `Eligibility record saved for ${data.name}`;
}

// ── Save EMI Record ───────────────────────────────────────────
function saveEMIRecord(data) {
  const ss  = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(TABS.emi);

  if (!sheet) {
    sheet = ss.insertSheet(TABS.emi);
    sheet.appendRow([
      'Timestamp', 'Principal (₹)', 'Annual Rate (%)', 'Tenure (Months)',
      'Monthly EMI (₹)', 'Total Interest (₹)', 'Total Amount (₹)', 'Loan Type'
    ]);
    const h = sheet.getRange(1, 1, 1, 8);
    h.setFontWeight('bold'); h.setBackground('#1a1a2e'); h.setFontColor('#ffffff');
  }

  sheet.appendRow([
    new Date(data.timestamp || Date.now()),
    data.principal  || 0,
    data.rate       || 0,
    data.tenure     || 0,
    data.emi        || 0,
    data.totalInterest || 0,
    data.totalAmount   || 0,
    data.loanType   || 'N/A'
  ]);

  sheet.autoResizeColumns(1, 8);
  return 'EMI record saved';
}

// ── Save AI Chat Record ───────────────────────────────────────
function saveChatRecord(data) {
  const ss  = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(TABS.chat);

  if (!sheet) {
    sheet = ss.insertSheet(TABS.chat);
    sheet.appendRow(['Timestamp', 'User Message', 'AI Response', 'Session ID']);
    const h = sheet.getRange(1, 1, 1, 4);
    h.setFontWeight('bold'); h.setBackground('#1a1a2e'); h.setFontColor('#ffffff');
  }

  sheet.appendRow([
    new Date(data.timestamp || Date.now()),
    data.userMessage || '',
    data.aiResponse  || '',
    data.sessionId   || 'unknown'
  ]);

  return 'Chat record saved';
}
