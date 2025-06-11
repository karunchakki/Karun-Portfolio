/* --- VARIABLES & GLOBAL STYLES --- */
:root {
    --primary-color: #3A7DDE; /* A strong, professional blue */
    --secondary-color: #4CED9B; /* A vibrant, modern mint-green */
    --background-dark: #101418;
    --surface-dark: #1A1F24;
    --text-dark: #EAEAEA;
    --text-secondary-dark: #A0AEC0;
    --background-light: #F7F9FC;
    --surface-light: #FFFFFF;
    --text-light: #1A202C;
    --text-secondary-light: #4A5568;
    --font-family: 'Poppins', sans-serif;
}

html { scroll-behavior: smooth; }

body {
    font-family: var(--font-family);
    margin: 0;
    transition: background-color 0.3s, color 0.3s;
    background-color: var(--background-dark);
    color: var(--text-dark);
    overflow-x: hidden;
}

body.light-mode {
    background-color: var(--background-light);
    color: var(--text-light);
}

/* --- UTILITIES --- */
section { padding: 80px 10%; max-width: 1200px; margin: 0 auto; }
.sub-title { font-size: 2.5rem; font-weight: 600; color: var(--primary-color); margin-bottom: 50px; }
.btn { padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; transition: transform 0.2s, box-shadow 0.2s; display: inline-block; }
.btn:hover { transform: translateY(-3px); box-shadow: 0 4px 20px rgba(0,0,0,0.25); }
.btn-primary { background-color: var(--primary-color); color: white; }
.btn-secondary { background-color: transparent; border: 2px solid var(--primary-color); color: var(--primary-color); }

