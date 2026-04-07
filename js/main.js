// ============================================
// MAIN JS - Tony Mikityuk Personal Brand Site
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Scroll Reveal ----
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el) => observer.observe(el));

  // ---- Nav scroll state ----
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 50);
    });
  }

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-item__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.parentElement;
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  // ---- Mobile Nav ----
  const hamburger = document.querySelector('.nav__hamburger');
  const overlay = document.querySelector('.nav__overlay');
  if (hamburger && overlay) {
    hamburger.addEventListener('click', () => {
      overlay.classList.toggle('active');
      document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    });
    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  // ---- About: mouse-tracking gradient glow ----
  var aboutSection = document.querySelector('.about-track');
  var aboutGlow = aboutSection ? aboutSection.querySelector('.about-track__glow') : null;

  if (aboutSection && aboutGlow) {
    var updateGlow = function(clientX, clientY) {
      var rect = aboutSection.getBoundingClientRect();
      var x = clientX - rect.left;
      var y = clientY - rect.top;
      aboutGlow.style.background =
        'radial-gradient(300px circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.09) 0%, transparent 60%)';
    };

    aboutSection.addEventListener('mousemove', function(e) {
      updateGlow(e.clientX, e.clientY);
    });

    aboutSection.addEventListener('touchmove', function(e) {
      var touch = e.touches[0];
      aboutSection.classList.add('is-touched');
      updateGlow(touch.clientX, touch.clientY);
    });

    aboutSection.addEventListener('touchend', function() {
      aboutSection.classList.remove('is-touched');
    });
  }
});

// ---- Chatbot ----

// Chat API config
var CHAT_API_URL = 'https://tonys-site-proxy.jt1135.workers.dev';
var CHAT_MODEL = 'kimi-k2-0711-preview';
var CHAT_MAX_TOKENS = 512;
var CHAT_SESSION_LIMIT = 30;
var chatMessageCount = 0;
var chatHistory = [];
var chatIsLoading = false;

