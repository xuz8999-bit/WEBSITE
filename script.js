document.querySelectorAll('[data-nav]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-nav]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.getElementById('feedback').textContent = `${button.dataset.nav} selected`;
    button.classList.add('clicked');
    window.setTimeout(() => button.classList.remove('clicked'), 220);
  });
});
// These controls stay on the welcome screen until their later development phase.
document.querySelectorAll('[data-action]').forEach(button => {
  button.addEventListener('click', () => {
    button.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(2px)' }, { transform: 'translateY(0)' }], { duration: 180 });
  });
});
