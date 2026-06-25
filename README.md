# Jelilat Oluwatosin Abdullateef — Portfolio Website

A premium, animated personal portfolio built with pure HTML, CSS, and JavaScript.
**No build tools. No frameworks. No npm.** Drop the folder into GitHub → enable Pages → done.

---

## ✅ What's Included

| File | Purpose |
|------|---------|
| `index.html` | Page structure (one file for all sections) |
| `assets/css/style.css` | All styles — light + dark themes, animations, responsive |
| `assets/js/data.js` | ⭐ **All editable content lives here** |
| `assets/js/main.js` | Reads `data.js` and renders every section |
| `assets/js/particles.js` | Canvas aurora particle background |
| `assets/js/orbs.js` | Click-to-spawn glowing orbs |
| `assets/js/typewriter.js` | Animated role title in hero |
| `assets/js/animations.js` | Scroll reveal, stat counters, skill bars |
| `assets/js/voicebot.js` | Footer AI assistant "Jeli" |

---

## 🚀 Deploying to GitHub Pages

### Step 1 — Create your repository
1. Go to [github.com](https://github.com) → **New repository**
2. Name it exactly: `jelilat25.github.io`
   *(replace `jelilat25` with your actual GitHub username)*
3. Set it to **Public**
4. Do **not** initialise with README (you already have one)

### Step 2 — Push your files
Open VS Code terminal in your project folder:

```bash
git init
git add .
git commit -m "Initial portfolio launch 🚀"
git branch -M main
git remote add origin https://github.com/jelilat25/jelilat25.github.io.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Under **Source** → select `main` branch → `/ (root)` folder
3. Click **Save**
4. Wait ~60 seconds → visit `https://jelilat25.github.io`

---

## ✏️ How to Edit Content

**Everything you need to change is in one file: `assets/js/data.js`**

### Update personal info
```js
personal: {
  name:     "Your Full Name",
  email:    "your@email.com",
  tagline:  "Your tagline here",
  // ...
}
```

### Add a new project
Open `data.js` → find `projects: [` → paste this at the TOP of the array:
```js
{
  id:          14,                              // use next number
  title:       "My New Project",
  description: "What this project does...",
  image:       "assets/images/projects/new.jpg", // add image file here
  placeholder: "https://placehold.co/600x380/8B5CF6/FFFFFF?text=New+Project",
  tags:        ["Power BI", "SQL"],
  category:    "data",                          // data | python | product | business
  impact:      "Key result or impact here",
  links: {
    live: "https://link-to-project.com",
    code: ""
  }
},
```

### Add a new experience role
Open `data.js` → find `experience: [` → paste at the TOP:
```js
{
  id:        9,
  company:   "Company Name",
  role:      "Your Role",
  duration:  "2025 – Present",
  type:      "Full-time",             // Full-time | Contract | Freelance | Internship
  icon:      "🏢",
  highlights: [
    "Key achievement or responsibility.",
    "Another key point.",
  ]
},
```

### Add a testimonial
1. Save a screenshot/photo of the testimonial to `assets/images/testimonials/t5.jpg`
2. Add to `testimonials: [` array:
```js
{
  id:          5,
  name:        "Client Full Name",
  role:        "Title, Company",
  photo:       "assets/images/testimonials/t5.jpg",
  placeholder: "https://placehold.co/520x320/1A0A2E/8B5CF6?text=Testimonial",
  rating:      5,
  viewLink:    "https://link-to-full-testimonial.com",
  type:        "link"   // "link" or "pdf"
},
```

### Update experience dates
In `data.js` → `experience` array → change the `duration` field:
```js
duration: "Jan 2023 – Mar 2024",   // any format you like
```

---

## 📁 Adding Your Real Files

| What | Where to put it |
|------|----------------|
| Profile photo | `assets/images/profile.jpg` |
| Resume PDF | `assets/resume/Jelilat_Resume.pdf` |
| Project screenshots | `assets/images/projects/project-name.jpg` |
| Testimonial screenshots | `assets/images/testimonials/t1.jpg` |

After adding a file, update the matching `image:` path in `data.js`.

---

## 📬 Enable the Contact Form (Free)

1. Go to [formspree.io](https://formspree.io) → sign up free
2. Create a new form → copy the Form ID (looks like `xpwzabcd`)
3. In `data.js` → update:
```js
formspreeId: "xpwzabcd",   // ← paste your real ID here
```
4. Save + push → form is now live!

Until you add the ID, the form opens your email client as a fallback.

---

## 🎨 Changing the Theme Colors

Open `assets/css/style.css` → find `:root` (light) and `[data-theme="dark"]` at the top.
Change any `--variable` value:
```css
--primary: #8B5CF6;    /* main purple — change to any color */
```

---

## 📱 Making Changes Live

After any edit in VS Code:
```bash
git add .
git commit -m "Updated projects section"
git push
```
GitHub Pages updates automatically within ~30 seconds.

---

## 🛟 Troubleshooting

| Problem | Fix |
| Site shows 404 | Check repo name is exactly `username.github.io` |
| Changes not showing | Hard refresh: `Ctrl+Shift+R` / wait 60s for Pages to rebuild |
| Contact form not working | Add your Formspree ID to `data.js` |
| Voice bot not speaking | Only works on HTTPS (GitHub Pages URL) — not `file://` |
| Particles slow | Reduce `count` in `particles.js` from 130 to 80 |
| Images not loading | Check file path matches exactly (case-sensitive on GitHub) |

---

Built with ❤️ by Jelilat Oluwatosin Abdullateef