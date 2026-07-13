"use client";

import { useEffect, useMemo, useState } from "react";

type ViewName = "Portfolio" | "Data quality" | "POD B";

type DashboardData = {
  productReady: number;
  historical: number;
  pal: number;
  lep: number;
  wp: number;
  unityFinal: number;
  unityInventory: number;
  podBFinal: number;
  englishShare: number;
  unknownMedium: number;
  podBStories: number;
  podBLinks: number;
  podBMissing: number;
  podBValidation: number;
  asOf: string;
};

const approvedSnapshot: DashboardData = {
  productReady: 324787,
  historical: 325202,
  pal: 301819,
  lep: 5288,
  wp: 17657,
  unityFinal: 23,
  unityInventory: 438,
  podBFinal: 0,
  englishShare: 76.39,
  unknownMedium: 3015,
  podBStories: 25,
  podBLinks: 77,
  podBMissing: 29,
  podBValidation: 77,
  asOf: "12 Jul 2026",
};

const number = new Intl.NumberFormat("en-IN");
const pct = (value: number) => `${value.toFixed(value < 1 ? 2 : 1)}%`;

function parseGoogleVisualization(payload: string): Partial<DashboardData> {
  const start = payload.indexOf("{");
  const end = payload.lastIndexOf("}");
  if (start < 0 || end < 0) return {};
  const parsed = JSON.parse(payload.slice(start, end + 1));
  const rows = parsed?.table?.rows ?? [];
  const labels: Record<string, keyof DashboardData> = {
    "Product-Ready Portfolio": "productReady",
    "Historical Reconciliation Total": "historical",
    "PAL Records": "pal",
    "LEP Records": "lep",
    "WP Questions": "wp",
    "Unity Final Playable": "unityFinal",
    "POD B Final Integrated": "podBFinal",
    "English Share": "englishShare",
    "Unknown Medium": "unknownMedium",
  };
  return rows.reduce((result: Partial<DashboardData>, row: { c?: { v?: unknown }[] }) => {
    const label = String(row?.c?.[0]?.v ?? "").trim();
    const key = labels[label];
    const raw = row?.c?.[1]?.v;
    if (key && typeof raw === "number") (result[key] as number) = raw;
    return result;
  }, {});
}

