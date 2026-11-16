
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}
const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === current) link.classList.add('active');
});
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const message = document.querySelector('.form-message');
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = encodeURIComponent(data.get('asunto'));
    const body = encodeURIComponent(
      `Nombre: ${data.get('nombre')}\nEmail: ${data.get('email')}\n\n${data.get('mensaje')}`
    );
    message.textContent = '¡Gracias! Se abrirá tu aplicación de correo para enviar el mensaje.';
    // Reemplazar el email de destino en esta línea antes de publicar.
    window.location.href = `mailto:TU_EMAIL@EJEMPLO.COM?subject=${subject}&body=${body}`;
  });
}
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
