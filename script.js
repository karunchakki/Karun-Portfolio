// script.js - Interactions for Karun Chakki portfolio

(function() {
  const html = document.documentElement;
  const header = document.getElementById('header');
  const themeToggle = document.getElementById('theme-toggle');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  // Dark Mode Management
  const THEME_KEY = 'karun-theme';
  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function applyTheme(theme) {
    if (theme === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');
    if (themeToggle) themeToggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '🌞' : '🌙';
  }
  function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  }
  applyTheme(getPreferredTheme());
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = html.classList.contains('dark') ? 'light' : 'dark';
      setTheme(next);
    });
  }
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored !== 'dark' && stored !== 'light') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Header Scroll State
  function onScroll() {
    if (!header) return;
    const scrolled = window.scrollY > 50;
    header.classList.toggle('scrolled', scrolled);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Smooth scroll for nav links
  function handleAnchorClick(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (mobileNav) mobileNav.classList.remove('open');
      }
    }
  }
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', handleAnchorClick));

  // Mobile Menu
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  // Project filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterButtons.forEach(btn => btn.addEventListener('click', function() {
    const filter = btn.getAttribute('data-filter');
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    projectCards.forEach(card => {
      const cat = card.getAttribute('data-category');
      card.style.display = (filter === 'all' || cat === filter) ? 'block' : 'none';
    });
  }));

  // Intersection reveal animation stub (add 'reveal' class if you want intersection fade-ins!)
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
})();
