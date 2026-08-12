document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const sectionPage = currentPage === 'project-anima-isle.html' ? 'projects.html' : currentPage;

  document.querySelectorAll('nav a').forEach((link) => {
    const linkPage = new URL(link.href, window.location.href).pathname.split('/').pop();
    if (linkPage === sectionPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
});
