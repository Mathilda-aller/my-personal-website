document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    status.className = 'form-status';
    status.textContent = 'Sending your note...';
    button.disabled = true;
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!response.ok) throw new Error('Submission failed');
      status.textContent = 'Your note arrived safely. Thank you ♡';
      form.reset();
    } catch (error) {
      status.className = 'form-status error';
      status.textContent = 'The note could not be sent this time. Please try again later or find me on GitHub.';
    } finally {
      button.disabled = false;
    }
  });
});
