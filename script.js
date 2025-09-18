// ===== MODERN PORTFOLIO JAVASCRIPT ===== //

// ===== PORTFOLIO APPLICATION CLASS ===== //
class PortfolioApp {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.isScrolling = false;
        this.lastScrollTop = 0;
        
        // DOM Elements
        this.navbar = document.querySelector('nav');
        this.navLinks = document.querySelectorAll('.nav-links a');
        this.hamburger = document.querySelector('.fas.fa-bars');
        this.closeMenu = document.querySelector('.fas.fa-times');
        this.sideMenu = document.getElementById('sidemenu');
        this.themeToggle = document.getElementById('theme-toggle');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.tabLinks = document.querySelectorAll('.tab-links');
        this.tabContents = document.querySelectorAll('.tab-contents');
        this.statNumbers = document.querySelectorAll('.stat-number');
        
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupEventListeners();
        this.setupSmoothScrolling();
        this.setupProjectFiltering();
        this.setupTabSystem();
        this.setupScrollEffects();
        this.setupStatCounters();
        this.setupIntersectionObserver();
        this.setupParticles();
        this.setupTypewriter();
        this.setupFormValidation();
        this.setupPerformanceMonitoring();
        
        // Initialize AOS
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100,
                easing: 'ease-out-cubic'
            });
        }
        
        console.log('🚀 Portfolio loaded successfully!');
        console.log('🔬 HealthTech Innovation Portfolio');
        console.log('💡 Building healthcare technology that saves lives');
    }

    // ===== THEME MANAGEMENT ===== //
    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        if (this.themeToggle) {
            this.themeToggle.checked = this.currentTheme === 'dark';
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        
        // Animate theme transition
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    // ===== EVENT LISTENERS ===== //
    setupEventListeners() {
        // Theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('change', () => this.toggleTheme());
        }

        // Mobile menu
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.openMobileMenu());
        }
        
        if (this.closeMenu) {
            this.closeMenu.addEventListener('click', () => this.closeMobileMenu());
        }

        // Close mobile menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Window events
        window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 16));
        window.addEventListener('resize', this.debounce(() => this.handleResize(), 250));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Contact form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }

    // ===== MOBILE MENU ===== //
    openMobileMenu() {
        if (this.sideMenu) {
            this.sideMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeMobileMenu() {
        if (this.sideMenu) {
            this.sideMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ===== SCROLL EFFECTS ===== //
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar background opacity
        if (this.navbar) {
            if (scrollTop > 50) {
                this.navbar.style.background = this.currentTheme === 'dark' 
                    ? 'rgba(15, 23, 42, 0.98)' 
                    : 'rgba(255, 255, 255, 0.98)';
                this.navbar.style.backdropFilter = 'blur(20px)';
            } else {
                this.navbar.style.background = this.currentTheme === 'dark' 
                    ? 'rgba(15, 23, 42, 0.95)' 
                    : 'rgba(255, 255, 255, 0.95)';
                this.navbar.style.backdropFilter = 'blur(10px)';
            }
        }
        
        // Update active navigation
        this.updateActiveNavLink();
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero && scrollTop < window.innerHeight) {
            const parallaxSpeed = scrollTop * 0.5;
            hero.style.transform = `translateY(${parallaxSpeed}px)`;
        }
        
        this.lastScrollTop = scrollTop;
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }

    // ===== SMOOTH SCROLLING ===== //
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    this.smoothScrollTo(offsetTop, 800);
                }
            });
        });
    }

    smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animateScroll = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function
            const ease = this.easeInOutCubic(progress);
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    // ===== PROJECT FILTERING ===== //
    setupProjectFiltering() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');
                
                // Update active filter
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects with staggered animation
                this.filterProjects(filterValue);
            });
        });
    }

    filterProjects(filter) {
        this.projectCards.forEach((card, index) => {
            const categories = card.getAttribute('data-category') || '';
            const shouldShow = filter === 'all' || categories.includes(filter);
            
            setTimeout(() => {
                if (shouldShow) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    
                    setTimeout(() => {
                        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px) scale(0.95)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400);
                }
            }, index * 100);
        });
    }

    // ===== TAB SYSTEM ===== //
    setupTabSystem() {
        this.tabLinks.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.textContent.toLowerCase().replace(/\s+/g, '');
                this.openTab(tabName);
                
                // Update active tab
                this.tabLinks.forEach(t => t.classList.remove('active-link'));
                tab.classList.add('active-link');
            });
        });
    }

    openTab(tabName) {
        // Map tab names to content IDs
        const tabMap = {
            'technicalexpertise': 'skills',
            'skills': 'skills',
            'experience': 'experience',
            'education': 'education',
            'achievements': 'achievements'
        };
        
        const targetTab = tabMap[tabName] || tabName;
        
        this.tabContents.forEach(content => {
            content.classList.remove('active-tab');
        });
        
        const activeContent = document.getElementById(targetTab);
        if (activeContent) {
            activeContent.classList.add('active-tab');
        }
    }

    // ===== STATISTICS COUNTER ===== //
    setupStatCounters() {
        this.statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target')) || parseInt(stat.textContent);
            stat.setAttribute('data-target', target);
            stat.textContent = '0';
        });
    }

    animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // ===== INTERSECTION OBSERVER ===== //
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    
                    // Animate counters when hero stats are visible
                    if (entry.target.classList.contains('hero-stats')) {
                        this.statNumbers.forEach(stat => {
                            const target = parseInt(stat.getAttribute('data-target'));
                            this.animateCounter(stat, target);
                        });
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const elementsToObserve = [
            ...document.querySelectorAll('.project-card'),
            ...document.querySelectorAll('.timeline-item'),
            ...document.querySelectorAll('.publication-card'),
            ...document.querySelectorAll('.contact-card'),
            ...document.querySelectorAll('.cert-item'),
            ...document.querySelectorAll('.achievement-item'),
            document.querySelector('.hero-stats')
        ].filter(el => el !== null);

        elementsToObserve.forEach(el => observer.observe(el));
    }

    // ===== PARTICLES SETUP ===== //
    setupParticles() {
        if (typeof tsParticles !== 'undefined') {
            tsParticles.load("particles-js", {
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#2563eb",
                    },
                    links: {
                        color: "#2563eb",
                        distance: 150,
                        enable: true,
                        opacity: 0.3,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            });
        }
    }

    // ===== TYPEWRITER EFFECT ===== //
    setupTypewriter() {
        const typewriterElement = document.getElementById('typewriter');
        if (!typewriterElement) return;

        const phrases = [
            "smart healthcare solutions",
            "IoT medical devices", 
            "user-centric health products",
            "accessible medical technology",
            "AI-powered diagnostics",
            "life-saving innovations"
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const typeWriter = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(typeWriter, typeSpeed);
                } else {
                    setTimeout(typeWriter, deleteSpeed);
                }
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(typeWriter, pauseTime);
                } else {
                    setTimeout(typeWriter, typeSpeed);
                }
            }
        };

        typeWriter();
    }

    // ===== FORM VALIDATION ===== //
    setupFormValidation() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        if (this.validateForm(data)) {
            this.submitForm(form, data);
        }
    }

    validateForm(data) {
        let isValid = true;
        const errors = {};

        // Email validation
        if (!this.isValidEmail(data.email)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters long';
            isValid = false;
        }

        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters long';
            isValid = false;
        }

        // Inquiry type validation
        if (!data.inquiry_type) {
            errors.inquiry_type = 'Please select an inquiry type';
            isValid = false;
        }

        this.displayFormErrors(errors);
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.name) {
            case 'email':
                if (!this.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }

        if (!isValid) {
            this.displayFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    displayFormErrors(errors) {
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());

        // Display new errors
        Object.keys(errors).forEach(field => {
            const fieldElement = document.querySelector(`[name="${field}"]`);
            if (fieldElement) {
                this.displayFieldError(fieldElement, errors[field]);
            }
        });
    }

    displayFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            padding-left: 1rem;
        `;
        
        field.parentNode.appendChild(errorElement);
        field.style.borderColor = '#ef4444';
    }

    clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        field.style.borderColor = '';
    }

    async submitForm(form, data) {
        const submitButton = form.querySelector('button[type="submit"]');
        
        try {
            // Show loading state
            this.setSubmitButtonState(submitButton, true);

            // Submit form (using existing Formspree action)
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                this.showSuccessMessage(form);
                form.reset();
                
                // Track form submission
                this.trackEvent('form_submit', {
                    inquiry_type: data.inquiry_type,
                    source: 'portfolio_contact'
                });
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            this.showErrorMessage(form, 'Failed to send message. Please try again.');
            console.error('Form submission error:', error);
        } finally {
            this.setSubmitButtonState(submitButton, false);
        }
    }

    setSubmitButtonState(button, isLoading) {
        if (button) {
            button.disabled = isLoading;
            const icon = button.querySelector('i');
            const text = button.querySelector('span') || button;
            
            if (isLoading) {
                if (icon) icon.className = 'fas fa-spinner fa-spin';
                text.textContent = 'Sending...';
            } else {
                if (icon) icon.className = 'fas fa-paper-plane';
                text.textContent = 'Send Message';
            }
        }
    }

    showSuccessMessage(form) {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <div style="
                background: #22c55e;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 0.75rem;
                margin-top: 1rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            ">
                <i class="fas fa-check-circle"></i>
                <span>Thank you! Your message has been sent successfully. I'll get back to you soon.</span>
            </div>
        `;
        
        form.appendChild(message);
        setTimeout(() => message.remove(), 5000);
    }

    showErrorMessage(form, errorText) {
        const message = document.createElement('div');
        message.className = 'error-message';
        message.innerHTML = `
            <div style="
                background: #ef4444;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 0.75rem;
                margin-top: 1rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            ">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${errorText}</span>
            </div>
        `;
        
        form.appendChild(message);
        setTimeout(() => message.remove(), 5000);
    }

    // ===== UTILITY FUNCTIONS ===== //
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    handleResize() {
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    handleKeyboard(e) {
        if (e.key === 'Escape') {
            this.closeMobileMenu();
        }
    }

    // ===== PERFORMANCE MONITORING ===== //
    setupPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const navigation = performance.getEntriesByType('navigation')[0];
                const loadTime = navigation.loadEventEnd - navigation.fetchStart;
                
                console.log('Performance Metrics:', {
                    loadTime: `${loadTime.toFixed(2)}ms`,
                    domContentLoaded: `${navigation.domContentLoadedEventEnd - navigation.fetchStart}ms`,
                    firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 'N/A'
                });
                
                // Track page load performance
                this.trackEvent('page_load', {
                    load_time: Math.round(loadTime),
                    user_agent: navigator.userAgent
                });
            });
        }
    }

    trackEvent(eventName, eventData = {}) {
        // Implement analytics tracking here
        console.log('Event tracked:', eventName, eventData);
        
        // Example: Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    }
}

