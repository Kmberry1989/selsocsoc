(() => {
  if (window.__snugGardeningSystem) return;
  window.__snugGardeningSystem = true;

  const CROPS = {
    tomato: { name: "Sunny Tomato", seedCost: 5, minutes: 10, yield: [2,4], base: 6, unlock: 1, stages: 4, color: "#d95e4a", three: 0xd95e4a },
    carrot: { name: "Crunch Carrot", seedCost: 4, minutes: 8, yield: [2,4], base: 5, unlock: 1, stages: 3, color: "#df8737", three: 0xdf8737 },
    sunflower: { name: "Giggle Sunflower", seedCost: 8, minutes: 20, yield: [2,3], base: 14, unlock: 5, stages: 4, color: "#e2b43f", three: 0xe2b43f },
    pumpkin: { name: "Plump Pumpkin", seedCost: 12, minutes: 45, yield: [2,3], base: 26, unlock: 12, stages: 4, color: "#d67836", three: 0xd67836 },
    moonbloom: { name: "Moonbloom", seedCost: 30, minutes: 120, yield: [1,2], base: 90, unlock: 25, stages: 4, color: "#9188c0", three: 0x9188c0, night: true },
  };
  const TOOLS = {
    rusty: { name: "Rusty set", cost: 0, till: 900, golden: .04, unlock: 1 },
    sturdy: { name: "Sturdy set", cost: 80, till: 620, golden: .08, unlock: 8 },
    gleaming: { name: "Gleaming set", cost: 240, till: 390, golden: .12, unlock: 22 },
  };
  const RECIPES = {
    gardenSalad: { name: "Sunny Garden Salad", needs: { tomato: 2, carrot: 1 }, value: 36, color: "#719866" },
    harvestPie: { name: "Harvest Sun Pie", needs: { sunflower: 1, pumpkin: 1 }, value: 84, color: "#cf8d43" },
    moonTea: { name: "Moonbloom Tea", needs: { moonbloom: 1 }, value: 190, color: "#817ab0" },
  };
  const PROJECT = { name: "Moonlight Festival Feast", goal: 200 };
  const state = {
    session: null,
    profile: {},
    data: null,
    view: "plots",
    open: false,
    selected: 0,
    seedChoice: "tomato",
    busy: false,
    error: "",
    saveChain: Promise.resolve(),
    players: [],
    community: { total: 0, people: [] },
    world: null,
    group: null,
    worldScene: null,
    raycaster: null,
    pointer: null,
    renderer: null,
    rainWasActive: false,
    lastTick: 0,
    lastSocialPoll: 0,
    textureCache: new Map(),
    pointerHandler: null,
  };
  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = (value) => { const span = document.createElement("span"); span.textContent = String(value ?? ""); return span.innerHTML; };
  const dayKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
  const playerName = () => $(".profile-chip b")?.textContent?.trim() || state.session?.playerName || "Player";
  const coinBalance = () => Number(String($(".coin-chip b")?.textContent || "0").replace(/[^0-9.-]/g,"")) || 0;
  const isNight = () => $(".world-weather")?.classList.contains("night") || new Date().getHours() >= 19 || new Date().getHours() < 6;
  const isRaining = () => /rain|thunderstorm/i.test($(".world-weather")?.textContent || "") || $(".world-weather")?.classList.contains("storm");
  const unlockedPlots = () => Math.min(24, 4 + Math.floor((Math.max(1, state.data?.level || 1) - 1) / 2));
  const tool = () => TOOLS[state.data?.tool] || TOOLS.rusty;
  const stageDuration = (crop) => Math.max(30000, CROPS[crop].minutes * 60000 / (CROPS[crop].stages - 1));
  const xpNeeded = (level) => 22 + level * 8;

  function defaults() {
    return {
      version: 2, level: 1, xp: 0, tool: "rusty", compost: 0,
      seeds: { tomato: 4, carrot: 4, sunflower: 0, pumpkin: 0, moonbloom: 0 },
      produce: { tomato: 0, carrot: 0, sunflower: 0, pumpkin: 0, moonbloom: 0 },
      dishes: {}, plots: Array.from({length:24}, () => null),
      streak: 0, lastWaterDay: "", plantedCount: 0, harvestCount: 0, goldenHarvests: 0,
      helpfulPoints: 0, communityDonated: 0, lastHelpAt: 0,
    };
  }
  function normalize(raw) {
    const base = defaults();
    const value = raw && typeof raw === "object" ? raw : {};
    const plots = Array.from({length:24}, (_, index) => {
      const plot = Array.isArray(value.plots) ? value.plots[index] : null;
      if (!plot || !["untilled","tilled","planted","watered","ready"].includes(plot.state)) return null;
      if ((plot.state === "planted" || plot.state === "watered" || plot.state === "ready") && !CROPS[plot.crop]) return null;
      return { ...plot, stage: Math.max(0, Math.min(3, Number(plot.stage) || 0)) };
    });
    return {
      ...base, ...value,
      level: Math.max(1, Math.min(50, Number(value.level) || 1)),
      xp: Math.max(0, Number(value.xp) || 0),
      compost: Math.max(0, Number(value.compost) || 0),
      tool: TOOLS[value.tool] ? value.tool : "rusty",
      seeds: { ...base.seeds, ...(value.seeds || {}) },
      produce: { ...base.produce, ...(value.produce || {}) },
      dishes: { ...base.dishes, ...(value.dishes || {}) },
      plots,
    };
  }
  function gainXp(amount) {
    state.data.xp += amount;
    while (state.data.level < 50 && state.data.xp >= xpNeeded(state.data.level)) {
      state.data.xp -= xpNeeded(state.data.level);
      state.data.level += 1;
      toast(`Gardening level ${state.data.level} · new seeds or plots may be available`);
    }
  }
  function firestoreValue(value) {
    if (value === null || value === undefined) return { nullValue: null };
    if (typeof value === "boolean") return { booleanValue: value };
    if (typeof value === "number") return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
    if (typeof value === "string") return { stringValue: value };
    if (Array.isArray(value)) return { arrayValue: { values: value.map(firestoreValue) } };
    return { mapValue: { fields: Object.fromEntries(Object.entries(value).map(([key,item]) => [key,firestoreValue(item)])) } };
  }
  function decodeValue(value = {}) {
    if ("stringValue" in value) return value.stringValue;
    if ("integerValue" in value) return Number(value.integerValue);
    if ("doubleValue" in value) return Number(value.doubleValue);
    if ("booleanValue" in value) return value.booleanValue;
    if ("nullValue" in value) return null;
    if (value.arrayValue) return (value.arrayValue.values || []).map(decodeValue);
    if (value.mapValue) return Object.fromEntries(Object.entries(value.mapValue.fields || {}).map(([key,item]) => [key,decodeValue(item)]));
    return null;
  }
  const decodeFields = (fields = {}) => Object.fromEntries(Object.entries(fields).map(([key,value]) => [key,decodeValue(value)]));
  async function headers() {
    if (!state.session?.user) throw new Error("Waiting for Firebase sign-in");
    return { "Content-Type":"application/json", Authorization:`Bearer ${await state.session.user.getIdToken()}` };
  }
  function playerUrl(uid = state.session?.uid) {
    const project = state.session?.projectId || state.session?.app?.options?.projectId;
    return `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(project)}/databases/(default)/documents/players/${encodeURIComponent(uid)}`;
  }
  async function loadProfile(uid = state.session?.uid) {
    const response = await fetch(playerUrl(uid), { headers: await headers() });
    if (!response.ok) throw new Error(`Garden profile returned ${response.status}`);
    return decodeFields((await response.json()).fields || {});
  }
  async function patchProfile(fields) {
    const paths = Object.keys(fields).map(key => `updateMask.fieldPaths=${encodeURIComponent(key)}`).join("&");
    const response = await fetch(`${playerUrl()}?${paths}`, { method:"PATCH", headers:await headers(), body:JSON.stringify({ fields:Object.fromEntries(Object.entries(fields).map(([key,value])=>[key,firestoreValue(value)])) }) });
    if (!response.ok) throw new Error(`Garden save returned ${response.status}`);
  }
  function save(extra = {}) {
    if (!state.session) return Promise.reject(new Error("Waiting for Firebase sign-in"));
    state.busy = true;
    render();
    const payload = { gardening: state.data, ...extra };
    state.saveChain = state.saveChain.catch(()=>{}).then(() => patchProfile(payload)).then(() => {
      state.profile = { ...state.profile, ...payload };
      window.dispatchEvent(new CustomEvent("snug-player-patch", { detail: player => ({ ...player, ...payload }) }));
      state.error = "";
    }).catch(() => { state.error = "The garden could not reach Firebase. Your last action was not confirmed."; throw new Error(state.error); }).finally(() => { state.busy = false; syncWorld(true); render(); });
    return state.saveChain;
  }
  function databaseBase() {
    const options = state.session?.app?.options || {};
    return String(options.databaseURL || `https://${options.projectId || state.session?.projectId}-default-rtdb.firebaseio.com`).replace(/\/$/,"");
  }
  async function rtdb(path, options = {}) {
    const token = await state.session.user.getIdToken();
    const [pathPart,query=""] = String(path).split("?");
    const encoded = pathPart.split("/").map(encodeURIComponent).join("/");
    const response = await fetch(`${databaseBase()}/${encoded}.json${query?`?${query}`:""}`, { ...options, headers:{ "Content-Type":"application/json", Authorization:`Bearer ${token}` } });
    if (!response.ok) throw new Error(`Garden network returned ${response.status}`);
    return response.json().catch(()=>null);
  }
  async function gardenJournal(payload) {
    const text = `§GD§${JSON.stringify(payload)}`.slice(0,240);
    return rtdb("messages/plaza", { method:"POST", body:JSON.stringify({ uid:state.session.uid, name:playerName().slice(0,18), text, createdAt:Date.now() }) });
  }
  function toast(text) {
    let node = $(".garden-toast");
    if (!node) { node=document.createElement("div"); node.className="garden-toast"; node.setAttribute("role","status"); document.body.appendChild(node); }
    node.textContent=text; node.classList.add("show"); clearTimeout(toast.timer); toast.timer=setTimeout(()=>node.classList.remove("show"),2600);
  }
  function marketPrice(id) {
    const source = `${dayKey()}-${id}`;
    let hash = 0;
    for (let i=0;i<source.length;i+=1) hash=((hash<<5)-hash+source.charCodeAt(i))|0;
    const multiplier = .82 + (Math.abs(hash)%44)/100;
    return Math.max(1,Math.round(CROPS[id].base*multiplier));
  }
  function priceTrend(id) {
    const price=marketPrice(id), base=CROPS[id].base;
    return price>base?"Up today":price<base?"Down today":"Steady";
  }
  function updateStreak() {
    const today=dayKey();
    if (state.data.lastWaterDay===today) return;
    const yesterday=new Date(); yesterday.setDate(yesterday.getDate()-1);
    state.data.streak=state.data.lastWaterDay===dayKey(yesterday)?Math.max(1,Number(state.data.streak)||0)+1:1;
    state.data.lastWaterDay=today;
  }
  function advancePlot(plot, now=Date.now()) {
    if (!plot || plot.state!=="watered" || !plot.wateredAt || !CROPS[plot.crop]) return false;
    if (CROPS[plot.crop].night && !isNight()) return false;
    const elapsed=Math.min(8*3600000,Math.max(0,now-Number(plot.wateredAt)));
    if (elapsed<stageDuration(plot.crop)) { plot.progress=Math.min(1,elapsed/stageDuration(plot.crop)); return false; }
    plot.stage=Math.min(CROPS[plot.crop].stages-1,(Number(plot.stage)||0)+1);
    plot.progress=0; plot.wateredAt=0; plot.updatedAt=now;
    plot.state=plot.stage>=CROPS[plot.crop].stages-1?"ready":"planted";
    return true;
  }
  function advanceAll() {
    let changed=false;
    state.data?.plots?.forEach(plot=>{ if(advancePlot(plot)) changed=true; });
    if(changed) save().catch(()=>{}); else { syncWorld(); if(state.open&&state.view==="plots") render(); }
  }
  function weedDue(plot,index) {
    if (!plot || plot.state!=="tilled" || plot.weed===true) return false;
    const age=Date.now()-Number(plot.tilledAt||Date.now());
    return age>10*60000 && ((Math.floor(Number(plot.tilledAt||0)/60000)+index*7)%3===0);
  }
  function refreshWeeds() {
    let changed=false;
    state.data?.plots?.forEach((plot,index)=>{ if(weedDue(plot,index)){plot.weed=true;changed=true;} });
    if(changed) save().catch(()=>{});
  }
  async function till(index) {
    if (state.busy || index>=unlockedPlots() || state.data.plots[index]) return;
    state.data.plots[index]={state:"tilled",tilledAt:Date.now(),weed:false,fertilized:false}; gainXp(1);
    try { await save(); toast(`Plot ${index+1} tilled`); } catch {}
  }
  async function pullWeed(index) {
    const plot=state.data.plots[index]; if(!plot?.weed||state.busy)return;
    plot.weed=false; plot.tilledAt=Date.now(); state.data.compost+=1; gainXp(1);
    try{await save();toast("Weed pulled · +1 compost");}catch{}
  }
  async function fertilize(index) {
    const plot=state.data.plots[index]; if(!plot||plot.fertilized||state.data.compost<1||state.busy)return;
    state.data.compost-=1; plot.fertilized=true;
    try{await save();toast("Compost mixed in · harvest boosted 25%");}catch{}
  }
  async function plant(index) {
    const plot=state.data.plots[index], crop=CROPS[state.seedChoice];
    if(!plot||plot.state!=="tilled"||plot.weed||!crop||state.busy)return;
    if(state.data.level<crop.unlock)return toast(`Gardening level ${crop.unlock} unlocks ${crop.name}`);
    if(crop.night&&!isNight())return toast("Moonbloom seeds wake after dusk");
    if(Number(state.data.seeds[state.seedChoice]||0)<1)return toast(`Buy ${crop.name} seeds from Fern first`);
    state.data.seeds[state.seedChoice]-=1;
    state.data.plots[index]={...plot,state:"planted",crop:state.seedChoice,stage:0,progress:0,plantedAt:Date.now(),wateredAt:0};
    state.data.plantedCount+=1; gainXp(2);
    try{await save();window.dispatchEvent(new CustomEvent("snug-garden-planted",{detail:{crop:state.seedChoice}}));toast(`${crop.name} planted`);}catch{}
  }
  async function water(index, rain=false) {
    const plot=state.data.plots[index]; if(!plot||!CROPS[plot.crop]||!["planted"].includes(plot.state)||state.busy&&!rain)return false;
    plot.state="watered";plot.wateredAt=Date.now();plot.progress=0;plot.updatedAt=Date.now();
    updateStreak();gainXp(1);
    if(!rain){try{await save();toast(`${CROPS[plot.crop].name} watered · stage ${plot.stage+1} growing`);}catch{}};
    return true;
  }
  async function rainWater() {
    let count=0;
    for(let i=0;i<unlockedPlots();i+=1)if(await water(i,true))count+=1;
    if(count){try{await save();toast(`Rain watered ${count} garden plot${count===1?"":"s"}`);}catch{}}
  }
  async function harvest(index) {
    const plot=state.data.plots[index]; if(!plot||plot.state!=="ready"||state.busy)return;
    const crop=CROPS[plot.crop];let amount=crop.yield[0]+Math.floor(Math.random()*(crop.yield[1]-crop.yield[0]+1));
    if(plot.fertilized)amount=Math.ceil(amount*1.25);
    const golden=Math.random()<tool().golden;
    state.data.produce[plot.crop]=Number(state.data.produce[plot.crop]||0)+amount;
    if(golden)state.data.produce[plot.crop]+=1;
    state.data.harvestCount+=1;if(golden)state.data.goldenHarvests+=1;
    state.data.plots[index]={state:"tilled",tilledAt:Date.now(),weed:false,fertilized:false};gainXp(5+amount);
    try{await save();window.dispatchEvent(new CustomEvent("snug-garden-harvest",{detail:{crop:plot.crop,amount,golden}}));toast(`${amount} ${crop.name}${golden?" + a golden crop!":" harvested"}`);}catch{}
  }
  async function buySeeds(id) {
    const crop=CROPS[id];if(!crop||state.busy)return;
    if(state.data.level<crop.unlock)return toast(`Gardening level ${crop.unlock} required`);
    if(crop.night&&!isNight())return toast("Fern stocks Moonbloom seeds after dusk");
    if(coinBalance()<crop.seedCost)return toast(`You need ${crop.seedCost} shells`);
    state.data.seeds[id]=Number(state.data.seeds[id]||0)+3;
    window.dispatchEvent(new CustomEvent("snug-award-coins",{detail:{amount:-crop.seedCost,message:`Fern's seed packet · −${crop.seedCost} shells`}}));
    try{await save();toast(`${crop.name} packet · 3 seeds`);}catch{}
  }
  async function buyTool(id) {
    const next=TOOLS[id];if(!next||state.busy||state.data.tool===id)return;
    if(state.data.level<next.unlock)return toast(`Gardening level ${next.unlock} required`);
    if(coinBalance()<next.cost)return toast(`You need ${next.cost} shells`);
    state.data.tool=id;window.dispatchEvent(new CustomEvent("snug-award-coins",{detail:{amount:-next.cost,message:`${next.name} · −${next.cost} shells`}}));
    try{await save();toast(`${next.name} equipped`);}catch{}
  }
  async function sell(id,all=false) {
    const owned=Number(state.data.produce[id]||0),amount=all?owned:Math.min(1,owned);if(!amount||state.busy)return;
    const earned=amount*marketPrice(id);state.data.produce[id]-=amount;
    window.dispatchEvent(new CustomEvent("snug-award-coins",{detail:{amount:earned,message:`Barnaby bought ${amount} ${CROPS[id].name} · +${earned} shells`}}));
    try{await save();toast(`Sold for ${earned} shells at today's price`);}catch{}
  }
  async function cook(id) {
    const recipe=RECIPES[id];if(!recipe||state.busy)return;
    if(!Object.entries(recipe.needs).every(([crop,amount])=>Number(state.data.produce[crop]||0)>=amount))return toast("Your basket is missing an ingredient");
    Object.entries(recipe.needs).forEach(([crop,amount])=>state.data.produce[crop]-=amount);
    state.data.dishes[id]=Number(state.data.dishes[id]||0)+1;gainXp(3);
    try{await save();toast(`${recipe.name} cooked · worth ${recipe.value} shells`);}catch{}
  }
  async function sellDish(id) {
    const recipe=RECIPES[id];if(!recipe||Number(state.data.dishes[id]||0)<1||state.busy)return;
    state.data.dishes[id]-=1;window.dispatchEvent(new CustomEvent("snug-award-coins",{detail:{amount:recipe.value,message:`${recipe.name} served · +${recipe.value} shells`}}));
    try{await save();toast(`${recipe.value} shells earned`);}catch{}
  }
  async function packGift(id) {
    if(Number(state.data.produce[id]||0)<1||state.busy)return;
    const inventory=Array.isArray(state.profile.inventory)?[...state.profile.inventory]:Array.isArray(state.profile.owned)?[...state.profile.owned]:[];
    const token=`garden-${id}`;
    if(inventory.includes(token))return toast(`${CROPS[id].name} is already packed in your inventory`);
    inventory.push(token);state.data.produce[id]-=1;
    try{await save({inventory});state.profile.inventory=inventory;toast(`${CROPS[id].name} packed · open Mailbox to send it`);}catch{}
  }
  async function donate(id) {
    if(Number(state.data.produce[id]||0)<1||state.busy)return;
    state.data.produce[id]-=1;state.data.communityDonated=Number(state.data.communityDonated||0)+1;gainXp(2);
    try{await save();await loadCommunity();window.dispatchEvent(new CustomEvent("snug-project-contribution",{detail:{project:PROJECT.name,crop:id}}));toast(`${CROPS[id].name} added to the festival feast`);}catch{}
  }
  async function loadCommunity() {
    if(!state.session)return;
    try{
      const project=state.session.projectId||state.session.app?.options?.projectId;
      const response=await fetch(`https://firestore.googleapis.com/v1/projects/${encodeURIComponent(project)}/databases/(default)/documents/players?pageSize=100`,{headers:await headers()});
      if(!response.ok)throw new Error();
      const people=(await response.json()).documents?.map(doc=>decodeFields(doc.fields||{})).filter(profile=>Number(profile.gardening?.communityDonated||0)>0)||[];
      state.community.total=people.reduce((sum,p)=>sum+Number(p.gardening.communityDonated||0),0);
      state.community.people=people.map(p=>({name:String(p.name||"Neighbor").slice(0,18),amount:Number(p.gardening.communityDonated||0)})).sort((a,b)=>b.amount-a.amount).slice(0,8);
      render();
    }catch{}
  }
  async function sendHelp(uid,name) {
    if(!state.session||state.busy)return;
    try{await gardenJournal({t:"water",to:uid,from:state.session.uid,n:playerName().slice(0,18),at:Date.now()});state.data.helpfulPoints=Number(state.data.helpfulPoints||0)+1;gainXp(2);await save();toast(`You watered a thirsty plot for ${name}`);}catch{toast("That watering visit could not reach your neighbor");}
  }
  async function pollGardenHelp() {
    if(!state.session||Date.now()-state.lastSocialPoll<9000)return;
    state.lastSocialPoll=Date.now();
    try{
      const raw=await rtdb('messages/plaza?orderBy=%22createdAt%22&limitToLast=80');
      const events=Object.values(raw||{}).filter(item=>String(item.text||"").startsWith("§GD§")&&Number(item.createdAt||0)>Number(state.data.lastHelpAt||0)).sort((a,b)=>a.createdAt-b.createdAt);
      let changed=false;
      for(const entry of events){
        let payload;try{payload=JSON.parse(entry.text.slice(4));}catch{continue;}
        state.data.lastHelpAt=Math.max(Number(state.data.lastHelpAt||0),Number(entry.createdAt||0));
        if(payload.t==="water"&&payload.to===state.session.uid){
          const index=state.data.plots.findIndex(plot=>plot?.state==="planted"&&CROPS[plot.crop]);
          if(index>=0){const plot=state.data.plots[index];plot.state="watered";plot.wateredAt=Date.now();plot.progress=0;gainXp(1);toast(`${payload.n||"A neighbor"} watered plot ${index+1}`);changed=true;}
        }
      }
      if(events.length)changed=true;
      if(changed)save().catch(()=>{});
    }catch{}
  }

  function plotsMarkup() {
    const unlocked=unlockedPlots();
    const cards=Array.from({length:Math.max(4,unlocked)},(_,index)=>{
      if(index>=unlocked)return `<article class="garden-tile locked"><b>Plot ${index+1} locked</b><small>Reach gardening level ${Math.min(50,(index-3)*2+1)}</small></article>`;
      const plot=state.data.plots[index];
      if(!plot)return `<article class="garden-tile ${state.selected===index?"selected":""}" data-plot-card="${index}"><small>Plot ${index+1} · untilled</small><div class="garden-plot-art untilled"></div><div><h3>Wild ground</h3><p>Hold to loosen the soil. ${tool().name} takes ${(tool().till/1000).toFixed(1)} seconds.</p></div><div class="garden-tile-actions"><button type="button" class="hold-to-till" style="--hold-time:${tool().till}ms" data-till="${index}">Hold to till</button></div></article>`;
      if(plot.state==="tilled")return `<article class="garden-tile ${state.selected===index?"selected":""}" data-plot-card="${index}"><small>Plot ${index+1} · ${plot.weed?"weedy":"tilled"}</small><div class="garden-plot-art tilled">${plot.weed?'<i class="garden-weed"></i>':''}</div><div><h3>${plot.weed?"A weed moved in":"Prepared soil"}</h3><p>${plot.fertilized?"Compost boost ready.":"Add compost for 25% more produce."}</p></div><div class="garden-tile-actions">${plot.weed?`<button type="button" data-pull="${index}">Pull weed</button>`:`<button type="button" data-plant="${index}">Plant ${esc(CROPS[state.seedChoice].name)}</button>`}<button type="button" class="alt" data-fertilize="${index}" ${plot.fertilized||state.data.compost<1?"disabled":""}>Compost</button></div></article>`;
      const crop=CROPS[plot.crop],ready=plot.state==="ready",progress=ready?1:Number(plot.progress||0),dry=plot.state==="planted";
      return `<article class="garden-tile ${state.selected===index?"selected":""}" data-plot-card="${index}" style="--crop-color:${crop.color}"><small>Plot ${index+1} · ${ready?"ready":plot.state}</small><div class="garden-plot-art ${plot.state} stage-${plot.stage}"><i class="garden-sprout"><em class="garden-crop-mark"></em></i></div><div><h3>${esc(crop.name)}</h3><p>${ready?"Bouncing and ripe — harvest now.":dry?`Stage ${plot.stage+1} is thirsty; growth is paused.`:`Stage ${plot.stage+1} growing · ${Math.round(progress*100)}%`}</p><div class="garden-progress-line" style="--plot-progress:${Math.round(progress*100)}%"><i></i></div></div><div class="garden-tile-actions">${ready?`<button type="button" data-harvest="${index}">Harvest</button>`:`<button type="button" data-water="${index}" ${!dry?"disabled":""}>${dry?"Water":"Watered"}</button>`}</div></article>`;
    }).join("");
    return `<div class="garden-weather-note"><i aria-hidden="true"></i><span><b>${isRaining()?"Rain is watering every thirsty crop":"Crops never die when dry"}</b><small>${isNight()?"Moonbloom hours are active.":"Growth pauses safely until the next watering."}</small></span></div><div class="garden-toolstrip"><span><b>Planting seed: ${esc(CROPS[state.seedChoice].name)}</b><small>${state.data.seeds[state.seedChoice]||0} seeds in your pouch</small></span><select aria-label="Choose seed" data-seed-choice>${Object.entries(CROPS).filter(([,crop])=>state.data.level>=crop.unlock).map(([id,crop])=>`<option value="${id}" ${state.seedChoice===id?"selected":""}>${esc(crop.name)} (${state.data.seeds[id]||0})</option>`).join("")}</select></div><div class="garden-plots-grid">${cards}</div>`;
  }
  function shopMarkup() {
    const seedCards=Object.entries(CROPS).map(([id,crop])=>{const locked=state.data.level<crop.unlock||(crop.night&&!isNight());return `<article class="garden-catalog-card" style="--item-color:${crop.color}"><i class="garden-seed-art" aria-hidden="true"></i><span><b>${esc(crop.name)} packet</b><small>3 seeds · ${crop.minutes} min across ${crop.stages} stages${crop.night?" · night stock":""}</small><strong>${locked?`Level ${crop.unlock}${crop.night?" · after dusk":""}`:`${crop.seedCost} shells · ${state.data.seeds[id]||0} owned`}</strong></span><button type="button" class="garden-buy" data-buy-seed="${id}" ${locked||state.busy?"disabled":""}>Buy</button></article>`;}).join("");
    const toolCards=Object.entries(TOOLS).map(([id,item])=>`<article class="garden-catalog-card" style="--item-color:#687c67"><i class="garden-seed-art" aria-hidden="true"></i><span><b>${item.name}</b><small>${(item.till/1000).toFixed(1)}s till · ${Math.round(item.golden*100)}% golden-crop chance</small><strong>${state.data.tool===id?"Equipped":item.cost?`${item.cost} shells · level ${item.unlock}`:"Starter tool"}</strong></span><button type="button" class="garden-buy" data-buy-tool="${id}" ${state.data.tool===id||state.data.level<item.unlock||state.busy?"disabled":""}>${state.data.tool===id?"Using":"Buy"}</button></article>`).join("");
    return `<div class="garden-catalog"><div class="market-banner"><span><b>Fern Bramble’s seed cart</b><small>Packets hold three seeds. Moonbloom stock appears at night.</small></span><strong>${coinBalance()} shells</strong></div>${seedCards}<div class="garden-eyebrow">Tools</div>${toolCards}</div>`;
  }
  function inventoryStrip() {return `<div class="garden-inventory-strip">${Object.entries(CROPS).map(([id,crop])=>`<span>${esc(crop.name)} · ${state.data.produce[id]||0}</span>`).join("")}</div>`;}
  function marketMarkup() {return `<div class="garden-market"><div class="market-banner"><span><b>Barnaby’s daily market board</b><small>Prices reset with the local day. Cooked dishes pay more than raw crops.</small></span><strong>${dayKey()}</strong></div>${inventoryStrip()}${Object.entries(CROPS).map(([id,crop])=>`<article class="garden-market-row" style="--item-color:${crop.color}"><i class="garden-produce-art" aria-hidden="true"></i><span><b>${esc(crop.name)}</b><small>${priceTrend(id)} · ${state.data.produce[id]||0} in basket</small><strong>${marketPrice(id)} shells each</strong></span><div><button type="button" class="garden-sell" data-sell="${id}" ${!state.data.produce[id]||state.busy?"disabled":""}>Sell one</button><button type="button" class="garden-gift" data-gift="${id}" ${!state.data.produce[id]||state.busy?"disabled":""}>Pack gift</button></div></article>`).join("")}</div>`;}
  function kitchenMarkup(){return `<div class="garden-recipes">${inventoryStrip()}${Object.entries(RECIPES).map(([id,recipe])=>{const needed=Object.entries(recipe.needs).map(([crop,amount])=>`${amount} ${CROPS[crop].name}`).join(" + ");const can=Object.entries(recipe.needs).every(([crop,amount])=>Number(state.data.produce[crop]||0)>=amount);return `<article class="garden-recipe" style="--item-color:${recipe.color}"><i class="garden-recipe-art" aria-hidden="true"></i><span><b>${esc(recipe.name)}</b><small>${esc(needed)} · serves for ${recipe.value} shells</small><strong>${state.data.dishes[id]||0} cooked</strong></span><div><button type="button" class="garden-cook" data-cook="${id}" ${!can||state.busy?"disabled":""}>Cook</button><button type="button" class="garden-sell" data-sell-dish="${id}" ${!state.data.dishes[id]||state.busy?"disabled":""}>Serve</button></div></article>`;}).join("")}</div>`;}
  function socialMarkup(){const friends=state.players.filter(p=>p.uid&&p.uid!==state.session?.uid);return `<div class="garden-social"><div class="garden-streak"><strong>${state.data.streak||0}</strong><span><b>day green-thumb streak</b><small>Water at least one crop each local day. Rain counts.</small></span></div><div class="garden-project-card"><span><b>Helpful points · ${state.data.helpfulPoints||0}</b><small>Visit a neighbor and water their next thirsty crop. Both gardeners earn XP.</small></span></div>${friends.length?friends.map(friend=>`<article class="garden-friend"><span class="garden-seed-art" style="--item-color:${esc(friend.outfit||"#6f9670")}" aria-hidden="true"></span><span><b>${esc(friend.name||"Neighbor")}</b><small>Online in this room · watering visit</small></span><button type="button" class="garden-help" data-help="${esc(friend.uid)}" data-help-name="${esc(friend.name||"Neighbor")}">Water</button></article>`).join(""):'<div class="garden-empty">No friends are in this room right now. Their gardens will appear here when they join.</div>'}</div>`;}
  function projectMarkup(){const percent=Math.min(100,Math.round(state.community.total/PROJECT.goal*100));const produceOptions=Object.entries(CROPS).filter(([id])=>Number(state.data.produce[id]||0)>0);return `<div class="garden-social"><article class="garden-project-card"><span><b>${PROJECT.name}</b><small>Everyone’s harvested crops fill one shared table for Pip Parade’s festival.</small></span><strong>${state.community.total}/${PROJECT.goal}</strong><div class="garden-project-meter" style="--project-progress:${percent}%"><i></i></div></article>${produceOptions.length?produceOptions.map(([id,crop])=>`<article class="garden-market-row" style="--item-color:${crop.color}"><i class="garden-produce-art" aria-hidden="true"></i><span><b>Donate ${esc(crop.name)}</b><small>${state.data.produce[id]} available · your total ${state.data.communityDonated||0}</small></span><button type="button" class="garden-donate" data-donate="${id}">Donate one</button></article>`).join(""):'<div class="garden-empty">Harvest a crop, then bring one here for the shared feast.</div>'}<div class="garden-eyebrow">Garden contributors</div>${state.community.people.length?`<ul class="garden-community-list">${state.community.people.map(person=>`<li><span>${esc(person.name)}</span><b>${person.amount} crops</b></li>`).join("")}</ul>`:'<div class="garden-empty">No crops have been donated yet. The first serving platter is waiting.</div>'}</div>`;}
  function render(){
    const panel=$(".garden-system-sheet");if(!panel||!state.data)return;
    const level=state.data.level,percent=level>=50?100:Math.round(state.data.xp/xpNeeded(level)*100);
    const content=state.view==="plots"?plotsMarkup():state.view==="shop"?shopMarkup():state.view==="market"?marketMarkup():state.view==="kitchen"?kitchenMarkup():state.view==="neighbors"?socialMarkup():projectMarkup();
    panel.innerHTML=`<div class="garden-system-grabber"></div><header class="garden-system-head"><div><small>Beside your house</small><h2>Your garden</h2></div><button type="button" data-garden-close aria-label="Close garden">×</button></header><div class="garden-summary"><div class="garden-level" style="--garden-xp:${percent}%"><b>${level}</b><span><small>Gardening level · ${level>=50?"master gardener":`${state.data.xp}/${xpNeeded(level)} XP`}</small><i></i></span></div><div class="garden-stat"><small>Plots</small><b>${unlockedPlots()} / 24</b></div><div class="garden-stat"><small>Compost</small><b>${state.data.compost}</b></div><div class="garden-stat"><small>Tools</small><b>${tool().name.replace(" set","")}</b></div></div><nav class="garden-system-tabs" aria-label="Garden sections">${[["plots","Plots"],["shop","Fern’s Cart"],["market","Market"],["kitchen","Kitchen"],["neighbors","Neighbors"],["project","Feast"]].map(([id,label])=>`<button type="button" data-garden-view="${id}" class="${state.view===id?"active":""}">${label}</button>`).join("")}</nav><main class="garden-system-main">${state.error?`<div class="garden-alert" role="status">${esc(state.error)}</div>`:""}${content}</main>`;
    bindPanel(panel);
  }
  function bindPanel(panel){
    $("[data-garden-close]",panel)?.addEventListener("click",close);
    panel.querySelectorAll("[data-garden-view]").forEach(button=>button.addEventListener("click",()=>{state.view=button.dataset.gardenView;render();if(state.view==="project")loadCommunity();}));
    $("[data-seed-choice]",panel)?.addEventListener("change",event=>{state.seedChoice=event.target.value;render();});
    panel.querySelectorAll("[data-plot-card]").forEach(card=>card.addEventListener("click",event=>{if(!event.target.closest("button,select")){state.selected=Number(card.dataset.plotCard);render();}}));
    panel.querySelectorAll("[data-pull]").forEach(button=>button.addEventListener("click",()=>pullWeed(Number(button.dataset.pull))));
    panel.querySelectorAll("[data-fertilize]").forEach(button=>button.addEventListener("click",()=>fertilize(Number(button.dataset.fertilize))));
    panel.querySelectorAll("[data-plant]").forEach(button=>button.addEventListener("click",()=>plant(Number(button.dataset.plant))));
    panel.querySelectorAll("[data-water]").forEach(button=>button.addEventListener("click",()=>water(Number(button.dataset.water))));
    panel.querySelectorAll("[data-harvest]").forEach(button=>button.addEventListener("click",()=>harvest(Number(button.dataset.harvest))));
    panel.querySelectorAll("[data-buy-seed]").forEach(button=>button.addEventListener("click",()=>buySeeds(button.dataset.buySeed)));
    panel.querySelectorAll("[data-buy-tool]").forEach(button=>button.addEventListener("click",()=>buyTool(button.dataset.buyTool)));
    panel.querySelectorAll("[data-sell]").forEach(button=>button.addEventListener("click",()=>sell(button.dataset.sell)));
    panel.querySelectorAll("[data-gift]").forEach(button=>button.addEventListener("click",()=>packGift(button.dataset.gift)));
    panel.querySelectorAll("[data-cook]").forEach(button=>button.addEventListener("click",()=>cook(button.dataset.cook)));
    panel.querySelectorAll("[data-sell-dish]").forEach(button=>button.addEventListener("click",()=>sellDish(button.dataset.sellDish)));
    panel.querySelectorAll("[data-donate]").forEach(button=>button.addEventListener("click",()=>donate(button.dataset.donate)));
    panel.querySelectorAll("[data-help]").forEach(button=>button.addEventListener("click",()=>sendHelp(button.dataset.help,button.dataset.helpName)));
    panel.querySelectorAll("[data-till]").forEach(button=>{
      let timer=0;const stop=()=>{clearTimeout(timer);timer=0;button.classList.remove("holding");};
      button.addEventListener("pointerdown",event=>{event.preventDefault();button.classList.add("holding");timer=setTimeout(()=>{stop();till(Number(button.dataset.till));},tool().till);});
      ["pointerup","pointercancel","pointerleave"].forEach(name=>button.addEventListener(name,stop));
    });
  }
  function open(view=state.view,selected=null){
    if(!state.data)return toast("Your garden is waiting for Firebase sign-in");
    $(".town-life-backdrop")?.remove();$(".mailbox-backdrop")?.remove();close();
    if(selected!==null){state.selected=selected;view="plots";}state.view=view;state.open=true;
    const backdrop=document.createElement("div");backdrop.className="garden-system-backdrop";backdrop.addEventListener("pointerdown",event=>{if(event.target===backdrop)close();});
    const panel=document.createElement("section");panel.className="garden-system-sheet";panel.setAttribute("role","dialog");panel.setAttribute("aria-modal","true");panel.setAttribute("aria-label","Gardening");backdrop.appendChild(panel);document.body.appendChild(backdrop);document.body.classList.add("garden-system-open");render();
  }
  function close(){$(".garden-system-backdrop")?.remove();state.open=false;document.body.classList.remove("garden-system-open");}
  function renderDock(){let dock=$(".garden-dock");if(!dock){dock=document.createElement("button");dock.type="button";dock.className="garden-dock";dock.innerHTML='<i aria-hidden="true"></i><b>Garden</b><em></em>';dock.addEventListener("click",()=>open("plots"));document.body.appendChild(dock);}const start=document.querySelector(".start-screen,.start-overlay,[data-start-screen],.title-screen");dock.hidden=window.__snugWorld?.mode!=="village"||Boolean(start&&getComputedStyle(start).display!=="none"&&getComputedStyle(start).visibility!=="hidden"&&Number(getComputedStyle(start).opacity||1)>.04);const ready=state.data?.plots?.filter(plot=>plot?.state==="ready").length||0;const badge=$("em",dock);badge.textContent=ready?String(ready):"";badge.hidden=!ready;}

  function cropTexture(THREE,id,stage,ready){
    const key=`${id}-${stage}-${ready}`;if(state.textureCache.has(key))return state.textureCache.get(key);
    const canvas=document.createElement("canvas");canvas.width=256;canvas.height=256;const c=canvas.getContext("2d");
    const crop=CROPS[id];c.clearRect(0,0,256,256);c.lineCap="round";c.lineJoin="round";
    c.strokeStyle="#27362c";c.lineWidth=10;c.beginPath();c.moveTo(128,226);c.lineTo(128,116-stage*13);c.stroke();
    const leaves=stage===0?1:2+stage*2;c.fillStyle="#5f9460";c.strokeStyle="#27362c";c.lineWidth=6;
    for(let i=0;i<leaves;i+=1){const side=i%2?1:-1,y=188-Math.floor(i/2)*32;c.beginPath();c.ellipse(128+side*28,y,31,14,side*.45,0,Math.PI*2);c.fill();c.stroke();}
    if(stage>=2){
      c.fillStyle=crop.color;c.strokeStyle="#27362c";c.lineWidth=7;
      if(id==="sunflower"||id==="moonbloom"){const petals=id==="sunflower"?10:7;for(let i=0;i<petals;i+=1){const a=i/petals*Math.PI*2;c.save();c.translate(128,78);c.rotate(a);c.beginPath();c.ellipse(0,-34,13,27,0,0,Math.PI*2);c.fill();c.stroke();c.restore();}c.fillStyle=id==="sunflower"?"#654729":"#f0d975";c.beginPath();c.arc(128,78,24,0,Math.PI*2);c.fill();c.stroke();}
      else {const count=stage>=3?3:1;for(let i=0;i<count;i+=1){c.beginPath();c.arc(128+(i-1)*34,88+(i%2)*12,id==="pumpkin"?25:19,0,Math.PI*2);c.fill();c.stroke();}}
      if(ready){c.strokeStyle="#f4d36a";c.lineWidth=7;for(let i=0;i<5;i+=1){const a=i/5*Math.PI*2;c.beginPath();c.moveTo(128+Math.cos(a)*58,84+Math.sin(a)*58);c.lineTo(128+Math.cos(a)*78,84+Math.sin(a)*78);c.stroke();}}
    }
    const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;state.textureCache.set(key,texture);return texture;
  }
  let gardeningThreePromise;
  async function syncWorld(force=false){
    const world=window.__snugWorld;if(!world?.scene||world.mode!=="village"||!state.data)return;
    let THREE=window.__snugThree;
    if(typeof THREE?.BoxGeometry!=="function"){
      gardeningThreePromise ||= import("./vendor/three/three.module.js");
      try{THREE=await gardeningThreePromise;}catch{return;}
    }
    if(world!==window.__snugWorld||!world.scene)return;
    world.scene.getObjectByName("PlayerGardenGrowth")&&(world.scene.getObjectByName("PlayerGardenGrowth").visible=false);
    const signature=state.data.plots.slice(0,unlockedPlots()).map(plot=>plot?`${plot.state}:${plot.crop||""}:${plot.stage||0}:${plot.weed?1:0}`:"empty").join("|");
    if(!force&&state.group?.userData.signature===signature&&state.worldScene===world.scene)return;
    if(state.group){state.group.parent?.remove(state.group);state.group.traverse(node=>{node.geometry?.dispose?.();if(node.material){const mats=Array.isArray(node.material)?node.material:[node.material];mats.forEach(mat=>mat.dispose?.());}});}
    const group=new THREE.Group();group.name="SnugGardeningSystem";group.userData.signature=signature;
    for(let index=0;index<unlockedPlots();index+=1){const col=index%4,row=Math.floor(index/4),plot=state.data.plots[index];const cell=new THREE.Group();cell.position.set(4.1+col*1.12,0.05,6.65+row*1.12);cell.userData.gardenPlot=index;
      const soilColor=!plot?0x8a7150:plot.state==="watered"?0x4c382e:0x6d4a35;const base=new THREE.Mesh(new THREE.BoxGeometry(1.02,.16,1.02),new THREE.MeshStandardMaterial({color:soilColor,roughness:.98}));base.position.y=.08;base.receiveShadow=true;base.userData.gardenPlot=index;cell.add(base);
      const border=new THREE.LineSegments(new THREE.EdgesGeometry(base.geometry),new THREE.LineBasicMaterial({color:0x312a24,transparent:true,opacity:.55}));border.position.copy(base.position);cell.add(border);
      if(plot?.weed){const weed=new THREE.Sprite(new THREE.SpriteMaterial({map:cropTexture(THREE,"carrot",1,false),transparent:true,alphaTest:.03,depthWrite:false}));weed.position.set(0,.44,0);weed.scale.set(.58,.75,1);cell.add(weed);}
      if(plot?.crop){const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:cropTexture(THREE,plot.crop,plot.stage,plot.state==="ready"),transparent:true,alphaTest:.03,depthWrite:false}));sprite.position.set(0,.62+plot.stage*.1,0);sprite.scale.set(.72+plot.stage*.14,.82+plot.stage*.2,1);sprite.userData.gardenPlot=index;cell.add(sprite);}
      group.add(cell);
    }
    world.scene.add(group);state.group=group;state.worldScene=world.scene;installPicking(world,THREE);
  }
  function installPicking(world,THREE){const element=world.renderer?.domElement;if(!element||state.renderer===element)return;if(state.renderer&&state.pointerHandler)state.renderer.removeEventListener("pointerup",state.pointerHandler,true);state.renderer=element;state.raycaster=new THREE.Raycaster();state.pointer=new THREE.Vector2();state.pointerHandler=event=>{if(!state.group||state.open)return;const rect=element.getBoundingClientRect();state.pointer.set((event.clientX-rect.left)/rect.width*2-1,-((event.clientY-rect.top)/rect.height*2-1));state.raycaster.setFromCamera(state.pointer,world.camera);const hit=state.raycaster.intersectObject(state.group,true)[0];if(!hit)return;let node=hit.object;while(node&&!Number.isInteger(node.userData?.gardenPlot))node=node.parent;if(Number.isInteger(node?.userData?.gardenPlot)){event.preventDefault();event.stopPropagation();open("plots",node.userData.gardenPlot);}};element.addEventListener("pointerup",state.pointerHandler,true);}
  function animate(time){state.world=window.__snugWorld||state.world;if(time-state.lastTick>5000){state.lastTick=time;advanceAll();refreshWeeds();const rain=isRaining();if(rain&&!state.rainWasActive)rainWater();state.rainWasActive=rain;pollGardenHelp();renderDock();syncWorld();}if(state.group)state.group.children.forEach((cell,index)=>{const plot=state.data?.plots[index];if(plot?.state==="ready")cell.position.y=.05+Math.sin(time*.004+index)*.025;else cell.position.y=.05;});requestAnimationFrame(animate);}
  async function attach(session){state.session=session;try{state.profile=await loadProfile();state.data=normalize(state.profile.gardening);}catch{state.profile={};state.data=defaults();state.error="Garden data could not be loaded from Firebase.";}renderDock();syncWorld(true);pollGardenHelp();}
  window.addEventListener("snug-session",event=>attach(event.detail));
  window.addEventListener("snug-remote-players",event=>{state.players=Array.isArray(event.detail?.players)?event.detail.players:[];if(state.open&&state.view==="neighbors")render();});
  ["snug-world-ready","snug-world-expanded","cylindric-world-layout-applied"].forEach(name=>window.addEventListener(name,event=>{state.world=event.detail||window.__snugWorld;[0,180,700].forEach(delay=>setTimeout(()=>syncWorld(true),delay));renderDock();}));
  window.addEventListener("pointerdown",event=>{const button=event.target.closest?.("[data-town-view='garden']");if(!button)return;event.preventDefault();event.stopImmediatePropagation();$(".town-life-backdrop")?.remove();open("plots");},true);
  window.addEventListener("keydown",event=>{if(event.key==="Escape"&&state.open)close();});
  if(window.__snugSession)attach(window.__snugSession);else state.data=defaults();
  renderDock();requestAnimationFrame(animate);
  window.__snugGarden={open,refresh:()=>attach(state.session),crops:CROPS,get state(){return state.data;}};
})();