function Kpi({ label, value, note, tone = "blue" }: { label: string; value: string; note: string; tone?: string }) {
  return (
    <article className={`kpi kpi-${tone}`}>
      <div className="kpi-top"><span className="kpi-dot" /><span>{label}</span></div>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

function Bar({ label, value, total, color, detail }: { label: string; value: number; total: number; color: string; detail: string }) {
  const width = Math.max(1.4, (value / total) * 100);
  return (
    <div className="bar-row">
      <div className="bar-label"><span>{label}</span><strong>{number.format(value)}</strong></div>
      <div className="bar-track"><span style={{ width: `${width}%`, background: color }} /></div>
      <small>{detail}</small>
    </div>
  );
}

function StatusPill({ children, kind }: { children: React.ReactNode; kind: "good" | "watch" | "risk" | "neutral" }) {
  return <span className={`status status-${kind}`}>{children}</span>;
}

export default function Home() {
  const [view, setView] = useState<ViewName>("Portfolio");
  const [data, setData] = useState(approvedSnapshot);
  const [source, setSource] = useState<"checking" | "live" | "snapshot">("checking");

  const refresh = async () => {
    setSource("checking");
    try {
      const endpoint = "https://docs.google.com/spreadsheets/d/1o-0hjB8_Ak7AAdHwuanhQ10uE4j0_LPlO8GdTq6NxvA/gviz/tq?tqx=out:json&sheet=Looker_Approved_KPIs";
      const response = await fetch(endpoint, { cache: "no-store" });
      if (!response.ok) throw new Error("Live source unavailable");
      const live = parseGoogleVisualization(await response.text());
      if (!live.productReady) throw new Error("No approved KPI rows found");
      setData((current) => ({ ...current, ...live, asOf: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) }));
      setSource("live");
    } catch {
      setData(approvedSnapshot);
      setSource("snapshot");
    }
  };

  useEffect(() => { refresh(); }, []);

  const reconciliationGap = data.historical - data.productReady;
  const classifiedShare = 100 - (data.unknownMedium / data.productReady) * 100;
  const regionalShare = 100 - data.englishShare - (data.unknownMedium / data.productReady) * 100;
  const readiness = (data.productReady / data.historical) * 100;
  const composition = useMemo(() => [
    { label: "PAL library", value: data.pal, color: "#1d63d5", detail: `${pct((data.pal / data.productReady) * 100)} of ready portfolio` },
    { label: "WP Weekly Practice", value: data.wp, color: "#16a085", detail: "question bank" },
    { label: "LEP / Non-PAL", value: data.lep, color: "#e59b2f", detail: "supplementary library" },
    { label: "Unity final playable", value: data.unityFinal, color: "#8b5cf6", detail: `${number.format(data.unityInventory)} historical inventory items reviewed` },
  ], [data]);

  return (
    <main>
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">CI</span>
          <div><strong>Content Intelligence</strong><small>Executive command center</small></div>
        </div>
        <nav aria-label="Dashboard views">
          {(["Portfolio", "Data quality", "POD B"] as ViewName[]).map((item) => (
            <button key={item} className={view === item ? "active" : ""} onClick={() => setView(item)}>{item}</button>
          ))}
        </nav>
        <div className="header-actions">
          <span className={`source source-${source}`}><i />{source === "live" ? "Live sheet" : source === "checking" ? "Checking source" : "Approved snapshot"}</span>
          <button className="icon-button" onClick={refresh} title="Refresh dashboard" aria-label="Refresh dashboard">↻</button>
          <a className="primary-link" href="https://datastudio.google.com/reporting/b863a821-39aa-4bb6-8c76-f071f676d0e6" target="_blank" rel="noreferrer">Open drill-down <span>↗</span></a>
        </div>
      </header>

      <section className="page-heading">
        <div>
          <p className="eyebrow">CONTENT REPOSITORY · AS OF {data.asOf.toUpperCase()}</p>
          <h1>{view === "Portfolio" ? "Portfolio at a glance" : view === "Data quality" ? "Data quality & readiness" : "POD B production readiness"}</h1>
          <p>{view === "Portfolio" ? "One view of scale, readiness, language coverage and portfolio risk." : view === "Data quality" ? "The issues that affect trust in reporting and the actions needed to close them." : "Interactive story and game assets, from source links to final integrated outputs."}</p>
        </div>
        <div className="heading-stat"><small>Portfolio readiness</small><strong>{readiness.toFixed(2)}%</strong><div><span style={{ width: `${readiness}%` }} /></div></div>
      </section>

      {view === "Portfolio" && (
        <>
          <section className="kpi-grid">
            <Kpi label="Product-ready portfolio" value={number.format(data.productReady)} note="approved reporting scope" tone="blue" />
            <Kpi label="PAL records" value={number.format(data.pal)} note="92.9% of ready portfolio" tone="cyan" />
            <Kpi label="LEP records" value={number.format(data.lep)} note="non-PAL library" tone="amber" />
            <Kpi label="WP questions" value={number.format(data.wp)} note="weekly practice bank" tone="green" />
            <Kpi label="Unity final playable" value={number.format(data.unityFinal)} note={`from ${number.format(data.unityInventory)} inventory items`} tone="purple" />
            <Kpi label="Unknown medium" value={number.format(data.unknownMedium)} note={`${classifiedShare.toFixed(1)}% language classified`} tone="red" />
          </section>

          <section className="dashboard-grid">
            <article className="panel composition-panel">
              <div className="panel-title"><div><p className="eyebrow">PORTFOLIO MIX</p><h2>Where the repository sits today</h2></div><span className="panel-total">{number.format(data.productReady)} ready</span></div>
              <div className="bars">{composition.map((item) => <Bar key={item.label} {...item} total={data.productReady} />)}</div>
              <div className="bridge">
                <div><small>Product-ready</small><strong>{number.format(data.productReady)}</strong></div>
                <span className="bridge-line"><i style={{ width: `${readiness}%` }} /></span>
                <div className="align-right"><small>Historical total</small><strong>{number.format(data.historical)}</strong></div>
              </div>
            </article>

            <article className="panel language-panel">
              <div className="panel-title"><div><p className="eyebrow">LANGUAGE COVERAGE</p><h2>English leads the library</h2></div></div>
              <div className="donut-wrap">
                <div className="donut" style={{ background: `conic-gradient(#1d63d5 0 ${data.englishShare}%, #16a085 ${data.englishShare}% ${data.englishShare + regionalShare}%, #d7dde7 ${data.englishShare + regionalShare}% 100%)` }}><span><strong>{data.englishShare}%</strong><small>English</small></span></div>
                <div className="legend">
                  <div><i className="blue" /><span>English</span><strong>{data.englishShare}%</strong></div>
                  <div><i className="green" /><span>Regional & multilingual</span><strong>{regionalShare.toFixed(2)}%</strong></div>
                  <div><i className="grey" /><span>Unknown medium</span><strong>{number.format(data.unknownMedium)}</strong></div>
                </div>
              </div>
              <p className="callout">Language coverage is strong, but <strong>{number.format(data.unknownMedium)}</strong> records still need a medium classification.</p>
            </article>

            <article className="panel insight-panel">
              <div className="panel-title"><div><p className="eyebrow">EXECUTIVE READOUT</p><h2>Three decisions matter now</h2></div></div>
              <ol className="insight-list">
                <li><span className="rank rank-blue">01</span><div><strong>Close the reconciliation gap</strong><p>{number.format(reconciliationGap)} records separate the historical total from the product-ready scope.</p></div></li>
                <li><span className="rank rank-red">02</span><div><strong>Resolve language unknowns</strong><p>{number.format(data.unknownMedium)} records limit confidence in regional-language reporting.</p></div></li>
                <li><span className="rank rank-purple">03</span><div><strong>Move POD B to final</strong><p>{data.podBLinks} links are tracked, but no integrated final asset is approved yet.</p></div></li>
              </ol>
            </article>

            <article className="panel health-panel">
              <div className="panel-title"><div><p className="eyebrow">REPOSITORY HEALTH</p><h2>Status by workstream</h2></div></div>
              <div className="health-table">
                <div><span>PAL library</span><StatusPill kind="good">Ready</StatusPill><strong>{number.format(data.pal)}</strong></div>
                <div><span>WP question bank</span><StatusPill kind="good">Ready</StatusPill><strong>{number.format(data.wp)}</strong></div>
                <div><span>Unity assets</span><StatusPill kind="watch">Validated subset</StatusPill><strong>{number.format(data.unityFinal)}</strong></div>
                <div><span>POD B repository</span><StatusPill kind="risk">Needs validation</StatusPill><strong>{data.podBValidation}</strong></div>
              </div>
            </article>
          </section>
        </>
      )}

      {view === "Data quality" && (
        <section className="quality-layout">
          <article className="quality-hero">
            <div><p className="eyebrow">TRUST SCORE</p><strong>{classifiedShare.toFixed(1)}%</strong><h2>of the portfolio has a known language classification</h2><p>Good enough for directional CXO reporting; the unknown tail must be cleared before regional-language planning.</p></div>
            <div className="quality-ring" style={{ background: `conic-gradient(#16a085 0 ${classifiedShare}%, #e8edf3 ${classifiedShare}% 100%)` }}><span>{number.format(data.unknownMedium)}<small>unknown</small></span></div>
          </article>
          <div className="issue-grid">
            <article className="issue"><span>01</span><div><StatusPill kind="risk">High priority</StatusPill><h3>Medium classification</h3><p>{number.format(data.unknownMedium)} rows need a normalized language value.</p><small>Owner: Content operations</small></div></article>
            <article className="issue"><span>02</span><div><StatusPill kind="watch">Review</StatusPill><h3>Unity eligibility</h3><p>{number.format(data.unityFinal)} final playable assets from {number.format(data.unityInventory)} indexed items.</p><small>Rule: finished playable output only</small></div></article>
            <article className="issue"><span>03</span><div><StatusPill kind="watch">Review</StatusPill><h3>Historical reconciliation</h3><p>{number.format(reconciliationGap)} records remain outside the approved ready scope.</p><small>Keep Grade 9 & 10 rollups excluded</small></div></article>
            <article className="issue"><span>04</span><div><StatusPill kind="neutral">Mapping</StatusPill><h3>Partner classification</h3><p>Separate ConveGenius internal projects from external partners.</p><small>Owner confirmation pending</small></div></article>
          </div>
          <article className="panel action-plan"><div className="panel-title"><div><p className="eyebrow">90-DAY CONTROL PLAN</p><h2>From inventory to trusted intelligence</h2></div></div><div className="timeline"><div><span>1</span><strong>Normalize</strong><p>Medium, partner and project fields</p></div><div><span>2</span><strong>Validate</strong><p>Unity and POD B final-output rules</p></div><div><span>3</span><strong>Automate</strong><p>Live KPI refresh and exception alerts</p></div><div><span>4</span><strong>Scale</strong><p>Add new repositories through registry</p></div></div></article>
        </section>
      )}

      {view === "POD B" && (
        <section className="podb-layout">
          <div className="podb-kpis">
            <Kpi label="Stories tracked" value={String(data.podBStories)} note="interactive learning stories" tone="blue" />
            <Kpi label="Asset links" value={String(data.podBLinks)} note="across production platforms" tone="cyan" />
            <Kpi label="Needs validation" value={String(data.podBValidation)} note="final/draft status pending" tone="amber" />
            <Kpi label="Final integrated" value={String(data.podBFinal)} note="approved production output" tone="red" />
          </div>
          <section className="podb-grid">
            <article className="panel pipeline-panel">
              <div className="panel-title"><div><p className="eyebrow">PRODUCTION PIPELINE</p><h2>Asset availability is ahead of approval</h2></div></div>
              <div className="pipeline">
                {["Storyboard / LBD", "Canva design", "Figma design", "Game link"].map((label, index) => <div key={label}><span>{index + 1}</span><strong>{label}</strong><b>10 available</b></div>)}
              </div>
              <div className="pipeline-final"><span>→</span><div><small>FINAL INTEGRATED OUTPUT</small><strong>{data.podBFinal}</strong><p>Approval and final-link validation are the current bottleneck.</p></div></div>
            </article>
            <article className="panel podb-risk">
              <div className="panel-title"><div><p className="eyebrow">READINESS GAP</p><h2>What prevents release</h2></div></div>
              <div className="big-risk"><strong>{data.podBMissing}</strong><span>missing asset slots</span></div>
              <div className="risk-bars"><div><span>Links needing validation</span><strong>{data.podBValidation}</strong></div><div><span>Final integrated games</span><strong>{data.podBFinal}</strong></div></div>
              <p className="callout warning">Count only finished playable assets. Storyboards, Figma, Canva and planning sheets remain production evidence, not final outputs.</p>
            </article>
          </section>
        </section>
      )}

      <footer><span>Approved KPI scope · Content Repository</span><span>Operational detail remains available in Looker Studio</span></footer>
    </main>
  );
}
