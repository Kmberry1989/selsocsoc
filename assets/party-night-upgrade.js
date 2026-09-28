(() => {
  "use strict";

  const EXPRESSIONS = ["calm", "blink", "happy", "cheeky", "yawn", "angry", "laughter", "sad", "side-eye"];
  const LABELS = { calm: "Calm", blink: "Blink", happy: "Happy", cheeky: "Cheeky", yawn: "Yawn", angry: "Angry", laughter: "Laughter", sad: "Sad", "side-eye": "Side-eye" };
  const PRIORITY = { calm: 0, blink: 1, yawn: 2, happy: 4, cheeky: 5, "side-eye": 5, sad: 6, angry: 7, laughter: 8 };
  const SETTINGS_KEY = "snug-party-settings-v1";
  const PORTRAIT_KEY = "snug-portrait-preferences-v1";
  const PORTRAIT_SET_KEY = "snug-portrait-set-v1";
  const state = {
    mode: "title",
    expression: "calm",
    expressionUntil: 0,
    expressionPriority: 0,
    cooldowns: new Map(),
    clockOffset: 0,
    cameraStream: null,
    cameraBusy: false,
    bypassBoardSetup: false,
    portraitStudio: null,
  };

  const readJSON = (key, fallback) => {
    try { return { ...fallback, ...JSON.parse(localStorage.getItem(key) || "{}") }; }
    catch { return { ...fallback }; }
  };
  const partySettings = readJSON(SETTINGS_KEY, { rounds: 5, rules: "casual", difficulty: "normal" });
  const portraitPreferences = readJSON(PORTRAIT_KEY, { automatic: true, version: 1 });
  const storedPortraitSet = (() => { try { return JSON.parse(localStorage.getItem(PORTRAIT_SET_KEY) || "null"); } catch { return null; } })();
  const portraitSet = {
    version: 1,
    sharing: storedPortraitSet?.sharing === true,
    confirmed: storedPortraitSet?.confirmed === true,
    expressions: Object.fromEntries(EXPRESSIONS.map((expression) => [expression, {
      expression,
      completed: storedPortraitSet?.expressions?.[expression]?.completed === true,
      persistentAsset: storedPortraitSet?.expressions?.[expression]?.persistentAsset || null,
      crop: storedPortraitSet?.expressions?.[expression]?.crop || { x: 0, y: 0, scale: 1, width: 1, height: 1 },
    }])),
  };
  const savePortraitSet = () => localStorage.setItem(PORTRAIT_SET_KEY, JSON.stringify(portraitSet));
  window.__snugPartySettings = partySettings;
  window.SnugPortraitSet = Object.freeze({ snapshot: () => JSON.parse(JSON.stringify(portraitSet)) });

  function now() { return performance.now() + state.clockOffset; }
  function dispatchExpression(expression, options = {}) {
    if (!EXPRESSIONS.includes(expression) || (!portraitPreferences.automatic && !options.force)) return false;
    const time = now();
    const priority = Number(options.priority ?? PRIORITY[expression] ?? 1);
    const cooldownKey = options.cooldown || expression;
    if (Number(state.cooldowns.get(cooldownKey) || 0) > time) return false;
    if (state.expressionUntil > time && priority < state.expressionPriority) return false;
    const duration = Math.max(180, Number(options.duration || (expression === "blink" ? 180 : 1800)));
    state.expression = expression;
    state.expressionPriority = priority;
    state.expressionUntil = time + duration;
    state.cooldowns.set(cooldownKey, time + Math.max(duration, Number(options.cooldownMs || 900)));
    window.dispatchEvent(new CustomEvent("snug-expression-changed", { detail: { expression, duration, priority, source: options.source || "gameplay" } }));
    return true;
  }

  function activeAvatarData() {
    const avatar = window.__snugPlayerAvatar;
    return avatar?.userData?.faceAtlas ? avatar.userData : avatar?.faceAtlas ? avatar : null;
  }

  function applyExpressionFrame(expression) {
    const avatar = activeAvatarData();
    if (!avatar?.faceAtlas) return false;
    let index = avatar.faceFrames?.[expression];
    if (index == null) index = avatar.faceFrames?.calm ?? avatar.faceFrames?.happy ?? Object.values(avatar.faceFrames || {})[0];
    if (index == null) return false;
    avatar.faceAtlas.offset.set((index % 3) / 3, 1 - (Math.floor(index / 3) + 1) / 3);
    avatar.faceAtlas.updateMatrix?.();
    avatar.faceState = expression;
    return true;
  }

  function expressionLoop() {
    if (state.expressionUntil <= now()) {
      state.expression = "calm";
      state.expressionPriority = 0;
    }
    if (state.expression !== "calm" || portraitPreferences.automatic) applyExpressionFrame(state.expression);
    requestAnimationFrame(expressionLoop);
  }
  requestAnimationFrame(expressionLoop);

  window.SnugExpressions = Object.freeze({
    list: () => [...EXPRESSIONS],
    trigger: dispatchExpression,
    current: () => ({ expression: state.expression, remainingMs: Math.max(0, state.expressionUntil - now()), automatic: portraitPreferences.automatic }),
    setAutomatic(value) {
      portraitPreferences.automatic = value !== false;
      localStorage.setItem(PORTRAIT_KEY, JSON.stringify(portraitPreferences));
      if (!portraitPreferences.automatic) dispatchExpression("calm", { force: true, duration: 1 });
      return portraitPreferences.automatic;
    },
  });

  window.addEventListener("snug-award-coins", (event) => dispatchExpression(Number(event.detail?.amount || 0) >= 0 ? "happy" : "sad", { source: "economy", cooldown: "economy", duration: 2100 }));
  window.addEventListener("snug-achievement-unlocked", () => dispatchExpression("laughter", { source: "achievement", cooldown: "achievement", duration: 2600 }));
  window.addEventListener("snug-minigame-achievement", (event) => {
    if (event.detail?.phase === "participate") return dispatchExpression("happy", { source: "minigame-start", duration: 1200 });
    if (event.detail?.won === true) dispatchExpression("laughter", { source: "minigame-win", duration: 2600 });
    if (event.detail?.won === false) dispatchExpression("sad", { source: "minigame-loss", duration: 2100 });
  });

  function selectedExpression(studio) {
    const button = studio?.querySelector(".expression-photo-tabs button.active");
    const text = button?.textContent?.toLowerCase() || "calm";
    return EXPRESSIONS.find((item) => text.includes(item.replace("side-eye", "side"))) || "calm";
  }

  function readyPortraits(studio) {
    return [...studio.querySelectorAll(".expression-photo-tabs button")].filter((button) => /ready/i.test(button.textContent || ""));
  }

  function targetFileInput(studio, expression = selectedExpression(studio)) {
    const active = [...studio.querySelectorAll(".expression-photo-tabs button")].find((button) => button.classList.contains("active") && button.textContent.toLowerCase().includes(expression.replace("side-eye", "side")));
    if (!active) [...studio.querySelectorAll(".expression-photo-tabs button")].find((button) => button.textContent.toLowerCase().includes(expression.replace("side-eye", "side")))?.click();
    return studio.querySelector(".selfie-actions input[type=file], .quick-capture input[type=file]");
  }

  async function deliverFile(studio, file) {
    const input = targetFileInput(studio);
    if (!input) throw new Error("The portrait file control is not ready.");
    const transfer = new DataTransfer();
    transfer.items.add(file);
    input.files = transfer.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    const expression = selectedExpression(studio);
    portraitSet.expressions[expression].persistentAsset = { name: file.name, type: file.type, source: "confirmed-crop", updatedAt: Date.now() };
    savePortraitSet();
  }

  function stopCamera() {
    state.cameraStream?.getTracks?.().forEach((track) => track.stop());
    state.cameraStream = null;
    state.cameraBusy = false;
    document.querySelector(".portrait-camera-backdrop")?.remove();
  }

  async function openCamera(studio) {
    if (state.cameraBusy) return;
    if (!navigator.mediaDevices?.getUserMedia) return studio.querySelector(".portrait-upload-label input")?.click();
    state.cameraBusy = true;
    const expression = selectedExpression(studio);
    const backdrop = document.createElement("div");
    backdrop.className = "portrait-camera-backdrop";
    backdrop.innerHTML = `<section class="portrait-camera" role="dialog" aria-modal="true" aria-labelledby="portrait-camera-title"><header><div><small>Lyla Lens · portrait ${EXPRESSIONS.indexOf(expression) + 1} of 9</small><h2 id="portrait-camera-title">${LABELS[expression]}</h2><p>Hold the camera at eye level and keep your face inside the guide.</p></div><button type="button" class="party-close" aria-label="Close camera">×</button></header><div class="portrait-camera-stage"><video autoplay muted playsinline></video><canvas hidden></canvas><div class="portrait-face-guide" aria-hidden="true"></div><div class="portrait-countdown" aria-live="assertive"></div><div class="portrait-camera-status" role="status">Starting the front camera…</div></div><div class="portrait-camera-actions"><button type="button" data-camera-retake disabled>Retake</button><button type="button" data-camera-shutter disabled>Take photo</button></div></section>`;
    document.body.appendChild(backdrop);
    const video = backdrop.querySelector("video");
    const canvas = backdrop.querySelector("canvas");
    const status = backdrop.querySelector(".portrait-camera-status");
    const shutter = backdrop.querySelector("[data-camera-shutter]");
    const retake = backdrop.querySelector("[data-camera-retake]");
    let capturedBlob = null;
    backdrop.querySelector(".party-close").addEventListener("click", stopCamera);
    try {
      state.cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 1080 }, height: { ideal: 1080 } }, audio: false });
      video.srcObject = state.cameraStream;
      await video.play();
      status.textContent = "Soft, even light works best. Lyla is ready when you are.";
      shutter.disabled = false;
    } catch {
      status.textContent = "Camera access is unavailable. Choose an existing photo instead.";
      shutter.textContent = "Choose photo";
      shutter.disabled = false;
      shutter.addEventListener("click", () => { stopCamera(); studio.querySelector(".portrait-upload-label input")?.click(); }, { once: true });
      state.cameraBusy = false;
      return;
    }
    state.cameraBusy = false;
    const capture = async () => {
      shutter.disabled = true;
      const countdown = backdrop.querySelector(".portrait-countdown");
      for (const value of [3, 2, 1]) {
        countdown.textContent = String(value);
        await new Promise((resolve) => setTimeout(resolve, 650));
      }
      countdown.textContent = "";
      const side = Math.min(video.videoWidth || 720, video.videoHeight || 720);
      canvas.width = canvas.height = 720;
      const sx = ((video.videoWidth || side) - side) / 2;
      const sy = ((video.videoHeight || side) - side) / 2;
      canvas.getContext("2d", { alpha: false }).drawImage(video, sx, sy, side, side, 0, 0, 720, 720);
      capturedBlob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", .86));
      canvas.hidden = false;
      video.hidden = true;
      status.textContent = "Keep it, or retake while the camera is still open.";
      shutter.textContent = "Keep & continue";
      shutter.disabled = false;
      retake.disabled = false;
    };
    shutter.addEventListener("click", async () => {
      if (!capturedBlob) return capture();
      const file = new File([capturedBlob], `selfie-${expression}.jpg`, { type: "image/jpeg" });
      stopCamera();
      await deliverFile(studio, file);
      setTimeout(() => advancePortrait(studio), 450);
    });
    retake.addEventListener("click", () => {
      capturedBlob = null;
      canvas.hidden = true;
      video.hidden = false;
      shutter.textContent = "Take photo";
      retake.disabled = true;
      status.textContent = "Adjust your position, then try again.";
    });
  }

  function advancePortrait(studio) {
    const tabs = [...studio.querySelectorAll(".expression-photo-tabs button")];
    const current = tabs.findIndex((button) => button.classList.contains("active"));
    const next = tabs.slice(current + 1).find((button) => !/ready/i.test(button.textContent || ""));
    next?.click();
  }

  function buildContactSheet(studio) {
    studio.querySelector(".portrait-contact-sheet")?.remove();
    const tabs = [...studio.querySelectorAll(".expression-photo-tabs button")];
    if (tabs.filter((button) => /ready/i.test(button.textContent || "")).length !== EXPRESSIONS.length) return;
    const sheet = document.createElement("section");
    sheet.className = "portrait-contact-sheet";
    sheet.setAttribute("aria-label", "Completed portrait contact sheet");
    sheet.innerHTML = tabs.map((button, index) => `<button type="button" data-contact-index="${index}" aria-label="Replace ${LABELS[EXPRESSIONS[index]]}">${button.querySelector("img") ? `<img src="${button.querySelector("img").src}" alt="">` : ""}<span>${LABELS[EXPRESSIONS[index]]}</span></button>`).join("");
    sheet.addEventListener("click", (event) => {
      const button = event.target.closest("[data-contact-index]");
      if (!button) return;
      tabs[Number(button.dataset.contactIndex)]?.click();
      setTimeout(() => studio.querySelector("[data-live-camera]")?.focus(), 0);
    });
    studio.querySelector(".portrait-manager-row")?.insertAdjacentElement("beforebegin", sheet);
  }

  function addDirectEditor(studio) {
    const head = studio.querySelector(".portrait-head");
    const editor = studio.querySelector(".face-editor");
    if (!head || !editor || head.dataset.directEdit) return;
    head.dataset.directEdit = "true";
    head.classList.add("is-direct-edit");
    const sliders = [...editor.querySelectorAll("input[type=range]")];
    const scale = sliders.find((input) => input.closest("label")?.textContent.includes("Scale"));
    const horizontal = sliders.find((input) => input.closest("label")?.textContent.includes("Left / right"));
    const vertical = sliders.find((input) => input.closest("label")?.textContent.includes("Up / down"));
    const saveCrop = () => {
      const expression = selectedExpression(studio);
      portraitSet.expressions[expression].crop = {
        x: Number(horizontal?.value || 0), y: Number(vertical?.value || 0), scale: Number(scale?.value || 1),
        width: Number(sliders.find((input) => input.closest("label")?.textContent.includes("Width"))?.value || 1),
        height: Number(sliders.find((input) => input.closest("label")?.textContent.includes("Height"))?.value || 1),
      };
      savePortraitSet();
    };
    sliders.forEach((input) => input.addEventListener("change", saveCrop));
    let origin = null;
    head.addEventListener("pointerdown", (event) => { origin = { x: event.clientX, y: event.clientY, hx: Number(horizontal?.value || 0), vy: Number(vertical?.value || 0) }; head.setPointerCapture?.(event.pointerId); });
    head.addEventListener("pointermove", (event) => {
      if (!origin) return;
      if (horizontal) { horizontal.value = String(Math.max(-90, Math.min(90, origin.hx + event.clientX - origin.x))); horizontal.dispatchEvent(new Event("input", { bubbles: true })); }
      if (vertical) { vertical.value = String(Math.max(-90, Math.min(90, origin.vy + event.clientY - origin.y))); vertical.dispatchEvent(new Event("input", { bubbles: true })); }
    });
    const release = () => { origin = null; };
    head.addEventListener("pointerup", release);
    head.addEventListener("pointercancel", release);
    head.addEventListener("wheel", (event) => {
      if (!scale) return;
      event.preventDefault();
      scale.value = String(Math.max(.8, Math.min(1.8, Number(scale.value) + (event.deltaY < 0 ? .04 : -.04))));
      scale.dispatchEvent(new Event("input", { bubbles: true }));
    }, { passive: false });
    const pairs = [...editor.querySelectorAll(".face-control-pair")];
    if (pairs.length) {
      const details = document.createElement("details");
      details.className = "portrait-fine-tune";
      details.innerHTML = "<summary>Fine tune width, height, and exact position</summary>";
      pairs.forEach((pair) => details.appendChild(pair));
      editor.appendChild(details);
    }
  }

  function enhancePortraitStudio(studio) {
    if (!studio || studio.dataset.partyUpgrade) return;
    studio.dataset.partyUpgrade = "true";
    state.portraitStudio = studio;
    const tabs = studio.querySelector(".expression-photo-tabs");
    if (!tabs) return;
    const intro = document.createElement("section");
    intro.className = "portrait-studio-intro";
    intro.innerHTML = `<b>Lyla’s nine-expression appointment</b><p>These cropped portraits become your avatar’s reactions around town and during game night. Raw camera photos stay on this device. Sharing stays off unless you choose to enable it.</p><div class="portrait-capture-choices"><button type="button" data-live-camera>Use camera<small>Guided live appointment</small></button><label class="portrait-upload-label">Choose photo<small>Use one already on this device</small><input type="file" accept="image/*"></label></div><div class="portrait-progress" role="status"></div>`;
    tabs.insertAdjacentElement("beforebegin", intro);
    intro.querySelector("[data-live-camera]").addEventListener("click", () => openCamera(studio));
    intro.querySelector("input[type=file]").addEventListener("change", async (event) => {
      const file = event.target.files?.[0];
      if (file) await deliverFile(studio, file);
      event.target.value = "";
    });
    const manager = document.createElement("section");
    manager.innerHTML = `<div class="portrait-manager-row"><span><b>Automatic expressions</b><small>Use portraits during town and party moments</small></span><button type="button" aria-pressed="${portraitPreferences.automatic}">${portraitPreferences.automatic ? "On" : "Off"}</button></div><button type="button" class="portrait-delete-all">Remove all nine portraits</button>`;
    studio.appendChild(manager);
    const toggle = manager.querySelector(".portrait-manager-row button");
    toggle.addEventListener("click", () => { const value = window.SnugExpressions.setAutomatic(toggle.getAttribute("aria-pressed") !== "true"); toggle.setAttribute("aria-pressed", String(value)); toggle.textContent = value ? "On" : "Off"; });
    manager.querySelector(".portrait-delete-all").addEventListener("click", () => {
      const ready = readyPortraits(studio);
      if (!ready.length || !confirm("Remove all saved expression portraits from this player?")) return;
      let index = 0;
      const removeNext = () => {
        if (index >= ready.length) return;
        ready[index++].click();
        setTimeout(() => { studio.querySelector(".selfie-actions .secondary")?.click(); setTimeout(removeNext, 40); }, 40);
      };
      removeNext();
    });
    const refresh = () => {
      const count = readyPortraits(studio).length;
      const readyLabels = new Set(readyPortraits(studio).map((button) => selectedExpression({ querySelector: () => button })));
      EXPRESSIONS.forEach((expression) => { portraitSet.expressions[expression].completed = readyLabels.has(expression); });
      portraitSet.confirmed = count === EXPRESSIONS.length;
      const shareControl = [...studio.querySelectorAll("input[type=checkbox]")].find((input) => /share/i.test(input.closest("label")?.textContent || ""));
      if (shareControl) portraitSet.sharing = shareControl.checked === true;
      savePortraitSet();
      intro.querySelector(".portrait-progress").textContent = `${count} of ${EXPRESSIONS.length} portraits ready${count === EXPRESSIONS.length ? " · set complete" : " · progress saves as you go"}`;
      addDirectEditor(studio);
      buildContactSheet(studio);
    };
    new MutationObserver(refresh).observe(studio, { subtree: true, childList: true, characterData: true, attributes: true });
    refresh();
  }

  function openPartySetup(target) {
    if (document.querySelector(".party-setup-backdrop")) return;
    const backdrop = document.createElement("div");
    backdrop.className = "party-setup-backdrop";
    backdrop.innerHTML = `<section class="party-setup" role="dialog" aria-modal="true" aria-labelledby="party-setup-title"><header><div><small>Cyclical City game night</small><h2 id="party-setup-title">Set the table</h2><p>Choose the pace and personality of this Snug Board match. Human players join first; friendly town bots fill open seats.</p></div><button type="button" class="party-close" aria-label="Close party setup">×</button></header><div class="party-options"><fieldset data-setting="rounds"><legend>Rounds</legend><div class="party-segments">${[5, 10, 15].map((value) => `<button type="button" data-value="${value}" aria-pressed="${partySettings.rounds === value}">${value}<br><small>${value === 5 ? "Quick" : value === 10 ? "Classic" : "Big night"}</small></button>`).join("")}</div></fieldset><fieldset data-setting="rules"><legend>Rules</legend><div class="party-segments"><button type="button" data-value="casual" aria-pressed="${partySettings.rules === "casual"}">Casual</button><button type="button" data-value="strategic" aria-pressed="${partySettings.rules === "strategic"}">Strategic</button></div><p class="party-rule-copy">${partySettings.rules === "strategic" ? "Fewer starting coins and more pressure on careful item timing." : "A friendly starting balance with plenty of room for reversals."}</p></fieldset><fieldset data-setting="difficulty"><legend>Town-player difficulty</legend><div class="party-segments">${["easy", "normal", "hard"].map((value) => `<button type="button" data-value="${value}" aria-pressed="${partySettings.difficulty === value}">${value[0].toUpperCase() + value.slice(1)}</button>`).join("")}</div></fieldset></div><button type="button" class="party-start">Open Snug Board lobby</button></section>`;
    document.body.appendChild(backdrop);
    const close = () => backdrop.remove();
    backdrop.querySelector(".party-close").addEventListener("click", close);
    backdrop.addEventListener("pointerdown", (event) => { if (event.target === backdrop) close(); });
    backdrop.querySelectorAll("fieldset").forEach((fieldset) => fieldset.addEventListener("click", (event) => {
      const button = event.target.closest("[data-value]");
      if (!button) return;
      const key = fieldset.dataset.setting;
      partySettings[key] = key === "rounds" ? Number(button.dataset.value) : button.dataset.value;
      fieldset.querySelectorAll("[data-value]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      if (key === "rules") fieldset.querySelector(".party-rule-copy").textContent = partySettings.rules === "strategic" ? "Fewer starting coins and more pressure on careful item timing." : "A friendly starting balance with plenty of room for reversals.";
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(partySettings));
      window.__snugPartySettings = { ...partySettings };
    }));
    backdrop.querySelector(".party-start").addEventListener("click", () => {
      close();
      state.bypassBoardSetup = true;
      target.click();
      queueMicrotask(() => { state.bypassBoardSetup = false; });
    });
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    const opensBoard = button?.dataset.action === "board" || /^Snug Board$/i.test(button?.textContent.trim() || "");
    if (!button || state.bypassBoardSetup || !opensBoard) return;
    if (button.closest(".party-setup-backdrop,.snug-board-backdrop")) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openPartySetup(button);
  }, true);

  function inspectMode() {
    if (document.querySelector(".portrait-camera-backdrop,.sheet[aria-label='Town Hall portraits']")) state.mode = "portraitStudio";
    else if (document.querySelector(".snug-board-backdrop")) state.mode = "board";
    else if (document.querySelector(".challenge-overlay,.wave1-overlay,.party-arena")) state.mode = "minigame";
    else if (document.querySelector(".solo-result-backdrop")) state.mode = "results";
    else if (document.documentElement.classList.contains("snug-start-open")) state.mode = "title";
    else if (window.__snugWorld) state.mode = "town";
    const studio = [...document.querySelectorAll(".sheet")].find((sheet) => sheet.querySelector(".sheet-head h2")?.textContent.trim() === "Town Hall portraits");
    if (studio) enhancePortraitStudio(studio);
  }
  new MutationObserver(inspectMode).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ["class"] });
  inspectMode();

  const previousRender = window.render_game_to_text;
  window.render_game_to_text = () => {
    let base = {};
    try { base = previousRender ? JSON.parse(previousRender()) : {}; } catch {}
    const party = window.__snugPartySettings || partySettings;
    return JSON.stringify({ ...base, coordinateSystem: base.coordinateSystem || "3D world uses x left/right, y up, z depth; UI coordinates originate top-left", appMode: state.mode, expression: window.SnugExpressions.current(), partySettings: party, portraitStudio: state.portraitStudio ? { selected: selectedExpression(state.portraitStudio), completed: readyPortraits(state.portraitStudio).length, total: EXPRESSIONS.length } : null });
  };
  const previousAdvance = window.advanceTime;
  window.advanceTime = (milliseconds) => {
    const amount = Math.max(0, Number(milliseconds) || 0);
    state.clockOffset += amount;
    if (typeof previousAdvance === "function") previousAdvance(amount);
    inspectMode();
    return window.render_game_to_text();
  };

  window.addEventListener("pagehide", stopCamera);
})();
