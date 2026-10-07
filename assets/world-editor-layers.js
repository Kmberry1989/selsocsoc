/* assets/world-editor-layers.js
 * Game-side support for the World Editor's three data layers, exported in
 * layout.json as layout.biomePaint[], layout.npcPaths[], layout.triggerZones[].
 *
 * - biomePaint: painted biome dabs rasterized as ground planes, blended by strength
 * - npcPaths: named NPC patrol routes (loop or ping-pong) along waypoints
 * - triggerZones: edge-triggered player-enter zones firing dialogue/quest/sound/camera
 *
 * All three systems stay inert if layout.json is missing or the layers are empty.
 * Layer data is sanitized by world-layout.js and published on
 * window.__cylindricWorldLayout plus the snug-world-layers-ready event.
 */
(function () {
  'use strict';

  // Biome visual specs — must match assets/world-direction-pass.js buildBiomes.
  const BIOME_SPECS = {
    'Clover Commons': { colors: ['rgba(162,201,107,.72)', 'rgba(126,177,91,.45)', '#e5df7b'], motif: 'petals' },
    'Whispering Wood': { colors: ['rgba(82,135,88,.78)', 'rgba(54,108,72,.42)', '#315b43'], motif: 'needles' },
    'Sunmeadow': { colors: ['rgba(221,189,113,.7)', 'rgba(198,149,82,.38)', '#885f3e'], motif: 'speckles' },
    'Pondmarsh': { colors: ['rgba(91,156,145,.68)', 'rgba(73,130,128,.38)', '#e6f1ce'], motif: 'ripples' },
  };

  const state = {
    layers: null,          // { biomePaint, npcPaths, triggerZones }
    biomesApplied: false,
    paths: [],             // active patrol states
    zones: [],             // trigger zone runtime states
    lastZoneCheck: 0,
  };

  function getLayers() {
    if (state.layers) return state.layers;
    const published = window.__cylindricWorldLayout;
    if (published && (Array.isArray(published.biomePaint) || Array.isArray(published.npcPaths) || Array.isArray(published.triggerZones))) {
      state.layers = {
        biomePaint: published.biomePaint || [],
        npcPaths: published.npcPaths || [],
        triggerZones: published.triggerZones || [],
      };
      return state.layers;
    }
    return null;
  }

  function makeBiomeTexture(THREE, colors, motif) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(128, 128, 24, 128, 128, 128);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(0.56, colors[1]);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    ctx.globalAlpha = 0.42;
    for (let index = 0; index < 76; index += 1) {
      const x = (index * 73) % 224 + 16;
      const y = (index * 47) % 224 + 16;
      ctx.fillStyle = colors[2];
      if (motif === 'needles') {
        ctx.save(); ctx.translate(x, y); ctx.rotate((index % 9) * 0.34);
        ctx.fillRect(-1, -7, 2, 14); ctx.restore();
      } else if (motif === 'petals') {
        ctx.beginPath(); ctx.arc(x, y, 2 + (index % 3), 0, Math.PI * 2); ctx.fill();
      } else if (motif === 'ripples') {
        ctx.strokeStyle = colors[2]; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(x, y, 7, 3, 0, 0, Math.PI * 2); ctx.stroke();
      } else {
        ctx.fillRect(x, y, 3, 3);
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  // --- 1. biomePaint -------------------------------------------------------
  function applyBiomePaint(group) {
    if (state.biomesApplied) return;
    const layers = getLayers();
    const dabs = layers && layers.biomePaint;
    if (!dabs || !dabs.length) return;
    const THREE = window.__snugThree;
    if (!THREE || !group) return;
    let applied = 0;
    for (const dab of dabs) {
      const spec = BIOME_SPECS[dab.biome];
      if (!spec) continue;
      try {
        const size = Math.max(0.5, dab.radius * 2);
        const material = new THREE.MeshStandardMaterial({
          map: makeBiomeTexture(THREE, spec.colors, spec.motif),
          transparent: true,
          depthWrite: false,
          opacity: 0.72 * dab.strength,
          roughness: 1,
        });
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size, 1, 1), material);
        mesh.name = `SnugBiomePaint_${dab.biome.replace(/\s/g, '')}_${applied}`;
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(dab.x, 0.02, dab.z);
        mesh.renderOrder = 1; // above base biomes, below gameplay decals
        mesh.raycast = () => {};
        mesh.userData = { biome: dab.biome, painted: true, strength: dab.strength };
        group.add(mesh);
        applied += 1;
      } catch (err) {
        console.warn('Snug biomePaint dab failed:', err);
      }
    }
    if (applied > 0) {
      state.biomesApplied = true;
      window.dispatchEvent(new CustomEvent('snug-biome-paint-ready', { detail: { count: applied } }));
    }
  }

  // --- 2. npcPaths ---------------------------------------------------------
  function idToObjectName(id) {
    return 'CityNPC_' + String(id).replace(/(^|-)(\w)/g, (m, dash, ch) => ch.toUpperCase());
  }

  function startPatrols(characters, group) {
    const layers = getLayers();
    const paths = layers && layers.npcPaths;
    if (!paths || !paths.length || !group) return;
    for (const path of paths) {
      try {
        let object = null;
        const character = (characters || []).find((c) => c.name === path.npc);
        if (character) {
          object = group.getObjectByName(idToObjectName(character.id));
        }
        if (!object) {
          // Fallback: search the group for an object whose name contains the
          // NPC's name (covers NPCs defined outside the roster, e.g. Mayor Mayor).
          const needle = path.npc.toLowerCase().replace(/[^a-z]/g, '');
          group.traverse((o) => {
            if (object || !o.name) return;
            const hay = o.name.toLowerCase().replace(/[^a-z]/g, '');
            if (hay.includes(needle) && o.userData && o.userData.npcId) object = o;
          });
        }
        if (!object) {
          console.warn(`Snug npcPath "${path.name}": NPC "${path.npc}" not found in scene — skipping.`);
          continue;
        }
        // Skip if this NPC already has a patrol (avoid double-binding).
        if (state.paths.some((p) => p.object === object)) continue;
        state.paths.push({
          id: path.id,
          name: path.name,
          npc: path.npc,
          object,
          waypoints: path.waypoints,
          loop: path.loop !== false,
          index: 0,
          dir: 1,               // ping-pong direction
          pauseUntil: 0,
          speed: 1.2,           // meters per second, gentle stroll
        });
      } catch (err) {
        console.warn('Snug npcPath failed:', err);
      }
    }
    if (state.paths.length) {
      window.dispatchEvent(new CustomEvent('snug-npc-paths-ready', {
        detail: { count: state.paths.length },
      }));
    }
  }

  function tickPatrols(now) {
    if (!state.paths.length) return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    for (const patrol of state.paths) {
      const obj = patrol.object;
      if (!obj || !obj.parent) continue; // NPC removed from scene
      if (reduced) continue;             // respect reduced motion: NPCs stay put
      if (now < patrol.pauseUntil) continue;
      const target = patrol.waypoints[patrol.index];
      const dx = target.x - obj.position.x;
      const dz = target.z - obj.position.z;
      const dist = Math.hypot(dx, dz);
      if (dist < 0.08) {
        // Arrived: brief pause, then advance.
        patrol.pauseUntil = now + 1500;
        const last = patrol.waypoints.length - 1;
        const isLoop = patrol.loop !== false;
        if (isLoop) {
          patrol.index = (patrol.index + 1) % patrol.waypoints.length;
        } else {
          let next = patrol.index + patrol.dir;
          if (next > last || next < 0) {
            patrol.dir *= -1;
            next = patrol.index + patrol.dir;
          }
          patrol.index = next;
        }
        continue;
      }
      const step = Math.min(dist, patrol.speed * 0.016);
      obj.position.x += (dx / dist) * step;
      obj.position.z += (dz / dist) * step;
      // Face travel direction (yaw only).
      obj.rotation.y = Math.atan2(dx, dz);
    }
  }

  // --- 3. triggerZones -----------------------------------------------------
  function initZones() {
    const layers = getLayers();
    const zones = layers && layers.triggerZones;
    if (!zones || !zones.length) return;
    state.zones = zones.map((z) => ({
      def: z,
      inside: false,
      fired: false, // one-shot per session unless config.repeat
    }));
  }

  function pointInZone(px, pz, zone) {
    const dx = px - zone.x;
    const dz = pz - zone.z;
    if (zone.shape === 'circle') {
      return Math.hypot(dx, dz) < zone.radius;
    }
    // rect: x/z are center, width/depth are full extents
    return Math.abs(dx) <= zone.width / 2 && Math.abs(dz) <= zone.depth / 2;
  }

  function showZoneDialogue(speaker, text) {
    window.dispatchEvent(new CustomEvent('snug-trigger-dialogue', {
      detail: { speaker, text },
    }));
    // Fallback toast so the event is visible even without an NPC-dialogue hookup.
    try {
      let el = document.querySelector('.snug-zone-dialogue');
      if (!el) {
        el = document.createElement('div');
        el.className = 'snug-zone-dialogue';
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        document.body.appendChild(el);
      }
      el.innerHTML = '';
      const who = document.createElement('b');
      who.textContent = speaker || 'Someone';
      const what = document.createElement('span');
      what.textContent = text || '';
      el.append(who, what);
      el.classList.add('is-visible');
      clearTimeout(showZoneDialogue._t);
      showZoneDialogue._t = setTimeout(() => el.classList.remove('is-visible'), 5200);
    } catch (err) {
      console.warn('Snug zone dialogue toast failed:', err);
    }
  }

  function fireZone(zoneState) {
    const z = zoneState.def;
    const cfg = z.config || {};
    if (!cfg.repeat) {
      if (zoneState.fired) return;
      zoneState.fired = true;
    }
    window.dispatchEvent(new CustomEvent('snug-trigger-zone', {
      detail: { id: z.id, name: z.name, event: z.event, config: cfg },
    }));
    switch (z.event) {
      case 'dialogue':
        showZoneDialogue(cfg.speaker, cfg.text);
        break;
      case 'quest':
        if (cfg.questId) {
          window.dispatchEvent(new CustomEvent('snug-quest-start', {
            detail: { questId: cfg.questId, zoneId: z.id, zoneName: z.name },
          }));
        }
        break;
      case 'sound':
        if (cfg.soundId) {
          // snug-audio.js listens for snug-sfx.
          window.dispatchEvent(new CustomEvent('snug-sfx', { detail: { id: cfg.soundId } }));
          if (window.__snugAudio && typeof window.__snugAudio.playSfx === 'function') {
            try { window.__snugAudio.playSfx(cfg.soundId); } catch (err) { /* event path covers it */ }
          }
        }
        break;
      case 'camera':
        if (cfg.cue) {
          window.dispatchEvent(new CustomEvent('snug-camera-cue', {
            detail: { cue: cfg.cue, zoneId: z.id, zoneName: z.name },
          }));
        }
        break;
      default:
        break;
    }
  }

  function tickZones(now) {
    if (!state.zones.length) return;
    if (now - state.lastZoneCheck < 150) return; // ~7Hz is plenty
    state.lastZoneCheck = now;
    const player = window.__snugWorld && window.__snugWorld.player;
    if (!player || !player.position) return;
    const px = player.position.x;
    const pz = player.position.z;
    for (const zoneState of state.zones) {
      const nowInside = pointInZone(px, pz, zoneState.def);
      if (nowInside && !zoneState.inside) {
        // Edge-triggered enter.
        fireZone(zoneState);
      }
      zoneState.inside = nowInside;
    }
  }

  // --- boot ----------------------------------------------------------------
  function boot() {
    const layers = getLayers();
    if (!layers) return false;
    initZones();
    // Biome dabs attach when the base biomes are built.
    window.addEventListener('snug-biomes-ready', (e) => {
      applyBiomePaint(e.detail && e.detail.group);
    });
    // If biomes already built before we loaded, apply immediately.
    if (window.__snugBiomes && window.__snugWorld && window.__snugWorld.scene) {
      const group = window.__snugWorld.scene.getObjectByName('CyclicalCityBiomes');
      if (group) applyBiomePaint(group);
    }
    // NPC patrols attach when the roster is ready.
    window.addEventListener('snug-npc-roster-ready', (e) => {
      const d = e.detail || {};
      startPatrols(d.characters || [], d.group || null);
    });
    // Main loop for patrols + zones.
    const loop = (now) => {
      try {
        tickPatrols(now);
        tickZones(now);
      } catch (err) {
        console.warn('Snug world-editor-layers tick failed:', err);
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    return true;
  }

  function tryBoot() {
    if (getLayers()) {
      boot();
    } else {
      // Layers not published yet — retry on the ready event, then give up
      // silently (inert) if nothing arrives.
      let done = false;
      const onReady = () => {
        if (done) return;
        done = true;
        window.removeEventListener('snug-world-layers-ready', onReady);
        if (getLayers()) boot();
      };
      window.addEventListener('snug-world-layers-ready', onReady);
      setTimeout(() => {
        if (!done) {
          done = true;
          window.removeEventListener('snug-world-layers-ready', onReady);
        }
      }, 15000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryBoot);
  } else {
    tryBoot();
  }
})();
