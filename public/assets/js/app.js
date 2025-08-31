// ===================== Deliveroo deep-link with fallback =====================
document.getElementById('roomService')?.addEventListener('click', (e) => {
  e.preventDefault();
  const appLink = 'deliveroo://';
  const webLink = 'https://deliveroo.com';
  const t = Date.now();
  // try app
  window.location.href = appLink;
  // fallback to web
  setTimeout(() => {
    if (Date.now() - t < 1200) window.open(webLink, '_blank');
  }, 500);
});

// ===================== Floating nav: smooth-scroll + active state =====================
const links = document.querySelectorAll('.nav-link');
const topbar = document.querySelector('.topbar');

const sections = {
  home: document.getElementById('home'),
  amenities: document.getElementById('amenities'),
  scenes: document.getElementById('scenes'),
};

// helper: compute scroll target accounting for sticky header height
function scrollToSection(id) {
  const el = sections[id];
  if (!el) return;
  const headerH = topbar?.offsetHeight ?? 0;
  const y = id === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - (headerH + 6);
  window.scrollTo({ top: y, behavior: 'smooth' });
}

// helper: set active underline
function setActive(targetId) {
  links.forEach((l) => l.classList.toggle('active', l.dataset.target === targetId));
}

// click -> scroll
links.forEach((btn) => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.target;
    scrollToSection(id);
    setActive(id); // give immediate feedback on click
  });
});

// observe scroll position to set active underline
const observer = new IntersectionObserver(
  (entries) => {
    let best = null;
    let bestRatio = 0;
    entries.forEach((e) => {
      if (e.intersectionRatio > bestRatio) {
        bestRatio = e.intersectionRatio;
        best = e.target.id;
      }
    });
    if (best) setActive(best);
  },
  {
    root: null,
    // start counting a section as visible slightly before it reaches the top,
    // taking into account the sticky header height
    rootMargin: `-${(topbar?.offsetHeight ?? 0) + 12}px 0px -40% 0px`,
    threshold: [0.25, 0.5, 0.75],
  }
);

// observe the three sections
Object.values(sections).forEach((el) => el && observer.observe(el));

// initial active state
setActive('home');

// update observer margins on resize (header height can change)
window.addEventListener('resize', () => {
  observer.rootMargin = `-${(topbar?.offsetHeight ?? 0) + 12}px 0px -40% 0px`;
});

// ===================== Right-side icons (placeholders for now) =====================
document.querySelector('.icon-btn[aria-label="Chat"]')?.addEventListener('click', () => {
  // TODO: wire to your chat widget/modal
  alert('Chat coming soon');
});

document.querySelector('.icon-btn[aria-label="Settings"]')?.addEventListener('click', () => {
  // TODO: open a settings drawer/modal
  alert('Settings coming soon');
});
