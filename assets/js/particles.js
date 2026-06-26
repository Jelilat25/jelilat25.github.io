/* ============================================================
   particles.js — Aurora Background Engine (Revision 2)
   
   Architecture:
   • AuroraBlob  — large, slow, radial-gradient cloud blobs
   • ClickParticle — spawned at cursor on click, spread + fade
   
   Blend modes:
   • Dark theme  → 'screen'      (overlapping blobs get brighter)
   • Light theme → 'source-over' (soft low-opacity watercolor)
   
   The canvas sits fixed behind all content (z-index: 0).
   pointer-events: none so it never intercepts clicks/links.
   ============================================================ */

(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  /* ── Dimensions ─────────────────────────────────────────── */
  let W = 0, H = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  /* ── Color palettes ──────────────────────────────────────── */
  /* Dark theme: deep purples that glow via screen blend */
  const DARK_COLORS = [
    [109,  40, 217],   /* #6D28D9 primary violet  */
    [ 59,   7, 100],   /* #3B0764 near-black violet */
    [ 76,  29, 149],   /* #4C1D95 deep purple      */
    [124,  58, 237],   /* #7C3AED mid-purple        */
    [ 91,  33, 182],   /* #5B21B6 royal purple      */
    [139,  92, 246],   /* #8B5CF6 lighter purple    */
  ];

  /* Light theme: tints that sit softly on white */
  const LIGHT_COLORS = [
    [109,  40, 217],
    [167, 139, 250],
    [196, 181, 253],
    [124,  58, 237],
  ];

  function isDark() {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }

  function pickColor() {
    const palette = isDark() ? DARK_COLORS : LIGHT_COLORS;
    return palette[Math.floor(Math.random() * palette.length)];
  }

  /* ══════════════════════════════════════════════════════════
     AURORA BLOB — large, slow-drifting radial gradient cloud
  ═══════════════════════════════════════════════════════════*/
  class AuroraBlob {
    constructor(placeAnywhere = false) {
      this.init(placeAnywhere);
    }

    init(anywhere = false) {
      this.x      = Math.random() * W;
      this.y      = anywhere ? Math.random() * H : (Math.random() < 0.5 ? -250 : H + 250);
      this.color  = pickColor();
      /* radius range: 120–320 px */
      this.baseR  = Math.random() * 200 + 120;
      this.phase  = Math.random() * Math.PI * 2;
      this.phSpd  = (Math.random() * 0.004 + 0.001);
      /* very slow drift */
      const spd   = Math.random() * 0.22 + 0.06;
      const ang   = Math.random() * Math.PI * 2;
      this.vx     = Math.cos(ang) * spd;
      this.vy     = Math.sin(ang) * spd;
      /* alpha: higher in dark mode for screen-blend visibility */
      this.alpha  = isDark()
        ? (Math.random() * 0.28 + 0.10)
        : (Math.random() * 0.055 + 0.018);
    }

    update() {
      this.x     += this.vx;
      this.y     += this.vy;
      this.phase += this.phSpd;

      /* Seamless edge wrap */
      const m = this.baseR + 60;
      if (this.x < -m)   this.x = W + m;
      if (this.x > W + m) this.x = -m;
      if (this.y < -m)   this.y = H + m;
      if (this.y > H + m) this.y = -m;
    }

    draw() {
      const [r, g, b] = this.color;
      /* Gently pulsing radius */
      const radius = this.baseR + Math.sin(this.phase) * 18;

      const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, radius);
      grd.addColorStop(0,    `rgba(${r},${g},${b},${this.alpha})`);
      grd.addColorStop(0.38, `rgba(${r},${g},${b},${this.alpha * 0.55})`);
      grd.addColorStop(0.72, `rgba(${r},${g},${b},${this.alpha * 0.18})`);
      grd.addColorStop(1,    `rgba(${r},${g},${b},0)`);

      ctx.beginPath();
      ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    }
  }

  /* ══════════════════════════════════════════════════════════
     CLICK PARTICLE — spawned on user click, spreads outward
  ═══════════════════════════════════════════════════════════*/
  class ClickParticle {
    constructor(x, y) {
      const angle  = Math.random() * Math.PI * 2;
      const speed  = Math.random() * 3.8 + 0.6;
      this.x       = x;
      this.y       = y;
      this.vx      = Math.cos(angle) * speed;
      this.vy      = Math.sin(angle) * speed;
      /* size range: 5–22 px */
      this.size    = Math.random() * 17 + 5;
      this.alpha   = Math.random() * 0.5 + 0.5;   /* start bright  */
      this.decay   = Math.random() * 0.022 + 0.012;
      this.color   = isDark()
        ? [109, 40, 217]
        : [124, 58, 237];
    }

    update() {
      this.x  += this.vx;
      this.y  += this.vy;
      /* friction */
      this.vx *= 0.93;
      this.vy *= 0.93;
      this.alpha -= this.decay;
    }

    draw() {
      if (this.alpha <= 0) return;
      const [r, g, b] = this.color;
      const grd = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size
      );
      grd.addColorStop(0,   `rgba(${r},${g},${b},${this.alpha})`);
      grd.addColorStop(0.5, `rgba(${r},${g},${b},${this.alpha * 0.35})`);
      grd.addColorStop(1,   `rgba(${r},${g},${b},0)`);

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    }

    isDead() { return this.alpha <= 0; }
  }

  /* ── State ───────────────────────────────────────────────── */
  const BLOB_COUNT    = 14;
  let   auroraBlobs   = [];
  let   clickParticles = [];
  let   animId;
  let   lastTheme     = isDark() ? 'dark' : 'light';

  /* ── Build initial blob set ──────────────────────────────── */
  function buildBlobs() {
    auroraBlobs = Array.from({ length: BLOB_COUNT }, () => new AuroraBlob(true));
  }

  /* ── Main render loop ────────────────────────────────────── */
  function loop() {
    ctx.clearRect(0, 0, W, H);

    const dark = isDark();

    /* Re-init blobs when theme switches so colors update */
    const currentTheme = dark ? 'dark' : 'light';
    if (currentTheme !== lastTheme) {
      buildBlobs();
      lastTheme = currentTheme;
    }

    /* ── Aurora blobs ── */
    ctx.save();
    /*  screen → overlapping blobs brighten (aurora glow in dark mode)
        source-over + low alpha → soft watercolour on light mode       */
    ctx.globalCompositeOperation = dark ? 'screen' : 'source-over';
    auroraBlobs.forEach(b => { b.update(); b.draw(); });
    ctx.restore();

    /* ── Click particles ── */
    if (clickParticles.length > 0) {
      ctx.save();
      ctx.globalCompositeOperation = dark ? 'screen' : 'source-over';
      clickParticles.forEach(p => { p.update(); p.draw(); });
      ctx.restore();
      clickParticles = clickParticles.filter(p => !p.isDead());
    }

    animId = requestAnimationFrame(loop);
  }

  /* ── Init ────────────────────────────────────────────────── */
  function init() {
    resize();
    buildBlobs();
    cancelAnimationFrame(animId);
    animId = requestAnimationFrame(loop);
  }

  /* ── Resize (debounced) ──────────────────────────────────── */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); }, 220);
  }, { passive: true });

  /* ── Click → spawn particles ─────────────────────────────── */
  let lastClick = 0;

  function onPointerDown(e) {
    /* Throttle: max 1 burst per 80 ms */
    const now = Date.now();
    if (now - lastClick < 80) return;
    lastClick = now;

    /* Skip if the click target is an interactive element */
    const tag = (e.target?.tagName || '').toLowerCase();
    if (['a', 'button', 'input', 'textarea', 'select', 'label'].includes(tag)) return;

    const x = e.clientX ?? e.touches?.[0]?.clientX;
    const y = e.clientY ?? e.touches?.[0]?.clientY;
    if (x === undefined || y === undefined) return;

    /* Spawn 8–14 particles per click */
    const count = Math.floor(Math.random() * 7) + 8;
    for (let i = 0; i < count; i++) {
      clickParticles.push(new ClickParticle(x, y));
    }
  }

  document.addEventListener('mousedown',  onPointerDown);
  document.addEventListener('touchstart', onPointerDown, { passive: true });

  /* ── Boot ────────────────────────────────────────────────── */
  init();
})();