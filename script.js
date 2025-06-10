document.addEventListener('DOMContentLoaded', function() {
    // --- AOS INITIALIZATION ---
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });

    // --- THEME TOGGLE (DARK/LIGHT MODE) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeToggle.checked = true;
    }
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    // --- TYPEWRITER EFFECT ---
    const typewriterElement = document.getElementById('typewriter');
    const roles = ["Embedded Systems.", "Healthcare Technology.", "IoT Innovation.", "AI & Machine Learning."];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    function type() {
        const currentRole = roles[roleIndex];
        let typeSpeed = 150;
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed /= 2;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    type();

    // ✅ NEW: PROJECT FILTERING LOGIC ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Set active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex'; // Use flex to maintain layout
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ✅ NEW: SCROLL-BASED FEATURES (ACTIVE NAV & SCROLL-TO-TOP)
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    window.onscroll = () => {
        // --- Show/Hide Scroll-to-Top Button
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }

        // --- Active Nav Link Highlighting
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 150) { // Offset for better accuracy
                currentSection = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    };
});