// ===== GLOBAL FUNCTIONS (for maintaining compatibility) ===== //
function openmenu() {
    if (window.portfolioApp) {
        window.portfolioApp.openMobileMenu();
    }
}

function closemenu() {
    if (window.portfolioApp) {
        window.portfolioApp.closeMobileMenu();
    }
}

function opentab(tabName) {
    if (window.portfolioApp) {
        window.portfolioApp.openTab(tabName);
    }
}

// ===== INITIALIZE APPLICATION ===== //
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});

// ===== SERVICE WORKER REGISTRATION ===== //
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registered successfully');
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// ===== ADDITIONAL UTILITY FUNCTIONS ===== //
class HealthTechUtils {
    static formatMetric(value, type = 'number') {
        switch (type) {
            case 'percentage':
                return `${value}%`;
            case 'currency':
                return `₹${value.toLocaleString()}`;
            case 'number':
                return value.toLocaleString();
            default:
                return value;
        }
    }

    static calculateROI(investment, returns) {
        return ((returns - investment) / investment * 100).toFixed(1);
    }

    static generateProjectId() {
        return 'project_' + Math.random().toString(36).substr(2, 9);
    }

    static sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    static copyToClipboard(text) {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return Promise.resolve();
        }
    }

    static shareProject(projectData) {
        if (navigator.share) {
            return navigator.share({
                title: projectData.title,
                text: projectData.description,
                url: projectData.url
            });
        } else {
            // Fallback to copy URL
            return this.copyToClipboard(projectData.url);
        }
    }
}

