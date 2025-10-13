// script.js

// 1. DOM Content Loaded Listener
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    initThemeToggle();
    initHeaderScrollEffect();
    initHeroButtons(); // Initialize hero section buttons
});

// 2. Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        console.warn('Theme toggle button not found.');
        return;
    }

    // Function to set the theme
    const setTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            console.log('Theme set to dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            console.log('Theme set to light');
        }
    };

    // Get preferred theme from localStorage or system preference
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply initial theme
    if (storedTheme) {
        setTheme(storedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light'); // Default to light if no preference
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Listen for system theme changes (optional, but good for UX)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        if (!localStorage.getItem('theme')) { // Only update if user hasn't manually set a preference
            setTheme(event.matches ? 'dark' : 'light');
        }
    });
}

// 3. Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    if (!header) {
        console.warn('Header element not found.');
        return;
    }

    let lastScrollY = window.scrollY;
    const scrollThreshold = 50; // Pixels to scroll before adding the class

    const updateHeaderOnScroll = () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScrollY = window.scrollY;
    };

    // Initial check in case the page loads scrolled
    updateHeaderOnScroll();

    // Listen for scroll events
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateHeaderOnScroll);
    }, { passive: true }); // Use passive listener for performance
}

// 4. Smooth Scrolling for Navigation Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust for fixed header height
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 5. Hero Section Button Actions (Example)
function initHeroButtons() {
    const primaryButton = document.querySelector('.hero-buttons .btn-primary');
    const outlineButton = document.querySelector('.hero-buttons .btn-outline');

    if (primaryButton) {
        primaryButton.addEventListener('click', () => {
            alert('Primary button clicked! (e.g., "Hire Me")');
            // Example: Smooth scroll to a contact section
            // const contactSection = document.getElementById('contact');
            // if (contactSection) {
            //     contactSection.scrollIntoView({ behavior: 'smooth' });
            // }
        });
    }

    if (outlineButton) {
        outlineButton.addEventListener('click', () => {
            alert('Outline button clicked! (e.g., "View Portfolio")');
            // Example: Smooth scroll to a portfolio section
            // const portfolioSection = document.getElementById('portfolio');
            // if (portfolioSection) {
            //     portfolioSection.scrollIntoView({ behavior: 'smooth' });
            // }
        });
    }
}

// 6. Intersection Observer for elements (e.g., fade-in effects)
function initIntersectionObserver() {
    const faders = document.querySelectorAll('.fade-in'); // Example class for elements to fade in

    const appearOptions = {
        threshold: 0.2, // When 20% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Start appearing a bit before reaching bottom of viewport
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('appeared'); // Add a class to trigger fade-in CSS
            appearOnScroll.unobserve(entry.target); // Stop observing once it has appeared
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
}

// Example CSS for the fade-in effect:
/*
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.fade-in.appeared {
    opacity: 1;
    transform: translateY(0);
}
*/

// Call other initialization functions here if needed
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initHeaderScrollEffect();
    initSmoothScroll(); // Ensure smooth scroll is initialized
    initHeroButtons();
    // initIntersectionObserver(); // Uncomment if you add elements with .fade-in class
});
