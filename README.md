# Jelilat Oluwatosin Abdullateef — Portfolio Website
### jelilat25.github.io

A premium, fully animated personal portfolio built with pure HTML, CSS, and
JavaScript. No build tools. No npm. No frameworks. Drop the folder into GitHub,
enable Pages, and it is live.

---

## Table of Contents
1. [File Structure](#file-structure)
2. [Features](#features)
3. [How to Edit Content](#how-to-edit-content)
4. [Deployment Guide](#deployment-guide)
5. [SEO & Indexing](#seo--indexing)
6. [Analytics (StatCounter)](#analytics-statcounter)
7. [Troubleshooting](#troubleshooting)

---

## File Structure

```
jelilat25.github.io/
│
├── index.html                 ← Single page — all sections
├── robots.txt                 ← Allows all search engines + AI crawlers
├── sitemap.xml                ← Submitted to Google & Bing Search Console
├── README.md                  ← This file
│
├── assets/
│   ├── css/
│   │   └── style.css          ← All styles: themes, layout, animations, responsive
│   │
│   ├── js/
│   │   ├── data.js            ← ⭐ ALL editable content lives here
│   │   ├── main.js            ← Renders every section from data.js
│   │   ├── particles.js       ← Constellation network background
│   │   ├── typewriter.js      ← Animated role cycling in hero
│   │   ├── animations.js      ← Scroll reveal, stat counters, skill bars
│   │   └── voicebot.js        ← Floating AI assistant "Tosin"
│   │
│   ├── images/
│   │   ├── profile.jpg        ← Your profile photo (replace this)
│   │   ├── projects/          ← One image per project
│   │   ├── services/          ← One image per service card
│   │   └── testimonials/      ← Testimonial screenshot images
│   │
│   └── resume/
│       └── Jelilat_Resume.pdf ← Your CV (replace this)
```

---

## Features

### Background & Interactions
- **Constellation particle network** — ~100 floating nodes on desktop, 60 on
  tablet, 32 on mobile, connected by thin lines when within range
- **Mouse movement** — nearby particles gently nudge outward and spring back
- **Click on empty background** — nearby particles receive a velocity burst and
  smoothly return to natural drift within 1–2 seconds. No ripples or explosions
- **Touch on mobile** — finger nudges nearby particles; tap fires the same
  spring effect as a click
- **Responsive density** — particle count and connection distance automatically
  reduce on smaller screens for readability and performance
- **FPS cap** — 30 fps on mobile to preserve battery
- **Prefers-reduced-motion** — canvas hides entirely if user has enabled this

### Navigation
- Fixed navbar with blur backdrop on scroll
- Desktop: full nav links + Resume button (primary) + Hire Me + theme toggle
- Mobile: brand + **Resume button** (visible) + theme toggle + hamburger
- Mobile menu with all nav links + Resume + Hire Me inside
- Active nav link highlights as you scroll through sections

### Hero Section
- Full-viewport layout that fits without zooming on any screen size
- Animated typewriter cycling through 8 roles (fully editable in `data.js`)
- Profile photo inside spinning orbit rings with floating skill badges
- **Hire Me** — gradient purple pill button
- **View Work** — outlined pill button
- Social icon circles using real brand logos (Simple Icons CDN)
- Social icons have no hover colour change — subtle lift only
- Scroll indicator dot at bottom

### About Section
- Two bio paragraphs + skill chips
- Four animated stat counters (count up on scroll-in)
- Download Resume button
- Alternating background (`--section-alt`) for visual separation

### Projects Section
- 13 projects rendered from `data.js`
- Filter tabs: All / Data Analytics / Python / Product / Business
- **View More / Show Less** — shows 6 on desktop, 4 on tablet, 3 on mobile
  initially; button reveals remaining with exact count shown
- Each card: image, tags, title, description, impact, View Project + View Code
- Image zoom on hover, overlay buttons appear on hover

### Experience Section
- 9 roles rendered as a vertical timeline
- Alternating left/right cards on desktop, single column on mobile/tablet
- **View More / Show Less** — shows 4 on desktop, 3 on mobile initially
- Each card: role, company, duration badge, type badge, bullet highlights
- Emoji icons in timeline dots (only section that keeps emojis — intentional)

### Skills Section
- 4 skill group cards: Data & Analytics, Sales & CRM, Product & QA, Business & Strategy
- Animated progress bars trigger when card scrolls into view
- Purple accent bar replaces emoji in card header
- **Tools & Technologies** sub-section below skills:
  - 12 tool cards in a 6-column grid (responsive: 4→3→2 columns)
  - Icons loaded from Simple Icons CDN; custom text badge as fallback
  - Hover: card lifts with border glow

### Services Section
- 6 service cards with image, numbered badge, title, description, tags, CTA link
- Top gradient line animates on hover
- Add real images to `assets/images/services/` and update `image:` in `data.js`

### Testimonials Section
- Shows a photo/screenshot of the testimonial
- Star rating, person name + role, View Testimonial or Download PDF button
- Transparent background (canvas visible behind)
- Add testimonial screenshots to `assets/images/testimonials/`

### Contact Section
- Contact form connected to Formspree (add your ID to `data.js`)
- Falls back to mailto if no Formspree ID is set
- Info cards: Email, WhatsApp, Location, Schedule Call
- Social icon circles
- Schedule a Free Call button

### Floating UI Elements
- **Schedule a 1-1 FAB** — fixed bottom-left, always visible while scrolling,
  links to `https://cal.com/en/jelilatdatainsights`
- **AI Assistant FAB** — fixed bottom-right purple circle, opens "Tosin" chatbot
- Both remain fixed at their corners on all screen sizes

### AI Voice Assistant (Tosin)
- Floating FAB (bottom-right) labelled "AI"
- Expandable chat panel opens upward
- Text input + suggestion chips + microphone button (Chrome/Edge)
- Keyword-matched responses for: skills, Python, Power BI, projects,
  experience, hire, contact, services, location, resume
- Text-to-speech output via Web Speech API (HTTPS required)
- Close button inside panel header

### Light / Dark Theme
- Toggle button in navbar (moon / sun icon)
- Saved to `localStorage` — persists across page refreshes
- Dark: pure black (`#000000`) canvas, deep purple accents, white text
- Light: white canvas, soft purple accents, dark text
- Particle colours change with theme (white/cyan in dark, purple tones in light)
- Section backgrounds:
  - About + Skills → `--section-alt` (slight tint)
  - Testimonials, Projects, Experience, Services, Contact → transparent
    (particle canvas visible)
  - Hero → always transparent

### Per-Section Colour Control
Edit `sectionColors` in `data.js` to override heading, body text, background,
accent, button, and border colour for any individual section without touching CSS.
Leave any field as `""` to inherit the global theme.

### SEO & AI Crawlability
- `robots.txt` — allows all crawlers including GPTBot, ClaudeBot, PerplexityBot
- `sitemap.xml` — submitted to Google and Bing Search Console
- Full Open Graph + Twitter Card meta tags
- JSON-LD structured data (Person, WebSite, ProfilePage schemas) — readable by
  AI tools before JavaScript executes
- `<noscript>` block with entire portfolio content in plain HTML — ensures
  every crawler sees your name, skills, experience, and projects even without JS

### Analytics
- StatCounter installed (invisible — `sc_invisible=1`)
- No badge or counter shown to visitors
- Logs visits, geography, referrers, browser, device
- View stats at: `https://statcounter.com/p13336646/?guest=1`

---

## How to Edit Content

**Everything you ever need to change is in one file: `assets/js/data.js`**

### Change personal info
```js
personal: {
  name:       "Your Full Name",
  tagline:    "Your tagline",
  email:      "your@email.com",
  resumeUrl:  "assets/resume/Your_Resume.pdf",
  scheduleUrl:"https://cal.com/yourlink",
  formspreeId:"your_id_here",   // from formspree.io
}
```

### Edit social icon links and images
```js
socialIcons: [
  {
    key:       "linkedin",
    url:       "https://linkedin.com/in/yourprofile",
    imgUrl:    "https://cdn.simpleicons.org/linkedin/FFFFFF",
    label:     "LinkedIn",
    showHover: false,   // true = subtle lift on hover
    visible:   true     // false = hides without deleting
  },
  // ... add more icons the same way
]
```

### Add a new project
Paste this at the **top** of the `projects: [` array:
```js
{
  id:          14,                    // next number
  title:       "My New Project",
  description: "What this project does.",
  image:       "assets/images/projects/new.jpg",
  placeholder: "https://placehold.co/600x380/0F172A/6D28D9?text=New+Project",
  tags:        ["Power BI", "SQL"],
  category:    "data",               // data | python | product | business
  impact:      "Key result here",
  links: { live: "https://...", code: "https://..." }
},
```

### Add a new experience role
Paste this at the **top** of the `experience: [` array:
```js
{
  id:       10,
  company:  "Company Name",
  role:     "Your Role",
  duration: "Jan 2026 – Present",
  type:     "Full-time",             // Full-time | Contract | Freelance | Internship
  icon:     "🏢",
  highlights: [
    "Key achievement or responsibility.",
    "Another bullet point.",
  ]
},
```

### Add a new tool / technology
Paste at the end of the `tools: [` array:
```js
{
  name:   "Tool Name",
  imgUrl: "https://cdn.simpleicons.org/toolslug/FFFFFF",
  color:  "#HEXCOLOR"
},
```
Find icon slugs at [simpleicons.org](https://simpleicons.org).
If no icon exists, set `imgUrl: ""` and add `customText: "AB"` (2-letter badge).

### Add a testimonial
1. Save a screenshot to `assets/images/testimonials/t5.jpg`
2. Add to the `testimonials: [` array:
```js
{
  id:          5,
  name:        "Client Name",
  role:        "Title, Company",
  photo:       "assets/images/testimonials/t5.jpg",
  placeholder: "https://placehold.co/520x320/1A0A2E/6D28D9?text=Testimonial",
  rating:      5,
  viewLink:    "https://link-or-pdf-url",
  type:        "link"   // "link" or "pdf"
},
```

### Override a section's colours
In `sectionColors` (bottom of `data.js`), set any field for the section you want:
```js
projects: {
  heading: "#FFFFFF",      // h2/h3 colour
  body:    "#9CA3AF",      // paragraph colour
  bg:      "#0A0712",      // section background
  accent:  "#6D28D9",      // highlights, eyebrow, bars
  btnBg:   "#0F172A",      // button background
  btnText: "#FFFFFF",      // button text
  border:  "#1F1A3A"       // card borders
}
```
Leave any field as `""` to inherit the global theme default.

### Control how many projects/roles show initially
Edit `getInitialCount()` in `main.js`:
```js
function getInitialCount(type) {
  const w = window.innerWidth;
  if (type === 'projects') {
    if (w <= 600) return 3;   // mobile
    if (w <= 900) return 4;   // tablet
    return 6;                  // desktop
  }
  if (type === 'experience') {
    if (w <= 600) return 3;
    if (w <= 900) return 3;
    return 4;
  }
}
```

### Edit AI assistant responses
In `voicebot` at the bottom of `data.js`:
```js
voicebot: {
  name:     "Tosin",
  greeting: "Hi! I'm Tosin...",
  responses: {
    skills:   "Custom response about skills...",
    hire:     "Custom response about hiring...",
    // add new keywords freely
  }
}
```

---

## Deployment Guide

### First deployment
```bash
git init
git add .
git commit -m "Initial portfolio launch"
git branch -M main
git remote add origin https://github.com/Jelilat25/jelilat25.github.io.git
git push -u origin main
```
Then: GitHub repo → Settings → Pages → Source: main branch / root → Save.
Site goes live at `https://jelilat25.github.io` within ~60 seconds.

### Every update after that
```bash
git add .
git commit -m "Describe what changed"
git push
```
GitHub Pages rebuilds automatically. Live within ~30 seconds.

---

## SEO & Indexing

### Submit to Google (do this once)
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add Property → URL prefix → `https://jelilat25.github.io/`
3. Download the HTML verification file → add it to your repo root → push
4. Click Verify in Search Console
5. Go to Sitemaps → submit `https://jelilat25.github.io/sitemap.xml`

### Submit to Bing (do this once)
1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Import from Google Search Console → one-click sync

### Update sitemap date after major changes
In `sitemap.xml` update the `<lastmod>` date:
```xml
<lastmod>2026-07-17</lastmod>
```

### Why AI tools can read your portfolio
Your site has three layers of content for crawlers:
- **JSON-LD structured data** in `<head>` — readable before JS executes
- **`<noscript>` block** — complete pre-rendered copy of all content in plain HTML
- **`robots.txt`** — explicitly allows GPTBot, ClaudeBot, PerplexityBot, Googlebot, Bingbot

---

## Analytics (StatCounter)

StatCounter is installed and invisible (`sc_invisible=1` — no badge shown).

- **View your stats:** `https://statcounter.com/p13336646/?guest=1`
- **Login dashboard:** [statcounter.com](https://statcounter.com) with your account
- Tracks: visitor count, unique visitors, page views, countries, referrers,
  browsers, devices, time on site
- Verify installation: StatCounter dashboard → Check Installation

> Do NOT paste the Portfolio Stats link onto the website itself. It is for your
> private use only to share with someone you want to give access to your stats.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Site shows 404 | Repo name must be exactly `jelilat25.github.io` |
| Changes not showing | Hard refresh: `Ctrl+Shift+R` / `Cmd+Shift+R`; wait 60 s |
| Contact form not sending | Add Formspree ID to `data.js → formspreeId` |
| AI assistant voice not working | Voice requires HTTPS — works on live site, not `file://` |
| Particles slow on mobile | In `particles.js` → `getConfig()` → reduce `count` for mobile |
| Profile photo not showing | File must be at `assets/images/profile.jpg` (case-sensitive) |
| Resume not downloading | File must be at `assets/resume/Jelilat_Resume.pdf` |
| Tool icon not loading | Check imgUrl is correct; set `customText` as fallback |
| StatCounter not recording | Verify installation in StatCounter dashboard |
| Google not indexing | Submit sitemap in Google Search Console manually |
| View More not appearing | Need more items than initial count — check `getInitialCount()` |

---

## What Changed From Version 1

| Area | Version 1 | Current Version |
|------|-----------|-----------------|
| Fonts | Syne + Inter | Poppins + DM Sans |
| Background | Small floating particles + blur orbs | Constellation network with connecting lines |
| Click effect | Particle explosion burst | Velocity nudge — particles spring back naturally |
| Touch | Not implemented | Finger nudge + tap spring effect |
| Social icons | Large pill buttons with labels | Compact brand-logo circles, no hover colour |
| Voicebot location | Inside footer (scrolled away) | Fixed FAB bottom-right (always visible) |
| Voicebot name | Jeli | Tosin |
| Schedule button | Inside hero buttons | Fixed FAB bottom-left (always visible) |
| Hero buttons | 4 buttons (View Work, Hire Me, Schedule, Resume) | 2 pill buttons (Hire Me, View Work) |
| Nav on mobile | Hire Me button | Resume download button |
| Projects displayed | All 13 at once | Paginated: 6/4/3 by screen size + View More |
| Experience displayed | All 9 at once | Paginated: 4/3 by screen size + View More |
| Skills section | Emoji card headers | Purple accent bar |
| Tools section | Not present | 12-tool grid with brand icons |
| Service cards | Title + description only | Image + numbered badge + description |
| Testimonials | Text quotes only | Screenshot images + view/download link |
| orbs.js | Present (click explosions) | Removed — particles.js handles everything |
| Section backgrounds | All had solid background | User-controlled per section; most transparent |
| SEO | Basic meta tags only | robots.txt + sitemap.xml + JSON-LD + noscript |
| Analytics | None | StatCounter (invisible) |
| Content editing | data.js for most content | data.js for all content including social icons, section colours, tools |

---

Built with HTML · CSS · JavaScript · GitHub Pages

*Jelilat Oluwatosin Abdullateef — jelilatoluwatosinabdullateef@gmail.com*