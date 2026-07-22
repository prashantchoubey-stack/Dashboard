const palette = ["#5b5ce2", "#13a8a8", "#f59e0b", "#e95d78", "#7c3aed", "#3b82f6", "#10b981", "#f97316", "#64748b", "#a855f7", "#0ea5e9"];
const number = new Intl.NumberFormat("en-IN");
const LIVE_CACHE_KEY = "cocc-approved-live-data-v1";
const LIVE_REQUEST_TIMEOUT_MS = 12000;

const approvedSnapshot = {
  portfolioTotal: 67786,
  updatedOn: "21 Jul 2026",
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
      id: "lep", dataset: "LEP", name: "LEP", short: "LEP", count: 5288,
      status: "Approved separate KPI", owner: "Content Operations",
      basis: "LEP remains a separate approved project KPI and is not merged into PAL.",
      insight: "5,288 approved LEP content records are included in the executive portfolio.",
      dimensions: { KPI: [{ label: "Approved LEP content", value: 5288 }] },
    },
    {
      id: "weekly", dataset: "WP/WA", name: "WP / WA Assessment", short: "WP/WA", count: 17657,
      status: "Approved question count", owner: "Assessment Operations",
      basis: "WP and WA use one combined assessment-bank count. Each consolidated row represents one question.",
      insight: "17,657 approved questions are included in the executive portfolio.",
      dimensions: { KPI: [{ label: "Approved questions", value: 17657 }] },
    },
    {
      id: "unity", dataset: "Unity", name: "Unity Simulations", short: "Unity", count: 23,
      status: "Approved final playable", owner: "Content Operations",
      basis: "Only unique, quality-approved playable simulations are counted as final products.",
      insight: "23 approved playable simulations are included in the executive portfolio.",
      dimensions: { KPI: [{ label: "Final playable", value: 23 }] },
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
  selectedProduct: "pal",
  selectedDimension: "Content type",
  error: "",
};

function readLastValidData() {
  try {
    const cached = JSON.parse(window.localStorage.getItem(LIVE_CACHE_KEY) || "null");
    if (!cached || typeof cached !== "object" || !cached.data) return null;
    if (!Number.isFinite(Number(cached.data.portfolioTotal)) || !Array.isArray(cached.data.products)) return null;
    return cached.data;
  } catch {
    return null;
  }
}

function storeLastValidData(data) {
  try {
    window.localStorage.setItem(LIVE_CACHE_KEY, JSON.stringify({ savedAt: new Date().toISOString(), data }));
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

function liveDimension(rows, dimension) {
  const items = rows
    .filter((row) => row.Dataset === "PAL" && row.Dimension === dimension && Number.isFinite(Number(row.Value)) && Number(row.Value) >= 0)
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
    const items = liveDimension(rows, sourceName);
    if (pal && items.length) pal.dimensions[displayName] = items;
  });
  if (pal) {
    pal.status = "Approved child-facing · live";
    pal.insight = `${number.format(pal.count)} approved child-facing items are included in the live executive reporting layer.`;
  }

  const datedRow = rows.find((row) => row.Dataset === "Portfolio" && row.Dimension === "KPI" && row.Label === "Total") || rows[0];
  next.updatedOn = formatDate(datedRow?.Updated_On || payload.lastSynced);
  return next;
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
          <button class="navItem active">◫ <span>Portfolio</span></button>
          <button class="navItem">⌁ <span>Count explorer</span></button>
          <button class="navItem">✓ <span>Validation</span></button>
          <button class="navItem">↗ <span>Delivery</span></button>
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
  document.getElementById("refresh-live")?.addEventListener("click", refresh);
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
    const nextData = applyApprovedRows(await response.json());
    state.data = nextData;
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
