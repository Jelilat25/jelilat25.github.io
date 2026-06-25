/* ============================================================
   voicebot.js — Footer AI Assistant "Jeli"
   • Text chat with keyword-matched responses from data.js
   • Web Speech Synthesis for voice output
   • Web Speech Recognition for mic input (Chrome / Edge)
   • Graceful text-only fallback on unsupported browsers
   ============================================================ */

(function () {
  'use strict';

  /* ── Bail if data or DOM not ready ──────────────────────── */
  if (typeof PORTFOLIO_DATA === 'undefined') return;

  const VB   = PORTFOLIO_DATA.voicebot;
  const DATA = PORTFOLIO_DATA;

  const toggleBtn  = document.getElementById('vb-toggle');
  const panel      = document.getElementById('vb-panel');
  const chat       = document.getElementById('vb-chat');
  const inputEl    = document.getElementById('vb-input');
  const sendBtn    = document.getElementById('vb-send');
  const micBtn     = document.getElementById('vb-mic');
  const chips      = document.querySelectorAll('.vb-chip');

  if (!toggleBtn || !panel || !chat) return;

  /* ── Speech Synthesis ────────────────────────────────────── */
  const synth    = window.speechSynthesis;
  let   speaking = false;

  function speak(text) {
    if (!synth || speaking) return;
    synth.cancel();
    const utt  = new SpeechSynthesisUtterance(text);
    utt.rate   = 1.05;
    utt.pitch  = 1.05;
    utt.volume = 0.9;

    /* Prefer a warm female voice if available */
    const voices = synth.getVoices();
    const preferred = voices.find(v =>
      v.lang.startsWith('en') &&
      (v.name.toLowerCase().includes('female') ||
       v.name.toLowerCase().includes('samantha') ||
       v.name.toLowerCase().includes('google us english') ||
       v.name.toLowerCase().includes('zira'))
    );
    if (preferred) utt.voice = preferred;

    utt.onstart = () => { speaking = true; };
    utt.onend   = () => { speaking = false; };
    synth.speak(utt);
  }

  /* ── Panel toggle ─────────────────────────────────────────── */
  let panelOpen = false;

  toggleBtn.addEventListener('click', () => {
    panelOpen = !panelOpen;
    toggleBtn.setAttribute('aria-expanded', panelOpen);
    if (panelOpen) {
      panel.removeAttribute('hidden');
      /* Show greeting on first open */
      if (chat.children.length === 0) {
        addBotMessage(VB.greeting, true);
      }
      setTimeout(() => inputEl && inputEl.focus(), 200);
    } else {
      panel.setAttribute('hidden', '');
      synth && synth.cancel();
    }
  });

  /* ── Add messages to chat ─────────────────────────────────── */
  function addBotMessage(text, doSpeak = false) {
    const div = document.createElement('div');
    div.className = 'bot-bubble';
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    if (doSpeak) speak(text);
  }

  function addUserMessage(text) {
    const div = document.createElement('div');
    div.className = 'user-bubble';
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  /* ── Keyword matcher ─────────────────────────────────────── */
  const KEYWORD_MAP = [
    { keys: ['skill', 'know', 'tool', 'tech', 'stack', 'language', 'software'],      key: 'skills'     },
    { keys: ['python', 'pandas', 'seaborn', 'matplotlib', 'scikit'],                  key: 'python'     },
    { keys: ['power bi', 'powerbi', 'dashboard', 'bi', 'tableau', 'dax'],             key: 'powerbi'    },
    { keys: ['project', 'work', 'portfolio', 'built', 'created', 'made'],             key: 'projects'   },
    { keys: ['experience', 'career', 'history', 'role', 'job', 'work at', 'worked'],  key: 'experience' },
    { keys: ['hire', 'available', 'freelance', 'book', 'engage', 'contract'],         key: 'hire'       },
    { keys: ['contact', 'reach', 'email', 'phone', 'whatsapp', 'message'],            key: 'contact'    },
    { keys: ['service', 'offer', 'do for', 'help with', 'provide'],                   key: 'services'   },
    { keys: ['location', 'based', 'where', 'country', 'city', 'lagos', 'nigeria'],    key: 'location'   },
    { keys: ['resume', 'cv', 'curriculum', 'download'],                                key: 'resume'     },
  ];

  function getResponse(input) {
    const q = input.toLowerCase().trim();

    /* Greetings */
    if (/^(hi|hello|hey|howdy|good\s*(morning|afternoon|evening))/.test(q)) {
      return `Hello! 👋 I'm Jeli, Jelilat's assistant. Ask me about her skills, projects, services, or how to hire her!`;
    }

    /* Thanks */
    if (/thank|thanks|great|awesome|perfect/.test(q)) {
      return `You're welcome! Is there anything else you'd like to know about Jelilat?`;
    }

    /* Match keywords */
    for (const rule of KEYWORD_MAP) {
      if (rule.keys.some(k => q.includes(k))) {
        return VB.responses[rule.key] || VB.responses.default;
      }
    }

    return VB.responses.default;
  }

  /* ── Handle user sending a message ───────────────────────── */
  function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = '';
    addUserMessage(text);

    /* Slight delay for realistic feel */
    setTimeout(() => {
      const reply = getResponse(text);
      addBotMessage(reply, true);
    }, 420);
  }

  sendBtn.addEventListener('click', handleSend);
  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  });

  /* ── Suggestion chips ────────────────────────────────────── */
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.dataset.q;
      if (!q) return;
      addUserMessage(q);
      setTimeout(() => addBotMessage(getResponse(q), true), 420);
    });
  });

  /* ── Mic / Speech Recognition ─────────────────────────────── */
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    micBtn && (micBtn.title = 'Voice input not supported in this browser');
    micBtn && micBtn.classList.add('unsupported');
  } else {
    const rec = new SpeechRecognition();
    rec.lang        = 'en-US';
    rec.continuous  = false;
    rec.interimResults = false;

    let listening = false;

    micBtn.addEventListener('mousedown',  startListening);
    micBtn.addEventListener('touchstart', startListening, { passive: true });
    micBtn.addEventListener('mouseup',    stopListening);
    micBtn.addEventListener('mouseleave', stopListening);
    micBtn.addEventListener('touchend',   stopListening);

    function startListening() {
      if (listening) return;
      listening = true;
      micBtn.classList.add('listening');
      micBtn.title = 'Listening…';
      try { rec.start(); } catch (_) { /* already running */ }
    }

    function stopListening() {
      if (!listening) return;
      listening = false;
      micBtn.classList.remove('listening');
      micBtn.title = 'Hold to speak';
      try { rec.stop(); } catch (_) {}
    }

    rec.onresult = e => {
      const transcript = e.results[0][0].transcript.trim();
      inputEl.value = transcript;
      handleSend();
    };

    rec.onerror = e => {
      console.warn('Speech recognition error:', e.error);
      stopListening();
    };

    rec.onend = () => stopListening();
  }

  /* ── Load voices async (needed in some browsers) ─────────── */
  if (synth && synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = () => synth.getVoices(); // prime the list
  }
})();