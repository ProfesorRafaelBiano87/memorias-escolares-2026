document.addEventListener('DOMContentLoaded', () => {
  // 1. Destaque dinâmico no link do menu conforme a rolagem da página
  const sections = document.querySelectorAll('.stage-card');
  const navLinks = document.querySelectorAll('nav a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${currentId}`
            );
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((section) => observer.observe(section));

  // 2. Aviso visual amigável caso alguma foto ainda não esteja na pasta img/
  const images = document.querySelectorAll('.photo-slot img');
  images.forEach((img) => {
    img.addEventListener('error', () => {
      const expectedPath = img.getAttribute('src');
      const slot = img.parentElement;
      slot.innerHTML = `
        <div class="photo-missing">
          Foto aguardando arquivo na pasta do projeto:
          <code>${expectedPath}</code>
        </div>
      `;
    });
  });
});
