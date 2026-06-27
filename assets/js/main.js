/* ============================================================
   main.js — Portfolio Controller  (Revision 2)
   • Social links → icon-only compact circles (no text labels)
   • Info cards   → letter-badge icons (no emoji)
   • Services     → numbered badges (no emoji)
   • Skills       → accent bar instead of emoji icon
   • All emoji removed except Experience section timeline dots
   ============================================================ */

(function () {
  'use strict';

  if (typeof PORTFOLIO_DATA === 'undefined') {
    console.error('main.js: PORTFOLIO_DATA not found. Ensure data.js loads first.');
    return;
  }

  const D = PORTFOLIO_DATA;

  /* ── Utilities ───────────────────────────────────────────── */
  function $(sel, ctx = document) { return ctx.querySelector(sel); }
  function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

  function safe(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /* Social brand metadata
     type "img"  → Simple Icons CDN image (white on dark circle)
     type "svg"  → inline SVG path
     type "text" → short text abbreviation (for brands without icons) */
  const SOCIAL_META = {
    linkedin: {
      type: 'img',
      src:  'https://cdn.simpleicons.org/linkedin/FFFFFF',
      label: 'LinkedIn'
    },
    github: {
      type: 'img',
      src:  'https://cdn.simpleicons.org/github/FFFFFF',
      label: 'GitHub'
    },
    whatsapp: {
      type: 'img',
      src:  'https://cdn.simpleicons.org/whatsapp/FFFFFF',
      label: 'WhatsApp'
    },
    novypro: {
      type: 'text',
      text: 'NV',
      label: 'NovyPro'
    },
    contra: {
      type: 'text',
      text: 'CO',
      label: 'Contra'
    },
    email: {
      type: 'svg',
      svg: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>`,
      label: 'Email'
    }
  };

  /* ════════════════════════════════════════════════════════════
     1. THEME TOGGLE
  ═════════════════════════════════════════════════════════════*/
  function initTheme() {
    const saved = localStorage.getItem('joa-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);

    $('#theme-toggle')?.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next    = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('joa-theme', next);
    });
  }

  /* ════════════════════════════════════════════════════════════
     2. NAVBAR
  ═════════════════════════════════════════════════════════════*/
  function initNav() {
    const navbar   = $('#navbar');
    const links    = $$('.nav-link');
    const sections = $$('section[id]');

    window.addEventListener('scroll', () => {
      navbar?.classList.toggle('scrolled', window.scrollY > 50);
      updateActive();
    }, { passive: true });

    function updateActive() {
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
      });
      links.forEach(a => a.classList.toggle('active', a.dataset.section === current));
    }

    /* Smooth scroll for all # anchors */
    document.addEventListener('click', e => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const target = document.getElementById(anchor.getAttribute('href').slice(1));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 78, behavior: 'smooth' });
      closeMobileMenu();
    });
  }

  /* ════════════════════════════════════════════════════════════
     3. MOBILE MENU
  ═════════════════════════════════════════════════════════════*/
  function initMobileMenu() {
    const btn  = $('#hamburger');
    const menu = $('#mobile-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
      menu.setAttribute('aria-hidden', !open);
    });
  }

  function closeMobileMenu() {
    const btn  = $('#hamburger');
    const menu = $('#mobile-menu');
    menu?.classList.remove('open');
    btn?.classList.remove('open');
    btn?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-hidden', 'true');
  }

  /* ════════════════════════════════════════════════════════════
     4. HERO
  ═════════════════════════════════════════════════════════════*/
  function renderHero() {
    const p = D.personal;

    /* Name — last word gets accent colour */
    const nameEl = $('#hero-name');
    if (nameEl) {
      const parts = p.name.trim().split(' ');
      const last  = parts.pop();
      nameEl.innerHTML = `${safe(parts.join(' '))} <span class="name-accent">${safe(last)}</span>`;
    }

    $('#nav-initials')    && ($('#nav-initials').textContent    = p.initials || 'JOA');
    $('#footer-initials') && ($('#footer-initials').textContent = p.initials || 'JOA');
    $('#hero-tagline')    && ($('#hero-tagline').textContent    = p.tagline);

    /* Profile photo */
    const photo = $('#hero-photo');
    if (photo) {
      photo.src = p.profilePhoto;
      photo.onerror = () => {
        photo.src = `https://placehold.co/440x440/6D28D9/FFFFFF?text=${encodeURIComponent(p.initials || 'JOA')}`;
      };
    }

    /* Button hrefs */
    const setHref = (id, href) => { const el = $(id); if (el) el.href = href; };
    setHref('#hero-schedule',    p.scheduleUrl);
    setHref('#hero-resume',      p.resumeUrl);
    setHref('#nav-resume-btn',   p.resumeUrl);
    setHref('#mobile-resume-btn',p.resumeUrl);

    /* Social links */
    renderSocialLinks('#hero-social',    p.social, 'pill');
  }

  /* ════════════════════════════════════════════════════════════
     5. ABOUT
  ═════════════════════════════════════════════════════════════*/
  function renderAbout() {
    const a = D.about;
    $('#about-p1') && ($('#about-p1').textContent = a.bio);
    $('#about-p2') && ($('#about-p2').textContent = a.bio2);

    const resumeBtn = $('#about-resume');
    if (resumeBtn) resumeBtn.href = D.personal.resumeUrl;

    const grid = $('#stats-grid');
    if (!grid || !a.stats) return;
    grid.innerHTML = a.stats.map(s => `
      <div class="stat-card">
        <span class="stat-value" data-target="${s.value}" data-suffix="${safe(s.suffix)}">0${safe(s.suffix)}</span>
        <span class="stat-label">${safe(s.label)}</span>
      </div>`).join('');
  }

  /* ════════════════════════════════════════════════════════════
     6. PROJECTS
  ═════════════════════════════════════════════════════════════*/
  function renderProjects() {
    const projects   = D.projects || [];
    const filtersEl  = $('#project-filters');
    const gridEl     = $('#projects-grid');
    if (!filtersEl || !gridEl) return;

    /* Build ordered category list */
    const cats = ['all'];
    projects.forEach(p => { if (!cats.includes(p.category)) cats.push(p.category); });

    const catLabels = {
      all:      'All Projects',
      data:     'Data Analytics',
      python:   'Python',
      product:  'Product',
      business: 'Business',
    };

    /* Filter tabs */
    filtersEl.innerHTML = cats.map((c, i) => `
      <button class="filter-btn ${i === 0 ? 'active' : ''}"
              data-cat="${c}" role="tab" aria-selected="${i === 0}">
        ${safe(catLabels[c] || c)}
      </button>`).join('');

    /* Project cards */
    gridEl.innerHTML = projects.map(p => {
      const liveBtn = p.links?.live
        ? `<a href="${p.links.live}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">View Project</a>`
        : '';
      const codeBtn = p.links?.code
        ? `<a href="${p.links.code}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">View Code</a>`
        : '';

      return `
      <div class="project-card" data-cat="${p.category}">
        <div class="project-thumb">
          <img src="${p.image || p.placeholder}"
               alt="${safe(p.title)}" loading="lazy"
               onerror="this.src='${p.placeholder}'" />
          <div class="project-overlay">${liveBtn}${codeBtn}</div>
        </div>
        <div class="project-body">
          <div class="project-tags">
            ${(p.tags || []).map(t => `<span class="project-tag">${safe(t)}</span>`).join('')}
          </div>
          <h3 class="project-title">${safe(p.title)}</h3>
          <p class="project-desc">${safe(p.description)}</p>
          ${p.impact ? `<div class="project-impact">${safe(p.impact)}</div>` : ''}
        </div>
        <div class="project-footer">${liveBtn}${codeBtn}</div>
      </div>`;
    }).join('');

    /* Filter logic */
    filtersEl.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      $$('.filter-btn', filtersEl).forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const cat = btn.dataset.cat;
      $$('.project-card', gridEl).forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
      });
    });
  }

  /* ════════════════════════════════════════════════════════════
     7. EXPERIENCE — keeps emoji icons (Experience section only)
  ═════════════════════════════════════════════════════════════*/
  function renderExperience() {
    const tl = $('#timeline');
    if (!tl || !D.experience) return;

    tl.innerHTML = D.experience.map(exp => `
      <div class="timeline-item">
        <div class="timeline-dot" aria-hidden="true">${safe(exp.icon || '·')}</div>
        <div class="timeline-card">
          <div class="timeline-role">${safe(exp.role)}</div>
          <div class="timeline-company">${safe(exp.company)}</div>
          <div class="timeline-meta">
            <span class="timeline-duration">${safe(exp.duration)}</span>
            <span class="timeline-type">${safe(exp.type)}</span>
          </div>
          <ul class="timeline-highlights">
            ${(exp.highlights || []).map(h => `<li>${safe(h)}</li>`).join('')}
          </ul>
        </div>
      </div>`).join('');
  }

  /* ════════════════════════════════════════════════════════════
     8. SKILLS — accent bar replaces emoji icon
  ═════════════════════════════════════════════════════════════*/
  function renderSkills() {
    const grid = $('#skills-grid');
    if (!grid || !D.skills) return;

    grid.innerHTML = D.skills.map(group => `
      <div class="skill-card">
        <div class="skill-card-header">
          <div class="skill-group-accent"></div>
          <div class="skill-card-title">${safe(group.group)}</div>
        </div>
        <div class="skill-items">
          ${group.items.map(item => `
            <div class="skill-row">
              <div class="skill-label-row">
                <span class="skill-name">${safe(item.name)}</span>
                <span class="skill-pct">${item.level}%</span>
              </div>
              <div class="skill-bar-track">
                <div class="skill-bar-fill" style="--target-width:${item.level}%"></div>
              </div>
            </div>`).join('')}
        </div>
      </div>`).join('');
  }

  /* ════════════════════════════════════════════════════════════
     9. SERVICES — numbered badge + optional image
  ═════════════════════════════════════════════════════════════*/
  function renderServices() {
    const grid = $('#services-grid');
    if (!grid || !D.services) return;

    grid.innerHTML = D.services.map((svc, i) => {
      /* Image block — shown if image or placeholder exists */
      const imgBlock = (svc.image || svc.placeholder) ? `
        <div class="service-img-wrap">
          <img src="${svc.image || svc.placeholder}"
               alt="${safe(svc.title)}" loading="lazy"
               onerror="this.src='${svc.placeholder}'" />
        </div>` : '';

      return `
      <div class="service-card reveal">
        ${imgBlock}
        <div class="service-number">0${i + 1}</div>
        <div class="service-title">${safe(svc.title)}</div>
        <p class="service-desc">${safe(svc.description)}</p>
        <div class="service-tags">
          ${(svc.tags || []).map(t => `<span class="service-tag">${safe(t)}</span>`).join('')}
        </div>
        <a href="#contact" class="service-cta">Get in Touch &rarr;</a>
      </div>`;
    }).join('');
  }

  /* ════════════════════════════════════════════════════════════
     10. TESTIMONIALS
  ═════════════════════════════════════════════════════════════*/
  function renderTestimonials() {
    const grid = $('#testimonials-grid');
    if (!grid || !D.testimonials) return;

    grid.innerHTML = D.testimonials.map(t => {
      const stars    = '&#9733;'.repeat(t.rating || 5);
      const isLink   = t.type === 'link';
      const viewBtn  = (t.viewLink && t.viewLink !== '#')
        ? `<a href="${t.viewLink}" class="btn btn-primary btn-sm"
              target="_blank" rel="noopener noreferrer"
              ${!isLink ? 'download' : ''}>
             ${isLink ? 'View Testimonial' : 'Download PDF'}
           </a>`
        : `<span class="btn btn-ghost btn-sm" style="opacity:.4;cursor:default;">Coming Soon</span>`;

      const initials = (t.name || 'C').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

      return `
      <div class="testi-card reveal">
        <div class="testi-image-wrap">
          <img src="${t.photo || t.placeholder}"
               alt="Testimonial from ${safe(t.name)}" loading="lazy"
               onerror="this.src='${t.placeholder}'" />
          <div class="testi-img-overlay"></div>
        </div>
        <div class="testi-body">
          <div class="testi-stars" aria-label="${t.rating || 5} out of 5 stars">${stars}</div>
          <div class="testi-person">
            <div class="testi-avatar">${initials}</div>
            <div>
              <div class="testi-name">${safe(t.name)}</div>
              <div class="testi-role">${safe(t.role)}</div>
            </div>
          </div>
          <div class="testi-view-btn">${viewBtn}</div>
        </div>
      </div>`;
    }).join('');
  }

  /* ════════════════════════════════════════════════════════════
     11. CONTACT — letter-badge replaces emoji icon
  ═════════════════════════════════════════════════════════════*/
  function renderContact() {
    const p = D.personal;

    const infoWrap = $('#contact-info-cards');
    if (infoWrap) {
      const cards = [
        { badge: '@',  label: 'Email',         value: safe(p.email), href: `mailto:${p.email}` },
        { badge: 'WA', label: 'WhatsApp',      value: safe(p.whatsapp), href: `https://wa.me/${p.whatsapp.replace(/\D/g,'')}` },
        { badge: 'LO', label: 'Location',      value: safe(p.location), href: null },
        { badge: 'CA', label: 'Schedule Call', value: 'cal.com/jelilatdatainsights', href: p.scheduleUrl },
      ];

      infoWrap.innerHTML = cards.map(c => `
        <div class="info-card">
          <div class="info-icon-box">${c.badge}</div>
          <div>
            <div class="info-label">${c.label}</div>
            ${c.href
              ? `<a class="info-value" href="${c.href}" target="${c.href.startsWith('mailto') ? '_self' : '_blank'}" rel="noopener noreferrer">${c.value}</a>`
              : `<span class="info-value">${c.value}</span>`}
          </div>
        </div>`).join('');
    }

    const schedBtn = $('#contact-schedule');
    if (schedBtn) schedBtn.href = p.scheduleUrl;

    renderSocialLinks('#contact-social', p.social, 'pill');
  }

  /* ════════════════════════════════════════════════════════════
     12. FOOTER
  ═════════════════════════════════════════════════════════════*/
  function renderFooter() {
    const p = D.personal;

    renderSocialLinks('#footer-social', p.social, 'footer');

    $$('#footer-resume').forEach(a => { a.href = p.resumeUrl; });

    const sched = $('#footer-schedule');
    if (sched) sched.href = p.scheduleUrl;

    const contactLinks = $('#footer-contact-links');
    if (contactLinks) {
      contactLinks.innerHTML = `
        <li><a href="mailto:${safe(p.email)}">${safe(p.email)}</a></li>
        <li><a href="https://wa.me/${p.whatsapp.replace(/\D/g,'')}" target="_blank" rel="noopener noreferrer">${safe(p.whatsapp)}</a></li>
        <li><a href="${p.social.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>`;
    }

    const copy = $('#footer-copy');
    if (copy) copy.innerHTML = `&copy; ${new Date().getFullYear()} ${safe(p.name)}. All rights reserved.`;
  }

  /* ════════════════════════════════════════════════════════════
     SOCIAL LINKS HELPER — brand logo circles (Image 2 style)
     mode "pill"   → hero & contact (44 px dark circles)
     mode "footer" → footer (34 px dark circles)
  ═════════════════════════════════════════════════════════════*/
  function renderSocialLinks(selector, social, mode) {
    const container = $(selector);
    if (!container || !social) return;

    const links = Object.entries(social).filter(([, url]) => url);
    const isFooter = mode === 'footer';
    const size     = isFooter ? 34 : 44;
    const imgSize  = isFooter ? 18 : 22;

    container.innerHTML = links.map(([key, url]) => {
      const meta = SOCIAL_META[key] || { type: 'text', text: key.slice(0,2).toUpperCase(), label: key };

      /* Build inner content based on icon type */
      let inner = '';
      if (meta.type === 'img') {
        inner = `<img src="${meta.src}" alt="${meta.label}" width="${imgSize}" height="${imgSize}" loading="lazy" />`;
      } else if (meta.type === 'svg') {
        inner = meta.svg;
      } else {
        inner = `<span class="brand-text">${meta.text}</span>`;
      }

      const cls = isFooter ? 'footer-social-link social-brand-link' : 'social-brand-link';
      return `<a href="${url}" class="${cls}"
                 target="_blank" rel="noopener noreferrer"
                 aria-label="${meta.label}" title="${meta.label}"
                 style="width:${size}px;height:${size}px;">
                ${inner}
              </a>`;
    }).join('');
  }

  /* ════════════════════════════════════════════════════════════
     NEW: TOOLS & TECHNOLOGIES GRID
     Reads D.tools[] from data.js — add/remove tools there.
  ═════════════════════════════════════════════════════════════*/
  function renderTools() {
    const grid = $('#tools-grid');
    if (!grid || !D.tools) return;

    grid.innerHTML = D.tools.map(tool => {
      /* Icon: CDN image, fallback to customText badge */
      const iconInner = tool.imgUrl
        ? `<img src="${tool.imgUrl}" alt="${safe(tool.name)}" loading="lazy"
                onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
           <span class="tool-icon-text" style="display:none;">${safe(tool.customText || tool.name.slice(0,2).toUpperCase())}</span>`
        : `<span class="tool-icon-text">${safe(tool.customText || tool.name.slice(0,2).toUpperCase())}</span>`;

      return `
      <div class="tool-card">
        <div class="tool-icon-wrap">${iconInner}</div>
        <span class="tool-name">${safe(tool.name)}</span>
      </div>`;
    }).join('');
  }

  /* ════════════════════════════════════════════════════════════
     NEW: WIRE SCHEDULE FAB href from data.js
  ═════════════════════════════════════════════════════════════*/
  function initScheduleFab() {
    const fab = $('#schedule-fab');
    if (fab) fab.href = D.personal.scheduleUrl;
  }

  function initContactForm() {
    const form   = $('#contact-form');
    const status = $('#form-status');
    const submit = $('#form-submit');
    const btnTxt = submit?.querySelector('.btn-text');
    const btnLdr = submit?.querySelector('.btn-loading');
    if (!form) return;

    const formId       = D.personal.formspreeId;
    const useFormspree = formId && formId !== 'YOUR_FORM_ID';

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const name    = $('#cf-name')?.value.trim();
      const email   = $('#cf-email')?.value.trim();
      const subject = $('#cf-subject')?.value.trim();
      const message = $('#cf-message')?.value.trim();

      if (!name || !email || !subject || !message) {
        setStatus('error', 'Please fill in all fields.');
        return;
      }

      if (btnTxt) btnTxt.hidden = true;
      if (btnLdr) btnLdr.hidden = false;
      if (submit) submit.disabled = true;

      if (useFormspree) {
        try {
          const res  = await fetch(`https://formspree.io/f/${formId}`, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message }),
          });
          const data = await res.json();
          if (res.ok) {
            setStatus('success', 'Message sent! I will get back to you soon.');
            form.reset();
          } else {
            setStatus('error', data?.errors?.[0]?.message || 'Something went wrong. Please try again.');
          }
        } catch {
          setStatus('error', 'Network error. Please email me directly.');
        }
      } else {
        const mailto = `mailto:${D.personal.email}`
          + `?subject=${encodeURIComponent(subject)}`
          + `&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
        window.open(mailto, '_blank');
        setStatus('success', 'Opening your email client. Add your Formspree ID in data.js to use the built-in form.');
      }

      setTimeout(() => {
        if (btnTxt) btnTxt.hidden = false;
        if (btnLdr) btnLdr.hidden = true;
        if (submit) submit.disabled = false;
      }, 2000);
    });

    function setStatus(type, msg) {
      if (!status) return;
      status.textContent = msg;
      status.className   = `form-status ${type}`;
    }
  }

  /* ════════════════════════════════════════════════════════════
     BOOT
  ═════════════════════════════════════════════════════════════*/
  function boot() {
    initTheme();
    initNav();
    initMobileMenu();

    renderHero();
    renderAbout();
    renderProjects();
    renderExperience();
    renderSkills();
    renderServices();
    renderTestimonials();
    renderContact();
    renderFooter();

    renderTools();
    initScheduleFab();

    initContactForm();

    /* Signal animations.js that DOM is populated */
    window.dispatchEvent(new CustomEvent('portfolio:rendered'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();