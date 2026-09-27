/* =====================================================================
   GLOBAL CONFLICT MONITOR v3 — 3D engine (Three.js r128)
   100 zones · day/night shader w/ relief · cinematic tour · smooth flights
   ===================================================================== */
(function () {
  const R = 100, DEG = Math.PI / 180;
  const $ = id => document.getElementById(id);
  const stage = $("stage");

  const state = {
    active: new Set(Object.keys(CAT)),
    selected: null, hover: null,
    dragging: false, moved: 0,
    lastInteract: -9999, flyTo: null,
    targetDist: 285, autoRotate: true,
    mouseDirty: false,
    intro: { t: 0, dur: 3.0, active: true },
    tour: { on: false, paused: false, phase: "dock", t: 0, idx: -1 }
  };
  const FLY_DUR = 2.5, DOCK_DUR = 7.0;
  const easeOutCubic = x => 1 - Math.pow(1 - x, 3);
  const easeInOutCubic = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

  /* ================= renderer / scene ================= */
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor(0x030609, 1);
  stage.appendChild(renderer.domElement);
  renderer.domElement.style.cursor = "grab";

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 1, 6000);
  camera.position.set(0, 24, 680);

  const globe = new THREE.Group();
  scene.add(globe);

  function latLonToVec3(lat, lon, r) {
    const phi = (90 - lat) * DEG, theta = (lon + 180) * DEG;
    return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
  }

  /* ================= loading ================= */
  const TL = new THREE.TextureLoader();
  let loadedCount = 0;
  const TOTAL_ASSETS = 8;
  function progress(msg) {
    loadedCount++;
    $("loadBar").style.width = Math.round((loadedCount / TOTAL_ASSETS) * 100) + "%";
    if (msg) $("loadStatus").textContent = msg;
  }
  function loadTex(url) {
    return new Promise(res => TL.load(url, t => { progress(); res(t); }, undefined, () => { progress(); res(null); }));
  }

  /* sprite textures */
  const glowTex = (() => {
    const c = document.createElement("canvas"); c.width = c.height = 64;
    const g = c.getContext("2d");
    const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    rg.addColorStop(0, "rgba(255,255,255,1)");
    rg.addColorStop(0.28, "rgba(255,255,255,0.55)");
    rg.addColorStop(0.6, "rgba(255,255,255,0.14)");
    rg.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = rg; g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  })();
  const beamTex = (() => {
    const c = document.createElement("canvas"); c.width = 16; c.height = 128;
    const g = c.getContext("2d");
    const lg = g.createLinearGradient(0, 128, 0, 0);
    lg.addColorStop(0, "rgba(255,255,255,0.95)");
    lg.addColorStop(0.5, "rgba(255,255,255,0.38)");
    lg.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = lg; g.fillRect(0, 0, 16, 128);
    return new THREE.CanvasTexture(c);
  })();

  /* ================= earth ================= */
  const sunDir = new THREE.Vector3(-0.85, 0.30, 0.55).normalize();
  let cloudsMesh = null;

  function buildProceduralTexture(geo) {
    const W = 2048, H = 1024;
    const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d");
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "#050d1c"); grad.addColorStop(.5, "#071426"); grad.addColorStop(1, "#050d1c");
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
    const px = (lon, lat) => [((lon + 180) / 360) * W, ((90 - lat) / 180) * H];
    const polys = [];
    geo.features.forEach(f => {
      if (!f.geometry) return;
      const sets = f.geometry.type === "Polygon" ? [f.geometry.coordinates] :
                 f.geometry.type === "MultiPolygon" ? f.geometry.coordinates : [];
      sets.forEach(p => polys.push(p));
    });
    const draw = (fill, stroke, lw) => polys.forEach(poly => poly.forEach(ring => {
      ctx.beginPath(); let pen = false, prevLon = null;
      ring.forEach(pt => {
        if (prevLon !== null && Math.abs(pt[0] - prevLon) > 180) pen = false;
        const [x, y] = px(pt[0], pt[1]);
        pen ? ctx.lineTo(x, y) : ctx.moveTo(x, y); pen = true; prevLon = pt[0];
      });
      ctx.closePath();
      if (fill) ctx.fill();
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
    }));
    ctx.fillStyle = "#12293f"; draw(true, null, 0);
    draw(false, "rgba(90,190,255,0.10)", 4);
    draw(false, "rgba(140,215,255,0.45)", 1);
    const tex = new THREE.CanvasTexture(cv);
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return tex;
  }

  function buildEarth(tex, geo) {
    let mesh;
    if (tex.day && tex.night) {
      const aniso = renderer.capabilities.getMaxAnisotropy();
      [tex.day, tex.night, tex.spec, tex.norm].forEach(t => { if (t) { t.anisotropy = aniso; t.wrapS = THREE.RepeatWrapping; } });
      const blackTex = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1, THREE.RGBAFormat);
      blackTex.needsUpdate = true;
      const flatNorm = new THREE.DataTexture(new Uint8Array([128, 128, 255, 255]), 1, 1, THREE.RGBAFormat);
      flatNorm.needsUpdate = true;
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uDay: { value: tex.day }, uNight: { value: tex.night },
          uSpec: { value: tex.spec || blackTex }, uNorm: { value: tex.norm || flatNorm },
          uSun: { value: sunDir }
        },
        vertexShader: `
          varying vec2 vUv; varying vec3 vN; varying vec3 vP;
          void main(){
            vUv = uv;
            vN = normalize(mat3(modelMatrix) * normal);
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vP = wp.xyz;
            gl_Position = projectionMatrix * viewMatrix * wp;
          }`,
        fragmentShader: `
          uniform sampler2D uDay, uNight, uSpec, uNorm;
          uniform vec3 uSun;
          varying vec2 vUv; varying vec3 vN; varying vec3 vP;
          void main(){
            vec3 N = normalize(vN);
            vec3 V = normalize(cameraPosition - vP);
            vec3 S = normalize(uSun);
            float sd = dot(N, S);
            vec3 day = texture2D(uDay, vUv).rgb;
            float lum = dot(day, vec3(0.299, 0.587, 0.114));
            day = mix(day, vec3(lum), 0.55) * vec3(0.36, 0.60, 0.88) * 1.42;
            vec3 nm = texture2D(uNorm, vUv).rgb;
            float relief = (nm.r - 0.5) * 0.30;
            day *= 1.0 + relief * clamp(sd, 0.0, 1.0) * 1.6;
            vec3 night = texture2D(uNight, vUv).rgb * vec3(1.0, 0.74, 0.46) * 2.6;
            night *= 1.0 + (nm.g - 0.5) * 0.5;
            float dayMix = smoothstep(-0.12, 0.28, sd);
            vec3 col = mix(night, day * (0.30 + 0.9 * max(sd, 0.0)), dayMix);
            col += vec3(1.0, 0.38, 0.14) * exp(-abs(sd) * 7.0) * 0.16;
            float sp = texture2D(uSpec, vUv).r;
            vec3 Rf = reflect(-S, N);
            col += vec3(0.55, 0.75, 0.95) * pow(max(dot(Rf, V), 0.0), 22.0) * sp * dayMix * 0.55;
            float fr = pow(1.0 - max(dot(V, N), 0.0), 3.2);
            col += vec3(0.16, 0.42, 0.95) * fr * 0.55;
            gl_FragColor = vec4(col, 1.0);
          }`
      });
      mesh = new THREE.Mesh(new THREE.SphereGeometry(R, 112, 72), mat);
    } else {
      mesh = new THREE.Mesh(new THREE.SphereGeometry(R, 112, 72),
        new THREE.MeshBasicMaterial({ map: buildProceduralTexture(geo) }));
    }
    globe.add(mesh);

    if (tex.clouds) {
      tex.clouds.anisotropy = renderer.capabilities.getMaxAnisotropy();
      tex.clouds.wrapS = THREE.RepeatWrapping;
      cloudsMesh = new THREE.Mesh(new THREE.SphereGeometry(R * 1.013, 72, 54), new THREE.ShaderMaterial({
        uniforms: { uMap: { value: tex.clouds }, uSun: { value: sunDir } },
        vertexShader: `
          varying vec2 vUv; varying vec3 vN; varying vec3 vP;
          void main(){
            vUv = uv; vN = normalize(mat3(modelMatrix) * normal);
            vec4 wp = modelMatrix * vec4(position, 1.0); vP = wp.xyz;
            gl_Position = projectionMatrix * viewMatrix * wp;
          }`,
        fragmentShader: `
          uniform sampler2D uMap; uniform vec3 uSun;
          varying vec2 vUv; varying vec3 vN; varying vec3 vP;
          void main(){
            float c = texture2D(uMap, vUv).r;
            float sd = dot(normalize(vN), normalize(uSun));
            float dayMix = smoothstep(-0.15, 0.3, sd);
            vec3 col = vec3(0.78, 0.87, 1.0) * (0.22 + 0.8 * max(sd, 0.0));
            float a = c * (0.05 + 0.28 * dayMix);
            gl_FragColor = vec4(col, a);
          }`,
        transparent: true, depthWrite: false
      }));
      globe.add(cloudsMesh);
    }

    // atmosphere rim + halo
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.004, 72, 54), new THREE.ShaderMaterial({
      vertexShader: "varying vec3 vN; varying vec3 vP; void main(){ vN = normalize(mat3(modelMatrix)*normal); vec4 wp=modelMatrix*vec4(position,1.0); vP=wp.xyz; gl_Position=projectionMatrix*viewMatrix*wp; }",
      fragmentShader: "varying vec3 vN; varying vec3 vP; void main(){ vec3 V=normalize(cameraPosition-vP); float f=pow(1.0-max(dot(V,normalize(vN)),0.0),4.0); gl_FragColor=vec4(vec3(0.3,0.6,1.0)*f*0.9,f); }",
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    })));
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.19, 64, 48), new THREE.ShaderMaterial({
      vertexShader: "varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
      fragmentShader: "varying vec3 vN; void main(){ float i = pow(max(0.68 - dot(vN, vec3(0.,0.,1.)), 0.0), 3.4); gl_FragColor = vec4(0.26,0.58,1.0,1.0) * i * 1.5; }",
      blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true, depthWrite: false
    })));

    // stars
    const mkStars = (n, rad, size, op, col) => {
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const v = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize()
          .multiplyScalar(rad * (0.55 + Math.random() * 0.9));
        pos[i * 3] = v.x; pos[i * 3 + 1] = v.y; pos[i * 3 + 2] = v.z;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: col, size, sizeAttenuation: false, transparent: true, opacity: op, depthWrite: false })));
    };
    mkStars(1600, 1700, 1.4, 0.7, 0xbcd6ff);
    mkStars(300, 1400, 2.4, 0.9, 0xffffff);
    mkStars(150, 1500, 3.2, 0.5, 0xffd9b0);
  }

  /* ================= markers ================= */
  const markers = [];
  const reticles = [];
  const coreGeo = new THREE.SphereGeometry(0.5, 12, 12);
  const ringGeo = new THREE.RingGeometry(1.3, 1.62, 36);
  const baseGeo = new THREE.RingGeometry(0.7, 1.05, 28);
  const hitGeo = new THREE.SphereGeometry(4.8, 8, 8);

  function buildMarkers() {
    CONFLICTS.forEach((c, i) => {
      const color = new THREE.Color(CAT[c.cat].color);
      const n = latLonToVec3(c.lat, c.lon, 1);
      const h = 3.2 + c.intensity * 2.6;
      const grp = new THREE.Group();

      const beamGeo = new THREE.CylinderGeometry(0.3, 0.62, h, 10, 1, true);
      beamGeo.translate(0, h / 2, 0);
      const beam = new THREE.Mesh(beamGeo, new THREE.MeshBasicMaterial({
        map: beamTex, color, transparent: true, opacity: 0.7,
        blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide
      }));
      beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), n);
      grp.add(beam);

      const base = new THREE.Mesh(baseGeo,
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.65, side: THREE.DoubleSide, depthWrite: false }));
      base.position.copy(n.clone().multiplyScalar(R + 0.12));
      base.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);
      grp.add(base);

      const tipPos = n.clone().multiplyScalar(R + h);
      const core = new THREE.Mesh(coreGeo,
        new THREE.MeshBasicMaterial({ color: color.clone().lerp(new THREE.Color(0xffffff), 0.55) }));
      core.position.copy(tipPos);
      grp.add(core);

      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTex, color, transparent: true, opacity: 0.95,
        blending: THREE.AdditiveBlending, depthWrite: false
      }));
      sprite.position.copy(tipPos);
      const sBase = 2.6 + c.intensity * 1.6;
      sprite.scale.set(sBase, sBase, 1);
      grp.add(sprite);

      const nRings = c.intensity >= 4 ? 2 : 1;
      const rings = [];
      for (let k = 0; k < nRings; k++) {
        const ring = new THREE.Mesh(ringGeo,
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false }));
        ring.position.copy(n.clone().multiplyScalar(R + 0.2));
        ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);
        grp.add(ring);
        rings.push(ring);
      }

      const hit = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }));
      hit.position.copy(tipPos);
      hit.userData.conflict = c;
      grp.add(hit);

      globe.add(grp);
      markers.push({ c, grp, beam, sprite, rings, hit, n, h, sBase, phase: i * 1.37, core });
    });

    // selection reticle
    const ret = new THREE.Group();
    [0, Math.PI].forEach(rot => {
      ret.add(new THREE.Mesh(new THREE.RingGeometry(2.6, 3.05, 48, 1, rot, 2.3),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95, side: THREE.DoubleSide, depthWrite: false })));
    });
    ret.add(new THREE.Mesh(new THREE.RingGeometry(0.9, 1.1, 24),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false })));
    ret.visible = false;
    scene.add(ret);
    reticles.push(ret);
  }

  /* ================= arcs ================= */
  const arcGroup = new THREE.Group(), flowGroup = new THREE.Group();
  const arcItems = [];
  scene.add(arcGroup); scene.add(flowGroup);

  function makeArc(def, group, speedBase) {
    const p0 = latLonToVec3(def.from[0], def.from[1], R + 0.4);
    const p2 = latLonToVec3(def.to[0], def.to[1], R + 0.4);
    const dist = p0.distanceTo(p2);
    const mid = p0.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(R + Math.max(6, dist * 0.32));
    const curve = new THREE.QuadraticBezierCurve3(p0, mid, p2);
    group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 60, 0.15, 6, false),
      new THREE.MeshBasicMaterial({ color: def.color, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false })));
    const pulse = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex, color: def.color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    pulse.scale.set(3.4, 3.4, 1);
    group.add(pulse);
    arcItems.push({ curve, pulse, speed: speedBase * (0.8 + Math.random() * 0.5), offset: Math.random(), def });
  }
  function buildArcs() {
    ARCS.forEach(a => makeArc(a, arcGroup, 0.10));
    FLOWS.forEach(f => makeArc(f, flowGroup, 0.05));
  }

  /* ================= labels ================= */
  const labelLayer = $("labels"), labelObjs = [];
  function buildLabels() {
    CONFLICTS.filter(c => c.intensity >= 4).forEach(c => {
      const el = document.createElement("div");
      el.className = "glabel";
      el.textContent = c.name.toUpperCase();
      el.style.color = CAT[c.cat].css;
      labelLayer.appendChild(el);
      labelObjs.push({ c, el, hidden: false });
    });
  }

  /* ================= UI ================= */
  const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const fmtDate = d => d.slice(8, 10) + " " + MONTHS[+d.slice(5, 7) - 1];

  function visibleConflicts() {
    const q = ($("search").value || "").toLowerCase();
    return CONFLICTS.filter(c =>
      state.active.has(c.cat) &&
      (!q || (c.name + c.region + c.parties.join(" ") + c.summary).toLowerCase().includes(q))
    );
  }

  function buildChips() {
    const wrap = $("chips");
    LAYERS.forEach(l => {
      const chip = document.createElement("div");
      chip.className = "chip";
      const col = (l.id === "news") ? "#4db8ff" : (l.id === "arcs" || l.id === "flows") ? "#8be9ff" : CAT[l.id].css;
      const count = (l.id in CAT) ? CONFLICTS.filter(c => c.cat === l.id).length :
                    l.id === "arcs" ? ARCS.length : l.id === "flows" ? FLOWS.length : TICKER.length;
      chip.innerHTML = `<i style="background:${col};box-shadow:0 0 6px ${col}"></i>${l.label} <small>${count}</small>`;
      chip.onclick = () => {
        chip.classList.toggle("off");
        const off = chip.classList.contains("off");
        if (l.id in CAT) { off ? state.active.delete(l.id) : state.active.add(l.id); buildList(); }
        else if (l.id === "arcs") { arcGroup.visible = !off; }
        else if (l.id === "flows") { flowGroup.visible = !off; }
        else if (l.id === "news") { $("ticker").style.display = off ? "none" : "flex"; }
      };
      wrap.appendChild(chip);
    });
  }

  function buildList() {
    const list = $("conflictList");
    list.innerHTML = "";
    const vis = visibleConflicts().sort((a, b) => b.intensity - a.intensity || a.name.localeCompare(b.name));
    $("listCount").textContent = vis.length + " ZONES";
    const frag = document.createDocumentFragment();
    vis.forEach(c => {
      const el = document.createElement("div");
      el.className = "item" + (state.selected === c.id ? " active" : "");
      el.dataset.id = c.id;
      const col = CAT[c.cat].css;
      el.innerHTML = `<span class="dot" style="background:${col};color:${col}"></span>
        <div><div class="nm">${c.name}</div><div class="mt">${c.region} · since ${c.since}</div></div>
        <span class="int" style="color:${col};border:1px solid ${col}55;background:${col}14">${"●".repeat(c.intensity)}</span>`;
      el.onclick = () => { stopTour(); selectConflict(c.id, true); };
      frag.appendChild(el);
    });
    list.appendChild(frag);
    markers.forEach(m => { m.grp.visible = vis.includes(m.c); });
    labelObjs.forEach(l => { l.hidden = !vis.includes(l.c); });
  }

  function selectConflict(id, fly) {
    state.selected = id;
    const c = CONFLICTS.find(x => x.id === id);
    if (!c) return;
    const col = CAT[c.cat].css;
    const d = $("detail");
    d.style.setProperty("--dc", col);
    d.classList.add("show");
    requestAnimationFrame(() => d.classList.add("in"));
    $("dCat").textContent = CAT[c.cat].label.toUpperCase();
    $("dCat").style.cssText = `color:${col};background:${col}1c;border:1px solid ${col}55`;
    $("dStatus").textContent = (c.status + " · INT " + c.intensity + "/5").toUpperCase();
    $("dTitle").textContent = c.name;
    $("dLoc").textContent = `⌖ ${c.region.toUpperCase()} · ${c.lat.toFixed(2)}°, ${c.lon.toFixed(2)}°`;
    $("dSummary").textContent = c.summary;
    $("dSince").textContent = c.since;
    $("dCas").textContent = c.casualties;
    $("dDisp").textContent = c.displaced;
    $("dParties").innerHTML = c.parties.map(p => `<span>${p}</span>`).join("");
    $("dMeter").innerHTML = [1,2,3,4,5].map(i => `<i class="${i <= c.intensity ? "on" : ""}"></i>`).join("");
    $("dMeter").style.setProperty("--mc", col);
    $("dNews").innerHTML = c.news.map((n, i) =>
      `<div class="newsItem" style="animation-delay:${0.08 * i}s"><div class="d">${fmtDate(n.date)} <em>· ${n.src}</em></div><p>${n.text}</p></div>`).join("");
    document.querySelectorAll("#conflictList .item").forEach(el =>
      el.classList.toggle("active", el.dataset.id === id));
    const m = markers.find(x => x.c.id === id);
    if (m) {
      reticles[0].visible = true;
      reticles[0].children.forEach(ch => { if (ch.material) ch.material.color.set(CAT[c.cat].color); });
    }
    if (fly) flyToConflict(c, 172, 2.1);
  }

  function deselect() {
    state.selected = null;
    const d = $("detail");
    d.classList.remove("in");
    setTimeout(() => { if (!state.selected) d.classList.remove("show"); }, 220);
    reticles[0].visible = false;
    document.querySelectorAll("#conflictList .item").forEach(el => el.classList.remove("active"));
  }

  function buildTicker() {
    const html = TICKER.map(t => {
      const m = t.match(/^(\d+ [A-Z]{3})\s*—\s*(.*)$/);
      return m ? `<span><b>${m[1]}</b> — ${m[2]}</span>` : `<span>${t}</span>`;
    }).join('<span style="color:#ff4d5a">◆</span>');
    $("ticktrack").innerHTML = html + '<span style="color:#ff4d5a">◆</span>' + html;
  }

  function buildStats() {
    const box = $("stats");
    Object.values(GLOBAL_STATS).forEach(s => {
      const d = document.createElement("div");
      d.className = "stat";
      const v = s.v === "AUTO" ? String(CONFLICTS.length) : s.v;
      d.innerHTML = `<b data-v="${v}">0</b><span>${s.sub}</span>`;
      box.appendChild(d);
    });
    document.querySelectorAll(".stat b").forEach(el => {
      const raw = el.dataset.v;
      const num = parseFloat(raw), suffix = raw.replace(/^[\d.]+/, "");
      const t0 = performance.now(), dur = 1600;
      const step = now => {
        const k = Math.min(1, (now - t0) / dur);
        el.textContent = Math.round(num * easeOutCubic(k)) + suffix;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  function tickClock() {
    const now = new Date();
    $("clock").textContent =
      now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }) + " IST · " +
      now.toLocaleTimeString("en-GB", { timeZone: "UTC", hour12: false }) + " UTC";
  }

  /* ================= camera / flights ================= */
  const YAXIS = new THREE.Vector3(0, 1, 0);
  let velX = 0, velY = 0, prevX = 0, prevY = 0;

  function rotateGlobe(dx, dy) {
    globe.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(YAXIS, dx));
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
    globe.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(right, dy * 0.55));
  }

  function flyToConflict(c, dist, dur) {
    const pos = latLonToVec3(c.lat, c.lon, R).normalize();
    const dir = camera.position.clone().normalize();
    state.flyTo = {
      from: globe.quaternion.clone(),
      to: new THREE.Quaternion().setFromUnitVectors(pos, dir),
      t: 0, dur: dur || 2.1,
      fromDist: camera.position.length(),
      toDist: dist || 175
    };
    state.targetDist = dist || 175;
  }

  function overview() {
    stopTour(); deselect();
    state.targetDist = 285;
  }

  /* ================= tour v2 ================= */
  const RING_C = 2 * Math.PI * 19;
  let typeTimer = null;

  function buildTourDots() {
    const box = $("tourDots");
    box.innerHTML = "";
    TOUR.forEach((id, i) => {
      const dot = document.createElement("i");
      dot.title = (CONFLICTS.find(c => c.id === id) || {}).name || id;
      dot.onclick = () => { state.tour.idx = i - 1; tourAdvance(1); };
      box.appendChild(dot);
    });
  }

  function typewriter(text) {
    clearInterval(typeTimer);
    const el = $("tourType");
    el.textContent = "";
    let i = 0;
    typeTimer = setInterval(() => {
      i += 2;
      el.textContent = text.slice(0, i);
      if (i >= text.length) clearInterval(typeTimer);
    }, 18);
  }

  function tourAdvance(dir) {
    state.tour.idx = (state.tour.idx + dir + TOUR.length) % TOUR.length;
    state.tour.phase = "fly";
    state.tour.t = 0;
    const c = CONFLICTS.find(x => x.id === TOUR[state.tour.idx]);
    if (!c) return;
    state.selected = c.id;
    flyToConflict(c, 196, FLY_DUR);
    $("tourCount").textContent = String(state.tour.idx + 1).padStart(2, "0") + " / " + String(TOUR.length).padStart(2, "0");
    $("tourTitle").textContent = c.name;
    $("tourStatus").textContent = c.status.toUpperCase();
    $("tourStatus").style.color = CAT[c.cat].css;
    const head = c.news[0] ? `${fmtDate(c.news[0].date)} · ${c.news[0].src} — ${c.news[0].text}` : c.summary;
    typewriter(head);
    document.querySelectorAll("#tourDots i").forEach((d, i) => d.classList.toggle("on", i === state.tour.idx));
    document.querySelectorAll("#conflictList .item").forEach(el =>
      el.classList.toggle("active", el.dataset.id === c.id));
    const m = markers.find(x => x.c.id === c.id);
    if (m) {
      reticles[0].visible = true;
      reticles[0].children.forEach(ch => { if (ch.material) ch.material.color.set(CAT[c.cat].color); });
    }
  }

  function startTour() {
    deselect();
    state.tour = { on: true, paused: false, phase: "dock", t: 0, idx: -1 };
    $("tourDock").classList.add("show");
    document.body.classList.add("reduced");
    $("btnTour").classList.add("active");
    $("btnTour").innerHTML = "■&nbsp; END TOUR <kbd>T</kbd>";
    tourAdvance(1);
  }

  function stopTour() {
    if (!state.tour.on) return;
    clearInterval(typeTimer);
    state.tour.on = false;
    $("tourDock").classList.remove("show");
    document.body.classList.remove("reduced");
    $("btnTour").classList.remove("active");
    $("btnTour").innerHTML = "▶&nbsp; CINEMATIC TOUR <kbd>T</kbd>";
  }

  function toggleTourPause() {
    if (!state.tour.on) return;
    state.tour.paused = !state.tour.paused;
    $("tourPause").textContent = state.tour.paused ? "▶" : "⏸";
  }

  /* ================= input ================= */
  const dom = renderer.domElement;
  const mouse = new THREE.Vector2(-2, -2), mousePx = { x: 0, y: 0 };
  const raycaster = new THREE.Raycaster();

  dom.addEventListener("pointerdown", e => {
    state.dragging = true; state.moved = 0;
    prevX = e.clientX; prevY = e.clientY;
    state.flyTo = null;
    state.intro.active = false;
    dom.setPointerCapture(e.pointerId);
    if (state.tour.on) stopTour();
  });
  dom.addEventListener("pointermove", e => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / innerHeight) * 2 + 1;
    mousePx.x = e.clientX; mousePx.y = e.clientY;
    state.mouseDirty = true;
    if (!state.dragging) return;
    const dx = e.clientX - prevX, dy = e.clientY - prevY;
    prevX = e.clientX; prevY = e.clientY;
    state.moved += Math.abs(dx) + Math.abs(dy);
    velX = dx * 0.0042; velY = dy * 0.0042;
    rotateGlobe(velX, velY);
    state.lastInteract = performance.now();
  });
  dom.addEventListener("pointerup", () => {
    state.dragging = false;
    if (state.moved < 6) {
      const c = pickAt();
      if (c) { stopTour(); selectConflict(c.id, false); }
    }
    state.lastInteract = performance.now();
  });
  dom.addEventListener("wheel", e => {
    e.preventDefault();
    state.intro.active = false;
    state.targetDist = THREE.MathUtils.clamp(state.targetDist + e.deltaY * 0.28, 128, 620);
    state.lastInteract = performance.now();
    if (state.tour.on) stopTour();
  }, { passive: false });
  dom.addEventListener("dblclick", overview);

  window.addEventListener("keydown", e => {
    if (e.target.tagName === "INPUT") return;
    if (e.code === "Space") { e.preventDefault(); toggleSpin(); }
    else if (e.key === "t" || e.key === "T") { state.tour.on ? stopTour() : startTour(); }
    else if (e.key === "r" || e.key === "R") overview();
    else if (e.key === "Escape") { stopTour(); deselect(); }
  });

  $("dClose").onclick = () => { stopTour(); deselect(); };
  $("btnReset").onclick = overview;
  $("btnTour").onclick = () => { state.tour.on ? stopTour() : startTour(); };
  $("btnSpin").onclick = toggleSpin;
  $("tourPrev").onclick = () => { if (state.tour.on) tourAdvance(-1); };
  $("tourNext").onclick = () => { if (state.tour.on) tourAdvance(1); };
  $("tourPause").onclick = toggleTourPause;

  function toggleSpin() {
    state.autoRotate = !state.autoRotate;
    $("btnSpin").classList.toggle("active", state.autoRotate);
  }
  $("search").addEventListener("input", buildList);

  function pickAt() {
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(markers.filter(m => m.grp.visible).map(m => m.hit));
    return hits.length ? hits[0].object.userData.conflict : null;
  }

  function updateHover() {
    if (!state.mouseDirty) return;
    state.mouseDirty = false;
    const c = state.dragging ? null : pickAt();
    state.hover = c ? c.id : null;
    dom.style.cursor = state.dragging ? "grabbing" : (c ? "pointer" : "grab");
    const tip = $("tip");
    if (c) {
      tip.style.display = "block";
      tip.style.left = Math.min(mousePx.x + 18, innerWidth - 270) + "px";
      tip.style.top = Math.min(mousePx.y + 16, innerHeight - 120) + "px";
      tip.querySelector(".t").textContent = c.name;
      tip.querySelector(".s").textContent = `${c.region} · ${CAT[c.cat].label} · intensity ${c.intensity}/5 · ${c.status}`;
    } else tip.style.display = "none";
  }

  window.addEventListener("resize", () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  /* ================= animate ================= */
  const clock3 = new THREE.Clock();
  const camDirTmp = new THREE.Vector3();

  function animate() {
    requestAnimationFrame(animate);
    const dt = Math.min(clock3.getDelta(), 0.05);
    const t = clock3.elapsedTime;
    const now = performance.now();

    /* intro dolly */
    let introDist = null, introFov = null;
    if (state.intro.active) {
      state.intro.t += dt;
      const k = Math.min(1, state.intro.t / state.intro.dur);
      const e = easeOutCubic(k);
      introDist = 680 + (285 - 680) * e;
      introFov = 55 + (42 - 55) * e;
      if (k >= 1) state.intro.active = false;
    }

    /* tour engine */
    if (state.tour.on && !state.tour.paused) {
      state.tour.t += dt;
      if (state.tour.phase === "fly") {
        if (!state.flyTo) { state.tour.phase = "dock"; state.tour.t = 0; }
      } else {
        $("tourRing").style.strokeDashoffset = RING_C * (1 - Math.min(1, state.tour.t / DOCK_DUR));
        if (state.tour.t >= DOCK_DUR) tourAdvance(1);
      }
    }

    /* globe rotation */
    if (state.flyTo) {
      state.flyTo.t = Math.min(1, state.flyTo.t + dt / state.flyTo.dur);
      const k = easeInOutCubic(state.flyTo.t);
      globe.quaternion.slerpQuaternions(state.flyTo.from, state.flyTo.to, k);
      const bulge = Math.min(150, state.flyTo.fromDist * 0.35);
      const d = state.flyTo.fromDist + (state.flyTo.toDist - state.flyTo.fromDist) * k + bulge * Math.sin(Math.PI * k);
      camera.position.setLength(d);
      camera.fov = 42 + 5 * Math.sin(Math.PI * k);
      camera.updateProjectionMatrix();
      if (state.flyTo.t >= 1) state.flyTo = null;
    } else {
      if (!state.dragging && now - state.lastInteract > 2600 && !state.tour.on) {
        if (state.autoRotate) rotateGlobe(0.00095, 0);
        velX *= 0.94; velY *= 0.94;
        if (Math.abs(velX) > 0.00005 || Math.abs(velY) > 0.00005) rotateGlobe(velX, velY);
      }
      const breathe = (state.selected || state.tour.on) ? Math.sin(t * 0.6) * 1.2 : 0;
      const cur = camera.position.length();
      const target = (introDist !== null) ? introDist : state.targetDist + breathe;
      camera.position.setLength(cur + (target - cur) * 0.07);
      const fovTarget = (introFov !== null) ? introFov : ((state.selected || state.tour.on) ? 40 : 42);
      camera.fov += (fovTarget - camera.fov) * 0.06;
      camera.updateProjectionMatrix();
    }

    /* clouds */
    if (cloudsMesh) cloudsMesh.rotation.y += dt * 0.004;

    /* markers */
    markers.forEach(m => {
      m.rings.forEach((ring, i) => {
        const p = (t * 0.85 + m.phase + i) % 2;
        const s = 1 + p * 2.8;
        ring.scale.set(s, s, 1);
        ring.material.opacity = Math.max(0, 0.5 - p * 0.26);
      });
      const sel = m.c.id === state.selected ? 1.7 : (state.hover === m.c.id ? 1.4 : 1);
      const glow = 1 + 0.2 * Math.sin(t * 2.3 + m.phase);
      m.sprite.scale.set(m.sBase * glow * sel, m.sBase * glow * sel, 1);
      m.beam.material.opacity = (m.c.id === state.selected ? 0.95 : 0.58) * (0.82 + 0.18 * Math.sin(t * 3 + m.phase));
    });

    /* reticle follows selection */
    if (reticles[0].visible && state.selected) {
      const m = markers.find(x => x.c.id === state.selected);
      if (m) reticles[0].position.copy(m.n.clone().multiplyScalar(R + m.h + 0.5).applyMatrix4(globe.matrixWorld));
      else reticles[0].visible = false;
      reticles[0].quaternion.copy(camera.quaternion);
      reticles[0].children[0].rotation.z = t * 1.4;
      reticles[0].children[1].rotation.z = -t * 1.4;
      reticles[0].children[2].rotation.z = -t * 0.9;
    }

    /* arc pulses */
    arcItems.forEach(a => {
      const grpVisible = ARCS.indexOf(a.def) >= 0 ? arcGroup.visible : flowGroup.visible;
      a.pulse.visible = grpVisible;
      if (!grpVisible) return;
      const tt = (t * a.speed + a.offset) % 1;
      a.pulse.position.copy(a.curve.getPoint(tt));
      a.pulse.material.opacity = 0.25 + 0.75 * Math.sin(Math.PI * tt);
    });

    /* labels */
    const w2 = innerWidth / 2, h2 = innerHeight / 2;
    camDirTmp.copy(camera.position).normalize();
    const dist = camera.position.length();
    labelObjs.forEach(l => {
      if (l.hidden) { l.el.style.opacity = 0; return; }
      const wp = latLonToVec3(l.c.lat, l.c.lon, R + 12).applyMatrix4(globe.matrixWorld);
      const facing = wp.clone().normalize().dot(camDirTmp);
      if (facing < 0.25) { l.el.style.opacity = 0; return; }
      const force = state.selected === l.c.id || state.hover === l.c.id || state.tour.on;
      if (!force && l.c.intensity < 5 && dist > 215) { l.el.style.opacity = 0; return; }
      const v = wp.project(camera);
      l.el.style.opacity = Math.min(1, (facing - 0.25) * 3);
      l.el.style.left = (v.x * w2 + w2) + "px";
      l.el.style.top = (-v.y * h2 + h2) + "px";
    });

    updateHover();
    renderer.render(scene, camera);
  }

  /* ================= boot ================= */
  function initialOrientation() {
    const pos = latLonToVec3(26, 58, R).normalize();
    globe.quaternion.setFromUnitVectors(pos, new THREE.Vector3(0, 0, 1));
  }

  progress("ESTABLISHING UPLINK");
  Promise.all([
    loadTex("tex/earth_atmos_4096.jpg"),
    loadTex("tex/earth_lights_2048.png"),
    loadTex("tex/earth_specular_2048.jpg"),
    loadTex("tex/earth_normal_2048.jpg"),
    loadTex("tex/earth_clouds_1024.png"),
    fetch("world.geo.json").then(r => r.ok ? r.json() : null).catch(() => null).then(g => { progress("GEODATA DECODED"); return g; })
  ]).then(([day, night, spec, norm, clouds, geo]) => {
    progress("ASSEMBLING MONITOR");
    buildEarth({ day, night, spec, norm, clouds }, geo);
    buildMarkers();
    buildArcs();
    buildLabels();
    initialOrientation();
    buildChips();
    buildStats();
    buildTicker();
    buildTourDots();
    buildList();
    tickClock();
    setInterval(tickClock, 1000);
    const ld = $("loading");
    ld.style.opacity = 0;
    setTimeout(() => ld.remove(), 750);
    document.body.classList.add("ready");
    animate();
  }).catch(err => {
    $("loadStatus").textContent = "BOOT FAILURE: " + err;
    $("loadStatus").style.color = "#ff4d5a";
  });
})();
