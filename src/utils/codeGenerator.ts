import { PortfolioData } from '../types/portfolio';
import { themes } from '../data/themes';

export const generatePortfolioCode = (data: PortfolioData): { html: string; css: string; js: string } => {
  const theme = themes.find(t => t.id === data.selectedTheme) || themes[0];
  const personalInfo = data.personalInfo || {};
  const about = data.about || {};
  const experience = data.experience || [];
  const education = data.education || [];
  const projects = data.projects || [];
  const socialLinks = data.socialLinks || {};

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personalInfo.fullName || 'Portfolio'} - ${personalInfo.title || 'Professional Portfolio'}</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.js"></script>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="#home" class="nav-logo">${personalInfo.fullName || 'Portfolio'}</a>
            <ul class="nav-menu">
                <li><a href="#home" class="nav-link">Home</a></li>
                <li><a href="#about" class="nav-link">About</a></li>
                ${experience.length > 0 ? '<li><a href="#experience" class="nav-link">Experience</a></li>' : ''}
                ${projects.length > 0 ? '<li><a href="#projects" class="nav-link">Projects</a></li>' : ''}
                <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
            <button class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-container">
            ${personalInfo.profilePhoto ? `
            <div class="hero-image">
                <img src="${personalInfo.profilePhoto}" alt="${personalInfo.fullName}" class="profile-photo">
            </div>` : ''}
            <div class="hero-content">
                <h1 class="hero-title">${personalInfo.fullName || 'Your Name'}</h1>
                <p class="hero-subtitle">${personalInfo.title || 'Your Professional Title'}</p>
                ${personalInfo.location ? `<p class="hero-location"><i data-lucide="map-pin"></i> ${personalInfo.location}</p>` : ''}
                <div class="hero-buttons">
                    <a href="#contact" class="btn btn-primary">Get In Touch</a>
                    ${data.resumeFile ? '<a href="#" class="btn btn-outline" onclick="downloadResume()">Download Resume</a>' : ''}
                </div>
                ${Object.values(socialLinks).some(link => link) ? `
                <div class="social-links">
                    ${socialLinks.linkedin ? `<a href="${socialLinks.linkedin}" target="_blank" rel="noopener"><i data-lucide="linkedin"></i></a>` : ''}
                    ${socialLinks.github ? `<a href="${socialLinks.github}" target="_blank" rel="noopener"><i data-lucide="github"></i></a>` : ''}
                    ${socialLinks.twitter ? `<a href="${socialLinks.twitter}" target="_blank" rel="noopener"><i data-lucide="twitter"></i></a>` : ''}
                    ${socialLinks.instagram ? `<a href="${socialLinks.instagram}" target="_blank" rel="noopener"><i data-lucide="instagram"></i></a>` : ''}
                    ${socialLinks.website ? `<a href="${socialLinks.website}" target="_blank" rel="noopener"><i data-lucide="globe"></i></a>` : ''}
                </div>` : ''}
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <h2 class="section-title">About Me</h2>
            ${about.summary ? `<p class="about-description">${about.summary}</p>` : ''}
            
            ${about.skills && about.skills.length > 0 ? `
            <div class="skills-section">
                <h3 class="subsection-title">Skills & Technologies</h3>
                <div class="skills-grid">
                    ${about.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>` : ''}

            ${about.languages && about.languages.length > 0 ? `
            <div class="languages-section">
                <h3 class="subsection-title">Languages</h3>
                <div class="languages-grid">
                    ${about.languages.map(lang => `
                    <div class="language-item">
                        <span class="language-name">${lang.name}</span>
                        <div class="language-level">
                            ${Array(5).fill(0).map((_, i) => `
                            <i data-lucide="star" class="star ${i < lang.level ? 'filled' : ''}"></i>
                            `).join('')}
                        </div>
                    </div>`).join('')}
                </div>
            </div>` : ''}
        </div>
    </section>

    ${experience.length > 0 ? `
    <!-- Experience Section -->
    <section id="experience" class="experience">
        <div class="container">
            <h2 class="section-title">Experience</h2>
            <div class="timeline">
                ${experience.map(exp => `
                <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <h3 class="job-title">${exp.role}</h3>
                        <h4 class="company-name">${exp.company}</h4>
                        <p class="job-period">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</p>
                        ${exp.description ? `<p class="job-description">${exp.description}</p>` : ''}
                    </div>
                </div>`).join('')}
            </div>
        </div>
    </section>` : ''}

    ${education.length > 0 ? `
    <!-- Education Section -->
    <section id="education" class="education">
        <div class="container">
            <h2 class="section-title">Education</h2>
            <div class="education-grid">
                ${education.map(edu => `
                <div class="education-card">
                    <i data-lucide="graduation-cap" class="education-icon"></i>
                    <h3 class="degree">${edu.degree}</h3>
                    <h4 class="institution">${edu.institution}</h4>
                    ${edu.field ? `<p class="field">${edu.field}</p>` : ''}
                    <p class="graduation-year">${edu.year}</p>
                </div>`).join('')}
            </div>
        </div>
    </section>` : ''}

    ${projects.length > 0 ? `
    <!-- Projects Section -->
    <section id="projects" class="projects">
        <div class="container">
            <h2 class="section-title">Featured Projects</h2>
            <div class="projects-grid">
                ${projects.map(project => `
                <div class="project-card">
                    ${project.images && project.images[0] ? `
                    <div class="project-image">
                        <img src="${project.images[0]}" alt="${project.title}">
                    </div>` : ''}
                    <div class="project-content">
                        <h3 class="project-title">${project.title}</h3>
                        ${project.category ? `<span class="project-category">${project.category}</span>` : ''}
                        <p class="project-description">${project.description}</p>
                        ${project.techStack && project.techStack.length > 0 ? `
                        <div class="project-tech">
                            ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>` : ''}
                        <div class="project-links">
                            ${project.liveLink ? `<a href="${project.liveLink}" target="_blank" rel="noopener" class="project-link"><i data-lucide="external-link"></i> Live Demo</a>` : ''}
                            ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" rel="noopener" class="project-link"><i data-lucide="github"></i> Code</a>` : ''}
                        </div>
                    </div>
                </div>`).join('')}
            </div>
        </div>
    </section>` : ''}

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <h2 class="section-title">Get In Touch</h2>
            <p class="contact-description">
                I'm always interested in new opportunities and interesting projects. 
                Let's discuss how we can work together!
            </p>
            <div class="contact-info">
                ${personalInfo.email ? `
                <a href="mailto:${personalInfo.email}" class="contact-item">
                    <i data-lucide="mail"></i>
                    <span>${personalInfo.email}</span>
                </a>` : ''}
                ${personalInfo.phone ? `
                <a href="tel:${personalInfo.phone}" class="contact-item">
                    <i data-lucide="phone"></i>
                    <span>${personalInfo.phone}</span>
                </a>` : ''}
            </div>
            <div class="contact-buttons">
                ${personalInfo.email ? `<a href="mailto:${personalInfo.email}" class="btn btn-primary">Send Message</a>` : ''}
                ${data.resumeFile ? '<a href="#" class="btn btn-outline" onclick="downloadResume()">Download Resume</a>' : ''}
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} ${personalInfo.fullName || 'Portfolio'}. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;

  const css = `/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

/* Navigation */
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: all 0.3s ease;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
}

.nav-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${theme.colors.primary};
    text-decoration: none;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-link {
    color: ${theme.colors.text};
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.nav-link:hover {
    color: ${theme.colors.primary};
}

.hamburger {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
}

.hamburger span {
    width: 25px;
    height: 3px;
    background: ${theme.colors.text};
    margin: 3px 0;
    transition: 0.3s;
}

/* Hero Section */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
    color: white;
    padding-top: 70px;
}

.hero-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.hero-content {
    animation: fadeInUp 0.8s ease-out;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
}

.hero-subtitle {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    opacity: 0.9;
}

.hero-location {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
    opacity: 0.8;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    font-size: 1rem;
}

.btn-primary {
    background: white;
    color: ${theme.colors.primary};
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.btn-outline {
    background: transparent;
    color: white;
    border: 2px solid white;
}

.btn-outline:hover {
    background: white;
    color: ${theme.colors.primary};
}

.social-links {
    display: flex;
    gap: 1rem;
}

.social-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    color: white;
    transition: all 0.3s ease;
}

.social-links a:hover {
    background: white;
    color: ${theme.colors.primary};
    transform: translateY(-2px);
}

.hero-image {
    display: flex;
    justify-content: center;
    animation: fadeIn 1s ease-out;
}

.profile-photo {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    border: 8px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

/* Section Styles */
section {
    padding: 6rem 0;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3rem;
    color: ${theme.colors.primary};
}

.subsection-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: ${theme.colors.primary};
}

/* About Section */
.about {
    background: ${theme.colors.card};
}

.about-description {
    font-size: 1.2rem;
    text-align: center;
    max-width: 800px;
    margin: 0 auto 4rem;
    line-height: 1.8;
}

.skills-section,
.languages-section {
    margin-bottom: 3rem;
}

.skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

.skill-tag {
    padding: 0.5rem 1rem;
    background: ${theme.colors.accent}20;
    color: ${theme.colors.accent};
    border-radius: 25px;
    font-size: 0.9rem;
    font-weight: 500;
}

.languages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    max-width: 600px;
    margin: 0 auto;
}

.language-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: ${theme.colors.background};
    border-radius: 8px;
}

.language-level {
    display: flex;
    gap: 0.25rem;
}

.star {
    width: 16px;
    height: 16px;
    color: #ccc;
}

.star.filled {
    color: #fbbf24;
    fill: #fbbf24;
}

/* Experience Section */
.timeline {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: ${theme.colors.primary};
}

.timeline-item {
    display: flex;
    justify-content: flex-end;
    padding-right: 50%;
    position: relative;
    margin: 3rem 0;
}

.timeline-item:nth-child(odd) {
    justify-content: flex-start;
    padding-left: 50%;
    padding-right: 0;
}

.timeline-marker {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 16px;
    background: ${theme.colors.primary};
    border-radius: 50%;
    border: 4px solid ${theme.colors.background};
    z-index: 1;
}

.timeline-content {
    background: ${theme.colors.card};
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-left: 2rem;
    max-width: 400px;
}

.timeline-item:nth-child(odd) .timeline-content {
    margin-left: 0;
    margin-right: 2rem;
}

.job-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${theme.colors.primary};
    margin-bottom: 0.5rem;
}

.company-name {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.job-period {
    font-size: 0.9rem;
    color: ${theme.colors.text}80;
    margin-bottom: 1rem;
}

/* Education Section */
.education {
    background: ${theme.colors.card};
}

.education-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.education-card {
    background: ${theme.colors.background};
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.education-card:hover {
    transform: translateY(-5px);
}

.education-icon {
    width: 48px;
    height: 48px;
    color: ${theme.colors.primary};
    margin-bottom: 1rem;
}

.degree {
    font-size: 1.3rem;
    font-weight: 600;
    color: ${theme.colors.primary};
    margin-bottom: 0.5rem;
}

.institution {
    font-size: 1rem;
    margin-bottom: 0.5rem;
}

.field {
    color: ${theme.colors.text}80;
    margin-bottom: 0.5rem;
}

/* Projects Section */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.project-card {
    background: ${theme.colors.card};
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.project-image {
    height: 200px;
    overflow: hidden;
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
    transform: scale(1.05);
}

.project-content {
    padding: 1.5rem;
}

.project-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: ${theme.colors.primary};
    margin-bottom: 0.5rem;
}

.project-category {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: ${theme.colors.accent}20;
    color: ${theme.colors.accent};
    border-radius: 15px;
    font-size: 0.8rem;
    margin-bottom: 1rem;
}

.project-description {
    margin-bottom: 1rem;
    line-height: 1.6;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.tech-tag {
    padding: 0.25rem 0.5rem;
    background: ${theme.colors.primary}20;
    color: ${theme.colors.primary};
    border-radius: 12px;
    font-size: 0.8rem;
}

.project-links {
    display: flex;
    gap: 1rem;
}

.project-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${theme.colors.primary};
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.3s ease;
}

.project-link:hover {
    opacity: 0.8;
}

/* Contact Section */
.contact {
    background: linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.primary} 100%);
    color: white;
    text-align: center;
}

.contact .section-title {
    color: white;
}

.contact-description {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto 3rem;
    line-height: 1.8;
}

.contact-info {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 3rem;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    transition: opacity 0.3s ease;
}

.contact-item:hover {
    opacity: 0.8;
}

.contact-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

/* Footer */
.footer {
    background: ${theme.colors.text};
    color: white;
    text-align: center;
    padding: 2rem 0;
}

/* Animations */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: white;
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
        padding: 2rem 0;
    }

    .nav-menu.active {
        left: 0;
    }

    .hamburger {
        display: flex;
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }

    .hamburger.active span:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }

    .hero-container {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 2rem;
    }

    .hero-title {
        font-size: 2.5rem;
    }

    .hero-subtitle {
        font-size: 1.2rem;
    }

    .profile-photo {
        width: 200px;
        height: 200px;
    }

    .container {
        padding: 0 1rem;
    }

    section {
        padding: 4rem 0;
    }

    .section-title {
        font-size: 2rem;
    }

    .timeline::before {
        left: 20px;
    }

    .timeline-item {
        justify-content: flex-start;
        padding-left: 60px;
        padding-right: 0;
    }

    .timeline-marker {
        left: 20px;
    }

    .timeline-content {
        margin-left: 0;
        margin-right: 0;
        max-width: none;
    }

    .contact-info {
        flex-direction: column;
        gap: 1rem;
    }

    .hero-buttons,
    .contact-buttons {
        flex-direction: column;
        align-items: center;
    }

    .projects-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .hero-title {
        font-size: 2rem;
    }

    .hero-subtitle {
        font-size: 1rem;
    }

    .btn {
        width: 100%;
        justify-content: center;
    }

    .skills-grid {
        justify-content: flex-start;
    }
}`;

  const js = `// Initialize Lucide icons
lucide.createIcons();

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.2s';
            entry.target.style.animationFillMode = 'both';
            entry.target.style.animationName = 'fadeInUp';
            entry.target.style.animationDuration = '0.6s';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Resume download function
function downloadResume() {
    ${data.resumeFile ? `
    const link = document.createElement('a');
    link.href = '${data.resumeFile}';
    link.download = '${personalInfo.fullName || 'Resume'}_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    ` : `
    alert('Resume not available for download.');
    `}
}

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.getAttribute('href') === '#' || this.getAttribute('onclick')) {
            return;
        }
        
        const originalText = this.innerHTML;
        this.innerHTML = '<span style="display: inline-block; width: 20px; height: 20px; border: 2px solid transparent; border-top: 2px solid currentColor; border-radius: 50%; animation: spin 1s linear infinite;"></span>';
        
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 1000);
    });
});

// Add spin animation
const style = document.createElement('style');
style.textContent = \`
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
\`;
document.head.appendChild(style);

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 100);
    }
});

console.log('Portfolio website loaded successfully! 🚀');
`;

  return { html, css, js };
};

