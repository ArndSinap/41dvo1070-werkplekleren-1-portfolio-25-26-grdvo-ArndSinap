// ============================
// JavaScript: Interactions & Accessibility (moved from Index.html)
// ============================

// Helper
const $ = (sel, root = document) => root.querySelector(sel);

// Mobile menu
const menuToggle = $('#menuToggle');
const mobileMenu = $('#mobileMenu');
if(menuToggle && mobileMenu){
  menuToggle.addEventListener('click', () => {
    const opened = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', (!opened).toString());
    mobileMenu.style.display = opened ? 'none' : 'block';
    mobileMenu.setAttribute('aria-hidden', opened ? 'true' : 'false');
    if(!opened) mobileMenu.querySelector('a')?.focus();
  });
  // close mobile menu on link click
  mobileMenu.addEventListener('click', (e) => {
    if(e.target.tagName === 'A'){
      mobileMenu.style.display = 'none';
      menuToggle.setAttribute('aria-expanded','false');
      mobileMenu.setAttribute('aria-hidden','true');
    }
  });
}

// Active nav highlight on scroll
const navLinks = Array.from(document.querySelectorAll('[data-link]'));
const sections = navLinks.map(a => document.querySelector(a.getAttribute('href')));
const options = { root: null, rootMargin: '0px', threshold: 0.5 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = navLinks.find(a => a.getAttribute('href') === '#' + id);
    if(entry.isIntersecting){
      link?.setAttribute('aria-current','true');
    } else {
      link?.removeAttribute('aria-current');
    }
  });
}, options);
sections.forEach(s => s && observer.observe(s));

// Scroll progress indicator
const progress = $('#progress');
window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const scrolled = (doc.scrollTop) / (doc.scrollHeight - doc.clientHeight);
  if(progress) progress.style.width = Math.min(100, scrolled * 100) + '%';

  // back to top button
  const toTop = $('#toTop');
  if(window.scrollY > 400) toTop?.setAttribute('data-visible','true'); else toTop?.setAttribute('data-visible','false');
});

// Back to top
$('#toTop')?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
document.getElementById('backTop')?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Smooth reveal animations using IntersectionObserver
const revealElems = document.querySelectorAll('section, .project, .hero-card, .doc-card');
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'none';
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealElems.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(8px)';
  revealObserver.observe(el);
});

// Keyboard navigation for menu (Escape closes mobile)
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    if(mobileMenu){
      mobileMenu.style.display = 'none';
      menuToggle?.setAttribute('aria-expanded','false');
      mobileMenu.setAttribute('aria-hidden','true');
    }
  }
});

// Ensure focus order and skip link visibility handled by browser; profile img placeholder uses aria-label.
// Comments: replace placeholder hrefs / images with production assets and real mail/contact links.
// Contact form logic removed because the contact form was removed from the page.
