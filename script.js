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
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.removeItem('theme');
        }
    });

    // --- TYPEWRITER EFFECT ---
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const roles = ["Embedded Systems.", "Healthcare Technology.", "IoT Innovation.", "AI & Machine Learning."];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
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
    }
});

// --- TABBED ABOUT ME SECTION SCRIPT ---
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// --- MOBILE HAMBURGER MENU SCRIPT ---
var sidemenu = document.getElementById("sidemenu");
function openmenu(){
    sidemenu.style.right = "0";
}
function closemenu(){
    sidemenu.style.right = "-200px";
}
