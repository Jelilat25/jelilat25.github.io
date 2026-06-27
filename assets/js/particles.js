/* ============================================================
   particles.js — Particle Network / Constellation Background
   + Premium Ripple Interaction System

   CORE NETWORK (unchanged from approved version):
   ─────────────────────────────────────────────────────────────
   • 120 nodes · white (75%) · cyan (12%) · magenta (13%) [dark]
   • Purple tones on light theme
   • Thin lines connect nodes within 155 px
   • Mouse proximity draws extra lines toward cursor
   • Wraps at viewport edges · very slow drift

   CLICK INTERACTION (premium ripple — replaces old burst):
   ─────────────────────────────────────────────────────────────
   1. TEMP PARTICLES — 10–14 nodes spawn near click point
      · Scatter within ~90 px of click centre
      · Join the network immediately (participate in connections)
      · Create higher local line density (energy cluster effect)
      · Fade in 150 ms → hold 700–1000 ms → fade out 700 ms
      · Drift gently like normal nodes — no explosion

   2. RIPPLE CIRCLES — 2 expanding rings
      · Ring 1: spawns immediately, expands to 130–160 px
      · Ring 2: spawns 220 ms later, expands to 160–200 px
      · Both: ease-out expansion, fade opacity to 0 on reach
      · Duration ~900–1100 ms each
      · Dark: cyan stroke · Light: purple stroke

   3. STACKING — multiple clicks stack naturally; each click
      adds its own temp cluster and ripple pair independently.

   Feel: energy wave spreading through the constellation,
         NOT an explosion or particle fountain.
   ============================================================ */

