// Navigation Menu Toggle
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  const menuToggle = document.getElementById('menuToggle');
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    
    if (href !== '#' && document.querySelector(href)) {
      const target = document.querySelector(href);
      const headerOffset = 70;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Close mobile menu when clicking links
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navMenu').classList.remove('active');
    document.getElementById('menuToggle').classList.remove('active');
  });
});

// Form Submission Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e){
    e.preventDefault();
    const action = contactForm.getAttribute('action');
    const data = new FormData(contactForm);
    try {
      const res = await fetch(action, { method: 'POST', body: data });
      if (res.ok) {
        alert('Mensagem enviada! Obrigado.');
        contactForm.reset();
      } else {
        alert('Erro ao enviar. Tente novamente.');
      }
    } catch (err) {
      alert('Erro de rede. Tente mais tarde.');
    }
  });
}

function generateHashId() {
  const id = (crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2,10);
  const payload = { id, ts: Date.now() };
  return btoa(JSON.stringify(payload));
}

document.addEventListener('DOMContentLoaded', () => {
  const hashField = document.getElementById('hashid');
  if (hashField) hashField.value = generateHashId();

  // re-gerar antes do envio por segurança
  const contactForm = document.getElementById('contactForm') || document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      if (hashField) hashField.value = generateHashId();
    });
  }
});