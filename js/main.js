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
function toggleChat() {
  const panel = document.getElementById('chatbot');
  if (!panel) return;
  const isActive = panel.classList.contains('active');
  if (isActive) {
    // Animate out
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(16px) scale(0.97)';
    setTimeout(() => {
      panel.classList.remove('active');
      panel.style.opacity = '';
      panel.style.transform = '';
    }, 300);
  } else {
    panel.classList.add('active');
    // Focus the input after opening
    setTimeout(() => {
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

  // Enter to send, Shift+Enter for newline
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

function handleChat(e) {
  e.preventDefault();
  var input = document.getElementById('chatInput');
  var messages = document.getElementById('chatMessages');
  var sendBtn = document.getElementById('chatSend');
  if (!input || !messages || !input.value.trim()) return;

  var userText = input.value.trim();

  // Add user message
  var userMsg = document.createElement('div');
  userMsg.className = 'chat-msg chat-msg--user';
  userMsg.textContent = userText;
  messages.appendChild(userMsg);
  input.value = '';
  input.style.height = 'auto';
  if (sendBtn) sendBtn.classList.remove('has-text');
  messages.scrollTop = messages.scrollHeight;

  // Generate response
  setTimeout(function() {
    var responses = {
      background: "Tony has a unique blend of program management, customer success, and AI engineering. He holds an MS in Marketing Analytics from Johns Hopkins and has worked across SaaS, healthcare tech, and AI model training at Scale AI.",
      projects: "Tony's projects focus on agentic systems and workflow automation. His featured work includes a multi-agent research assistant and customer success automation tools. Check out the Agentic Projects page for details!",
      roles: "Tony is targeting Program Manager, Customer Success, or AI/ML Program roles where he can bridge technical and business stakeholders.",
      contact: "You can reach Tony at mikityuk.tony@gmail.com or connect on LinkedIn. He's also available for a quick call to discuss opportunities.",
      skills: "Tony's skill set spans program leadership, stakeholder management, GTM experience, analytics, and a growing focus on AI workflow and agentic tooling, including prompt engineering, model evaluation, and Python automation.",
      default: "Great question! Tony brings program management expertise with hands-on AI engineering skills. He's particularly strong at coordinating complex initiatives and building practical AI solutions. Want to know about his experience, projects, or what roles he's looking for?"
    };

    var lower = userText.toLowerCase();
    var response = responses.default;
    if (lower.includes('background') || lower.includes('experience') || lower.includes('who')) response = responses.background;
    else if (lower.includes('project') || lower.includes('build')) response = responses.projects;
    else if (lower.includes('role') || lower.includes('looking') || lower.includes('job')) response = responses.roles;
    else if (lower.includes('contact') || lower.includes('reach') || lower.includes('email')) response = responses.contact;
    else if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) response = responses.skills;

    var botMsg = document.createElement('div');
    botMsg.className = 'chat-msg chat-msg--assistant';
    botMsg.textContent = response;
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;
  }, 600);
}