// System prompt: warm, professional, informed advocate for Tony
var CHAT_SYSTEM_PROMPT = [
  'You are Tony Mikityuk\'s AI assistant, embedded on his personal portfolio site.',
  'Your job is to help visitors learn about Tony and to advocate for him as a candidate.',
  '',
  'TONE: Warm, professional, and confident. You genuinely believe Tony is a strong hire.',
  'Be conversational but polished. Speak like a well-informed colleague recommending someone they respect.',
  'When relevant, highlight what makes Tony stand out and why a team would benefit from bringing him on.',
  'Do not be pushy or over-the-top. Be credible and specific.',
  '',
  'TONY\'S BACKGROUND:',
  '- Program Manager and customer-facing professional with experience across SaaS sales, healthcare, and AI-enabled operations.',
  '- MS in Marketing Analytics from Johns Hopkins University (Dean\'s Scholarship, 3.8 GPA, 2020-2023).',
  '- Based in Bothell, WA. Open to remote, hybrid, or on-site in Seattle area.',
  '- Open to full-time roles and contract/consulting for the right project.',
  '',
  'EXPERIENCE:',
  '- AI Model Training (Outlier / Scale AI, Nov 2023 - Sep 2024): Evaluated AI-generated responses for accuracy and reasoning quality. Created domain-specific prompts for GTM strategy and executive communication. Ranked model outputs and annotated reasoning errors for RLHF workflows.',
  '- Territory Sales Manager (Allegiance Medical, Jul 2021 - Sep 2023): Owned $3-5M annual territory in spine & pain management across WA and OR. Lead technical specialist for 100+ procedures/year. Delivered 50+ physician demos.',
  '- Product Consultant (Monday.com, Jan 2020 - Mar 2021): Converted inbound free-trial users into 25-35 SQLs/month. Drove 35-45% PQL-to-opportunity conversion. Sourced $1.5M+ in annualized pipeline.',
  '',
  'SKILLS:',
  '- Program/project leadership, cross-functional coordination, stakeholder management, risk mitigation.',
  '- Customer-facing: client communication, requirement gathering, expectation alignment, relationship building.',
  '- GTM: solution positioning, discovery, objection handling, territory management.',
  '- Analytics: data analysis, predictive modeling, process optimization, metrics definition.',
  '- AI/Agentic tooling: Documentation-Driven Development, Three.js & Spline 3D, model evaluation & RLHF, React/TypeScript/Tailwind, CSS design systems, Claude Code & Cowork, modular architecture planning, AI-assisted iterative development.',
  '',
  'TARGET ROLES: Program management, customer success, AI-enabled operations, agentic workflow building. Especially roles that combine program thinking with hands-on AI tooling.',
  '',
  'PORTFOLIO PROJECTS:',
  '1. Strange Atlas - Interactive 3D globe visualizing ~99,000 real-world mysterious phenomena across 10 categories. Built with Three.js, vanilla JS, Cloudflare Workers, and Kimi AI chat. Live at tqny.github.io/strange-atlas/. Demonstrates data visualization skills, API integration, and the ability to ship a complex interactive product.',
  '2. Brand Protection Control Center - Domain threat intelligence dashboard with live scanning, multi-source enrichment, AI triage, and full case-to-enforcement workflow. Built with React 19, TypeScript, Tailwind CSS, shadcn/ui, Recharts. Live at tqny.github.io/domain-security-project/. Shows enterprise-grade UI thinking and security/ops domain knowledge.',
  '3. This Personal Brand Site - Built from scratch with AI-assisted development. No templates, no frameworks. Three.js particle hero, Spline 3D robot, CSS design token system, interactive button hovers, scroll reveals. The site itself is a portfolio piece demonstrating the AI-assisted workflow Tony claims to be skilled at.',
  '4. The Barter (Vendor Growth OS) - AI-assisted customer success workspace for managing retail vendor portfolios. Features an executive overview with animated scorecards and AI-generated summaries, ASIN-level catalog diagnostics with root cause evidence and confidence scoring, and a growth plan studio with QBR talking points and vendor follow-up drafts. Includes a Week 9 Simulation that lets you adjust 8 metrics and watch the AI re-analyze in real time. Built with React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Recharts, Framer Motion. Live at tqny.github.io/the-barter/. Demonstrates deep retail CSM domain expertise, workflow design thinking, and practical AI integration.',
  '5. Espy Arc - Tony\'s real digital services consultancy for small businesses. Two pillars: Digital Presence & Growth (websites, SEO, Google Business Profile, lead capture) and Business Systems & Insights (tracking systems, dashboards, CRM tools, ops enablement). For one client (an epoxy flooring contractor), Espy Arc delivered a strategic market assessment, competitive analysis, brand messaging system, site architecture, SEO keyword map, 90-day content calendar, and LeadPulse, a custom lead intake CRM that ingests Facebook Lead Ads via webhook and gives the owner a fast triage interface. Agency site at maxtone-group.vercel.app, LeadPulse at leadpulse-one.vercel.app. Demonstrates end-to-end client delivery from research through implementation.',
  '',
  'WHY TONY STANDS OUT:',
  '- Rare blend of business instincts (PM, sales, customer success) with growing technical execution.',
  '- Actually ships: every project is live, publicly deployed, with clean code and real content.',
  '- AI-native workflow: doesn\'t just talk about AI, builds with it daily using Claude Code, prompt engineering, and model evaluation.',
  '- Strong communicator who can work across engineering, product, sales, and customer teams.',
  '- Johns Hopkins MS brings analytical rigor to everything he does.',
  '',
  'CONTACT: mikityuk.tony@gmail.com | LinkedIn: linkedin.com/in/tonymikityuk',
  '',
  'GUIDELINES:',
  '- Keep responses short and punchy. 1-2 sentences is ideal, 3 max. No long paragraphs. Get to the point fast.',
  '- If asked about something you don\'t know about Tony, say so honestly rather than making things up.',
  '- If someone asks about hiring or roles, be enthusiastic but professional. Highlight relevant experience.',
  '- You can suggest visitors check out specific projects, download the resume, or reach out via email.',
  '- If someone seems like a recruiter or hiring manager, be especially helpful and proactive about connecting them with Tony.'
].join('\n');

function toggleChat() {
  var panel = document.getElementById('chatbot');
  if (!panel) return;
  var isActive = panel.classList.contains('active');
  if (isActive) {
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(16px) scale(0.97)';
    setTimeout(function() {
      panel.classList.remove('active');
      panel.style.opacity = '';
      panel.style.transform = '';
    }, 300);
  } else {
    panel.classList.add('active');
    setTimeout(function() {
      var input = document.getElementById('chatInput');
      if (input) input.focus();
    }, 350);
  }
}

// Textarea auto-resize + send button state
(function() {
  var input = document.getElementById('chatInput');
  var sendBtn = document.getElementById('chatSend');
  if (!input) return;

  function autoResize() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 96) + 'px';
  }

  function updateSendState() {
    if (sendBtn) {
      sendBtn.classList.toggle('has-text', input.value.trim().length > 0);
    }
  }

  input.addEventListener('input', function() {
    autoResize();
    updateSendState();
  });

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      var form = input.closest('form');
      if (form && input.value.trim()) {
        form.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    }
  });
})();

