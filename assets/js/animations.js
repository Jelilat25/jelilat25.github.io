/* ============================================================
   animations.js — Scroll Reveal, Counter Animation, Skill Bars
   Uses IntersectionObserver — no external libraries needed.
   ============================================================ */

(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ════════════════════════════════════════════════════════════
     1. SCROLL REVEAL
     Adds .visible class to elements with .reveal / .reveal-left
     / .reveal-right when they enter the viewport.
  ═════════════════════════════════════════════════════════════*/
  function initReveal() {
    const targets = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-stagger'
    );
    if (!targets.length) return;

    if (reduced) {
      /* Skip animation — show everything immediately */
      targets.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);  // animate once
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => observer.observe(el));
  }

  /* ════════════════════════════════════════════════════════════
     2. COUNTER ANIMATION
     Finds elements with class .stat-value and a data-target attr.
     Animates the number from 0 → target when in view.
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
        const el      = entry.target;
        const target  = parseInt(el.dataset.target, 10);
        const suffix  = el.dataset.suffix || '';
        const dur     = 1600;          // animation duration ms
        const start   = performance.now();

        function update(now) {
          const elapsed  = now - start;
          const progress = Math.min(elapsed / dur, 1);
          /* Ease-out cubic */
          const eased    = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  /* ════════════════════════════════════════════════════════════
     3. SKILL BAR ANIMATION
     Finds .skill-bar-fill elements and animates width → --target-width
     when the parent skill card scrolls into view.
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
        /* Stagger bars inside the card */
        const card = entry.target;
        const cardBars = card.querySelectorAll('.skill-bar-fill');
        cardBars.forEach((bar, i) => {
          setTimeout(() => bar.classList.add('animated'), i * 90);
        });
        observer.unobserve(card);
      });
    }, { threshold: 0.3 });

    /* Observe each skill card, not each bar individually */
    document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));
  }

  /* ════════════════════════════════════════════════════════════
     4. TIMELINE ITEMS REVEAL
     Alternates slide-in from left/right for timeline cards.
  ═════════════════════════════════════════════════════════════*/
  function initTimeline() {
    const items = document.querySelectorAll('.timeline-item');
    if (!items.length || reduced) {
      items.forEach(el => el.style.opacity = '1');
      return;
    }

    items.forEach((item, i) => {
      item.style.opacity   = '0';
      item.style.transform = i % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)';
      item.style.transition= 'opacity 0.65s ease, transform 0.65s ease';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateX(0)';
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    items.forEach(el => observer.observe(el));
  }

  /* ════════════════════════════════════════════════════════════
     5. PROJECT / SERVICE / TESTIMONIAL CARD STAGGER
     Stagger-reveals child cards inside a grid.
  ═════════════════════════════════════════════════════════════*/
  function initCardStagger() {
    const grids = document.querySelectorAll(
      '.projects-grid, .services-grid, .testimonials-grid, .skills-grid, .stats-grid'
    );
    if (reduced) return;

    grids.forEach(grid => {
      const cards = grid.children;
      Array.from(cards).forEach((card, i) => {
        card.style.opacity    = '0';
        card.style.transform  = 'translateY(28px)';
        card.style.transition = `opacity 0.55s ease ${i * 0.08}s, transform 0.55s ease ${i * 0.08}s`;
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
      }, { threshold: 0.1 });

      observer.observe(grid);
    });
  }

  /* ── Init all on DOM ready ───────────────────────────────── */
  function init() {
    initReveal();
    initCounters();
    initSkillBars();
    initTimeline();
    /* Card stagger runs after main.js renders the grids */
    /* Delay slightly to allow main.js to finish DOM injection */
    setTimeout(initCardStagger, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Re-run card stagger when sections finish rendering */
  window.addEventListener('portfolio:rendered', () => {
    setTimeout(() => {
      initCounters();
      initSkillBars();
      initTimeline();
      initCardStagger();
    }, 100);
  });
})();