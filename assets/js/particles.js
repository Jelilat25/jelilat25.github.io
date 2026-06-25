/* ============================================================
   particles.js — Canvas Aurora Particle Background
   Floating, connecting particles with aurora color palette.
   Auto-resizes. Respects prefers-reduced-motion.
   ============================================================ */

(function () {
  'use strict';

  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  /* ── Config ─────────────────────────────────────────────── */
  const CFG = {
    count:       130,        // number of particles
    minRadius:   1,
    maxRadius:   2.8,
    speed:       0.35,       // max drift speed
    connectDist: 130,        // px threshold to draw a connecting line
    lineAlpha:   0.18,       // connecting line max opacity
    glowRadius:  18,         // soft glow blur spread
    fps:         60,
  };

  /* Aurora color palette — purple / violet / blue spectrum */
  const COLORS = [
    [139, 92,  246],   // primary purple
    [167, 139, 250],   // light purple
    [124, 58,  237],   // deep purple
    [196, 181, 253],   // lavender
    [91,  33,  182],   // very deep purple
    [216, 180, 254],   // soft lavender
    [147, 112, 219],   // medium purple
    [109, 40,  217],   // rich violet
    [186, 130, 255],   // muted pink-purple
  ];

  let W, H, particles = [], animId, lastTime = 0;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Particle class ──────────────────────────────────────── */
  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x     = Math.random() * W;
      this.y     = initial ? Math.random() * H : (Math.random() < 0.5 ? -10 : H + 10);
      const spd  = (Math.random() * CFG.speed) + 0.05;
      const ang  = Math.random() * Math.PI * 2;
      this.vx    = Math.cos(ang) * spd;
      this.vy    = Math.sin(ang) * spd;
      this.r     = Math.random() * (CFG.maxRadius - CFG.minRadius) + CFG.minRadius;
      this.alpha = Math.random() * 0.5 + 0.25;
      this.da    = (Math.random() * 0.004 + 0.001) * (Math.random() < 0.5 ? 1 : -1);
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.glow  = Math.random() * CFG.glowRadius + 6;
    }

    update(dt) {
      this.x += this.vx * dt * 0.06;
      this.y += this.vy * dt * 0.06;
      this.alpha += this.da;
      if (this.alpha > 0.8 || this.alpha < 0.1) this.da *= -1;

      /* wrap around edges */
      if (this.x < -20) this.x = W + 20;
      if (this.x > W + 20) this.x = -20;
      if (this.y < -20) this.y = H + 20;
      if (this.y > H + 20) this.y = -20;
    }

    draw() {
      const [r, g, b] = this.color;
      /* glow halo */
      const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glow);
      grd.addColorStop(0,   `rgba(${r},${g},${b},${this.alpha * 0.5})`);
      grd.addColorStop(1,   `rgba(${r},${g},${b},0)`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.glow, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      /* solid core */
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${this.alpha})`;
      ctx.fill();
    }
  }

  /* ── Draw connecting lines ───────────────────────────────── */
  function drawConnections() {
    const len = particles.length;
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > CFG.connectDist) continue;

        const opacity = (1 - dist / CFG.connectDist) * CFG.lineAlpha;
        const [r, g, bl] = a.color;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${r},${g},${bl},${opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  /* ── Aurora ambient gradient overlay ────────────────────── */
  function drawAurora() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (!isDark) return;  /* aurora only in dark mode */

    /* top-left aurora bloom */
    const g1 = ctx.createRadialGradient(W * 0.15, H * 0.2, 0, W * 0.15, H * 0.2, W * 0.45);
    g1.addColorStop(0, 'rgba(91, 33, 182, 0.08)');
    g1.addColorStop(1, 'rgba(91, 33, 182, 0)');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, W, H);

    /* bottom-right aurora bloom */
    const g2 = ctx.createRadialGradient(W * 0.85, H * 0.75, 0, W * 0.85, H * 0.75, W * 0.5);
    g2.addColorStop(0, 'rgba(124, 58, 237, 0.07)');
    g2.addColorStop(1, 'rgba(124, 58, 237, 0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);
  }

  /* ── Main animation loop ─────────────────────────────────── */
  function loop(timestamp) {
    const dt = Math.min(timestamp - lastTime, 50); // cap dt to avoid jump on tab switch
    lastTime = timestamp;

    ctx.clearRect(0, 0, W, H);
    drawAurora();
    drawConnections();
    particles.forEach(p => { p.update(dt); p.draw(); });

    animId = requestAnimationFrame(loop);
  }

  /* ── Init / resize ───────────────────────────────────────── */
  function init() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;

    if (prefersReduced) return;

    particles = Array.from({ length: CFG.count }, () => new Particle());
    cancelAnimationFrame(animId);
    lastTime = performance.now();
    animId = requestAnimationFrame(loop);
  }

  /* Debounced resize */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 200);
  });

  init();
})();