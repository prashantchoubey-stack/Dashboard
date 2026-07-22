const SPREADSHEET_ID = "1xTPK_H52iUdGfDTsTB_fcfGfa3GZGGmcoRKrszHSRug";
const PUBLIC_SHEET_NAME = "GitHub_Live_Data";
const PUBLIC_FIELDS = ["Dataset", "Dimension", "Label", "Value", "Status", "Updated_On", "Note"];
const PUBLIC_OUTPUT_FIELDS = ["Dataset", "Dimension", "Label", "Value", "Status", "Updated_On"];
const ALLOWED_DATASETS = new Set(["Portfolio", "PAL", "LEP", "WP/WA", "Unity", "POD B"]);
const ALLOWED_DIMENSIONS = new Set(["KPI", "Content Type", "Grade", "Subject", "Medium", "Provider/Project", "Validation"]);

function doGet() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(PUBLIC_SHEET_NAME);
    if (!sheet) throw new Error("Public data source is unavailable");

    const values = sheet.getDataRange().getValues();
    const headers = values.shift().slice(0, PUBLIC_FIELDS.length).map(String);
    if (headers.join("|") !== PUBLIC_FIELDS.join("|")) throw new Error("Public data schema does not match");

    const data = values
      .filter((row) => String(row[0] || "").trim())
      .map((row) => Object.fromEntries(PUBLIC_FIELDS.map((field, index) => [field, row[index]])))
      .filter((row) => String(row.Status || "").toUpperCase() === "APPROVED")
      .filter((row) => ALLOWED_DATASETS.has(String(row.Dataset)) && ALLOWED_DIMENSIONS.has(String(row.Dimension)))
      .map((row) => ({
        Dataset: String(row.Dataset),
        Dimension: String(row.Dimension),
        Label: String(row.Label),
        Value: Number(row.Value),
        Status: "APPROVED",
        Updated_On: formatDate_(row.Updated_On),
      }))
      .filter((row) => Number.isFinite(row.Value) && row.Value >= 0);

    validateRequiredKpis_(data);
    return json_({ success: true, lastSynced: new Date().toISOString(), data });
  } catch (error) {
    console.error(error);
    return json_({ success: false, error: "Approved dashboard data is temporarily unavailable" });
  }
}

function validateRequiredKpis_(data) {
  const required = ["Portfolio", "PAL", "LEP", "WP/WA", "Unity", "POD B"];
  const totals = {};
  required.forEach((dataset) => {
    const row = data.find((item) => item.Dataset === dataset && item.Dimension === "KPI" && item.Label === "Total");
    if (!row) throw new Error(`Required approved KPI is missing: ${dataset}`);
    totals[dataset] = row.Value;
  });
  const calculatedPortfolio = totals.PAL + totals.LEP + totals["WP/WA"] + totals.Unity + totals["POD B"];
  if (totals.Portfolio !== calculatedPortfolio) throw new Error("Approved portfolio total does not reconcile");
}

function formatDate_(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return Utilities.formatDate(value, "Etc/UTC", "yyyy-MM-dd");
  }
  return String(value || "").slice(0, 10);
}

function json_(payload) {
  if (Array.isArray(payload.data)) {
    payload.data = payload.data.map((row) => Object.fromEntries(PUBLIC_OUTPUT_FIELDS.map((field) => [field, row[field]])));
  }
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
