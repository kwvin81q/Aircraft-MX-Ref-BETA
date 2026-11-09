/* LOCAL ATIS reference widget (temperature from NWS station observation, not broadcast ATIS).
   Fail-safe: refresh ends after 9 seconds, including when a browser/network fetch hangs.
   KMEM field elevation is FAA published 340.9 feet MSL, displayed rounded to 341 feet.
*/
(() => {
  'use strict';
  const KEY = 'mx-local-airport-v2';
  const CACHE = 'mx-local-airport-last-observation-v2';
  const TIMEOUT_MS = 9000;
  const MAX_OBSERVATION_AGE_MS = 90 * 60 * 1000;
  const KNOWN_AIRPORTS = {KMEM:{name:'Memphis International',elev:341}};
  let airport='KMEM', last=null, busy=false, errorMessage='', sequence=0;
  try {const v=localStorage.getItem(KEY);if(v&&/^[A-Z]{4}$/.test(v))airport=v;}catch(e){}
  try {const v=JSON.parse(localStorage.getItem(CACHE)||'null');if(v&&v.airport===airport)last=v;}catch(e){}
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const validNum=v=>typeof v==='number'&&Number.isFinite(v)?v:null;
  const stamp=iso=>{
    if(!iso||!Number.isFinite(Date.parse(iso)))return 'Not received';
    return new Intl.DateTimeFormat('en-US',{dateStyle:'medium',timeStyle:'short',timeZone:'America/Chicago',timeZoneName:'short'}).format(new Date(iso));
  };
  const isCurrent=()=>last?.airport===airport&&validNum(last.c)!==null&&Number.isFinite(Date.parse(last.time))&&Date.now()-Date.parse(last.time)>=0&&Date.now()-Date.parse(last.time)<MAX_OBSERVATION_AGE_MS;
  const elevation=()=>KNOWN_AIRPORTS[airport]?.elev??(last?.airport===airport?validNum(last.elev):null);
  const stationName=()=>KNOWN_AIRPORTS[airport]?.name??(last?.airport===airport?last.name:'')??'';
  function panelMarkup(){
    const good=isCurrent(),elev=elevation();
    return `<section class="local-atis-panel" aria-label="Local ATIS airport reference and observed temperature">
      <div class="local-atis-head"><div><h2>LOCAL ATIS</h2><p>${esc(airport)}${stationName()?' · '+esc(stationName()):' · Airport reference'}</p></div>
        <button type="button" class="atis-pencil" data-atis-toggle>✎ Change airport</button></div>
      <div class="local-atis-grid atis-3">
        <div class="local-atis-item"><small>Temperature °F</small><b>${good?Math.round(last.c*9/5+32)+'°F':'—'}</b></div>
        <div class="local-atis-item"><small>Temperature °C</small><b>${good?Math.round(last.c)+'°C':'—'}</b></div>
        <div class="local-atis-item"><small>Field elevation</small><b>${elev===null?'—':Math.round(elev)+' ft MSL'}</b></div>
      </div>
      <div class="atis-actions"><div class="atis-observation" role="status" aria-live="polite"><b>${busy?'Checking latest airport observation…':good?'Latest reported temperature':errorMessage||'Temperature unavailable'}</b>
        <small>Observation: ${last?.airport===airport?esc(stamp(last.time)):'Not received'}</small>
        <small>${good?'Source: NWS airport station observation · not broadcast ATIS':'No current temperature verified — do not rely on a stale report'}</small></div>
        <button type="button" data-atis-refresh class="atis-refresh" ${busy?'disabled aria-busy="true"':''}>${busy?'Refreshing…':'↻ Refresh'}</button></div>
      <form class="atis-config" data-atis-form hidden><label for="atis-airport-${airport}">Airport ICAO code</label><input id="atis-airport-${airport}" name="airport" maxlength="4" minlength="4" pattern="[A-Za-z]{4}" required autocomplete="off" autocapitalize="characters" value="${esc(airport)}" placeholder="KMEM"><button type="submit">Save airport</button></form>
      <p class="local-atis-foot">Temperature uses the latest available NWS airport observation, not an ATIS broadcast. Field elevation is airport reference data. Confirm operational values using approved sources.</p>
    </section>`;
  }
  function render(){for(const id of ['local-atis-home','local-atis-detail']){const host=document.getElementById(id);if(host)host.innerHTML=panelMarkup();}}
  async function refresh(){
    if(busy)return;
    const token=++sequence, target=airport;
    busy=true;errorMessage='';render();
    const controller=new AbortController();
    let timer;
    const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(new Error('Weather service timed out — tap Refresh to retry'));},TIMEOUT_MS);});
    try {
      // A single observation request is enough to show temperature. Metadata should never block it.
      const job=(async()=>{
        const url=`https://api.weather.gov/stations/${encodeURIComponent(target)}/observations/latest`;
        const response=await fetch(url,{headers:{Accept:'application/geo+json'},cache:'no-store',signal:controller.signal});
        if(!response.ok)throw new Error(`Weather service unavailable (HTTP ${response.status})`);
        const payload=await response.json();
        const props=payload?.properties||{};
        const c=validNum(props.temperature?.value),time=props.timestamp;
        if(c===null||!Number.isFinite(Date.parse(time)))throw new Error('Temperature missing from airport observation');
        return {airport:target,c,time,elev:KNOWN_AIRPORTS[target]?.elev??null,name:KNOWN_AIRPORTS[target]?.name??''};
      })();
      const next=await Promise.race([job,timeout]);
      if(token!==sequence||target!==airport)return;
      last=next;
      if(isCurrent()) {try{localStorage.setItem(CACHE,JSON.stringify(last));}catch(e){}}
      else errorMessage='Airport observation is older than 90 minutes';
    }catch(e){
      if(token===sequence&&target===airport){errorMessage=e?.name==='AbortError'?'Weather request timed out — tap Refresh to retry':(e?.message||'Unable to retrieve airport temperature');}
    }finally {
      clearTimeout(timer);controller.abort();
      if(token===sequence){busy=false;render();}
    }
  }
  document.addEventListener('click',e=>{
    const r=e.target.closest('[data-atis-refresh]');if(r){refresh();return;}
    const t=e.target.closest('[data-atis-toggle]');if(t){const form=t.closest('.local-atis-panel')?.querySelector('[data-atis-form]');if(form){form.hidden=!form.hidden;if(!form.hidden)form.querySelector('input')?.focus();}}
  });
  document.addEventListener('submit',e=>{
    if(!e.target.matches('[data-atis-form]'))return;
    e.preventDefault();const v=String(new FormData(e.target).get('airport')||'').toUpperCase().trim();
    if(!/^[A-Z]{4}$/.test(v))return;
    // Cancel any active request and let the next selected airport start cleanly.
    sequence++;busy=false;airport=v;last=null;errorMessage='';
    try{localStorage.setItem(KEY,airport);}catch(e){}
    render();refresh();
  });
  const detail=document.getElementById('detail');
  if(detail)new MutationObserver(()=>{const host=document.getElementById('local-atis-detail');if(host&&!host.querySelector('.local-atis-panel'))host.innerHTML=panelMarkup();}).observe(detail,{childList:true});
  render();refresh();
})();
