/* ============================================================
   animations.js — Scroll Reveal · Counters · Skill Bars
   
   CRITICAL RULE (req #10):
   Content must ALWAYS be visible. Never set opacity: 0 on
   elements that are already inside the viewport on page load.
   Scroll animations only apply to content below the fold.
   A timeout fallback ensures nothing is ever permanently hidden.
   ============================================================ */

(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Helper: is this element already in the initial viewport? ─ */
  function inViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  /* ════════════════════════════════════════════════════════════
     1. SCROLL REVEAL
     Elements IN the viewport on load: shown immediately.
     Elements BELOW the fold: get the slide-in animation.
     Global fallback at 2.5 s ensures nothing stays hidden.
  ═════════════════════════════════════════════════════════════*/
  function initReveal() {
    const targets = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right'
    );
    if (!targets.length) return;

    if (reduced) {
      targets.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });   /* low threshold — fires early */

    targets.forEach(el => {
      if (inViewport(el)) {
        /* Already visible on load — show now, no animation needed */
        el.classList.add('visible');
      } else {
        /* Below fold — watch for scroll-in */
        observer.observe(el);
      }
    });

    /* Safety fallback: everything visible after 2.5 s */
    setTimeout(() => {
      targets.forEach(el => el.classList.add('visible'));
    }, 2500);
  }

  /* ════════════════════════════════════════════════════════════
     2. COUNTER ANIMATION
     Triggered when stat card scrolls into view.
  ═════════════════════════════════════════════════════════════*/
  function initCounters() {
    const counters = document.querySelectorAll('.stat-value[data-target]');
    if (!counters.length) return;

    if (reduced) {
      counters.forEach(el => {
        el.textContent = el.dataset.target + (el.dataset.suffix || '');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const dur    = 1400;
        const start  = performance.now();

        function tick(now) {
          const p   = Math.min((now - start) / dur, 1);
          const val = Math.floor((1 - Math.pow(1 - p, 3)) * target); /* ease-out */
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.4 });

    counters.forEach(el => observer.observe(el));
  }

  /* ════════════════════════════════════════════════════════════
     3. SKILL BAR ANIMATION
     Bars animate width when the card enters the viewport.
  ═════════════════════════════════════════════════════════════*/
  function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    if (!bars.length) return;

    if (reduced) {
      bars.forEach(bar => bar.classList.add('animated'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
          setTimeout(() => bar.classList.add('animated'), i * 80);
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.25 });

    document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));
  }

  /* ════════════════════════════════════════════════════════════
     4. TIMELINE REVEAL
     Cards slide in from alternating sides.
  ═════════════════════════════════════════════════════════════*/
  function initTimeline() {
    const items = document.querySelectorAll('.timeline-item');
    if (!items.length || reduced) return;

    items.forEach((item, i) => {
      if (inViewport(item)) return; /* skip if already visible */
      item.style.opacity   = '0';
      item.style.transform = i % 2 === 0 ? 'translateX(-28px)' : 'translateX(28px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });

    items.forEach(item => {
      if (item.style.opacity === '0') observer.observe(item);
    });

    /* Fallback */
    setTimeout(() => {
      items.forEach(item => {
        item.style.opacity   = '1';
        item.style.transform = 'none';
      });
    }, 2500);
  }

  /* ════════════════════════════════════════════════════════════
     5. CARD STAGGER
     Grid cards stagger-slide in when the grid scrolls into view.
     NEVER hides grids that are already visible on load.
  ═════════════════════════════════════════════════════════════*/
  function initCardStagger() {
    if (reduced) return;

    const grids = document.querySelectorAll(
      '.projects-grid, .services-grid, .testimonials-grid, .skills-grid, .stats-grid, .tools-grid'
    );

    grids.forEach(grid => {
      /* Skip animation if grid is already in the viewport */
      if (inViewport(grid)) return;

      const cards = Array.from(grid.children);
      cards.forEach((card, i) => {
        card.style.opacity    = '0';
        card.style.transform  = 'translateY(22px)';
        card.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          Array.from(entry.target.children).forEach(card => {
            card.style.opacity   = '1';
            card.style.transform = 'translateY(0)';
          });
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.05 });

      observer.observe(grid);

      /* Fallback: cards visible after 2 s regardless */
      setTimeout(() => {
        cards.forEach(card => {
          card.style.opacity   = '1';
          card.style.transform = 'translateY(0)';
        });
      }, 2000);
    });
  }

  /* ── Boot ─────────────────────────────────────────────────── */
  function init() {
    initReveal();
    initCounters();
    initSkillBars();
    setTimeout(() => { initTimeline(); initCardStagger(); }, 150);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Re-run after main.js populates the DOM */
  window.addEventListener('portfolio:rendered', () => {
    setTimeout(() => {
      initCounters();
      initSkillBars();
      initTimeline();
      initCardStagger();
    }, 120);
  });
})();