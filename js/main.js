/* =========================================================
   CARRASCO74 · Comportamiento del sitio
   Vanilla JS. Sin dependencias.
   ========================================================= */

document.documentElement.classList.add('js');

/* ---------- Menú móvil ---------- */
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

function closeMenu() {
  if (!nav || !menuToggle) return;
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    if (typeof closeLightbox === 'function') closeLightbox();
  }
});

/* ---------- Navegación activa ---------- */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach((link) => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

/* ---------- Cabecera al hacer scroll ---------- */
const header = document.querySelector('.site-header');
if (header) {
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

/* ---------- Aparición progresiva de secciones ---------- */
const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

/* ---------- Galería (lightbox) ---------- */
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox ? lightbox.querySelector('img') : null;
const lightboxCaption = lightbox ? lightbox.querySelector('figcaption') : null;
const lightboxClose = lightbox ? lightbox.querySelector('.lightbox__close') : null;
const galleryButtons = document.querySelectorAll('[data-lightbox]');
let lastFocused = null;

function openLightbox(button) {
  if (!lightbox || !lightboxImage) return;
  const image = button.querySelector('img');
  if (!image) return;
  lastFocused = document.activeElement;
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt || '';
  if (lightboxCaption) lightboxCaption.textContent = button.dataset.caption || image.alt || '';
  lightbox.hidden = false;
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  if (lightboxClose) lightboxClose.focus();
}

function closeLightbox() {
  if (!lightbox || !lightbox.classList.contains('is-open')) return;
  lightbox.classList.remove('is-open');
  lightbox.hidden = true;
  document.body.style.overflow = '';
  if (lightboxImage) lightboxImage.src = '';
  if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
}

galleryButtons.forEach((button) => button.addEventListener('click', () => openLightbox(button)));
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox || event.target.tagName === 'FIGURE') closeLightbox();
  });
}

/* ---------- Formulario de contacto (mailto, sin servidor) ---------- */
const form = document.getElementById('contact-form');
const CONTACT_EMAIL = 'estudio.carrasco74@gmail.com';

if (form) {
  const fields = ['nombre', 'email', 'asunto', 'mensaje'];
  const status = form.querySelector('.form-message');

  const rules = {
    nombre: (value) => value.trim().length >= 2 || 'Ingresá tu nombre (mínimo 2 caracteres).',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || 'Ingresá un correo electrónico válido.',
    asunto: (value) => value.trim().length >= 3 || 'Ingresá un asunto (mínimo 3 caracteres).',
    mensaje: (value) => value.trim().length >= 10 || 'Contanos un poco más (mínimo 10 caracteres).'
  };

  function validateField(name) {
    const input = form.elements[name];
    const error = document.getElementById('error-' + name);
    if (!input) return true;
    const result = rules[name](input.value);
    const isValid = result === true;
    input.setAttribute('aria-invalid', String(!isValid));
    if (error) error.textContent = isValid ? '' : result;
    return isValid;
  }

  fields.forEach((name) => {
    const input = form.elements[name];
    if (!input) return;
    input.addEventListener('blur', () => validateField(name));
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') validateField(name);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const results = fields.map(validateField);
    const firstInvalid = fields[results.indexOf(false)];
    if (firstInvalid) {
      if (status) status.textContent = 'Revisá los campos marcados antes de continuar.';
      if (form.elements[firstInvalid]) form.elements[firstInvalid].focus();
      return;
    }

    const data = new FormData(form);
    const subject = `Consulta desde el sitio web: ${String(data.get('asunto')).trim()}`;
    const body = [
      `Nombre: ${String(data.get('nombre')).trim()}`,
      `Email: ${String(data.get('email')).trim()}`,
      '',
      String(data.get('mensaje')).trim()
    ].join('\n');

    if (status) status.textContent = 'Se abrirá tu aplicación de correo con el mensaje listo. Confirmá el envío allí.';
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

/* ---------- Año dinámico ---------- */
document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});