export const downloadPortfolio = (data: PortfolioData) => {
  const { html, css, js } = generatePortfolioCode(data);
  
  // Create a zip-like structure using blob
  const files = [
    { name: 'index.html', content: html, type: 'text/html' },
    { name: 'styles.css', content: css, type: 'text/css' },
    { name: 'script.js', content: js, type: 'text/javascript' },
  ];

  files.forEach(file => {
    const blob = new Blob([file.content], { type: file.type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });

  // Also create a README file
  const readme = `# ${data.personalInfo?.fullName || 'Portfolio'} - Professional Portfolio Website

## 🚀 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional design with smooth animations
- **Performance Optimized**: Fast loading times and smooth scrolling
- **SEO Friendly**: Proper meta tags and semantic HTML structure
- **Cross-browser Compatible**: Works on all modern browsers

## 📁 Files Structure

- \`index.html\` - Main HTML file
- \`styles.css\` - CSS styles and animations
- \`script.js\` - JavaScript functionality
- \`README.md\` - This documentation file

## 🔧 Setup Instructions

1. Download all files to a local folder
2. Open \`index.html\` in any web browser
3. For local development, use a local server (e.g., Live Server in VS Code)

## 🌐 Deployment

You can deploy this portfolio to any web hosting service:

### GitHub Pages
1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose "main"

### Netlify
1. Drag and drop the folder to netlify.com/drop
2. Your site will be live instantly!

### Vercel
1. Install Vercel CLI: \`npm i -g vercel\`
2. Run \`vercel\` in the project folder
3. Follow the prompts

## 🎨 Customization

### Colors
Edit the CSS variables in \`styles.css\` to change the color scheme:

\`\`\`css
:root {
  --primary-color: ${data.selectedTheme ? themes.find(t => t.id === data.selectedTheme)?.colors.primary : '#3B82F6'};
  --secondary-color: ${data.selectedTheme ? themes.find(t => t.id === data.selectedTheme)?.colors.secondary : '#1E40AF'};
  --accent-color: ${data.selectedTheme ? themes.find(t => t.id === data.selectedTheme)?.colors.accent : '#10B981'};
}
\`\`\`

### Content
- Update the content directly in \`index.html\`
- Replace images with your own
- Modify sections as needed

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This portfolio template is free to use and modify for personal and commercial projects.

---

Generated with ❤️ by Portfolio Generator
`;

  const readmeBlob = new Blob([readme], { type: 'text/markdown' });
  const readmeUrl = URL.createObjectURL(readmeBlob);
  const readmeLink = document.createElement('a');
  readmeLink.href = readmeUrl;
  readmeLink.download = 'README.md';
  document.body.appendChild(readmeLink);
  readmeLink.click();
  document.body.removeChild(readmeLink);
  URL.revokeObjectURL(readmeUrl);
};