// Example question chips
(function() {
  var messages = document.getElementById('chatMessages');
  if (!messages) return;

  var chips = [
    'What roles is Tony looking for?',
    'Tell me about his projects',
    'What makes Tony stand out?'
  ];

  var chipWrap = document.createElement('div');
  chipWrap.className = 'chat-chips';
  chips.forEach(function(text) {
    var chip = document.createElement('button');
    chip.className = 'chat-chip';
    chip.textContent = text;
    chip.addEventListener('click', function() {
      var input = document.getElementById('chatInput');
      if (input) {
        input.value = text;
        input.dispatchEvent(new Event('input'));
      }
      var form = input ? input.closest('form') : null;
      if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
    });
    chipWrap.appendChild(chip);
  });
  messages.appendChild(chipWrap);
})();

// Typing animation: reveal text character by character
function typeMessage(element, text, callback) {
  var i = 0;
  var speed = 12;
  var messages = document.getElementById('chatMessages');

  function tick() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      if (messages) messages.scrollTop = messages.scrollHeight;
      setTimeout(tick, speed);
    } else if (callback) {
      callback();
    }
  }
  tick();
}

// Show typing indicator
function showTypingIndicator() {
  var messages = document.getElementById('chatMessages');
  if (!messages) return null;
  var indicator = document.createElement('div');
  indicator.className = 'chat-msg chat-msg--assistant chat-typing';
  indicator.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
  messages.appendChild(indicator);
  messages.scrollTop = messages.scrollHeight;
  return indicator;
}

function handleChat(e) {
  e.preventDefault();
  var input = document.getElementById('chatInput');
  var messages = document.getElementById('chatMessages');
  var sendBtn = document.getElementById('chatSend');
  if (!input || !messages || !input.value.trim() || chatIsLoading) return;

  var userText = input.value.trim();

  // Session limit
  chatMessageCount++;
  if (chatMessageCount > CHAT_SESSION_LIMIT) {
    var limitMsg = document.createElement('div');
    limitMsg.className = 'chat-msg chat-msg--assistant';
    limitMsg.textContent = 'You\'ve reached the session limit. Feel free to reach out directly at mikityuk.tony@gmail.com!';
    messages.appendChild(limitMsg);
    messages.scrollTop = messages.scrollHeight;
    return;
  }

  // Remove chips on first message
  var chips = messages.querySelector('.chat-chips');
  if (chips) chips.remove();

  // Add user message
  var userMsg = document.createElement('div');
  userMsg.className = 'chat-msg chat-msg--user';
  userMsg.textContent = userText;
  messages.appendChild(userMsg);
  input.value = '';
  input.style.height = 'auto';
  if (sendBtn) sendBtn.classList.remove('has-text');
  messages.scrollTop = messages.scrollHeight;

  // Track conversation history
  chatHistory.push({ role: 'user', content: userText });

  // Show typing indicator
  chatIsLoading = true;
  var typingIndicator = showTypingIndicator();

  // Build messages payload
  var payload = {
    model: CHAT_MODEL,
    max_tokens: CHAT_MAX_TOKENS,
    messages: [
      { role: 'system', content: CHAT_SYSTEM_PROMPT }
    ].concat(chatHistory.slice(-10)) // keep last 10 messages for context
  };

  fetch(CHAT_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    if (typingIndicator) typingIndicator.remove();

    var responseText = 'Sorry, I had trouble with that. You can reach Tony directly at mikityuk.tony@gmail.com.';
    if (data.choices && data.choices[0] && data.choices[0].message) {
      responseText = data.choices[0].message.content;
    } else if (data.error) {
      responseText = data.error.message || responseText;
    }

    chatHistory.push({ role: 'assistant', content: responseText });

    var botMsg = document.createElement('div');
    botMsg.className = 'chat-msg chat-msg--assistant';
    messages.appendChild(botMsg);
    typeMessage(botMsg, responseText, function() {
      chatIsLoading = false;
    });
  })
  .catch(function() {
    if (typingIndicator) typingIndicator.remove();
    chatIsLoading = false;

    var errMsg = document.createElement('div');
    errMsg.className = 'chat-msg chat-msg--assistant';
    errMsg.textContent = 'Connection issue. You can reach Tony directly at mikityuk.tony@gmail.com.';
    messages.appendChild(errMsg);
    messages.scrollTop = messages.scrollHeight;
  });
}