(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  /* ── Viewport ───────────────────────────────────────────── */
  let W = 0, H = 0;
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  /* ── Theme ──────────────────────────────────────────────── */
  function isDark() {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }

  /* ══════════════════════════════════════════════════════════
     CONFIG
  ═══════════════════════════════════════════════════════════*/
  const CFG = {
    count:        120,
    connectDist:  195,
    lineOpacity:  0.39,
    lineWidth:    1.2,
    speed:        0.40,
    mouseRadius:  170,
    mouseLines:   true,
    /* ripple */
    tempCount:    8,       /* temp nodes per click         */
    tempSpread:   90,       /* spawn radius around click px */
    tempFadeIn:   100,      /* ms                           */
    tempHoldMin:  700,      /* ms (random + this)           */
    tempHoldVar:  300,
    tempFadeOut:  800,      /* ms                           */
  };

  /* ── Colour palettes ────────────────────────────────────── */
  function pickColorDark() {
    const r = Math.random();
    if (r < 0.75) return { hex: '#ffffff', type: 'white'   };
    if (r < 0.87) return { hex: '#00E5FF', type: 'cyan'    };
    return              { hex: '#df37fd', type: 'magenta' };
  }
  function pickColorLight() {
    const r = Math.random();
    if (r < 0.70) return { hex: '#e732c6', type: 'mid'  };
    if (r < 0.88) return { hex: '#00E5FF', type: 'deep' };
    return              { hex: '#9c0efb', type: 'soft' };
  }

  /* ══════════════════════════════════════════════════════════
     REGULAR PARTICLE
  ═══════════════════════════════════════════════════════════*/
  class Particle {
    constructor() { this.init(true); }
    init(anywhere = false) {
      this.x  = Math.random() * W;
      this.y  = anywhere ? Math.random() * H : (Math.random() < 0.5 ? -5 : H + 5);
      const s = Math.random() * CFG.speed + 0.04;
      const a = Math.random() * Math.PI * 2;
      this.vx = Math.cos(a) * s;
      this.vy = Math.sin(a) * s;
      this.r  = Math.random() * 1.4 + 1.0;
      this.dk = pickColorDark();
      this.lt = pickColorLight();
    }
    update() {
      this.x += this.vx;  this.y += this.vy;
      if (this.x < -5)    this.x = W + 5;
      if (this.x > W + 5) this.x = -5;
      if (this.y < -5)    this.y = H + 5;
      if (this.y > H + 5) this.y = -5;
    }
    draw(dark) {
      const col     = dark ? this.dk : this.lt;
      const isAccent = col.type !== 'white' && col.type !== 'mid';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = col.hex;
      if (isAccent) { ctx.shadowBlur = 7; ctx.shadowColor = col.hex; }
      ctx.fill();
      if (isAccent) ctx.shadowBlur = 0;
    }
  }

  /* ══════════════════════════════════════════════════════════
     TEMP PARTICLE  (joins network, fades out)
  ═══════════════════════════════════════════════════════════*/
  class TempParticle {
    constructor(cx, cy) {
      const ang = Math.random() * Math.PI * 2;
      const d   = Math.random() * CFG.tempSpread;
      this.x    = cx + Math.cos(ang) * d;
      this.y    = cy + Math.sin(ang) * d;
      /* Gentle drift — not a burst */
      const spd = Math.random() * 0.18 + 0.03;
      const a2  = Math.random() * Math.PI * 2;
      this.vx   = Math.cos(a2) * spd;
      this.vy   = Math.sin(a2) * spd;
      this.r    = Math.random() * 2.9 + 1.6;
      this.dk   = pickColorDark();
      this.lt   = pickColorLight();

      /* Lifecycle timing */
      this._born   = performance.now();
      this._hold   = CFG.tempHoldMin + Math.random() * CFG.tempHoldVar;
      this._total  = CFG.tempFadeIn + this._hold + CFG.tempFadeOut;
      this.alpha   = 0;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      const el = performance.now() - this._born;
      if (el < CFG.tempFadeIn) {
        this.alpha = el / CFG.tempFadeIn;
      } else if (el < CFG.tempFadeIn + this._hold) {
        this.alpha = 1;
      } else {
        const fo  = el - CFG.tempFadeIn - this._hold;
        this.alpha = Math.max(0, 1 - fo / CFG.tempFadeOut);
      }
    }

    draw(dark) {
      if (this.alpha <= 0.02) return;
      const col      = dark ? this.dk : this.lt;
      const isAccent = col.type !== 'white' && col.type !== 'mid';
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = col.hex;
      if (isAccent) { ctx.shadowBlur = 6; ctx.shadowColor = col.hex; }
      ctx.fill();
      if (isAccent) ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }

    isDead() { return (performance.now() - this._born) >= this._total; }
  }

  /* ══════════════════════════════════════════════════════════
     RIPPLE CIRCLE  (soft expanding ring)
  ═══════════════════════════════════════════════════════════*/
  class Ripple {
    constructor(x, y, maxR = 150, delay = 0) {
      this.x      = x;
      this.y      = y;
      this.maxR   = maxR;
      this._born  = performance.now() + delay;
      this._dur   = 900 + Math.random() * 200;
      this.radius = 0;
      this.alpha  = 0;
      this._ready = delay === 0;
    }

    update() {
      if (!this._ready) {
        if (performance.now() >= this._born) this._ready = true;
        else return;
      }
      const t       = Math.min(1, (performance.now() - this._born) / this._dur);
      const ease    = 1 - Math.pow(1 - t, 2.4);   /* ease-out quad */
      this.radius   = ease * this.maxR;
      this.alpha    = 0.65 * (1 - t);
    }

    draw(dark) {
      if (!this._ready || this.alpha <= 0.01 || this.radius < 1) return;
      const stroke = dark
        ? `rgba(0,229,255,${this.alpha.toFixed(3)})`
        : `rgba(109,40,217,${this.alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = stroke;
      ctx.lineWidth   = 1.3;
      ctx.stroke();
    }

    isDead() {
      return this._ready && (performance.now() - this._born) >= this._dur;
    }
  }

  /* ══════════════════════════════════════════════════════════
     DRAW CONNECTIONS — regular particles
  ═══════════════════════════════════════════════════════════*/
  function drawConnections(particles, dark) {
    const d2Max    = CFG.connectDist * CFG.connectDist;
    const lineBase = dark ? '255,255,255' : '109,40,217';
    const opMult   = dark ? 1 : 0.55;

    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b  = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > d2Max) continue;
        const op = (1 - Math.sqrt(d2) / CFG.connectDist) * CFG.lineOpacity * opMult;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${lineBase},${op.toFixed(3)})`;
        ctx.lineWidth   = CFG.lineWidth;
        ctx.stroke();
      }
    }
  }

  /* ── Temp particle connections (alpha-weighted) ──────────── */
  function drawTempConnections(temps, particles, dark) {
    if (!temps.length) return;
    const d2Max    = CFG.connectDist * CFG.connectDist;
    const lineBase = dark ? '255,255,255' : '109,40,217';
    const opMult   = dark ? 1 : 0.55;

    temps.forEach(tp => {
      const ta = tp.alpha;
      if (ta < 0.03) return;

      /* temp → regular particles */
      for (let i = 0; i < particles.length; i++) {
        const p  = particles[i];
        const dx = tp.x - p.x, dy = tp.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > d2Max) continue;
        const op = (1 - Math.sqrt(d2) / CFG.connectDist) * CFG.lineOpacity * opMult * ta;
        ctx.beginPath();
        ctx.moveTo(tp.x, tp.y);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(${lineBase},${op.toFixed(3)})`;
        ctx.lineWidth   = CFG.lineWidth;
        ctx.stroke();
      }

      /* temp → other temp particles (creates dense local cluster) */
      temps.forEach(tp2 => {
        if (tp2 === tp) return;
        const dx = tp.x - tp2.x, dy = tp.y - tp2.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > d2Max) return;
        const sharedAlpha = Math.min(ta, tp2.alpha);
        const op = (1 - Math.sqrt(d2) / CFG.connectDist) * CFG.lineOpacity * opMult * sharedAlpha;
        ctx.beginPath();
        ctx.moveTo(tp.x, tp.y);
        ctx.lineTo(tp2.x, tp2.y);
        ctx.strokeStyle = `rgba(${lineBase},${op.toFixed(3)})`;
        ctx.lineWidth   = CFG.lineWidth;
        ctx.stroke();
      });
    });
  }

  /* ── Mouse proximity lines ──────────────────────────────── */
  function drawMouseLines(particles, dark, mx, my) {
    if (mx < 0 || !CFG.mouseLines) return;
    const mr2      = CFG.mouseRadius * CFG.mouseRadius;
    const lineBase = dark ? '255,255,255' : '109,40,217';
    const opMult   = dark ? 1 : 0.5;
    particles.forEach(p => {
      const dx = p.x - mx, dy = p.y - my;
      if (dx * dx + dy * dy > mr2) return;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const op   = (1 - dist / CFG.mouseRadius) * 0.45 * opMult;
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = `rgba(${lineBase},${op.toFixed(3)})`;
      ctx.lineWidth   = 0.8;
      ctx.stroke();
    });
  }

  /* ══════════════════════════════════════════════════════════
     STATE
  ═══════════════════════════════════════════════════════════*/
  let particles      = [];
  let tempParticles  = [];   /* temporary network boost nodes  */
  let ripples        = [];   /* expanding ripple circles        */
  let animId;
  let mouse = { x: -9999, y: -9999 };

  function buildParticles() {
    particles = Array.from({ length: CFG.count }, () => new Particle());
  }

  /* ══════════════════════════════════════════════════════════
     MAIN LOOP
  ═══════════════════════════════════════════════════════════*/
  function loop() {
    ctx.clearRect(0, 0, W, H);
    const dark = isDark();

    /* 1 — Regular network lines (behind everything) */
    drawConnections(particles, dark);

    /* 2 — Temp particle connections (local density boost) */
    drawTempConnections(tempParticles, particles, dark);

    /* 3 — Mouse proximity lines */
    drawMouseLines(particles, dark, mouse.x, mouse.y);

    /* 4 — Regular nodes */
    particles.forEach(p => { p.update(); p.draw(dark); });

    /* 5 — Temp nodes (draw above regular so they're visible while fading in) */
    tempParticles.forEach(tp => { tp.update(); tp.draw(dark); });
    tempParticles = tempParticles.filter(tp => !tp.isDead());

    /* 6 — Ripple rings */
    ripples.forEach(r => { r.update(); r.draw(dark); });
    ripples = ripples.filter(r => !r.isDead());

    animId = requestAnimationFrame(loop);
  }

  /* ══════════════════════════════════════════════════════════
     CLICK → PREMIUM RIPPLE INTERACTION
  ═══════════════════════════════════════════════════════════*/
  /* Tags that should NOT trigger the effect */
  const SKIP_TAGS = new Set(['a','button','input','textarea','select','label',
                              'nav','svg','path','img','video']);

  function isInteractive(el) {
    if (!el) return false;
    const tag = el.tagName?.toLowerCase() || '';
    if (SKIP_TAGS.has(tag)) return true;
    /* Walk up to catch children of interactive elements */
    let node = el.parentElement;
    for (let i = 0; i < 6 && node; i++) {
      const t = node.tagName?.toLowerCase() || '';
      if (SKIP_TAGS.has(t)) return true;
      if (node.id === 'navbar' || node.classList?.contains('vb-float')
        || node.classList?.contains('schedule-fab')) return true;
      node = node.parentElement;
    }
    return false;
  }

  let lastClick = 0;

  function onPointerDown(e) {
    const now = Date.now();
    if (now - lastClick < 120) return;   /* 120 ms debounce */
    lastClick = now;

    if (isInteractive(e.target)) return;

    const x = e.clientX ?? e.touches?.[0]?.clientX;
    const y = e.clientY ?? e.touches?.[0]?.clientY;
    if (x == null || y == null) return;

    /* ── 1. Temp network particles (local density boost) ── */
    const count = CFG.tempCount + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      tempParticles.push(new TempParticle(x, y));
    }

    /* ── 2. Ripple rings ─────────────────────────────────── */
    /* Ring 1: spawns immediately */
    ripples.push(new Ripple(
      x, y,
      220 + Math.random() * 40,   /* maxR 130–160 */
      0
    ));
    /* Ring 2: slightly larger, delayed 220 ms */
    ripples.push(new Ripple(
      x, y,
      280 + Math.random() * 50,   /* maxR 165–200 */
      220
    ));
  }

  document.addEventListener('mousedown',  onPointerDown);
  document.addEventListener('touchstart', onPointerDown, { passive: true });

  /* ── Mouse tracking ─────────────────────────────────────── */
  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });
  document.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  /* ══════════════════════════════════════════════════════════
     INIT & RESIZE
  ═══════════════════════════════════════════════════════════*/
  function init() {
    resize();
    buildParticles();
    cancelAnimationFrame(animId);
    animId = requestAnimationFrame(loop);
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 220);
  }, { passive: true });

  init();
})();