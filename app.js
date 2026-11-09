'use strict';
// TEST BUILD: no requests to the production usage worker.
const AIRCRAFT={
 a300:{name:'A300',color:'#ffa54a',deep:'#492509',glow:'rgba(255,145,55,.36)',pressures:[['Nose','143 +0/-5'],['Main','199 +0/-5'],['Brakes','0.0 ~ .040']],rows:[['Engine oil','18-21GE / 18-25 P'],['APU','APU ~ Full'],['Nose TRQ / AMM','125.4~154.8','32-41-12-04-01'],['Main TRQ / AMM','184~221 / 111','32-41-11-04-02'],['Main TRQ / AMM','184~221 / 111','32-41-11-04-01'],['Hydraulics','In Top Hat'],['FCD','112*#'],['Brake AMM','32-47-27-04'],['Tire AMM reference','743-746 / 748','32-41-11-04-01']],desk:'MOCC / AIRBUS DESK',phone:'901-397-3339'},
 md11:{name:'MD-11',color:'#46ec86',deep:'#073d28',glow:'rgba(48,220,99,.32)',pressures:[['Nose','190 +0/-5'],['Center','185 +0/-5'],['Main','213 +0/-5'],['Brakes','0.0 ~ .040']],rows:[['Engine oil','18-21GE / 18-25 P'],['APU','APU ~ 8.0 qts'],['Hydraulics','6.25 / 6.25 / 7.5'],['Nose TRQ / AMM','100 / 25','32-42-01-04'],['Main TRQ / AMM','300-350 / 200','32-41-01-04'],['CTR TRQ / AMM','300-350 / 200','32-41-01-04'],['FCD','112 ent'],['Brake AMM','32-43-20-04']],desk:'MOCC / DOUGLAS DESK',phone:'901-397-3342'},
 b757:{name:'757',color:'#57bafa',deep:'#0a345e',glow:'rgba(52,164,255,.35)',pressures:[['Nose','150 - 160'],['Main','180 - 190'],['Brakes','0~1/16 (.063)']],rows:[['Engine oil','16 ~ 20 qts'],['APU','APU ~ Full'],['Nose TRQ / AMM','235-260 / 65','32-45-02-04'],['Main TRQ / AMM','235-260 / 110','32-45-01-04'],['L/R Hydraulics','.92-1.08'],['CTR Hydraulics','.86-1.14'],['Brake AMM','32-41-10-4']],desk:'MOCC / BOEING 757 DESK',phone:'901-397-3331'},
 b767:{name:'767',color:'#fff76b',deep:'#48420a',glow:'rgba(245,240,60,.31)',pressures:[['Nose','172 +5/-0'],['Main','200 +5/-0'],['Brakes','0.0 ~ .040']],rows:[['Engine oil','18 ~ 21 qts'],['APU','APU ~ Full'],['Nose TRQ / AMM','76-92 / 34-75','32-45-02-4'],['Main TRQ / AMM','500-600 / 150','32-45-01-4'],['L,R,C Hydraulics','.090~1.1'],['Brake AMM','32-41-08-4-4']],desk:'MOCC / BOEING 767 DESK',phone:'901-397-8451'},
 b777:{name:'777',color:'#bf78ff',deep:'#3f195e',glow:'rgba(162,69,255,.37)',pressures:[['Nose','223 +2/-8'],['Main','223 +2/-8'],['Brakes','0.0 ~ .060']],rows:[['Engine oil','24 L ~ 23 R'],['APU','APU ~ Full'],['Nose TRQ / AMM','500-550 / 200','32-45-02-4-0'],['Main TRQ / AMM','500-550 / 200','32-45-01-4-0'],['Hydraulics','0.8 - 1.1'],['Brake AMM','32-45-07-4-0'],['Additional brake reference','AMM Pt2 P&P']],desk:'MOCC / BOEING 777 DESK',phone:'901-397-8451'}
};
const FUEL_LABELS=['Standard Spare','Hot Spare','Out of Service','High Power Run'];
const FUEL={a300:['40k or less','40k','10k or less','60k'],md11:['40k ± 10k','50k + 38k in upper aux (88)','40k ± 10k','60k'],b757:['25k ± 5k','25k','25k ± 5k','70k'],b767:['40k ± 5k','40k ± 5k','40k ± 5k','75k'],b777:['70k ± 5k','N/A','70k ± 5k','275k']};
const TETHER={a300:['174″ (15 ton hook)','180″ (7.5 ton hook)','110″'],md11:['174″ (15 ton hook)','180″ (7.5 ton hook)','110″'],b757:['152″','92″'],b767:['202″ (15 ton hook)','140″'],b777:['202″','140″']};
const UTIL=[['ATIS','127.750'],['Emergency','121.5'],['Engine Shop','901-224-0471'],['Powerplant','901-397-3335'],['AOG','901-397-7295'],['EFB passcode','753951']];
const CONTACTS=[
 {
  "id": "aog",
  "name": "AOG — Primary",
  "number": "901-397-7295",
  "cat": "operations",
  "icon": "◉"
 },
 {
  "id": "aog-alt",
  "name": "AOG — Alternate",
  "number": "901-397-7282",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "asa",
  "name": "ASA",
  "number": "901-224-6989",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "atis-desk",
  "name": "ATIS Desk",
  "number": "901-842-8483",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "avionics",
  "name": "Avionics Line",
  "number": "901-224-6660",
  "cat": "maintenance",
  "icon": "♧"
 },
 {
  "id": "av-bench",
  "name": "Avionics Bench",
  "number": "901-369-3222",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "av-hangar",
  "name": "Avionics Hangar",
  "number": "901-224-0168",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "ballast",
  "name": "Ballast Dispatch",
  "number": "901-224-5909",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "ballast-alt",
  "name": "Ballast Dispatch — Alternate",
  "number": "901-224-5901",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "composite",
  "name": "Composite Shop",
  "number": "901-224-0153",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "conf-call",
  "name": "Conference Call",
  "number": "800-937-0983",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "engine",
  "name": "Engine Shop",
  "number": "901-224-0471",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "engine-cell",
  "name": "Engine Shop Cell",
  "number": "901-485-0956",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "apu-shop",
  "name": "Engine Shop APU Shop",
  "number": "901-224-0463",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "engine-stands",
  "name": "Engine Shop Engine Stands",
  "number": "901-224-0455",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "engine-fax",
  "name": "Engine Shop Fax",
  "number": "901-224-5954",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "eng",
  "name": "Engineering",
  "number": "901-224-0040",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "facilities",
  "name": "Facilities MX",
  "number": "901-224-6800",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "fire",
  "name": "FedEx Fire Department",
  "number": "901-797-5100",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "ramp-tower",
  "name": "FedEx Ramp Tower",
  "number": "901-369-2995",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "security",
  "name": "FedEx Security",
  "number": "901-922-1945",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "ffc",
  "name": "FFC",
  "number": "800-826-5348",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "naas",
  "name": "NAAS Home Office",
  "number": "210-805-0049",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "fuel",
  "name": "Fueling",
  "number": "901-224-6611",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "gate",
  "name": "Gate Sheet",
  "number": "901-397-8434",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "travel",
  "name": "Global Travel",
  "number": "901-375-6000",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "goc-dom",
  "name": "GOC Domestic",
  "number": "901-397-8041",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "goc-int",
  "name": "GOC International",
  "number": "901-397-8065",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "goc-int-alt",
  "name": "GOC International — Alternate",
  "number": "901-397-8066",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "gse",
  "name": "GSE",
  "number": "901-797-4487",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "gse-lift",
  "name": "GSE Lift Trucks",
  "number": "901-797-7900",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "gse-vehicle",
  "name": "GSE Vehicle MX",
  "number": "901-797-5800",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "gse-nonpower",
  "name": "GSE Nonpowered",
  "number": "901-647-7594",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "gse-dolly",
  "name": "GSE Dolly Shop",
  "number": "901-797-7890",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "h10-fax",
  "name": "H10 Lead Office Fax",
  "number": "901-360-6124",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "hub-control",
  "name": "Hub Control Room",
  "number": "901-369-3505",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "hub-sort",
  "name": "Hub Sort Down Update",
  "number": "901-797-7722",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "ims",
  "name": "IMS Reset",
  "number": "901-263-7277",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "inspection",
  "name": "Inspection",
  "number": "901-224-0130",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "jumpseat",
  "name": "Jumpseat",
  "number": "901-224-5420",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "mac1",
  "name": "MAC1",
  "number": "901-224-6635",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "machine",
  "name": "Machine Shop",
  "number": "901-224-5944",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "airport-authority",
  "name": "Memphis Airport Authority",
  "number": "901-922-8000",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "airport-duty",
  "name": "Memphis Airport Duty Manager",
  "number": "901-922-8007",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "airport-ops",
  "name": "Memphis Airport Ops 1",
  "number": "901-922-8117",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "airport-police",
  "name": "Memphis Airport Police",
  "number": "901-922-8298",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "mem-tower",
  "name": "Memphis Tower — Main",
  "number": "901-368-8103",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "mem-tower-alt",
  "name": "Memphis Tower — Alternate",
  "number": "901-322-3310",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "met",
  "name": "Meteorology",
  "number": "901-397-8291",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "ndt",
  "name": "NDT",
  "number": "901-224-0150",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "oncall",
  "name": "On-Call Records Emergency",
  "number": "901-224-6442",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "ost",
  "name": "OST Desk",
  "number": "901-397-8480",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "ost-conf",
  "name": "OST Conference Call",
  "number": "901-737-5272",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "powerplant-fax",
  "name": "Powerplant Records Fax",
  "number": "901-224-4577",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "pps",
  "name": "PPS Hangar 11/12",
  "number": "901-224-0182",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "qa-cell",
  "name": "Q/A Admin Cell",
  "number": "901-497-4184",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "qa-fax",
  "name": "Q/A Admin Fax",
  "number": "901-224-4573",
  "cat": "support",
  "icon": "☎"
 },
 {
  "id": "sheetmetal",
  "name": "Sheetmetal Shop",
  "number": "901-224-0154",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "stores1",
  "name": "Stores",
  "number": "901-224-0661",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "epdw1",
  "name": "EPDW",
  "number": "901-360-4308",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "testflight",
  "name": "Test Flight Office",
  "number": "901-224-5595",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "tool",
  "name": "Tool Crib Hangar 10",
  "number": "901-797-4588",
  "cat": "maintenance",
  "icon": "🔧"
 },
 {
  "id": "tool12",
  "name": "Tool Crib Hangar 12",
  "number": "901-224-0146",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "tool26",
  "name": "Tool Crib Hangar 26",
  "number": "901-224-0675",
  "cat": "maintenance",
  "icon": "☎"
 },
 {
  "id": "work-release",
  "name": "Work Release",
  "number": "901-394-2761",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "weekend-sort",
  "name": "Weekend Sort Ops",
  "number": "901-797-7189",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "c3",
  "name": "C3",
  "number": "901-397-8224",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "mdo",
  "name": "MDO",
  "number": "901-397-8435",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "fleet757",
  "name": "757 Fleet Team",
  "number": "901-397-3331",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "fleet767",
  "name": "767 / 777 Fleet Team",
  "number": "901-397-8451",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "fleetmd11",
  "name": "MD-11 Fleet Team",
  "number": "901-397-3342",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "fleetmd10",
  "name": "MD-10 Fleet Team",
  "number": "901-397-3343",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "fleetairbus",
  "name": "Airbus Fleet Team",
  "number": "901-397-3339",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "fleetpower",
  "name": "Powerplant Fleet Team",
  "number": "901-397-3335",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "epdw2",
  "name": "EPDW — Alternate",
  "number": "901-360-4030",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "epdw3",
  "name": "EPDW — Alternate 2",
  "number": "901-360-4033",
  "cat": "operations",
  "icon": "☎"
 },
 {
  "id": "stores2",
  "name": "Stores — Alternate",
  "number": "901-224-0662",
  "cat": "operations",
  "icon": "☎"
 }
];
const FAVORITES_KEY='mx-contacts-favorites-test-v1',PERSONAL_KEY='mx-contacts-personal-test-v1',PERSONAL_MANAGERS_KEY='mx-personal-managers-test-v1',USAGE_KEY='acmx-usage-isolated-test-v1';
const byId=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function readJSON(key,fallback){try{const val=JSON.parse(localStorage.getItem(key));return val??fallback}catch{return fallback}}
function writeJSON(key,val){try{localStorage.setItem(key,JSON.stringify(val))}catch{toast('Browser storage unavailable')}}
let favorites=readJSON(FAVORITES_KEY,['aog','avionics','tool']);if(!Array.isArray(favorites))favorites=['aog','avionics','tool'];
let personal=readJSON(PERSONAL_KEY,[]);if(!Array.isArray(personal))personal=[];
let personalManagers=readJSON(PERSONAL_MANAGERS_KEY,[]);if(!Array.isArray(personalManagers))personalManagers=[];
let usage=readJSON(USAGE_KEY,{opens:0,views:0,byAircraft:{}});if(typeof usage!=='object'||!usage)usage={opens:0,views:0,byAircraft:{}};
usage.opens=(Number(usage.opens)||0)+1;writeJSON(USAGE_KEY,usage);
let filter='all',search='';
function allManagers(){return [...MANAGERS,...personalManagers]}
function allContacts(){return [...CONTACTS,...personal,...allManagers()]}
function normalizedPhone(raw){const d=cleanNumber(raw);if(d.length===7)return '901-'+d.slice(0,3)+'-'+d.slice(3);if(d.length===10)return d.slice(0,3)+'-'+d.slice(3,6)+'-'+d.slice(6);if(d.length===11&&d[0]==='1')return normalizedPhone(d.slice(1));return null}
function cleanNumber(s){return String(s).replace(/\D/g,'')}
function dial(s){const digits=cleanNumber(s);if(digits.length===10||digits.length===11){location.href='tel:+'+(digits.length===10?'1':'')+digits}else toast('Invalid phone number')}
let toastTimer;function toast(message){const el=byId('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2000)}
async function copyNumber(s){try{await navigator.clipboard.writeText(s);toast('Copied '+s)}catch{toast('Select the number to copy: '+s)}}
function securityMarkup(){return `<div class="security"><span class="shield" aria-hidden="true">♙</span><div class="security-text"><strong>FEDEX SECURITY</strong><span>901-922-1945</span></div><a class="call-btn" href="tel:+19019221945" aria-label="Call FedEx Security 901-922-1945"><svg class="phone-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.13.96.37 1.91.72 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.26a2 2 0 0 1 2.11-.45c.9.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/></svg></a></div>`}
function favMarkup(c){return `<div class="fav"><span class="fav-icon" aria-hidden="true">${esc(c.icon||'☎')}</span><div class="fav-text"><b>${esc(c.name)}</b><span>${esc(c.number)}</span></div><a class="call-btn" href="tel:+${cleanNumber(c.number).replace(/^1(?=\d{10}$)/,'') .replace(/^(?=\d{10}$)/,'1')}" aria-label="Call ${esc(c.name)} at ${esc(c.number)}"><svg class="phone-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.13.96.37 1.91.72 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.26a2 2 0 0 1 2.11-.45c.9.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/></svg></a></div>`}
function managerRow(m){const checked=favorites.includes(m.id);const d=cleanNumber(m.number);return `<div class="manager-row"><button type="button" class="star ${checked?'active':''}" data-mstar="${esc(m.id)}" aria-label="${checked?'Remove':'Add'} ${esc(m.name)} favorite" aria-pressed="${checked}">${checked?'★':'☆'}</button><div class="manager-details"><b>${esc(m.name)}</b><small>${m.employee?'EMP # '+esc(m.employee)+' · ':''}${esc(m.number)}</small></div><a class="call-btn" href="tel:+1${d}" aria-label="Call ${esc(m.name)} at ${esc(m.number)}"><svg class="phone-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.13.96.37 1.91.72 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.26a2 2 0 0 1 2.11-.45c.9.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/></svg></a>${m.id.startsWith('user-manager-')?`<button type="button" class="delete" data-mdelete="${esc(m.id)}" aria-label="Delete personal manager ${esc(m.name)}">✕</button>`:''}</div>`}
function renderManagers(){const host=byId('managers-home');if(!host)return;const all=allManagers();const chosen=all.filter(m=>favorites.includes(m.id));const excerpt=chosen.length?chosen:all.filter(m=>/Sr. Mgr/.test(m.name));host.innerHTML=`<section class="mx-panel managers-panel" aria-labelledby="manager-heading"><div class="manager-head"><div><span class="eyebrow">FEDEX MX QUICK CONNECT</span><h2 id="manager-heading">MEMPHIS MANAGER LIST</h2><small>MEM Aircraft Line MX · April 2026 source</small></div><span class="manager-count">${all.length} entries</span></div><div class="favs-title"><span>★</span> ${chosen.length?'FAVORITE MANAGERS':'MANAGER QUICK VIEW'}</div><div class="manager-list">${excerpt.map(managerRow).join('')}</div><details class="manager-expand" id="manager-expand"><summary>View Full Manager List <span>⌄</span></summary><p class="help">Tap a star to add a manager to your personal favorites and to the Quick Connect speed dial. Add your own entries below.</p><div class="manager-list">${all.map(managerRow).join('')}</div><form id="add-manager" class="add-contact"><h3>ADD PERSONAL MANAGER</h3><div class="add-fields manager-fields"><input name="name" maxlength="60" placeholder="Manager name" aria-label="Manager name" required><input name="number" inputmode="tel" type="tel" maxlength="20" placeholder="7 digits or area code + number" aria-label="Manager phone" required><input name="employee" maxlength="15" placeholder="Employee # (optional)" aria-label="Employee number optional"></div><button class="add-button" type="submit">+ Add Manager</button></form></details><p class="manager-note">Favorites and personally added managers are saved on this device only. Published manager details should be checked for currency and approved for distribution before release.</p></section>`;}
byId('managers-home').addEventListener('click',e=>{const btn=e.target.closest('[data-mstar],[data-mdelete]');if(!btn)return;const id=btn.dataset.mstar||btn.dataset.mdelete;const wasOpen=!!byId('manager-expand')?.open;if(btn.hasAttribute('data-mstar')){favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];writeJSON(FAVORITES_KEY,favorites)}else{if(!confirm('Remove this personal manager?'))return;personalManagers=personalManagers.filter(m=>m.id!==id);writeJSON(PERSONAL_MANAGERS_KEY,personalManagers);favorites=favorites.filter(x=>x!==id);writeJSON(FAVORITES_KEY,favorites)}renderContacts();if(wasOpen)byId('manager-expand').open=true});
byId('managers-home').addEventListener('submit',e=>{if(e.target.id!=='add-manager')return;e.preventDefault();const f=new FormData(e.target);const name=String(f.get('name')||'').trim(),number=normalizedPhone(f.get('number')),employee=String(f.get('employee')||'').trim();if(!name||!number){toast('Enter a valid 7 or 10 digit phone number');return}personalManagers.push({id:'user-manager-'+Date.now(),name,number,employee,cat:'manager',icon:'♙'});writeJSON(PERSONAL_MANAGERS_KEY,personalManagers);renderContacts();byId('manager-expand').open=true;toast('Manager added on this device')});
function renderContacts(){const selected=favorites.map(id=>allContacts().find(x=>x.id===id)).filter(x=>x&&x.id!=='security');byId('contacts-home').innerHTML=`<section class="mx-panel" aria-label="Memphis MX contacts"><div class="mx-header"><div class="mx-logo"><span class="purple">Fed</span><span class="orange">Ex</span><small>MX</small></div><div class="mx-heading"><strong><span class="phone-emoji"><svg class="phone-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.13.96.37 1.91.72 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.26a2 2 0 0 1 2.11-.45c.9.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/></svg></span> FEDEX MX QUICK CONNECT</strong></div><button id="edit-favs" class="edit-btn"><span>★</span> Edit Favorites</button></div><div class="favs-title"><span>★</span> MY FAVORITES</div><div class="favs-grid">${selected.length?selected.map(favMarkup).join(''):'<p>Tap Edit Favorites to choose your speed-dial contacts.</p>'}</div><div class="mx-bottom"><button id="all-contacts" class="directory-btn"><span>☷ &nbsp; All Contacts (Phone List)</span><span class="arrow">›</span></button>${securityMarkup()}</div></section>`;byId('edit-favs').onclick=openDirectory;byId('all-contacts').onclick=openDirectory;renderManagers()}
function renderDirectory(){const needle=search.trim().toLowerCase();let arr=allContacts().filter(c=>(filter==='all'||(filter==='personal'?c.cat==='personal':c.cat===filter))&&(c.name+' '+c.number).toLowerCase().includes(needle));byId('directory-list').innerHTML=arr.length?arr.map(c=>`<div class="contact-row"><button class="star ${favorites.includes(c.id)?'active':''}" data-star="${esc(c.id)}" aria-label="${favorites.includes(c.id)?'Remove':'Add'} ${esc(c.name)} favorite" aria-pressed="${favorites.includes(c.id)}">${favorites.includes(c.id)?'★':'☆'}</button><div class="info"><b>${esc(c.name)}</b><small>${esc(c.number)}</small><span class="cat">${esc(c.cat.toUpperCase())}</span></div><button class="copy" data-copy="${esc(c.id)}" aria-label="Copy ${esc(c.number)}">⧉</button><a class="call-btn" href="tel:+${cleanNumber(c.number).replace(/^1(?=\d{10}$)/,'').replace(/^(?=\d{10}$)/,'1')}" aria-label="Call ${esc(c.name)}"><svg class="phone-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.13.96.37 1.91.72 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.26a2 2 0 0 1 2.11-.45c.9.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/></svg></a>${c.cat==='personal'?`<button class="delete" data-delete="${esc(c.id)}" aria-label="Delete ${esc(c.name)}">✕</button>`:''}</div>`).join(''):'<p class="help">No contacts match your search.</p>'}
function openDirectory(){byId('directory-modal').hidden=false;renderDirectory();/* Do not focus the search field on opening: prevents the iOS keyboard from obscuring contacts. */}
function closeDirectory(){byId('directory-modal').hidden=true;renderContacts()}
byId('close-dir').onclick=closeDirectory;
byId('directory-modal').addEventListener('click',e=>{if(e.target===byId('directory-modal'))closeDirectory()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!byId('directory-modal').hidden)closeDirectory()});
byId('contact-search').oninput=e=>{search=e.target.value;renderDirectory()};
document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));renderDirectory()});
byId('directory-list').onclick=e=>{let b=e.target.closest('[data-star],[data-copy],[data-delete]');if(!b)return;const id=b.dataset.star||b.dataset.copy||b.dataset.delete;const contact=allContacts().find(c=>c.id===id);if(!contact)return;if(b.dataset.star){favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];writeJSON(FAVORITES_KEY,favorites);renderDirectory();renderContacts()}else if(b.dataset.copy){copyNumber(contact.number)}else if(b.dataset.delete){if(!confirm('Delete personal contact '+contact.name+'?'))return;personal=personal.filter(c=>c.id!==id);favorites=favorites.filter(x=>x!==id);writeJSON(PERSONAL_KEY,personal);writeJSON(FAVORITES_KEY,favorites);renderDirectory();renderContacts()}};
byId('add-contact').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),name=String(f.get('name')||'').trim(),digits=cleanNumber(f.get('number'));if(!name||!(digits.length===10||digits.length===11&&digits.startsWith('1'))){toast('Use a 10-digit US phone number');return}const ten=digits.slice(-10);personal.push({id:'personal-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),name,number:ten.slice(0,3)+'-'+ten.slice(3,6)+'-'+ten.slice(6),cat:'personal',icon:'☎'});writeJSON(PERSONAL_KEY,personal);e.target.reset();filter='all';document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter==='all'));search='';byId('contact-search').value='';renderDirectory();toast('Personal contact saved')};
function renderUsage(){byId('opens').textContent=(Number(usage.opens)||0).toLocaleString();byId('views').textContent=(Number(usage.views)||0).toLocaleString();byId('breakdown').textContent=Object.entries(AIRCRAFT).map(([id,a])=>a.name+': '+(usage.byAircraft?.[id]||0)).join(' • ')}
function renderUtilities(){byId('utilities').innerHTML=UTIL.map(([k,v])=>`<div class="utility"><div class="k">${esc(k)}</div><div class="v">${/^901-/.test(v)?`<a href="tel:+1${cleanNumber(v)}">${esc(v)}</a>`:esc(v)}</div></div>`).join('')}
function tetherHTML(id){let items=TETHER[id],lengths=items.slice(0,-1);return `<section class="panel"><h2>TETHER SIZING (MEM ONLY)</h2><div class="tether">${lengths.map(x=>{let m=x.match(/^(.*?) \((.*?)\)$/);return `<div class="tether-row"><span>${m?'Tether · '+esc(m[2]):'Tether Length'}</span><strong>${esc(m?m[1]:x)}</strong></div>`}).join('')}<div class="tether-row"><span>Pet Rock</span><strong>${esc(items.at(-1))}</strong></div></div>${id==='b777'?'<p class="tether-note">When positioning a weight cart on a B777, the tether attach fittings on the weight cart must be positioned <strong>28″ forward of the center of the nose gear</strong>.</p>':''}</section>`}
function show(id,track=false){const a=AIRCRAFT[id];if(!a){byId('home').hidden=false;byId('detail').hidden=true;byId('subtitle').textContent='Select an aircraft type to view its reference card.';return}if(track){usage.views=(Number(usage.views)||0)+1;usage.byAircraft??={};usage.byAircraft[id]=(Number(usage.byAircraft[id])||0)+1;writeJSON(USAGE_KEY,usage);renderUsage()}
byId('home').hidden=true;byId('detail').hidden=false;byId('subtitle').textContent='Reference details • '+a.name;
byId('detail').innerHTML=`<article class="fleet-page" style="--fleet-bright:${a.color};--fleet-deep:${a.deep};--fleet-glow:${a.glow}"><button class="back" id="back">← All aircraft</button><div class="detail-header"><span class="eyebrow">AIRCRAFT TYPE</span><h2>${esc(a.name)}</h2></div><h3 class="fuel-loads-title">FUEL LOADS</h3><dl class="fuel-loads">${FUEL[id].map((x,i)=>`<div class="fuel-item"><dt>${esc(FUEL_LABELS[i])}</dt><dd>${esc(x)}</dd></div>`).join('')}</dl>${tetherHTML(id)}<section class="panel"><h2>TIRE PRESSURE REFERENCE VALUES</h2><div class="pressure-grid">${a.pressures.map(([k,v])=>`<div class="pressure"><small>${esc(k)}</small><strong>${esc(v)}</strong></div>`).join('')}</div><p class="muted-note">Values reproduced as labeled in the original card; verify units and applicability in approved manuals.</p></section><section class="panel"><h2>AIRCRAFT DETAILS & AMM</h2>${a.rows.map(([k,v,amm])=>`<div class="reference-row"><span>${esc(k)}</span><strong>${esc(v)}${amm?`<small>AMM ${esc(amm)}</small>`:''}</strong></div>`).join('')}</section><div class="desk"><div><small>CONTACT</small>${esc(a.desk)}</div><a href="tel:+1${cleanNumber(a.phone)}">${esc(a.phone)}</a></div><section class="detail-security"><strong>QUICK SECURITY CONTACT</strong>${securityMarkup()}</section><p class="disclaimer">Reference values are for convenience. Confirm all data against current approved AMM and company documentation before maintenance use.</p><div id="local-atis-detail"></div></article>`;
byId('back').onclick=()=>{history.pushState(null,'',location.pathname);show(null);scrollTo(0,0)};scrollTo(0,0)}
document.querySelectorAll('.aircraft-btn').forEach(b=>b.onclick=()=>{history.pushState(null,'','#'+b.dataset.id);show(b.dataset.id,true)});
window.addEventListener('popstate',()=>show(location.hash.slice(1)));

// Manager directory: seven-digit numbers get 901; already complete area codes are preserved.
const MANAGER_FAV_KEY='mx-manager-favorites-test-v1';
const MANAGER_CUSTOM_KEY='mx-manager-custom-test-v1';
let managerFavorites=readJSON(MANAGER_FAV_KEY,[]);
if(!Array.isArray(managerFavorites))managerFavorites=[];
let customManagers=readJSON(MANAGER_CUSTOM_KEY,[]);
if(!Array.isArray(customManagers))customManagers=[];
let managerSearch='';
function managerEntries(){return [...MANAGERS,...customManagers]}
function formatManagerNumber(value){
 const digits=String(value).replace(/\D/g,'');
 let d=digits.length===7?'901'+digits:digits.length===11&&digits[0]==='1'?digits.slice(1):digits;
 if(d.length!==10)return null;
 return d.slice(0,3)+'-'+d.slice(3,6)+'-'+d.slice(6);
}
function managerRow(m){
 const starred=managerFavorites.includes(m.id);
 return `<div class="manager-row"><button class="star ${starred?'active':''}" data-mgr-star="${esc(m.id)}" aria-label="${starred?'Remove':'Add'} ${esc(m.name)} favorite" aria-pressed="${starred}">${starred?'★':'☆'}</button><div class="manager-info"><b>${esc(m.name)}</b><small>EMP # ${esc(m.employee||'—')}</small><span>${esc(m.number)}</span></div><a class="call-btn" href="tel:+1${cleanNumber(m.number)}" aria-label="Call ${esc(m.name)}"><svg class="phone-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.13.96.37 1.91.72 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.26a2 2 0 0 1 2.11-.45c.9.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/></svg></a>${m.id.startsWith('custom-mgr-')?`<button class="delete" data-mgr-delete="${esc(m.id)}" aria-label="Remove ${esc(m.name)}">✕</button>`:''}</div>`;
}
function renderManagers(){
 const entries=managerEntries();
 const pinned=managerFavorites.map(id=>entries.find(m=>m.id===id)).filter(Boolean);
 const preview=pinned.length?pinned:entries.filter(m=>m.name.includes('Sr. Mgr')).slice(0,4);
 byId('managers-home').innerHTML=`<section class="manager-panel" aria-label="Memphis manager list"><div class="manager-head"><div><h2>♙ MEMPHIS MANAGER LIST</h2><p>MEM AIRCRAFT LINE MX • APRIL 2026</p></div><button class="edit-btn" id="edit-managers">★ Edit Favorites</button></div><div class="manager-preview">${preview.map(managerRow).join('')}</div><button class="directory-btn manager-open" id="open-managers"><span>☷ &nbsp; View Full Manager List (${entries.length})</span><span class="arrow">›</span></button></section>`;
 byId('edit-managers').onclick=openManagers;
 byId('open-managers').onclick=openManagers;
}
function renderManagerDirectory(){
 const term=managerSearch.trim().toLowerCase();
 const entries=managerEntries().filter(m=>(m.name+' '+m.employee+' '+m.number).toLowerCase().includes(term));
 byId('manager-list').innerHTML=entries.length?entries.map(managerRow).join(''):'<p class="help">No matching managers.</p>';
}
function openManagers(){
 byId('manager-modal').hidden=false;
 // Deliberately do not focus search; the iOS keyboard must stay closed.
 renderManagerDirectory();
}
function closeManagers(){byId('manager-modal').hidden=true;renderManagers()}
byId('close-managers').onclick=closeManagers;
byId('manager-modal').addEventListener('click',e=>{if(e.target===byId('manager-modal'))closeManagers()});
byId('manager-search').oninput=e=>{managerSearch=e.target.value;renderManagerDirectory()};
byId('manager-list').onclick=byId('managers-home').onclick=e=>{
 const button=e.target.closest('[data-mgr-star],[data-mgr-delete]');if(!button)return;
 const id=button.dataset.mgrStar||button.dataset.mgrDelete;
 const manager=managerEntries().find(m=>m.id===id);if(!manager)return;
 if(button.dataset.mgrStar){managerFavorites=managerFavorites.includes(id)?managerFavorites.filter(x=>x!==id):[...managerFavorites,id];writeJSON(MANAGER_FAV_KEY,managerFavorites)}
 else {if(!confirm('Remove your custom manager '+manager.name+'?'))return;customManagers=customManagers.filter(m=>m.id!==id);managerFavorites=managerFavorites.filter(x=>x!==id);writeJSON(MANAGER_CUSTOM_KEY,customManagers);writeJSON(MANAGER_FAV_KEY,managerFavorites)}
 renderManagers();renderManagerDirectory();
};
byId('add-manager').onsubmit=e=>{
 e.preventDefault();const form=new FormData(e.target);
 const name=String(form.get('name')||'').trim();
 const employee=String(form.get('employee')||'').trim();
 const number=formatManagerNumber(form.get('number'));
 if(!name||!number||employee&&!/^\d{1,10}$/.test(employee)){toast('Enter a name, valid phone number and optional numeric employee ID');return}
 const id='custom-mgr-'+Date.now()+'-'+Math.random().toString(36).slice(2,7);
 customManagers.push({id,name,employee,number});writeJSON(MANAGER_CUSTOM_KEY,customManagers);
 managerFavorites.push(id);writeJSON(MANAGER_FAV_KEY,managerFavorites);
 e.target.reset();managerSearch='';byId('manager-search').value='';renderManagers();renderManagerDirectory();toast('Manager added to favorites on this device');
};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!byId('manager-modal').hidden)closeManagers()});
renderManagers();

renderUtilities();renderUsage();renderContacts();show(location.hash.slice(1));
