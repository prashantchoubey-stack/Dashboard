const palette = ["#5b5ce2", "#13a8a8", "#f59e0b", "#e95d78", "#7c3aed", "#3b82f6", "#10b981", "#f97316", "#64748b", "#a855f7", "#0ea5e9"];
const number = new Intl.NumberFormat("en-IN");
const LIVE_CACHE_KEY = "cocc-approved-live-data-v1";
const LIVE_REQUEST_TIMEOUT_MS = 12000;
const PUBLIC_ROW_FIELDS = Object.freeze(["Dataset", "Dimension", "Label", "Value", "Status", "Updated_On"]);

const approvedSnapshot = {
  portfolioTotal: 63787,
  updatedOn: "22 Jul 2026",
  products: [
    {
      id: "pal",
      dataset: "PAL",
      name: "PAL / LVD",
      short: "PAL",
      count: 44818,
      status: "Approved child-facing",
      owner: "Content Operations",
      basis: "Videos, PDF books, HTML modules, HTML books and games are counted as child-facing content. Each HTML or game package counts once.",
      insight: "44,818 approved child-facing items. Supporting assets, duplicates and records awaiting review remain outside the approved total.",
      dimensions: {
        "Content type": [
          { label: "Video", value: 41223 },
          { label: "PDF Book", value: 1706 },
          { label: "HTML Module", value: 655 },
          { label: "HTML Book", value: 1025 },
          { label: "Game", value: 209 },
          { label: "Approved Standalone Audio", value: 0 },
        ],
        Grade: [
          { label: "Unknown", value: 6267 }, { label: "Grade 10", value: 4655 },
          { label: "Grade 9", value: 4641 }, { label: "Grade 6", value: 4560 },
          { label: "Grade 7", value: 4407 }, { label: "Grade 8", value: 4306 },
          { label: "Grade 11", value: 2663 }, { label: "Early Years", value: 2592 },
          { label: "Grade 5", value: 2122 }, { label: "Grade 3", value: 2058 },
          { label: "Grade 12", value: 1935 }, { label: "Grade 4", value: 1887 },
          { label: "Grade 2", value: 1445 }, { label: "Grade 1", value: 1225 },
          { label: "Middle Years", value: 55 },
        ],
        Subject: [
          { label: "Mathematics", value: 22028 }, { label: "Unknown", value: 7657 },
          { label: "EVS", value: 6480 }, { label: "Science", value: 2720 },
          { label: "English", value: 2202 }, { label: "Social Science", value: 1080 },
          { label: "Computer/Coding", value: 744 }, { label: "Hindi", value: 559 },
          { label: "Telugu", value: 535 }, { label: "Marathi", value: 524 },
          { label: "General Knowledge", value: 175 }, { label: "Tamil", value: 114 },
        ],
        Medium: [
          { label: "English", value: 19424 }, { label: "Unknown", value: 11998 },
          { label: "Hindi", value: 9447 }, { label: "Telugu", value: 1612 },
          { label: "Odia", value: 1174 }, { label: "Marathi", value: 885 },
          { label: "Gujarati", value: 188 }, { label: "Konkani", value: 90 },
        ],
        "Provider / Project": [
          { label: "Learning Mantra New", value: 9349 }, { label: "TicTac Learn", value: 7399 },
          { label: "Avanti", value: 7010 }, { label: "Nanhikali", value: 6399 },
          { label: "Mission Buniyaad", value: 4977 }, { label: "CG", value: 1309 },
          { label: "Z_Marathi Video Content", value: 1223 }, { label: "EYF", value: 862 },
          { label: "Don't Memorize", value: 581 }, { label: "GR", value: 492 },
          { label: "Chippersage", value: 454 }, { label: "Sky Learning", value: 454 },
          { label: "NISA", value: 434 }, { label: "17000ft", value: 407 },
          { label: "Other", value: 3468 },
        ],
      },
    },
    {
      id: "lep", dataset: "LEP", name: "LEP", short: "LEP", count: 1228,
      status: "Approved delivered resources", owner: "Content Operations",
      basis: "Delivered Teacher Handbook and Student Workbook resources are counted across English, Hindi, Maths and Science.",
      insight: "1,228 delivered LEP resources are included in the executive portfolio.",
      dimensions: {
        Subject: [{ label: "English", value: 448 }, { label: "Maths", value: 320 }, { label: "Hindi", value: 280 }, { label: "Science", value: 180 }],
        "Resource type": [{ label: "Student Workbook resources", value: 681 }, { label: "Teacher Handbook resources", value: 547 }],
        Grade: [{ label: "Grade 6", value: 196 }, { label: "Grade 7", value: 207 }, { label: "Grade 8", value: 200 }, { label: "Grade 9", value: 205 }, { label: "Grade 10", value: 212 }, { label: "Grade 11", value: 104 }, { label: "Grade 12", value: 104 }],
      },
    },
    {
      id: "weekly", dataset: "WP/WA", name: "WP / WA Assessment", short: "WP/WA", count: 17657,
      status: "Approved question count", owner: "Assessment Operations",
      basis: "WP and WA use one combined assessment-bank count. Each consolidated row represents one question.",
      insight: "17,657 approved questions: 74% Maths, 63% English-language and 76% tagged to HP.",
      dimensions: {
        Subject: [{ label: "Maths", value: 13130 }, { label: "Science", value: 2196 }, { label: "English", value: 840 }, { label: "Hindi", value: 816 }, { label: "EVS", value: 672 }, { label: "Unknown", value: 3 }],
        Language: [{ label: "English", value: 11118 }, { label: "Hindi", value: 6539 }],
        State: [{ label: "HP", value: 13409 }, { label: "Unknown", value: 4248 }],
        Grade: [{ label: "Grade 1", value: 1411 }, { label: "Grade 2", value: 1365 }, { label: "Grade 3", value: 1591 }, { label: "Grade 4", value: 1548 }, { label: "Grade 5", value: 1553 }, { label: "Grade 6", value: 2352 }, { label: "Grade 7", value: 2424 }, { label: "Grade 8", value: 2339 }, { label: "Grade 9", value: 1419 }, { label: "Grade 10", value: 1651 }, { label: "Unknown", value: 4 }],
      },
    },
    {
      id: "unity", dataset: "Unity", name: "Unity Simulations", short: "Unity", count: 84,
      status: "Approved GitHub-available", owner: "Content Operations",
      basis: "Unique simulation codes marked Available on Github = Yes are counted once; language-specific duplicate rows do not increase the total.",
      insight: "84 unique GitHub-available simulations are included in the executive portfolio.",
      dimensions: {
        Grade: [{ label: "Grade 6", value: 16 }, { label: "Grade 7", value: 15 }, { label: "Grade 8", value: 17 }, { label: "Grade 9", value: 14 }, { label: "Grade 10", value: 22 }],
        Language: [{ label: "Gujarati", value: 76 }, { label: "English", value: 76 }, { label: "Hindi", value: 5 }, { label: "Marathi", value: 5 }, { label: "Odia", value: 2 }, { label: "Telugu", value: 2 }, { label: "Unspecified", value: 8 }],
      },
    },
    {
      id: "podb", dataset: "POD B", name: "POD B", short: "POD B", count: 0,
      status: "Final count pending", owner: "Content Operations",
      basis: "Only a fully integrated final product qualifies for the executive count.",
      insight: "No final integrated POD B product is approved in the current reporting baseline.",
      dimensions: { KPI: [{ label: "Final integrated", value: 0 }] },
    },
  ],
};

