document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('#image-modal');
  const modalImage = document.querySelector('#modal-image');
  const closeButton = document.querySelector('.close-btn');
  if (!modal || !modalImage || !closeButton) return;

  let lastTrigger = null;

  const openModal = (image) => {
    lastTrigger = image;
    modalImage.src = image.currentSrc || image.src;
    modalImage.alt = image.alt;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    closeButton.focus();
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalImage.removeAttribute('src');
    document.body.classList.remove('menu-open');
    lastTrigger?.focus();
  };

  document.querySelectorAll('.gallery-item img').forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Open photo: ${image.alt || 'a moment from my life'}`);
    image.addEventListener('click', () => openModal(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(image);
      }
    });
  });

  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
    if (event.key === 'Tab' && modal.classList.contains('open')) {
      event.preventDefault();
      closeButton.focus();
    }
  });
});
