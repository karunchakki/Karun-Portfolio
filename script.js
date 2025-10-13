(function() {
  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    htmlEl.classList.add('dark');
  } else {
    htmlEl.classList.remove('dark');
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      htmlEl.classList.toggle('dark');
      localStorage.setItem('theme', htmlEl.classList.contains('dark') ? 'dark' : 'light');
      document.querySelector('.theme-icon').textContent = htmlEl.classList.contains('dark') ? '☀️' : '🌙';
    });
  }

  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-menu');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  // Smooth scrolling for `<a>` links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth'});
        // Close menu on mobile
        document.getElementById('mobile-nav').classList.remove('open');
      }
    });
  });

  // Project filtering
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Intersection observer for reveal effects (optional)
  // Add class 'reveal' to elements you want to fade in
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
})();
