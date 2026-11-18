document.addEventListener('DOMContentLoaded', () => {
  // 1. Pré-visualização interativa das fotos selecionadas pelo usuário
  const photoInputs = document.querySelectorAll('.photo-input');

  photoInputs.forEach((input) => {
    input.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const slot = input.closest('.photo-slot');
        const img = slot.querySelector('img');
        const label = slot.querySelector('span');

        img.src = e.target.result;
        img.style.display = 'block';
        label.style.display = 'none';
        slot.style.borderStyle = 'solid';
        slot.style.padding = '6px';
      };

      reader.readAsDataURL(file);
    });
  });

  // 2. Destaque dinâmico no link do menu conforme a rolagem da página
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
});
