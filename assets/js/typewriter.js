/* ============================================================
   typewriter.js — Animated Role Title Cycler
   Reads roles from PORTFOLIO_DATA.personal.roles.
   Types in, pauses, deletes, moves to next role. Loops.
   ============================================================ */

(function () {
  'use strict';

  const el = document.getElementById('typewriter-text');
  if (!el) return;

  /* Wait for data.js to be ready */
  if (typeof PORTFOLIO_DATA === 'undefined') {
    console.warn('typewriter.js: PORTFOLIO_DATA not found.');
    return;
  }

  const roles   = PORTFOLIO_DATA.personal.roles || ['Data Analyst'];
  let roleIdx   = 0;
  let charIdx   = 0;
  let deleting  = false;
  let pausing   = false;

  /* ── Timing config ───────────────────────────────────────── */
  const TYPE_SPEED_MIN  = 55;    // ms per character (typing)
  const TYPE_SPEED_MAX  = 95;
  const DELETE_SPEED    = 38;    // ms per character (deleting)
  const PAUSE_END       = 1800;  // ms pause after full word typed
  const PAUSE_START     = 300;   // ms pause before typing next word

  function randomSpeed() {
    return Math.floor(Math.random() * (TYPE_SPEED_MAX - TYPE_SPEED_MIN) + TYPE_SPEED_MIN);
  }

  function tick() {
    const current = roles[roleIdx];

    if (pausing) return;  // handled by setTimeout

    if (!deleting) {
      /* Typing phase */
      charIdx++;
      el.textContent = current.slice(0, charIdx);

      if (charIdx === current.length) {
        /* Finished typing — pause then start deleting */
        pausing = true;
        setTimeout(() => {
          pausing   = false;
          deleting  = true;
          tick();
        }, PAUSE_END);
        return;
      }
      setTimeout(tick, randomSpeed());

    } else {
      /* Deleting phase */
      charIdx--;
      el.textContent = current.slice(0, charIdx);

      if (charIdx === 0) {
        /* Finished deleting — move to next role */
        deleting = false;
        roleIdx  = (roleIdx + 1) % roles.length;
        pausing  = true;
        setTimeout(() => {
          pausing = false;
          tick();
        }, PAUSE_START);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  /* Kick off after a short initial delay */
  setTimeout(tick, 600);
})();