// ===== HEALTHCARE PORTFOLIO ANIMATIONS ===== //
class HealthTechAnimations {
    static pulseElement(element, duration = 1000) {
        element.style.animation = `pulse ${duration}ms ease-in-out infinite`;
        setTimeout(() => {
            element.style.animation = '';
        }, duration * 3);
    }

    static morphCards(cards) {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(-10px) rotateX(5deg)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 300);
            }, index * 100);
        });
    }

    static typewriterEffect(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;
        
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i > text.length - 1) {
                clearInterval(timer);
            }
        }, speed);
    }

    static countUp(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// ===== EXPORT FOR TESTING ===== //
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PortfolioApp,
        HealthTechUtils,
        HealthTechAnimations
    };
}

// ===== CONSOLE BRANDING ===== //
console.log(`
%c██╗  ██╗ █████╗ ██████╗ ██╗   ██╗███╗   ██╗
%c██║ ██╔╝██╔══██╗██╔══██╗██║   ██║████╗  ██║
%c█████╔╝ ███████║██████╔╝██║   ██║██╔██╗ ██║
%c██╔═██╗ ██╔══██║██╔══██╗██║   ██║██║╚██╗██║
%c██║  ██╗██║  ██║██║  ██║╚██████╔╝██║ ╚████║
%c╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

%c🔬 Bioelectronics Engineer & HealthTech Product Manager
%c💡 Building healthcare technology that saves lives
%c🚀 Portfolio: karunchakki.github.io/Karun-Portfolio
`, 
'color: #2563eb; font-weight: bold;',
'color: #2563eb; font-weight: bold;',
'color: #2563eb; font-weight: bold;',
'color: #2563eb; font-weight: bold;',
'color: #2563eb; font-weight: bold;',
'color: #2563eb; font-weight: bold;',
'color: #10b981; font-weight: bold;',
'color: #06b6d4; font-weight: bold;',
'color: #f59e0b; font-weight: bold;'
);
