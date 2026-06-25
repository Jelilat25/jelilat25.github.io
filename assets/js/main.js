/* ============================================================
   main.js — Portfolio Controller
   Reads PORTFOLIO_DATA (from data.js) and renders:
   Hero, About, Projects, Experience, Skills, Services,
   Testimonials, Contact, Footer.
   Also handles: theme toggle, nav scroll, mobile menu,
   project filter, contact form, smooth scroll.
   ============================================================ */

(function () {
  'use strict';

  /* ── Guard ───────────────────────────────────────────────── */
  if (typeof PORTFOLIO_DATA === 'undefined') {
    console.error('main.js: PORTFOLIO_DATA not found. Make sure data.js loads first.');
    return;
  }

  const D = PORTFOLIO_DATA;

  /* ════════════════════════════════════════════════════════════
     UTILITIES
  ═════════════════════════════════════════════════════════════*/
  function $(sel, ctx = document) { return ctx.querySelector(sel); }
  function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls)  e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  }

  function safe(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* Attempt to load real image, fall back to placeholder */
  function imgSrc(real, placeholder) {
    return real || placeholder;
  }

  /* Social icon map */
  const SOCIAL_ICONS = {
    linkedin:  { icon: '💼', label: 'LinkedIn'  },
    github:    { icon: '🐙', label: 'GitHub'    },
    novypro:   { icon: '📊', label: 'NovyPro'   },
    contra:    { icon: '🔗', label: 'Contra'    },
    email:     { icon: '✉️', label: 'Email'     },
    whatsapp:  { icon: '💬', label: 'WhatsApp'  },
  };

  /* ════════════════════════════════════════════════════════════
     1. THEME TOGGLE (persisted via localStorage)
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
     2. NAVBAR — scroll style + active link tracking
  ═════════════════════════════════════════════════════════════*/
  function initNav() {
    const navbar  = $('#navbar');
    const links   = $$('.nav-link');
    const sections = $$('section[id]');

    /* Scrolled class for background */
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) navbar?.classList.add('scrolled');
      else                      navbar?.classList.remove('scrolled');
      updateActiveLink();
    }, { passive: true });

    /* Active link on scroll */
    function updateActiveLink() {
      let current = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) current = sec.id;
      });
      links.forEach(a => {
        a.classList.toggle('active', a.dataset.section === current);
      });
    }

    /* Smooth scroll for ALL anchor links */
    document.addEventListener('click', e => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const target = document.getElementById(anchor.getAttribute('href').slice(1));
      if (!target) return;
      e.preventDefault();
      const offset = target.offsetTop - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
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
     4. HERO SECTION
  ═════════════════════════════════════════════════════════════*/
  function renderHero() {
    const p = D.personal;

    /* Name */
    const nameEl = $('#hero-name');
    if (nameEl) {
      const parts = p.name.split(' ');
      const last  = parts.pop();
      nameEl.innerHTML = `${safe(parts.join(' '))} <span class="name-accent">${safe(last)}</span>`;
    }

    /* Nav initials */
    const navInit = $('#nav-initials');
    if (navInit) navInit.textContent = p.initials || 'JOA';

    /* Tagline */
    const tagEl = $('#hero-tagline');
    if (tagEl) tagEl.textContent = p.tagline;

    /* Profile photo */
    const photoEl = $('#hero-photo');
    if (photoEl) {
      photoEl.src = p.profilePhoto;
      photoEl.onerror = () => {
        photoEl.src = `https://placehold.co/440x440/8B5CF6/FFFFFF?text=${encodeURIComponent(p.initials || 'JOA')}`;
      };
    }

    /* Buttons */
    const schedBtn = $('#hero-schedule');
    if (schedBtn) schedBtn.href = p.scheduleUrl;

    const resumeBtn = $('#hero-resume');
    if (resumeBtn) resumeBtn.href = p.resumeUrl;

    const navResume = $('#nav-resume-btn');
    if (navResume) navResume.href = p.resumeUrl;

    const mobileResume = $('#mobile-resume-btn');
    if (mobileResume) mobileResume.href = p.resumeUrl;

    /* Social links */
    renderSocialLinks('#hero-social', p.social, 'pill');
  }

  /* ════════════════════════════════════════════════════════════
     5. ABOUT SECTION
  ═════════════════════════════════════════════════════════════*/
  function renderAbout() {
    const a = D.about;

    $('#about-p1') && ($('#about-p1').textContent = a.bio);
    $('#about-p2') && ($('#about-p2').textContent = a.bio2);

    /* Resume button */
    const resumeBtn = $('#about-resume');
    if (resumeBtn) resumeBtn.href = D.personal.resumeUrl;

    /* Stats cards */
    const grid = $('#stats-grid');
    if (!grid || !a.stats) return;

    grid.innerHTML = a.stats.map(s => `
      <div class="stat-card">
        <span class="stat-value" data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</span>
        <span class="stat-label">${safe(s.label)}</span>
      </div>
    `).join('');
  }

  /* ════════════════════════════════════════════════════════════
     6. PROJECTS — filter tabs + cards
  ═════════════════════════════════════════════════════════════*/
  function renderProjects() {
    const projects = D.projects || [];
    const filtersEl = $('#project-filters');
    const gridEl    = $('#projects-grid');
    if (!filtersEl || !gridEl) return;

    /* Build category list — preserve order of first appearance */
    const cats = ['all'];
    projects.forEach(p => { if (!cats.includes(p.category)) cats.push(p.category); });

    const catLabels = {
      all:      'All Projects',
      data:     'Data Analytics',
      python:   'Python',
      product:  'Product',
      business: 'Business',
    };

    /* Filter buttons */
    filtersEl.innerHTML = cats.map((c, i) => `
      <button class="filter-btn ${i === 0 ? 'active' : ''}"
              data-cat="${c}" role="tab"
              aria-selected="${i === 0}">${safe(catLabels[c] || c)}</button>
    `).join('');

    /* Project cards */
    gridEl.innerHTML = projects.map(p => {
      const liveLink = p.links?.live
        ? `<a href="${p.links.live}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">View Project</a>`
        : '';
      const codeLink = p.links?.code
        ? `<a href="${p.links.code}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">View Code</a>`
        : '';

      return `
      <div class="project-card" data-cat="${p.category}">
        <div class="project-thumb">
          <img
            src="${imgSrc(p.image, p.placeholder)}"
            alt="${safe(p.title)}"
            loading="lazy"
            onerror="this.src='${p.placeholder}'"
          />
          <div class="project-overlay">
            ${liveLink}
            ${codeLink}
          </div>
        </div>
        <div class="project-body">
          <div class="project-tags">
            ${(p.tags || []).map(t => `<span class="project-tag">${safe(t)}</span>`).join('')}
          </div>
          <h3 class="project-title">${safe(p.title)}</h3>
          <p class="project-desc">${safe(p.description)}</p>
          ${p.impact ? `<div class="project-impact">
            <span class="impact-icon">📈</span>
            <span>${safe(p.impact)}</span>
          </div>` : ''}
        </div>
        <div class="project-footer">
          ${liveLink || '<span></span>'}
          ${codeLink}
        </div>
      </div>`;
    }).join('');

    /* Filter interactions */
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
        const match = cat === 'all' || card.dataset.cat === cat;
        card.style.display = match ? '' : 'none';
        if (match) {
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = '';
          });
        }
      });
    });
  }

  /* ════════════════════════════════════════════════════════════
     7. EXPERIENCE TIMELINE
  ═════════════════════════════════════════════════════════════*/
  function renderExperience() {
    const timeline = $('#timeline');
    if (!timeline || !D.experience) return;

    timeline.innerHTML = D.experience.map((exp, i) => `
      <div class="timeline-item">
        <div class="timeline-dot" aria-hidden="true">${safe(exp.icon || '💼')}</div>
        <div class="timeline-card">
          <div class="timeline-header">
            <div>
              <div class="timeline-role">${safe(exp.role)}</div>
              <div class="timeline-company">${safe(exp.company)}</div>
            </div>
            <div class="timeline-meta">
              <span class="timeline-duration">${safe(exp.duration)}</span>
              <span class="timeline-type">${safe(exp.type)}</span>
            </div>
          </div>
          <ul class="timeline-highlights">
            ${(exp.highlights || []).map(h => `<li>${safe(h)}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }

  /* ════════════════════════════════════════════════════════════
     8. SKILLS
  ═════════════════════════════════════════════════════════════*/
  function renderSkills() {
    const grid = $('#skills-grid');
    if (!grid || !D.skills) return;

    grid.innerHTML = D.skills.map(group => `
      <div class="skill-card">
        <div class="skill-card-header">
          <div class="skill-card-icon" style="color:${group.color}">${safe(group.icon)}</div>
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
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  /* ════════════════════════════════════════════════════════════
     9. SERVICES
  ═════════════════════════════════════════════════════════════*/
  function renderServices() {
    const grid = $('#services-grid');
    if (!grid || !D.services) return;

    grid.innerHTML = D.services.map(svc => `
      <div class="service-card reveal">
        <div class="service-icon">${safe(svc.icon)}</div>
        <div class="service-title">${safe(svc.title)}</div>
        <p class="service-desc">${safe(svc.description)}</p>
        <div class="service-tags">
          ${(svc.tags || []).map(t => `<span class="service-tag">${safe(t)}</span>`).join('')}
        </div>
        <a href="#contact" class="service-cta">Get in Touch →</a>
      </div>
    `).join('');
  }

  /* ════════════════════════════════════════════════════════════
     10. TESTIMONIALS
  ═════════════════════════════════════════════════════════════*/
  function renderTestimonials() {
    const grid = $('#testimonials-grid');
    if (!grid || !D.testimonials) return;

    grid.innerHTML = D.testimonials.map(t => {
      const stars   = '★'.repeat(t.rating || 5);
      const isLink  = t.type === 'link';
      const viewBtn = t.viewLink && t.viewLink !== '#'
        ? `<a href="${t.viewLink}" class="btn btn-primary btn-sm"
              target="_blank" rel="noopener noreferrer"
              ${!isLink ? 'download' : ''}>
              ${isLink ? '🔗 View Testimonial' : '⬇ Download PDF'}
           </a>`
        : `<span class="btn btn-ghost btn-sm" style="opacity:.45;cursor:default;">Coming Soon</span>`;

      /* Initials for avatar fallback */
      const initials = (t.name || 'C').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

      return `
      <div class="testi-card reveal">
        <div class="testi-image-wrap">
          <img
            src="${imgSrc(t.photo, t.placeholder)}"
            alt="Testimonial from ${safe(t.name)}"
            loading="lazy"
            onerror="this.src='${t.placeholder}'"
          />
          <div class="testi-img-overlay"></div>
        </div>
        <div class="testi-body">
          <div class="testi-stars" aria-label="${t.rating || 5} out of 5 stars">${stars}</div>
          <div class="testi-person">
            <div class="testi-avatar" aria-hidden="true">${initials}</div>
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
     11. CONTACT
  ═════════════════════════════════════════════════════════════*/
  function renderContact() {
    const p = D.personal;

    /* Info cards */
    const infoWrap = $('#contact-info-cards');
    if (infoWrap) {
      infoWrap.innerHTML = `
        <div class="info-card">
          <div class="info-icon">✉️</div>
          <div>
            <div class="info-label">Email</div>
            <a class="info-value" href="mailto:${safe(p.email)}">${safe(p.email)}</a>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">💬</div>
          <div>
            <div class="info-label">WhatsApp</div>
            <a class="info-value" href="https://wa.me/${p.whatsapp.replace(/\D/g,'')}" target="_blank" rel="noopener noreferrer">${safe(p.whatsapp)}</a>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">📍</div>
          <div>
            <div class="info-label">Location</div>
            <span class="info-value">${safe(p.location)}</span>
          </div>
        </div>
        <div class="info-card">
          <div class="info-icon">📅</div>
          <div>
            <div class="info-label">Schedule a Call</div>
            <a class="info-value" href="${p.scheduleUrl}" target="_blank" rel="noopener noreferrer">cal.com/jelilatdatainsights</a>
          </div>
        </div>
      `;
    }

    /* Schedule link */
    const schedBtn = $('#contact-schedule');
    if (schedBtn) schedBtn.href = p.scheduleUrl;

    /* Social links */
    renderSocialLinks('#contact-social', p.social, 'icon');
  }

  /* ════════════════════════════════════════════════════════════
     12. FOOTER
  ═════════════════════════════════════════════════════════════*/
  function renderFooter() {
    const p = D.personal;

    /* Initials */
    const footerInit = $('#footer-initials');
    if (footerInit) footerInit.textContent = p.initials || 'JOA';

    /* Social icons */
    renderSocialLinks('#footer-social', p.social, 'icon-footer');

    /* Resume links */
    $$('#footer-resume').forEach(a => a.href = p.resumeUrl);

    /* Schedule link */
    const sched = $('#footer-schedule');
    if (sched) sched.href = p.scheduleUrl;

    /* Contact links */
    const contactLinks = $('#footer-contact-links');
    if (contactLinks) {
      contactLinks.innerHTML = `
        <li><a href="mailto:${safe(p.email)}">${safe(p.email)}</a></li>
        <li><a href="https://wa.me/${p.whatsapp.replace(/\D/g,'')}" target="_blank" rel="noopener noreferrer">${safe(p.whatsapp)}</a></li>
        <li><a href="${p.social.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
      `;
    }

    /* Copyright */
    const copy = $('#footer-copy');
    if (copy) {
      copy.innerHTML = `© ${new Date().getFullYear()} ${safe(p.name)}. All rights reserved.`;
    }
  }

  /* ════════════════════════════════════════════════════════════
     SOCIAL LINKS HELPER
     mode: "pill" (hero) | "icon" (contact) | "icon-footer"
  ═════════════════════════════════════════════════════════════*/
  function renderSocialLinks(selector, social, mode) {
    const container = $(selector);
    if (!container || !social) return;

    const links = Object.entries(social).filter(([, url]) => url);

    if (mode === 'pill') {
      container.innerHTML = links.map(([key, url]) => {
        const meta = SOCIAL_ICONS[key] || { icon: '🔗', label: key };
        return `<a href="${url}" class="social-icon-link" target="_blank" rel="noopener noreferrer" aria-label="${meta.label}">
          <span class="s-icon">${meta.icon}</span>
          <span>${meta.label}</span>
        </a>`;
      }).join('');

    } else if (mode === 'icon') {
      container.innerHTML = links.map(([key, url]) => {
        const meta = SOCIAL_ICONS[key] || { icon: '🔗', label: key };
        return `<a href="${url}" class="social-icon-link" target="_blank" rel="noopener noreferrer" aria-label="${meta.label}">
          <span class="s-icon">${meta.icon}</span>
          <span>${meta.label}</span>
        </a>`;
      }).join('');

    } else if (mode === 'icon-footer') {
      container.innerHTML = links.map(([key, url]) => {
        const meta = SOCIAL_ICONS[key] || { icon: '🔗', label: key };
        return `<a href="${url}" class="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="${meta.label}" title="${meta.label}">
          ${meta.icon}
        </a>`;
      }).join('');
    }
  }

  /* ════════════════════════════════════════════════════════════
     13. CONTACT FORM — Formspree integration + mailto fallback
  ═════════════════════════════════════════════════════════════*/
  function initContactForm() {
    const form   = $('#contact-form');
    const status = $('#form-status');
    const submit = $('#form-submit');
    const btnTxt = submit?.querySelector('.btn-text');
    const btnLdr = submit?.querySelector('.btn-loading');
    if (!form) return;

    const formId = D.personal.formspreeId;
    const useFormspree = formId && formId !== 'YOUR_FORM_ID';

    form.addEventListener('submit', async e => {
      e.preventDefault();

      const name    = $('#cf-name')?.value.trim();
      const email   = $('#cf-email')?.value.trim();
      const subject = $('#cf-subject')?.value.trim();
      const message = $('#cf-message')?.value.trim();

      if (!name || !email || !subject || !message) {
        setStatus('error', '⚠️ Please fill in all fields.');
        return;
      }

      /* Loading state */
      if (btnTxt) btnTxt.hidden = true;
      if (btnLdr) btnLdr.hidden = false;
      if (submit) submit.disabled = true;

      if (useFormspree) {
        /* Formspree submission */
        try {
          const res = await fetch(`https://formspree.io/f/${formId}`, {
            method:  'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body:    JSON.stringify({ name, email, subject, message }),
          });
          const data = await res.json();
          if (res.ok) {
            setStatus('success', "✅ Message sent! I'll get back to you soon.");
            form.reset();
          } else {
            setStatus('error', data?.errors?.[0]?.message || '❌ Something went wrong. Please try again.');
          }
        } catch {
          setStatus('error', '❌ Network error. Please email me directly.');
        }
      } else {
        /* mailto fallback */
        const mailtoLink = `mailto:${D.personal.email}`
          + `?subject=${encodeURIComponent(subject)}`
          + `&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
        window.open(mailtoLink, '_blank');
        setStatus('success', '📧 Opening your email client… (Add your Formspree ID in data.js to use the built-in form)');
      }

      /* Reset button */
      setTimeout(() => {
        if (btnTxt) btnTxt.hidden = false;
        if (btnLdr) btnLdr.hidden = true;
        if (submit) submit.disabled = false;
      }, 1800);
    });

    function setStatus(type, msg) {
      if (!status) return;
      status.textContent  = msg;
      status.className    = `form-status ${type}`;
    }
  }

  /* ════════════════════════════════════════════════════════════
     14. ACTIVE NAV on load
  ═════════════════════════════════════════════════════════════*/
  function setInitialActive() {
    const home = $('[data-section="home"]');
    if (home) home.classList.add('active');
  }

  /* ════════════════════════════════════════════════════════════
     BOOT — render everything, then fire event for animations.js
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

    initContactForm();
    setInitialActive();

    /* Tell animations.js all DOM is ready */
    window.dispatchEvent(new CustomEvent('portfolio:rendered'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();