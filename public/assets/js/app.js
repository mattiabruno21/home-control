// Deliveroo deep-link with fallback
document.getElementById('roomService')?.addEventListener('click', (e) => {
  e.preventDefault();
  const appLink = 'deliveroo://';
  const webLink = 'https://deliveroo.com';
  const t = Date.now();
  window.location.href = appLink;
  setTimeout(() => {
    if (Date.now() - t < 1200) window.open(webLink, '_blank');
  }, 500);
});

// Floating nav: smooth-scroll + active state
const links = document.querySelectorAll('.nav-link');
const sections = {
  home: document.getElementById('home'),
  amenities: document.getElementById('amenities'),
  scenes: document.getElementById('scenes')
};

// click -> scroll
links.forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.target;
    const el = sections[id];
    if (!el) return;
    // topbar is sticky, so align to its top nicely
    const y = id === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});

// observe scroll position to set active underline
const observer = new IntersectionObserver((entries) => {
  // choose the most visible section
  let best = null, bestRatio = 0;
  entries.forEach(e => {
    if (e.intersectionRatio > bestRatio) {
      bestRatio = e.intersectionRatio;
      best = e.target.id;
    }
  });
  if (!best) return;
  links.forEach(l => l.classList.toggle('active', l.dataset.target === best));
}, { root: null, threshold: [0.25, 0.5, 0.75] });

// observe the three sections
Object.values(sections).forEach(el => el && observer.observe(el));

// initial active state
links.forEach(l => l.classList.toggle('active', l.dataset.target === 'home'));
