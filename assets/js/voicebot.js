/* ============================================================
   voicebot.js — Floating AI Assistant "Tosin"  (Revision 2)
   
   Now a fixed bottom-right FAB widget (not in the footer).
   HTML structure (in index.html):
     .vb-float
       .vb-panel (hidden by default, expands upward)
         .vb-panel-header  → header with close btn
         .vb-chat          → message log
         .vb-suggestions   → quick-tap chips
         .vb-input-row     → text input + mic + send
       .vb-fab#vb-toggle   → circular FAB button
   
   Features:
   • Text chat with keyword-matched responses from data.js
   • Web Speech Synthesis for voice output (where supported)
   • Web Speech Recognition for mic input (Chrome/Edge)
   • Close button inside panel header
   • Graceful text-only fallback
   ============================================================ */

(function () {
  'use strict';

  if (typeof PORTFOLIO_DATA === 'undefined') return;

  const VB = PORTFOLIO_DATA.voicebot;

  /* ── DOM refs ────────────────────────────────────────────── */
  const toggleBtn = document.getElementById('vb-toggle');
  const closeBtn  = document.getElementById('vb-close');
  const panel     = document.getElementById('vb-panel');
  const chat      = document.getElementById('vb-chat');
  const inputEl   = document.getElementById('vb-input');
  const sendBtn   = document.getElementById('vb-send');
  const micBtn    = document.getElementById('vb-mic');
  const chips     = document.querySelectorAll('.vb-chip');

  if (!toggleBtn || !panel || !chat) return;

  /* ── Speech Synthesis ────────────────────────────────────── */
  const synth = window.speechSynthesis;
  let speaking = false;

  function speak(text) {
    if (!synth || speaking) return;
    synth.cancel();
    const utt   = new SpeechSynthesisUtterance(text);
    utt.rate    = 1.05;
    utt.pitch   = 1.05;
    utt.volume  = 0.9;

    /* Prefer a warm female English voice */
    const voices = synth.getVoices();
    const preferred = voices.find(v =>
      v.lang.startsWith('en') && (
        v.name.toLowerCase().includes('female')   ||
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('google us english') ||
        v.name.toLowerCase().includes('zira')
      )
    );
    if (preferred) utt.voice = preferred;

    utt.onstart = () => { speaking = true; };
    utt.onend   = () => { speaking = false; };
    synth.speak(utt);
  }

  /* ── Panel open / close ──────────────────────────────────── */
  let panelOpen = false;
  let greeted   = false;

  function openPanel() {
    panelOpen = true;
    panel.removeAttribute('hidden');
    toggleBtn.setAttribute('aria-expanded', 'true');
    if (!greeted) {
      addBotMessage(VB.greeting, true);
      greeted = true;
    }
    setTimeout(() => inputEl && inputEl.focus(), 180);
  }

  function closePanel() {
    panelOpen = false;
    panel.setAttribute('hidden', '');
    toggleBtn.setAttribute('aria-expanded', 'false');
    synth && synth.cancel();
  }

  toggleBtn.addEventListener('click', () => {
    panelOpen ? closePanel() : openPanel();
  });

  closeBtn && closeBtn.addEventListener('click', closePanel);

  /* ── Chat message helpers ────────────────────────────────── */
  function addBotMessage(text, doSpeak = false) {
    const div = document.createElement('div');
    div.className   = 'bot-bubble';
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    if (doSpeak) speak(text);
  }

  function addUserMessage(text) {
    const div = document.createElement('div');
    div.className   = 'user-bubble';
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  /* ── Keyword matcher ─────────────────────────────────────── */
  const RULES = [
    { keys: ['skill','know','tool','tech','stack','language','software'],        key: 'skills'     },
    { keys: ['python','pandas','seaborn','matplotlib','scikit'],                 key: 'python'     },
    { keys: ['power bi','powerbi','dashboard','bi','tableau','dax'],             key: 'powerbi'    },
    { keys: ['project','portfolio','built','created','made'],                    key: 'projects'   },
    { keys: ['experience','career','history','role','job','worked'],             key: 'experience' },
    { keys: ['hire','available','freelance','book','engage','contract'],         key: 'hire'       },
    { keys: ['contact','reach','email','phone','whatsapp','message'],            key: 'contact'    },
    { keys: ['service','offer','do for','help with','provide'],                  key: 'services'   },
    { keys: ['location','based','where','country','city','lagos','nigeria'],     key: 'location'   },
    { keys: ['resume','cv','curriculum','download'],                             key: 'resume'     },
  ];

  function getResponse(input) {
    const q = input.toLowerCase().trim();

    if (/^(hi|hello|hey|howdy|good\s*(morning|afternoon|evening))/.test(q)) {
      return `Hello! I'm Tosin, Jelilat's assistant. Ask me about her skills, projects, services, or how to hire her.`;
    }
    if (/thank|thanks|great|awesome|perfect/.test(q)) {
      return `You're welcome! Is there anything else you'd like to know about Jelilat?`;
    }

    for (const rule of RULES) {
      if (rule.keys.some(k => q.includes(k))) {
        return VB.responses[rule.key] || VB.responses.default;
      }
    }
    return VB.responses.default;
  }

  /* ── Send handler ────────────────────────────────────────── */
  function handleSend() {
    const text = (inputEl?.value || '').trim();
    if (!text) return;
    inputEl.value = '';
    addUserMessage(text);
    setTimeout(() => addBotMessage(getResponse(text), true), 380);
  }

  sendBtn  && sendBtn.addEventListener('click', handleSend);
  inputEl  && inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  });

  /* ── Suggestion chips ────────────────────────────────────── */
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.dataset.q;
      if (!q) return;
      if (!panelOpen) openPanel();
      addUserMessage(q);
      setTimeout(() => addBotMessage(getResponse(q), true), 380);
    });
  });

  /* ── Web Speech Recognition ──────────────────────────────── */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SR) {
    if (micBtn) {
      micBtn.title   = 'Voice input not supported in this browser';
      micBtn.style.opacity = '0.4';
    }
  } else {
    const rec          = new SR();
    rec.lang           = 'en-US';
    rec.continuous     = false;
    rec.interimResults = false;
    let listening      = false;

    function startListening() {
      if (listening) return;
      if (!panelOpen) openPanel();
      listening = true;
      micBtn.classList.add('listening');
      micBtn.title = 'Listening...';
      try { rec.start(); } catch (_) {}
    }

    function stopListening() {
      if (!listening) return;
      listening = false;
      micBtn.classList.remove('listening');
      micBtn.title = 'Hold to speak';
      try { rec.stop(); } catch (_) {}
    }

    micBtn.addEventListener('mousedown',  startListening);
    micBtn.addEventListener('touchstart', startListening, { passive: true });
    micBtn.addEventListener('mouseup',    stopListening);
    micBtn.addEventListener('mouseleave', stopListening);
    micBtn.addEventListener('touchend',   stopListening);

    rec.onresult = e => {
      const t = e.results[0][0].transcript.trim();
      if (inputEl) inputEl.value = t;
      handleSend();
    };
    rec.onerror = () => stopListening();
    rec.onend   = () => stopListening();
  }

  /* ── Prime voice list (some browsers load async) ─────────── */
  if (synth?.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = () => synth.getVoices();
  }
})();