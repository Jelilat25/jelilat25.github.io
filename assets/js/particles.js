/* ============================================================
   particles.js — Constellation Network Background  v4

   BEHAVIOUR (per requirements):
   ─────────────────────────────────────────────────────────────
   • Subtle living constellation — never the main focus
   • Canvas fixed behind ALL content (z-index 0)
   • Cards / sections fully hide the canvas behind them

   RESPONSIVE DENSITY:
   Desktop  >900 px  : 100 particles · 150 px connect
   Tablet  600-900 px:  60 particles · 110 px connect
   Mobile   <600 px  :  32 particles ·  70 px connect

   INTERACTIONS (no new particles ever created):
   Mouse move  → gentle outward nudge on nearby particles
   Click       → outward velocity burst; particles spring back
   Touch move  → same nudge as mouse (follows finger)
   Touch tap   → same as click (only if finger didn't scroll)
   Scroll      → NO effect (passive listeners, no interference)

   REMOVED:
   × Ripple circles         × Particle bursts
   × Temp particles         × ClickParticle class

   PERFORMANCE:
   • Squared-distance check (avoids sqrt in hot loop)
   • FPS cap on mobile (30 fps)
   • Single rAF loop
   ============================================================ */

(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  /* ── Viewport ────────────────────────────────────────────── */
  let W = 0, H = 0;
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  /* ── Responsive config ───────────────────────────────────── */
  function getConfig() {
    const w = window.innerWidth;
    if (w < 600) return {
      count: 32, dist: 70, speed: 0.16,
      lineOp: 0.18, mouseR: 60, clickR: 90, fps: 30
    };
    if (w < 900) return {
      count: 60, dist: 110, speed: 0.20,
      lineOp: 0.20, mouseR: 85, clickR: 110, fps: 60
    };
    return {
      count: 100, dist: 150, speed: 0.24,
      lineOp: 0.22, mouseR: 100, clickR: 130, fps: 60
    };
  }

  let CFG = getConfig();

  /* ── Theme ───────────────────────────────────────────────── */
  function isDark() {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }

  /* ── Colour palettes ─────────────────────────────────────── */
  /* Dark  → white (75%) · cyan (12%) · magenta (13%)          */
  /* Light → mid-purple (70%) · deep-purple (18%) · violet (12%) */
  function pickDark() {
    const r = Math.random();
    if (r < 0.75) return { hex: '#FFFFFF', accent: false };
    if (r < 0.87) return { hex: '#00E5FF', accent: true  };
    return              { hex: '#6D28D9', accent: true  };
  }
  function pickLight() {
    const r = Math.random();
    if (r < 0.70) return { hex: '#00E5FF', accent: false };
    if (r < 0.88) return { hex: '#6D28D9', accent: true  };
    return              { hex: '#E040FB', accent: false };
  }

  /* ══════════════════════════════════════════════════════════
     PARTICLE
     baseVx/baseVy = natural drift; vx/vy decay back to base
     after any influence, creating the "spring-back" effect.
  ═══════════════════════════════════════════════════════════*/
  class Particle {
    constructor() { this.init(); }

    init() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;

      const spd = (Math.random() * 0.6 + 0.3) * CFG.speed;
      const ang = Math.random() * Math.PI * 2;
      this.baseVx = Math.cos(ang) * spd;
      this.baseVy = Math.sin(ang) * spd;
      this.vx = this.baseVx;
      this.vy = this.baseVy;

      this.r   = Math.random() * 1.3 + 0.9;  /* 0.9 – 2.2 px */
      this.dk  = pickDark();
      this.lt  = pickLight();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      /* Smooth decay back to natural drift velocity */
      this.vx += (this.baseVx - this.vx) * 0.04;
      this.vy += (this.baseVy - this.vy) * 0.04;

      /* Hard speed cap — prevents runaway after many influences */
     const speedSq = this.vx * this.vx + this.vy * this.vy;

     if (speedSq > 12.25) { // 3.5 × 3.5
     const spd = Math.sqrt(speedSq);
     this.vx = (this.vx / spd) * 3.5;
     this.vy = (this.vy / spd) * 3.5;
}

      /* Seamless edge wrap */
      if (this.x < -4)    this.x = W + 4;
      if (this.x > W + 4) this.x = -4;
      if (this.y < -4)    this.y = H + 4;
      if (this.y > H + 4) this.y = -4;
    }

    draw(dark) {
      const col = dark ? this.dk : this.lt;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = col.hex;
      if (col.accent) {
        ctx.shadowBlur  = 6;
        ctx.shadowColor = col.hex;
      }
      ctx.fill();
      if (col.accent) ctx.shadowBlur = 0;
    }
  }

  /* ══════════════════════════════════════════════════════════
     INFLUENCE HELPERS
     All interactions push existing particles; none create new ones.
  ═══════════════════════════════════════════════════════════*/

  /* Gentle outward push — used for mouse move & touch move */
  function nudge(px, py, radius, strength) {
    const r2 = radius * radius;
    for (let i = 0; i < particles.length; i++) {
      const p  = particles[i];
      const dx = p.x - px, dy = p.y - py;
      const d2 = dx * dx + dy * dy;
      if (d2 > r2 || d2 < 0.01) continue;
      const d = Math.sqrt(d2);
      const f = (1 - d / radius) * strength;
      p.vx += (dx / d) * f;
      p.vy += (dy / d) * f;
    }
  }

  /* Click / tap: stronger outward burst — particles spring back */
  function clickInfluence(px, py) {
    const r  = CFG.clickR;
    const r2 = r * r;
    for (let i = 0; i < particles.length; i++) {
      const p  = particles[i];
      const dx = p.x - px, dy = p.y - py;
      const d2 = dx * dx + dy * dy;
      if (d2 > r2 || d2 < 0.01) continue;
      const d = Math.sqrt(d2);
      const f = (1 - d / r) * 1.1;  /* moderate strength */
      p.vx += (dx / d) * f;
      p.vy += (dy / d) * f;
    }
  }

  /* ══════════════════════════════════════════════════════════
     DRAW CONNECTIONS
  ═══════════════════════════════════════════════════════════*/
  function drawLines(dark) {
    const d2Max   = CFG.dist * CFG.dist;
    const lineRGB = dark ? '255,255,255' : '109,40,217';
    const opMult = dark ? 1.0 : 0.65;

    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b  = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > d2Max) continue;

        /* Opacity proportional to closeness */
        const op = (1 - Math.sqrt(d2) / CFG.dist) * CFG.lineOp * opMult;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${lineRGB},${op.toFixed(3)})`;
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      }
    }
  }

  /* Mouse / cursor proximity lines */
  function drawMouseLines(dark, mx, my) {
    if (mx < 0) return;
    const r      = CFG.mouseR * 1.3;
    const r2     = r * r;
    const lineRGB = dark ? '255,255,255' : '109,40,217';
    const opMult = dark ? 1.0 : 0.65;

    for (let i = 0; i < particles.length; i++) {
      const p  = particles[i];
      const dx = p.x - mx, dy = p.y - my;
      const d2 = dx * dx + dy * dy;
      if (d2 > r2) continue;
      const op = (1 - Math.sqrt(d2) / r) * 0.38 * opMult;
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = `rgba(${lineRGB},${op.toFixed(3)})`;
      ctx.lineWidth   = 0.7;
      ctx.stroke();
    }
  }

  /* ══════════════════════════════════════════════════════════
     STATE
  ═══════════════════════════════════════════════════════════*/
  let particles = [];
  let animId;
  let mouse = { x: -9999, y: -9999 };

  /* Active touches: Map<id, {x,y,sx,sy}> */
  const activeTouches = new Map();

  /* FPS throttle */
  let lastFrame  = 0;
  let frameDur   = 1000 / CFG.fps;

  function buildParticles() {
    particles = Array.from({ length: CFG.count }, () => new Particle());
  }

  /* ══════════════════════════════════════════════════════════
     MAIN LOOP
  ═══════════════════════════════════════════════════════════*/
  function loop(timestamp) {
    /* FPS cap (important on mobile) */
    if (timestamp - lastFrame < frameDur) {
      animId = requestAnimationFrame(loop);
      return;
    }
    lastFrame = timestamp;

    ctx.clearRect(0, 0, W, H);
    const dark = isDark();

    /* Apply mouse nudge (gentle, every frame) */
    if (mouse.x > 0) {
      nudge(mouse.x, mouse.y, CFG.mouseR, 0.055);
    }

    /* Apply touch nudge for every active finger */
    activeTouches.forEach(t => nudge(t.x, t.y, CFG.mouseR, 0.065));

    /* Draw connections first (behind nodes) */
    drawLines(dark);
    drawMouseLines(dark, mouse.x, mouse.y);

    /* Update and draw each particle */
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(dark);
    }

    animId = requestAnimationFrame(loop);
  }

  /* ══════════════════════════════════════════════════════════
     INTERACTIVE ELEMENT GUARD
     Returns true if el (or any ancestor) is interactive.
     This prevents the click influence firing on cards, buttons, nav, etc.
  ═══════════════════════════════════════════════════════════*/
  const SKIP_TAGS = new Set([
    'a','button','input','textarea','select','label','svg','path','img'
  ]);
  const SKIP_CLASSES = new Set([
    'project-card','timeline-card','skill-card','service-card',
    'testi-card','info-card','stat-card','tool-card','contact-form-wrap',
    'nav-inner','mobile-menu','vb-float','vb-panel','schedule-fab',
    'footer-body'
  ]);

  function isInteractive(el) {
    let node = el;
    for (let i = 0; i < 9 && node && node !== document.body; i++) {
      const tag = (node.tagName || '').toLowerCase();
      if (SKIP_TAGS.has(tag)) return true;
      if (node.id === 'navbar' || node.id === 'footer' || node.id === 'voicebot') return true;
      if (node.classList) {
        for (const cls of SKIP_CLASSES) {
          if (node.classList.contains(cls)) return true;
        }
      }
      node = node.parentElement;
    }
    return false;
  }

  /* ══════════════════════════════════════════════════════════
     EVENTS
  ═══════════════════════════════════════════════════════════*/

  /* Mouse movement → nudge nearby particles */
  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  /* Desktop click → velocity burst on nearby particles */
  let mouseDownPos = null;
  document.addEventListener('mousedown', e => {
    mouseDownPos = { x: e.clientX, y: e.clientY };
  }, { passive: true });

  document.addEventListener('click', e => {
    if (!mouseDownPos) return;
    /* Ignore if mouse dragged (not a clean click) */
    const moved = Math.hypot(e.clientX - mouseDownPos.x, e.clientY - mouseDownPos.y);
    mouseDownPos = null;
    if (moved > 6) return;
    if (isInteractive(e.target)) return;
    clickInfluence(e.clientX, e.clientY);
  });

  /* ── Touch events ─────────────────────────────────────────
     touchmove  → follow finger and nudge nearby particles
     touchstart → record start position for tap detection
     touchend   → if tap (small movement): fire click influence
     
     We do NOT fire on touchstart (would interfere with scroll).
     All listeners are passive so scroll is never blocked.
  ─────────────────────────────────────────────────────────── */
  document.addEventListener('touchstart', e => {
    Array.from(e.changedTouches).forEach(t => {
      activeTouches.set(t.identifier, {
        x: t.clientX, y: t.clientY,
        sx: t.clientX, sy: t.clientY  /* start pos for tap detection */
      });
    });
  }, { passive: true });

  document.addEventListener('touchmove', e => {
    Array.from(e.changedTouches).forEach(t => {
      const prev = activeTouches.get(t.identifier);
      if (prev) {
        activeTouches.set(t.identifier, {
          x: t.clientX, y: t.clientY,
          sx: prev.sx, sy: prev.sy   /* keep original start pos */
        });
      }
    });
  }, { passive: true });

  document.addEventListener('touchend', e => {
    Array.from(e.changedTouches).forEach(t => {
      const touch = activeTouches.get(t.identifier);
      if (touch) {
        /* Tap = finger moved less than 12 px */
        const moved = Math.hypot(t.clientX - touch.sx, t.clientY - touch.sy);
        if (moved < 12) {
          const el = document.elementFromPoint(t.clientX, t.clientY);
          if (!isInteractive(el)) {
            clickInfluence(t.clientX, t.clientY);
          }
        }
        activeTouches.delete(t.identifier);
      }
    });
  }, { passive: true });

  document.addEventListener('touchcancel', e => {
    Array.from(e.changedTouches).forEach(t => activeTouches.delete(t.identifier));
  }, { passive: true });

  /* ══════════════════════════════════════════════════════════
     INIT & RESIZE
  ═══════════════════════════════════════════════════════════*/
  function init() {
    CFG      = getConfig();
    frameDur = 1000 / CFG.fps;
    resize();
    buildParticles();
    cancelAnimationFrame(animId);
    lastFrame = 0;
    animId = requestAnimationFrame(loop);
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 220);
  }, { passive: true });

  init();
})();