const state = {
  data: structuredClone(approvedSnapshot),
  source: "checking",
  activeView: "portfolio",
  selectedProduct: "pal",
  selectedDimension: "Content type",
  error: "",
  lastSuccessfulSync: "",
  hasCachedData: false,
  publicDataSafety: "pending",
  publicDataMessage: "",
};

function readLastValidData() {
  try {
    const cached = JSON.parse(window.localStorage.getItem(LIVE_CACHE_KEY) || "null");
    if (!cached || typeof cached !== "object" || !cached.data) return null;
    if (!Number.isFinite(Number(cached.data.portfolioTotal)) || !Array.isArray(cached.data.products)) return null;
    state.hasCachedData = true;
    if (cached.savedAt) state.lastSuccessfulSync = formatDateTime(cached.savedAt);
    if (cached.schemaValidated === true) {
      state.publicDataSafety = "passed";
      state.publicDataMessage = "The cached live response previously passed the six-field public schema check.";
    }
    return cached.data;
  } catch {
    return null;
  }
}

function storeLastValidData(data) {
  try {
    window.localStorage.setItem(LIVE_CACHE_KEY, JSON.stringify({ savedAt: new Date().toISOString(), schemaValidated: state.publicDataSafety === "passed", data }));
    state.hasCachedData = true;
  } catch {
    // Storage can be unavailable in private browsing; the in-memory data remains valid.
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

function formatDate(value) {
  const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return String(value || approvedSnapshot.updatedOn);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${Number(match[3])} ${months[Number(match[2]) - 1]} ${match[1]}`;
}

function total(items) {
  return items.reduce((sum, item) => sum + item.value, 0);
}

function liveValue(rows, dataset, dimension, label) {
  const row = rows.find((item) => item.Dataset === dataset && item.Dimension === dimension && item.Label === label);
  const value = Number(row?.Value);
  return Number.isFinite(value) ? value : null;
}

function liveDimension(rows, dataset, dimension) {
  const items = rows
    .filter((row) => row.Dataset === dataset && row.Dimension === dimension && Number.isFinite(Number(row.Value)) && Number(row.Value) >= 0)
    .map((row) => ({ label: String(row.Label), value: Number(row.Value) }));

  if (dimension !== "Provider/Project" || items.length <= 15) return items;
  const leading = items.slice(0, 14);
  const remainder = items.slice(14).reduce((sum, item) => sum + item.value, 0);
  leading.push({ label: "Other", value: remainder });
  return leading;
}

function applyApprovedRows(payload) {
  if (!payload || payload.success !== true || !Array.isArray(payload.data)) throw new Error("Invalid live-data response");
  const rows = payload.data.filter((row) => String(row.Status || "").toUpperCase() === "APPROVED");
  const portfolioTotal = liveValue(rows, "Portfolio", "KPI", "Total");
  const palTotal = liveValue(rows, "PAL", "KPI", "Total");
  if (portfolioTotal === null || palTotal === null) throw new Error("Required approved KPIs are missing");

  const next = structuredClone(approvedSnapshot);
  next.portfolioTotal = portfolioTotal;
  const productMap = { PAL: "pal", LEP: "lep", "WP/WA": "weekly", Unity: "unity", "POD B": "podb" };
  Object.entries(productMap).forEach(([dataset, id]) => {
    const value = liveValue(rows, dataset, "KPI", "Total");
    const product = next.products.find((item) => item.id === id);
    if (product && value !== null) product.count = value;
  });

  const pal = next.products.find((item) => item.id === "pal");
  const dimensionMap = {
    "Content type": "Content Type",
    Grade: "Grade",
    Subject: "Subject",
    Medium: "Medium",
    "Provider / Project": "Provider/Project",
  };
  Object.entries(dimensionMap).forEach(([displayName, sourceName]) => {
    const items = liveDimension(rows, "PAL", sourceName);
    if (pal && items.length) pal.dimensions[displayName] = items;
  });
  if (pal) {
    pal.status = "Approved child-facing · live";
    pal.insight = `${number.format(pal.count)} approved child-facing items are included in the live executive reporting layer.`;
  }

  const liveDimensionSets = {
    lep: { Subject: "Subject", "Resource type": "Content Type", Grade: "Grade" },
    weekly: { Subject: "Subject", Language: "Medium", State: "State", Grade: "Grade" },
    unity: { Grade: "Grade", Language: "Medium" },
  };
  Object.entries(liveDimensionSets).forEach(([id, dimensions]) => {
    const target = next.products.find((item) => item.id === id);
    Object.entries(dimensions).forEach(([displayName, sourceName]) => {
      const items = liveDimension(rows, target.dataset, sourceName);
      if (items.length) target.dimensions[displayName] = items;
    });
  });

  const lep = next.products.find((item) => item.id === "lep");
  const weekly = next.products.find((item) => item.id === "weekly");
  const unity = next.products.find((item) => item.id === "unity");
  if (lep) lep.insight = `${number.format(lep.count)} delivered LEP resources are included in the live executive reporting layer.`;
  if (weekly) weekly.insight = `${number.format(weekly.count)} approved questions are included in the combined WP / WA assessment bank.`;
  if (unity) unity.insight = `${number.format(unity.count)} unique GitHub-available simulations are included in the live executive reporting layer.`;

  const datedRow = rows.find((row) => row.Dataset === "Portfolio" && row.Dimension === "KPI" && row.Label === "Total") || rows[0];
  next.updatedOn = formatDate(datedRow?.Updated_On || payload.lastSynced);
  return next;
}

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value || "");
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  }).format(date);
}

function auditPublicPayload(payload) {
  const allowedTopFields = new Set(["success", "lastSynced", "data"]);
  const unexpectedTopFields = Object.keys(payload || {}).filter((key) => !allowedTopFields.has(key));
  if (!payload || payload.success !== true || !Array.isArray(payload.data)) {
    return { ok: false, message: "The endpoint response is not a valid approved-data payload." };
  }
  const required = new Set(PUBLIC_ROW_FIELDS);
  const unexpectedRowFields = new Set();
  const missingRowFields = new Set();
  payload.data.forEach((row) => {
    Object.keys(row || {}).forEach((key) => {
      if (!required.has(key)) unexpectedRowFields.add(key);
    });
    PUBLIC_ROW_FIELDS.forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(row || {}, key)) missingRowFields.add(key);
    });
  });
  if (unexpectedTopFields.length || unexpectedRowFields.size || missingRowFields.size) {
    return { ok: false, message: "The public endpoint schema differs from the six-field approved contract." };
  }
  return { ok: true, message: "Verified: every public data row is limited to the six approved executive fields." };
}

function dimensionTotal(product, dimensionName) {
  return total(product?.dimensions?.[dimensionName] || []);
}

function dimensionLabelValue(product, dimensionName, label) {
  return Number(product?.dimensions?.[dimensionName]?.find((item) => item.label === label)?.value || 0);
}

function validationBadge(tone, label) {
  return `<span class="validationBadge ${tone}">${escapeHtml(label)}</span>`;
}

function bindShellEvents(root) {
  root.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => {
    state.activeView = button.dataset.view;
    render();
  }));
  document.getElementById("refresh-live")?.addEventListener("click", refresh);
}

function renderValidation() {
  const root = document.getElementById("root");
  const products = state.data.products;
  const byId = Object.fromEntries(products.map((product) => [product.id, product]));
  const productSum = products.reduce((sum, product) => sum + product.count, 0);
  const checks = [
    { name: "Portfolio reconciliation", detail: "PAL + LEP + WP/WA + Unity + POD B", observed: productSum, expected: state.data.portfolioTotal },
    { name: "LEP subjects", detail: "Additive subject breakdown", observed: dimensionTotal(byId.lep, "Subject"), expected: byId.lep.count },
    { name: "LEP resource types", detail: "Additive resource-type breakdown", observed: dimensionTotal(byId.lep, "Resource type"), expected: byId.lep.count },
    { name: "LEP grades", detail: "Additive grade breakdown", observed: dimensionTotal(byId.lep, "Grade"), expected: byId.lep.count },
    { name: "WP/WA subjects", detail: "Includes Unknown subject", observed: dimensionTotal(byId.weekly, "Subject"), expected: byId.weekly.count },
    { name: "WP/WA languages", detail: "Additive language breakdown", observed: dimensionTotal(byId.weekly, "Language"), expected: byId.weekly.count },
    { name: "WP/WA states", detail: "Includes Unknown state", observed: dimensionTotal(byId.weekly, "State"), expected: byId.weekly.count },
    { name: "WP/WA grades", detail: "Includes Unknown grade", observed: dimensionTotal(byId.weekly, "Grade"), expected: byId.weekly.count },
    { name: "Unity grades", detail: "Unique approved simulations", observed: dimensionTotal(byId.unity, "Grade"), expected: byId.unity.count },
  ].map((check) => ({ ...check, passed: check.observed === check.expected }));
  const failedChecks = checks.filter((check) => !check.passed).length;
  const passedChecks = checks.length - failedChecks;
  const sourceLabel = state.source === "live" ? "Live endpoint" : state.source === "cached" ? "Last valid live data" : state.source === "checking" ? "Checking endpoint" : "Approved snapshot";
  const refreshLabel = state.source === "checking" ? "● Refreshing live data" : state.source === "live" ? "● Live data synced" : state.source === "cached" ? "● Last valid data" : "● Approved fallback";
  const apiTone = state.source === "live" ? "passed" : state.source === "checking" ? "pending" : "failed";
  const apiLabel = state.source === "live" ? "Available" : state.source === "checking" ? "Checking" : "Unavailable";
  const modeTone = state.source === "live" ? "passed" : state.source === "checking" ? "pending" : "warning";
  const modeLabel = state.source === "live" ? "Live" : state.source === "cached" ? "Cached fallback" : state.source === "snapshot" ? "Snapshot fallback" : "Checking";
  const safetyTone = state.publicDataSafety === "passed" ? "passed" : state.publicDataSafety === "failed" ? "failed" : "pending";
  const safetyLabel = state.publicDataSafety === "passed" ? "Verified" : state.publicDataSafety === "failed" ? "Failed" : "Awaiting live response";
  const approvalRows = [
    { product: "PAL", status: "Approved", tone: "passed", rule: byId.pal.basis },
    { product: "LEP", status: "Approved", tone: "passed", rule: byId.lep.basis },
    { product: "WP / WA Assessment", status: "Warning", tone: "warning", rule: byId.weekly.basis },
    { product: "Unity Simulations", status: "Warning", tone: "warning", rule: byId.unity.basis },
    { product: "POD B", status: "Pending", tone: "pending", rule: "Count only final LBDs confirmed by the POC; Canva, Figma, games, instructions and VO tabs are not separate products." },
  ];
  const warnings = [
    { label: "WP/WA unknown subject", value: dimensionLabelValue(byId.weekly, "Subject", "Unknown"), note: "3 source rows need subject confirmation.", tone: "warning" },
    { label: "WP/WA unknown grade", value: dimensionLabelValue(byId.weekly, "Grade", "Unknown"), note: "4 source rows need grade confirmation.", tone: "warning" },
    { label: "WP/WA unknown state", value: dimensionLabelValue(byId.weekly, "State", "Unknown"), note: "Do not assign to HP until Karishma confirms all sources.", tone: "warning" },
    { label: "Unity unspecified language", value: dimensionLabelValue(byId.unity, "Language", "Unspecified"), note: "Retained within the approved total of 84.", tone: "warning" },
    { label: "POD B final LBD count", value: "Pending", note: "Current approved KPI remains 0 until Snigdha confirms final LBDs.", tone: "pending" },
  ];
  root.innerHTML = `
    <main class="shell">
      <aside class="sidebar">
        <div class="brand"><span class="brandMark">C</span><span>Content Intelligence</span></div>
        <nav>
          <button class="navItem" data-view="portfolio">◫ <span>Portfolio</span></button>
          <button class="navItem" disabled title="Count Explorer is planned">⌁ <span>Count explorer</span></button>
          <button class="navItem active" data-view="validation">✓ <span>Validation</span></button>
          <button class="navItem" disabled title="Delivery is planned">↗ <span>Delivery</span></button>
        </nav>
        <div class="sideStatus"><span class="pulse"></span><div><strong>Controlled view</strong><small>${sourceLabel} · ${escapeHtml(state.data.updatedOn)}</small></div></div>
      </aside>
      <section class="workspace validationWorkspace">
        <header class="topbar">
          <div><p class="eyebrow">CONTENT REPOSITORY</p><h1>Validation & Controls</h1><p>Reconciliation, approval status, system health and public-data safety</p></div>
          <button id="refresh-live" class="auditTag" style="cursor:pointer" ${state.source === "checking" ? "disabled" : ""}>${refreshLabel}</button>
        </header>
        <section class="validationHero ${failedChecks ? "hasFailure" : ""}">
          <div><p class="eyebrow">PORTFOLIO RECONCILIATION</p><h2>${failedChecks ? "Validation needs attention" : "Approved totals reconcile"}</h2><p class="equation">${products.map((product) => `${escapeHtml(product.short)} ${number.format(product.count)}`).join(" + ")} = <strong>${number.format(productSum)}</strong></p></div>
          <div class="validationScore">${validationBadge(failedChecks ? "failed" : "passed", failedChecks ? "Failed" : "Passed")}<strong>${passedChecks}/${checks.length}</strong><span>reconciliation checks passed</span></div>
        </section>
        <section class="validationGrid">
          <article class="panel validationPanel reconciliationPanel">
            <div class="panelHead"><div><p class="eyebrow">ADDITIVE CHECKS</p><h3>Breakdown reconciliation</h3></div><span>Unity language is coverage, not additive</span></div>
            <div class="validationRows">${checks.map((check) => `<div class="validationRow"><div><strong>${escapeHtml(check.name)}</strong><span>${escapeHtml(check.detail)}</span></div><div><span>Observed</span><strong>${number.format(check.observed)}</strong></div><div><span>Expected</span><strong>${number.format(check.expected)}</strong></div>${validationBadge(check.passed ? "passed" : "failed", check.passed ? "Passed" : "Failed")}</div>`).join("")}</div>
            <p class="validationNote">Unity language values overlap because one simulation can be available in more than one language. They are intentionally excluded from additive KPI reconciliation.</p>
          </article>
          <article class="panel validationPanel">
            <div class="panelHead"><div><p class="eyebrow">MISSING DATA</p><h3>Warnings requiring confirmation</h3></div></div>
            <div class="warningList">${warnings.map((warning) => `<div class="warningCard ${warning.tone}"><div><span>${escapeHtml(warning.label)}</span><strong>${typeof warning.value === "number" ? number.format(warning.value) : escapeHtml(warning.value)}</strong></div>${validationBadge(warning.tone, warning.tone === "pending" ? "Pending" : "Warning")}<p>${escapeHtml(warning.note)}</p></div>`).join("")}</div>
          </article>
        </section>
        <section class="panel validationPanel approvalPanel">
          <div class="panelHead"><div><p class="eyebrow">APPROVAL STATUS</p><h3>Approved baseline and counting rules</h3></div><span>Updated ${escapeHtml(state.data.updatedOn)}</span></div>
          <div class="approvalTable"><table><thead><tr><th>Product</th><th>Status</th><th>Updated</th><th>Counting rule</th></tr></thead><tbody>${approvalRows.map((row) => `<tr><td>${escapeHtml(row.product)}</td><td>${validationBadge(row.tone, row.status)}</td><td>${escapeHtml(state.data.updatedOn)}</td><td>${escapeHtml(row.rule)}</td></tr>`).join("")}</tbody></table></div>
        </section>
        <section class="validationGrid lowerGrid">
          <article class="panel validationPanel">
            <div class="panelHead"><div><p class="eyebrow">SYSTEM HEALTH</p><h3>Live dashboard services</h3></div></div>
            <div class="healthGrid">
              <div><span>Apps Script API</span>${validationBadge(apiTone, apiLabel)}<p>${state.error ? escapeHtml(state.error) : "Approved JSON endpoint response."}</p></div>
              <div><span>Last successful sync</span>${validationBadge(state.lastSuccessfulSync ? "passed" : "pending", state.lastSuccessfulSync ? "Recorded" : "Pending")}<p>${escapeHtml(state.lastSuccessfulSync || "No successful sync recorded in this browser yet.")}</p></div>
              <div><span>Data mode</span>${validationBadge(modeTone, modeLabel)}<p>${escapeHtml(sourceLabel)} is currently powering the dashboard.</p></div>
              <div><span>Last-valid cache</span>${validationBadge(state.hasCachedData ? "passed" : "pending", state.hasCachedData ? "Ready" : "Not stored")}<p>${state.hasCachedData ? "A validated live response is available for fallback." : "Cache will be created after a successful live sync."}</p></div>
              <div><span>GitHub dashboard</span>${validationBadge("passed", "Available")}<p>The current GitHub Pages dashboard loaded successfully.</p></div>
            </div>
          </article>
          <article class="panel validationPanel safetyPanel">
            <div class="panelHead"><div><p class="eyebrow">PUBLIC-DATA SAFETY</p><h3>Approved API contract</h3></div>${validationBadge(safetyTone, safetyLabel)}</div>
            <p class="safetyMessage">${escapeHtml(state.publicDataMessage || "The schema will be checked when the live endpoint responds.")}</p>
            <div class="safetyFields">${PUBLIC_ROW_FIELDS.map((field) => `<code>${escapeHtml(field)}</code>`).join("")}</div>
            <div class="safetyBlock"><strong>Never exposed</strong><p>Internal paths, source worksheet names, raw records, file-level data and private tabs.</p></div>
          </article>
        </section>
      </section>
    </main>`;
  bindShellEvents(root);
}

function donutStyle(items) {
  const represented = total(items);
  if (!represented) return "#e8edf4";
  let cursor = 0;
  const stops = items.filter((item) => item.value > 0).map((item, index) => {
    const start = cursor;
    cursor += (item.value / represented) * 100;
    return `${item.color || palette[index % palette.length]} ${start}% ${cursor}%`;
  });
  return `conic-gradient(${stops.join(",")})`;
}

function render() {
  if (state.activeView === "validation") {
    renderValidation();
    return;
  }
  const root = document.getElementById("root");
  const products = state.data.products;
  const product = products.find((item) => item.id === state.selectedProduct) || products[0];
  const dimensionNames = Object.keys(product.dimensions);
  if (!dimensionNames.includes(state.selectedDimension)) state.selectedDimension = dimensionNames[0];
  const dimension = product.dimensions[state.selectedDimension] || [];
  const sorted = [...dimension].sort((a, b) => b.value - a.value);
  const maximum = Math.max(...sorted.map((item) => item.value), 1);
  const represented = total(dimension);
  const coverage = product.count ? Math.round((represented / product.count) * 100) : 0;
  const largest = sorted[0] || { label: "No approved data", value: 0 };
  const live = state.source === "live";
  const fallback = state.source === "snapshot" || state.source === "cached";
  const sourceLabel = live ? "Live endpoint" : state.source === "cached" ? "Last valid live data" : "Approved snapshot";
  const refreshLabel = state.source === "checking" ? "● Refreshing live data" : live ? "● Live data synced" : state.source === "cached" ? "● Last valid data" : "● Approved fallback";
  const fallbackMessage = state.source === "cached" ? "The endpoint could not be reached. The last successfully validated live data remains visible." : "The endpoint is not available yet. Showing the approved published snapshot.";

  root.innerHTML = `
    <main class="shell">
      <aside class="sidebar">
        <div class="brand"><span class="brandMark">C</span><span>Content Intelligence</span></div>
        <nav>
          <button class="navItem active" data-view="portfolio">◫ <span>Portfolio</span></button>
          <button class="navItem" disabled title="Count Explorer is planned">⌁ <span>Count explorer</span></button>
          <button class="navItem" data-view="validation">✓ <span>Validation</span></button>
          <button class="navItem" disabled title="Delivery is planned">↗ <span>Delivery</span></button>
        </nav>
        <div class="sideStatus"><span class="pulse"></span><div><strong>Controlled view</strong><small>${sourceLabel} · ${escapeHtml(state.data.updatedOn)}</small></div></div>
      </aside>
      <section class="workspace">
        <header class="topbar">
          <div><p class="eyebrow">CONTENT REPOSITORY</p><h1>Count Intelligence Studio</h1><p>Approved executive metrics and controlled product breakdowns</p></div>
          <button id="refresh-live" class="auditTag" style="cursor:pointer" ${state.source === "checking" ? "disabled" : ""}>${refreshLabel}</button>
        </header>
        ${fallback ? `<section class="panel" role="status" style="margin:0 0 14px;border-left:3px solid #f59e0b;padding:12px 14px"><strong style="font-size:12px">Live data temporarily unavailable</strong><span style="display:block;margin-top:3px;color:#725d31;font-size:11px">${fallbackMessage}</span></section>` : ""}
        <section class="portfolioStrip">
          <div class="portfolioTotal"><span>PRODUCT-READY PORTFOLIO</span><strong>${number.format(state.data.portfolioTotal)}</strong><small>approved reporting total</small></div>
          <div class="mixBar" aria-label="Portfolio composition">${products.filter((item) => item.count > 0).map((item, index) => `<button data-product="${item.id}" style="width:${(item.count / state.data.portfolioTotal) * 100}%;background:${palette[index % palette.length]}" title="${escapeHtml(item.name)}: ${number.format(item.count)}"></button>`).join("")}</div>
          <div class="portfolioLegend">${products.map((item, index) => `<button class="${item.id === product.id ? "active" : ""}" data-product="${item.id}"><i style="background:${palette[index % palette.length]}"></i><span>${escapeHtml(item.short)}</span><strong>${number.format(item.count)}</strong></button>`).join("")}</div>
        </section>
        <section class="productTabs">${products.map((item) => `<button data-product="${item.id}" class="${item.id === product.id ? "active" : ""}">${escapeHtml(item.name)}<span>${number.format(item.count)}</span></button>`).join("")}</section>
        <section class="productHero">
          <div><p class="eyebrow">SELECTED PRODUCT</p><h2>${escapeHtml(product.name)}</h2><div class="heroNumber">${number.format(product.count)}</div><span class="statusPill">${escapeHtml(product.status)}</span></div>
          <div class="explain"><div><span>COUNTING BASIS</span><p>${escapeHtml(product.basis)}</p></div><div class="insight"><span>KEY INSIGHT</span><p>${escapeHtml(product.insight)}</p></div></div>
        </section>
        <section class="dimensionTabs" aria-label="Breakdown dimension">${dimensionNames.map((name) => `<button data-dimension="${escapeHtml(name)}" class="${name === state.selectedDimension ? "active" : ""}">${escapeHtml(name)}</button>`).join("")}</section>
        <section class="insightGrid">
          <article class="panel chartPanel">
            <div class="panelHead"><div><p class="eyebrow">${escapeHtml(state.selectedDimension.toUpperCase())} BREAKDOWN</p><h3>What makes up the count</h3></div><span>${dimension.length} categories</span></div>
            <div class="bars">${sorted.map((item, index) => `<div class="barRow"><span>${escapeHtml(item.label)}</span><div><i style="width:${(item.value / maximum) * 100}%;background:${item.color || palette[index % palette.length]}"></i></div><strong>${number.format(item.value)}</strong><small>${represented ? ((item.value / represented) * 100).toFixed((item.value / represented) * 100 < 1 ? 1 : 0) : 0}%</small></div>`).join("")}</div>
          </article>
          <article class="panel compositionPanel">
            <div class="panelHead"><div><p class="eyebrow">COMPOSITION</p><h3>${escapeHtml(state.selectedDimension)} share</h3></div></div>
            <div class="donut" style="background:${donutStyle(dimension)}"><div><strong>${number.format(represented)}</strong><span>represented</span></div></div>
            <div class="donutLegend">${sorted.slice(0, 6).map((item, index) => `<div><i style="background:${item.color || palette[index % palette.length]}"></i><span>${escapeHtml(item.label)}</span><strong>${number.format(item.value)}</strong></div>`).join("")}</div>
            <div class="callout"><span>Largest category</span><strong>${escapeHtml(largest.label)}</strong><p>${number.format(largest.value)} · ${represented ? ((largest.value / represented) * 100).toFixed(1) : 0}% of represented values</p></div>
          </article>
        </section>
        <section class="summaryGrid">
          <article class="miniCard"><span>Dimension coverage</span><strong>${coverage}%</strong><p>${number.format(represented)} approved values represented against the selected KPI.</p></article>
          <article class="miniCard"><span>Data owner</span><strong>${escapeHtml(product.owner)}</strong><p>Responsible team for the approved executive count.</p></article>
          <article class="miniCard warning"><span>Interpretation</span><strong>${product.id === "pal" ? "Packages counted once" : "Controlled count"}</strong><p>${product.id === "pal" ? "Supporting files are not counted separately, and unapproved records stay outside the total." : "Only the approved KPI is included in this public view."}</p></article>
        </section>
        <section class="panel rulePanel"><div><p class="eyebrow">COUNTING RULES</p><h3>How to read this dashboard</h3></div><div class="rules"><p><b>PAL:</b> child-facing videos, PDF books, HTML modules/books and games; packages count once.</p><p><b>LEP:</b> a separate approved project KPI.</p><p><b>WP / WA:</b> one combined assessment-bank count; one consolidated row equals one question.</p><p><b>Unity & POD B:</b> only approved playable or fully integrated outputs count as final products.</p></div></section>
      </section>
    </main>`;

  root.querySelectorAll("[data-product]").forEach((button) => button.addEventListener("click", () => {
    state.selectedProduct = button.dataset.product;
    const nextProduct = state.data.products.find((item) => item.id === state.selectedProduct);
    state.selectedDimension = Object.keys(nextProduct.dimensions)[0];
    render();
  }));
  root.querySelectorAll("[data-dimension]").forEach((button) => button.addEventListener("click", () => {
    state.selectedDimension = button.dataset.dimension;
    render();
  }));
  bindShellEvents(root);
}

async function refresh() {
  state.source = "checking";
  state.error = "";
  render();
  const endpoint = String(window.COC_LIVE_DATA_URL || "").trim();
  if (!endpoint) {
    const cached = readLastValidData();
    state.data = cached || state.data || structuredClone(approvedSnapshot);
    state.source = cached ? "cached" : "snapshot";
    state.error = "Live-data endpoint is not configured";
    render();
    return;
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), LIVE_REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(endpoint, { cache: "no-store", signal: controller.signal });
    if (!response.ok) throw new Error(`Live-data HTTP ${response.status}`);
    const payload = await response.json();
    const safetyAudit = auditPublicPayload(payload);
    state.publicDataSafety = safetyAudit.ok ? "passed" : "failed";
    state.publicDataMessage = safetyAudit.message;
    if (!safetyAudit.ok) throw new Error("Public API schema validation failed");
    const nextData = applyApprovedRows(payload);
    state.data = nextData;
    state.lastSuccessfulSync = formatDateTime(payload.lastSynced || new Date().toISOString());
    storeLastValidData(nextData);
    state.source = "live";
  } catch (error) {
    const cached = readLastValidData();
    state.data = cached || state.data || structuredClone(approvedSnapshot);
    state.source = cached ? "cached" : "snapshot";
    state.error = error instanceof Error ? error.message : "Live data unavailable";
  } finally {
    window.clearTimeout(timeout);
  }
  render();
}

render();
refresh();
