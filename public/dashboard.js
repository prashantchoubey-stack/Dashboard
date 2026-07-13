const approved = {productReady:324787,historical:325202,pal:301819,lep:5288,wp:17657,unityFinal:23,unityInventory:438,podBFinal:0,englishShare:76.39,unknownMedium:3015,podBStories:25,podBLinks:77,podBMissing:29,podBValidation:77,asOf:"12 Jul 2026"};
let current = {...approved};
const nf = new Intl.NumberFormat("en-IN");
const titles = {portfolio:["Portfolio at a glance","One view of scale, readiness, language coverage and portfolio risk."],quality:["Data quality & readiness","The issues that affect trust in reporting and the actions needed to close them."],podb:["POD B production readiness","Interactive story and game assets, from source links to final integrated outputs."]};

function parseGviz(text){
  const start=text.indexOf("{"),end=text.lastIndexOf("}"); if(start<0||end<0)return {};
  const parsed=JSON.parse(text.slice(start,end+1));
  const map={"Product-Ready Portfolio":"productReady","Historical Reconciliation Total":"historical","PAL Records":"pal","LEP Records":"lep","WP Questions":"wp","Unity Final Playable":"unityFinal","POD B Final Integrated":"podBFinal","English Share":"englishShare","Unknown Medium":"unknownMedium"};
  return (parsed.table?.rows||[]).reduce((out,row)=>{const label=String(row.c?.[0]?.v||"").trim(),key=map[label],value=row.c?.[1]?.v;if(key&&typeof value==="number")out[key]=value;return out;},{});
}
function render(){
  const d=current,gap=d.historical-d.productReady,readiness=d.productReady/d.historical*100,unknown=d.unknownMedium/d.productReady*100,classified=100-unknown,regional=100-d.englishShare-unknown;
  const values={...d,gap}; document.querySelectorAll("[data-number]").forEach(el=>el.textContent=nf.format(values[el.dataset.number]??0));
  const fields={asOf:`AS OF ${d.asOf.toUpperCase()}`,readiness:`${readiness.toFixed(2)}%`,classifiedShare:`${classified.toFixed(1)}%`,englishShare:`${d.englishShare}%`,regionalShare:`${regional.toFixed(2)}%`}; document.querySelectorAll("[data-field]").forEach(el=>el.textContent=fields[el.dataset.field]||"");
  document.getElementById("readiness-bar").style.width=`${readiness}%`; document.getElementById("bridge-bar").style.width=`${readiness}%`;
  [["pal",d.pal],["wp",d.wp],["lep",d.lep],["unity",d.unityFinal]].forEach(([id,value])=>document.getElementById(`bar-${id}`).style.width=`${Math.max(1.4,value/d.productReady*100)}%`);
  document.getElementById("language-donut").style.background=`conic-gradient(#1d63d5 0 ${d.englishShare}%,#16a085 ${d.englishShare}% ${d.englishShare+regional}%,#d7dde7 ${d.englishShare+regional}% 100%)`;
  document.getElementById("quality-ring").style.background=`conic-gradient(#16a085 0 ${classified}%,#e8edf3 ${classified}% 100%)`;
}
function setSource(mode){const el=document.getElementById("source");el.className=`source source-${mode}`;el.querySelector("span").textContent=mode==="live"?"Live sheet":mode==="checking"?"Checking source":"Approved snapshot";}
async function refresh(){setSource("checking");try{const url="https://docs.google.com/spreadsheets/d/1o-0hjB8_Ak7AAdHwuanhQ10uE4j0_LPlO8GdTq6NxvA/gviz/tq?tqx=out:json&sheet=Looker_Approved_KPIs";const res=await fetch(url,{cache:"no-store"});if(!res.ok)throw new Error();const live=parseGviz(await res.text());if(!live.productReady)throw new Error();current={...approved,...live,asOf:new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})};setSource("live");}catch{current={...approved};setSource("snapshot");}render();}
document.querySelectorAll("nav button").forEach(button=>button.addEventListener("click",()=>{document.querySelectorAll("nav button").forEach(x=>x.classList.toggle("active",x===button));document.querySelectorAll(".view").forEach(x=>x.classList.toggle("active",x.id===button.dataset.view));document.getElementById("view-title").textContent=titles[button.dataset.view][0];document.getElementById("view-subtitle").textContent=titles[button.dataset.view][1];}));
document.getElementById("refresh").addEventListener("click",refresh);render();refresh();
