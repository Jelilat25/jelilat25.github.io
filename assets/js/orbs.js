/* ============================================================
   orbs.js — Click / Touch Spawn Glowing Orbs
   Click anywhere on the page to spawn a glowing orb.
   Each orb spawns 3 child orbs that drift outward.
   ============================================================ */

(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const container = document.getElementById('orb-container');
  if (!container) return;

  /* Aurora purple color palette for orbs */
  const ORB_COLORS = [
    { core: '139,92,246',  glow: '139,92,246'  },   // purple
    { core: '167,139,250', glow: '167,139,250'  },   // light purple
    { core: '124,58,237',  glow: '124,58,237'   },   // deep purple
    { core: '196,181,253', glow: '196,181,253'  },   // lavender
    { core: '109,40,217',  glow: '109,40,217'   },   // violet
    { core: '216,180,254', glow: '216,180,254'  },   // soft lavender
  ];

  let orbCount = 0;

  /* ── Spawn a main orb + child orbs at (x, y) ─────────────── */
  function spawnOrb(x, y) {
    const color  = ORB_COLORS[Math.floor(Math.random() * ORB_COLORS.length)];
    const size   = Math.random() * 50 + 40;   // 40–90 px
    const orbId  = `orb-${++orbCount}`;

    const orb = document.createElement('div');
    orb.className = 'orb';
    orb.id = orbId;
    orb.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(
        circle,
        rgba(${color.core}, 0.9) 0%,
        rgba(${color.glow}, 0.4) 40%,
        rgba(${color.glow}, 0) 70%
      );
      box-shadow: 0 0 ${size * 0.6}px rgba(${color.glow}, 0.6),
                  0 0 ${size * 1.2}px rgba(${color.glow}, 0.3);
    `;
    container.appendChild(orb);

    /* Spawn child orbs */
    const childCount = Math.floor(Math.random() * 3) + 2;  // 2–4 children
    for (let i = 0; i < childCount; i++) {
      spawnChild(x, y, color);
    }

    /* Remove orb element after animation ends */
    orb.addEventListener('animationend', () => orb.remove(), { once: true });
  }

  /* ── Spawn a drifting child orb ──────────────────────────── */
  function spawnChild(cx, cy, color) {
    const angle  = Math.random() * Math.PI * 2;
    const dist   = Math.random() * 90 + 40;
    const dx     = Math.cos(angle) * dist;
    const dy     = Math.sin(angle) * dist;
    const size   = Math.random() * 20 + 10;
    const delay  = Math.random() * 0.3;

    const child  = document.createElement('div');
    child.className = 'orb orb-child';
    child.style.cssText = `
      left: ${cx}px;
      top: ${cy}px;
      width: ${size}px;
      height: ${size}px;
      --dx: ${dx}px;
      --dy: ${dy}px;
      animation-delay: ${delay}s;
      background: radial-gradient(
        circle,
        rgba(${color.core}, 0.85) 0%,
        rgba(${color.glow}, 0.3) 60%,
        rgba(${color.glow}, 0) 100%
      );
      box-shadow: 0 0 ${size}px rgba(${color.glow}, 0.5);
    `;
    container.appendChild(child);
    child.addEventListener('animationend', () => child.remove(), { once: true });
  }

  /* ── Event listeners ─────────────────────────────────────── */
  /* Throttle — max 1 spawn per 80ms to prevent overload */
  let lastSpawn = 0;

  function onPointerDown(e) {
    const now = Date.now();
    if (now - lastSpawn < 80) return;
    lastSpawn = now;

    /* Ignore clicks on interactive elements */
    const tag = e.target.tagName.toLowerCase();
    if (['a', 'button', 'input', 'textarea', 'select', 'label'].includes(tag)) return;

    const x = e.clientX ?? e.touches?.[0]?.clientX;
    const y = e.clientY ?? e.touches?.[0]?.clientY;
    if (x === undefined) return;

    spawnOrb(x, y);
  }

  document.addEventListener('mousedown',  onPointerDown);
  document.addEventListener('touchstart', onPointerDown, { passive: true });
})();