/* --- HEADER & NAV --- */
header { position: fixed; width: 100%; top: 0; z-index: 1000; background: rgba(16, 20, 24, 0.7); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
body.light-mode header { background: rgba(247, 249, 252, 0.7); border-bottom: 1px solid rgba(0, 0, 0, 0.1); }
nav { display: flex; justify-content: space-between; align-items: center; padding: 15px 10%; max-width: 1200px; margin: 0 auto; }
.logo { font-size: 1.5rem; font-weight: 700; text-decoration: none; color: var(--text-dark); }
body.light-mode .logo { color: var(--text-light); }
.nav-links { display: flex; list-style: none; margin: 0; padding: 0; gap: 35px; }
.nav-links a { text-decoration: none; color: var(--text-secondary-dark); font-weight: 500; transition: color 0.2s; }
body.light-mode .nav-links a { color: var(--text-secondary-light); }
.nav-links a:hover { color: var(--primary-color); }
.nav-right { display: flex; align-items: center; gap: 25px; }
nav .fas { font-size: 22px; cursor: pointer; color: var(--text-secondary-dark); }
body.light-mode nav .fas { color: var(--text-secondary-light); }
nav .fa-bars { display: none; }
.nav-links .fa-times { display: none; }

/* --- THEME TOGGLE --- */
.theme-switch { position: relative; display: inline-block; width: 50px; height: 26px; }
.theme-switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #555; transition: .4s; border-radius: 34px; }
.slider:before { position: absolute; content: "☀️"; font-size: 14px; display: flex; align-items: center; justify-content: center; height: 20px; width: 20px; left: 3px; bottom: 3px; background-color: white; color: #f39c12; transition: .4s; border-radius: 50%; }
input:checked + .slider { background-color: var(--primary-color); }
input:checked + .slider:before { transform: translateX(24px); content: "🌙"; color: #f1c40f; }

/* --- HERO SECTION --- */
.hero { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; text-align: center; padding-top: 80px; }
.hero-image { margin-bottom: 30px; }
.hero-image img { width: 100%; max-width: 250px; border-radius: 50%; object-fit: cover; aspect-ratio: 1/1; box-shadow: 0 0 50px -10px var(--primary-color); }
.hero-text h1 { font-size: 3.5rem; margin-bottom: 10px; line-height: 1.2; }
.hero-text p { font-size: 1.5rem; color: var(--text-secondary-dark); margin-bottom: 40px; }
body.light-mode .hero-text p { color: var(--text-secondary-light); }
#typewriter { color: var(--secondary-color); font-weight: 600; }
.hero-buttons { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }

/* --- ABOUT SECTION --- */
#about .sub-title { text-align: left; }
.about-container { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 50px; align-items: flex-start; }
.about-col-1 { flex-basis: 35%; }
.about-col-1 img { width: 100%; border-radius: 15px; }
.about-col-2 { flex-basis: 58%; }
.tab-titles { display: flex; margin: 20px 0 40px; }
.tab-links { margin-right: 50px; font-size: 18px; font-weight: 500; cursor: pointer; position: relative; }
.tab-links::after { content: ''; width: 0; height: 3px; background: var(--secondary-color); position: absolute; left: 0; bottom: -8px; transition: 0.5s; }
.tab-links.active-link::after { width: 50%; }
.tab-contents ul li { list-style: none; margin: 10px 0; line-height: 1.6; }
.tab-contents ul li span { color: var(--secondary-color); font-size: 1rem; font-weight: 600; }
.tab-contents { display: none; }
.tab-contents.active-tab { display: block; }

/* --- PROJECTS SECTION --- */
#projects .sub-title { text-align: center; }
.project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
.project-card { background: var(--surface-dark); border-radius: 12px; overflow: hidden; transition: transform 0.3s, box-shadow 0.3s; display: flex; flex-direction: column; border: 1px solid #2a2f35; }
body.light-mode .project-card { background: var(--surface-light); border-color: #e2e8f0; }
.project-card:hover { transform: translateY(-10px); box-shadow: 0 10px 20px rgba(0,0,0,0.2); border-color: var(--primary-color); }
.project-card img { width: 100%; height: 220px; object-fit: cover; }
.project-card h3 { padding: 20px 20px 0 20px; margin: 0; }
.project-card p { padding: 10px 20px; font-size: 0.95rem; color: var(--text-secondary-dark); flex-grow: 1; }
body.light-mode .project-card p { color: var(--text-secondary-light); }
.project-tags { padding: 0 20px 15px; }
.project-tags span { background-color: rgba(76, 237, 155, 0.1); color: var(--secondary-color); padding: 5px 10px; border-radius: 20px; font-size: 0.8rem; margin-right: 5px; font-weight: 500; }
.project-links { padding: 0 20px 20px; }
.btn-link { color: var(--secondary-color); text-decoration: none; font-weight: 600; }

/* --- PUBLICATIONS & CERTIFICATIONS --- */
#publications .sub-title { text-align: center; }
.pub-cert-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: start; }
.publications-list ul, .certifications-list ul { list-style: none; padding: 0; }
.publications-list li, .certifications-list li { background: var(--surface-dark); padding: 15px 20px; border-radius: 8px; margin-bottom: 15px; border-left: 3px solid var(--primary-color); }
body.light-mode .publications-list li, body.light-mode .certifications-list li { background: var(--surface-light); }
.pub-link { text-decoration: none; color: var(--primary-color); font-weight: 600; font-size: 0.9em; float: right; }
.certifications-list li i { margin-right: 12px; color: var(--primary-color); width: 20px; text-align: center; }

/* --- CONTACT SECTION --- */
#contact .sub-title { text-align: center; }
#contact p { text-align: center; max-width: 600px; margin: -20px auto 30px auto; }
.contact-form { max-width: 700px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }
.contact-form input, .contact-form textarea { width: 100%; padding: 15px; border-radius: 8px; border: 1px solid #333; background: var(--surface-dark); color: var(--text-dark); font-family: var(--font-family); font-size: 1rem; }
body.light-mode .contact-form input, body.light-mode .contact-form textarea { background: var(--surface-light); color: var(--text-light); border-color: #ccc; }
.contact-form button { align-self: center; width: 200px; }

/* --- FOOTER --- */
footer { text-align: center; padding: 40px; background: var(--background-dark); margin-top: 60px; }
body.light-mode footer { background: #e9e9ed; }
.social-links { margin-bottom: 15px; }
.social-links a { font-size: 1.8rem; margin: 0 15px; color: var(--text-secondary-dark); transition: color 0.3s, transform 0.3s; display: inline-block; }
body.light-mode .social-links a { color: var(--text-secondary-light); }
.social-links a:hover { color: var(--primary-color); transform: translateY(-5px); }
footer p { color: #888; font-size: 0.9rem; }

/* --- RESPONSIVE DESIGN --- */
@media (max-width: 992px) {
    .pub-cert-grid { grid-template-columns: 1fr; }
    .about-col-1 { display: none; } 
    .about-col-2 { flex-basis: 100%; }
}
@media (max-width: 768px) {
    .hero-text h1 { font-size: 2.8rem; }
    .hero-image img { max-width: 200px; }
    
    /* Mobile Menu Logic */
    .nav-links {
        background: var(--surface-dark);
        position: fixed;
        top: 0;
        right: -200px;
        width: 200px;
        height: 100vh;
        padding-top: 50px;
        z-index: 2000;
        transition: right 0.5s;
        flex-direction: column;
        gap: 25px;
        align-items: center;
    }
    body.light-mode .nav-links { background: var(--surface-light); }
    nav .fa-bars { display: block; }
    .nav-links .fa-times { display: block; position: absolute; top: 25px; left: 25px; }
}

/* --- PROJECT DETAIL PAGE STYLES --- */
body.project-detail-page header { position: static; background: transparent; backdrop-filter: none; border: none; }
.project-header { padding: 20px 10%; max-width: 1200px; margin: 0 auto; }
.back-link { color: var(--text-secondary-dark); text-decoration: none; font-weight: 600; transition: color 0.3s; }
body.light-mode .back-link { color: var(--text-secondary-light); }
.back-link:hover { color: var(--primary-color); }
.project-hero { text-align: center; padding-top: 0; padding-bottom: 40px; }
.project-hero h1 { font-size: 3.5rem; margin-bottom: 10px; color: var(--primary-color); }
.project-hero .tagline { font-size: 1.2rem; color: var(--text-secondary-dark); margin-bottom: 40px; }
body.light-mode .project-hero .tagline { color: var(--text-secondary-light); }
.project-main-image { width: 100%; max-height: 500px; object-fit: cover; border-radius: 12px; margin-bottom: 40px; }
.project-detail-content { max-width: 1200px; margin: 0 auto; padding: 0 10%; }
.project-detail-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 60px; }
.project-story h2 { font-size: 2rem; color: var(--secondary-color); margin-top: 20px; margin-bottom: 15px; }
.project-story p { line-height: 1.8; color: var(--text-secondary-dark); }
body.light-mode .project-story p { color: var(--text-secondary-light); }
.project-sidebar .sidebar-widget { background: var(--surface-dark); padding: 25px; border-radius: 12px; margin-bottom: 30px; }
body.light-mode .project-sidebar .sidebar-widget { background: var(--surface-light); box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
.project-sidebar h3 { margin-top: 0; border-bottom: 2px solid var(--primary-color); padding-bottom: 10px; margin-bottom: 20px; }
.project-sidebar ul { list-style: none; padding: 0; }
.project-sidebar ul li { margin-bottom: 10px; display: flex; align-items: center; }
.project-sidebar ul li i { margin-right: 12px; color: var(--primary-color); width: 20px; }
.project-footer { text-align: center; padding: 40px; margin-top: 60px; color: #888; }
@media (max-width: 768px) {
    .project-hero h1 { font-size: 2.5rem; }
    .project-detail-grid { grid-template-columns: 1fr; }
}
