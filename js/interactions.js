document.addEventListener('DOMContentLoaded', () => {
  const drawer = document.querySelector('.scene-drawer');
  const drawerClose = document.querySelector('.drawer-close');
  const sceneButtons = document.querySelectorAll('[data-scene]');
  let lastSceneButton = null;

  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    lastSceneButton?.focus();
  };

  sceneButtons.forEach((button) => {
    button.addEventListener('click', () => {
      lastSceneButton = button;
      document.querySelectorAll('.scene-panel').forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.panel === button.dataset.scene);
      });
      drawer?.classList.add('open');
      drawer?.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
      drawerClose?.focus();
    });
  });
  drawerClose?.addEventListener('click', closeDrawer);

  const memoryButtons = document.querySelectorAll('[data-memory]');
  memoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      memoryButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      document.querySelectorAll('[data-memory-card]').forEach((card) => card.classList.toggle('active', card.dataset.memoryCard === button.dataset.memory));
    });
  });

  const projectTabs = document.querySelectorAll('[data-project]');
  projectTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      projectTabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      document.querySelectorAll('[data-project-panel]').forEach((panel) => panel.classList.toggle('active', panel.dataset.projectPanel === tab.dataset.project));
    });
  });

  const filterButtons = document.querySelectorAll('[data-filter]');
  const galleryItems = [...document.querySelectorAll('.gallery-item[data-mood]')];
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.toggle('active', item === button));
      galleryItems.forEach((item) => {
        item.classList.remove('featured');
        item.classList.toggle('hidden', button.dataset.filter !== 'all' && item.dataset.mood !== button.dataset.filter);
      });
    });
  });

  document.querySelector('[data-shuffle]')?.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    galleryItems.forEach((item) => { item.classList.remove('hidden', 'featured'); });
    const chosen = galleryItems[Math.floor(Math.random() * galleryItems.length)];
    chosen?.classList.add('featured');
    chosen?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  const slides = [...document.querySelectorAll('.case-slide')];
  const dots = [...document.querySelectorAll('[data-slide-to]')];
  const voyage = document.querySelector('[data-voyage]');
  const voyageBoat = document.querySelector('.voyage-boat');
  const voyageStatus = document.querySelector('.voyage-status');
  const previousChapter = document.querySelector('.case-prev');
  const nextChapter = document.querySelector('.case-next');
  let currentSlide = 0;
  const showSlide = (index) => {
    if (!slides.length) return;
    currentSlide = Math.max(0, Math.min(index, slides.length - 1));
    slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
    dots.forEach((dot, i) => {
      const active = i === currentSlide;
      dot.classList.toggle('active', active);
      if (active) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
    });
    const progress = slides.length > 1 ? currentSlide / (slides.length - 1) : 0;
    voyage?.style.setProperty('--boat-left', `${4 + progress * 92}%`);
    if (voyageStatus) voyageStatus.textContent = `Chapter ${currentSlide + 1} of ${slides.length}`;
    if (previousChapter) previousChapter.disabled = currentSlide === 0;
    if (nextChapter) nextChapter.disabled = currentSlide === slides.length - 1;
    if (voyageBoat) {
      voyageBoat.classList.remove('sailing');
      requestAnimationFrame(() => voyageBoat.classList.add('sailing'));
    }
  };
  previousChapter?.addEventListener('click', () => showSlide(currentSlide - 1));
  nextChapter?.addEventListener('click', () => showSlide(currentSlide + 1));
  dots.forEach((dot) => dot.addEventListener('click', () => showSlide(Number(dot.dataset.slideTo))));
  showSlide(0);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeDrawer();
    if (slides.length && event.key === 'ArrowRight') showSlide(currentSlide + 1);
    if (slides.length && event.key === 'ArrowLeft') showSlide(currentSlide - 1);
  });
});
