// Handle Deliveroo deep-link with fallback
document.getElementById('roomService')?.addEventListener('click', (e) => {
  e.preventDefault();
  const appLink = 'deliveroo://';
  const webLink = 'https://deliveroo.com';
  const t = Date.now();
  window.location.href = appLink;
  setTimeout(() => {
    if (Date.now() - t < 1200) {
      window.open(webLink, '_blank');
    }
  }, 500);
});
