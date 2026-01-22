// ========================================
// Portfolio Renderer - JSON to HTML
// ========================================

class PortfolioRenderer {
    constructor() {
        this.data = null;
        this.sliders = [];
    }

    // Load JSON data
    async loadData() {
        try {
            const response = await fetch('data.json');
            this.data = await response.json();
            return true;
        } catch (error) {
            console.error('Failed to load data.json:', error);
            return false;
        }
    }

    // Format number with leading zero (01, 02, etc.)
    formatNumber(num) {
        return num.toString().padStart(2, '0');
    }

    // Render all sections
    async render() {
        const loaded = await this.loadData();
        if (!loaded) return;

        this.renderNavigation();
        this.renderHero();
        this.renderAbout();
        this.renderExperience();
        this.renderProjects();
        this.renderContact();
        this.renderFooter();
        this.updateTitle();
        this.initSliders();

        // Dispatch event when rendering is complete
        window.dispatchEvent(new CustomEvent('portfolioRendered'));
    }

    // Update page title
    updateTitle() {
        const { profile } = this.data;
        document.title = `${profile.name} | ${profile.title}`;
    }

    // Render Navigation
    renderNavigation() {
        const { profile, navigation } = this.data;

        // Logo
        const logoEl = document.getElementById('nav-logo');
        logoEl.innerHTML = `
            <span class="logo-bracket">[</span>
            <span class="logo-text">${profile.logo}</span>
            <span class="logo-bracket">]</span>
        `;

        // Nav links
        const navLinksEl = document.getElementById('nav-links');
        navLinksEl.innerHTML = navigation.map((item, index) => `
            <li>
                <a href="#${item.id}" ${index === 0 ? 'class="active"' : ''}>
                    <span class="nav-number">${this.formatNumber(index + 1)}</span>${item.label}
                </a>
            </li>
        `).join('');
    }

    // Render Hero Section
    renderHero() {
        const { profile, badges, highlights } = this.data;

        // Hero image
        const heroImageFrame = document.getElementById('hero-image-frame');
        heroImageFrame.innerHTML = `
            <img src="${profile.heroImage}" alt="${profile.name}">
            <div class="image-grain"></div>
        `;

        // Badges
        const badgesEl = document.getElementById('hero-badges');
        badgesEl.innerHTML = badges.map((badge, index) => `
            <div class="floating-badge badge-${index + 1}">
                <span class="badge-number">${badge.number}</span>
                <span class="badge-text">${badge.text}</span>
            </div>
        `).join('');

        // Title tag
        document.getElementById('hero-title-tag').textContent = profile.title;

        // Name (split into characters for animation)
        const heroNameEl = document.getElementById('hero-name');
        const nameChars = profile.name.split('').map(char =>
            `<span class="word">${char}</span>`
        ).join('');
        heroNameEl.innerHTML = `<span class="title-line">${nameChars}</span>`;

        // Description
        document.getElementById('hero-description').innerHTML = profile.description;

        // Highlights
        const highlightsEl = document.getElementById('hero-highlights');
        highlightsEl.innerHTML = highlights.map(item => `
            <div class="highlight-item">
                <span class="highlight-icon"><i class="${item.icon}"></i></span>
                <span class="highlight-text">${item.text}</span>
            </div>
        `).join('');

        // Background text
        document.getElementById('hero-bg-text').textContent = profile.bgText;
    }

    // Render Marquee
    renderMarquee() {
        const { marquee } = this.data;
        const marqueeEl = document.getElementById('marquee-content');

        // Create items with dots between them, duplicated for infinite scroll
        const createItems = () => marquee.map(item => `
            <span>${item}</span>
            <span class="marquee-dot"></span>
        `).join('');

        // Duplicate content for seamless loop
        marqueeEl.innerHTML = createItems() + createItems();
    }

    // Render About Section
    renderAbout() {
        const { about, skills, contact, navigation } = this.data;

        // Find about section index
        const aboutIndex = navigation.findIndex(n => n.id === 'about') + 1;

        // Section numbers
        document.getElementById('about-section-number').textContent = this.formatNumber(aboutIndex);
        document.getElementById('about-bg-number').textContent = this.formatNumber(aboutIndex);

        // Title
        const titleEl = document.getElementById('about-title');
        titleEl.innerHTML = `
            <span class="title-stroke">${about.sectionTitle.stroke}</span>
            ${about.sectionTitle.fill.map(text => `<span class="title-fill">${text}</span>`).join('')}
        `;

        // Content
        document.getElementById('about-intro').textContent = about.intro;
        document.getElementById('about-detail').textContent = about.detail;

        // Skills
        const skillsEl = document.getElementById('skills-showcase');
        skillsEl.innerHTML = skills.map(skill => `
            <div class="skill-pill">
                <span class="pill-icon"><i class="${skill.icon}"></i></span>
                <span class="pill-text">${skill.name}</span>
            </div>
        `).join('');

        // Contact cards in about section
        const contactCardsEl = document.getElementById('about-contact-cards');
        contactCardsEl.innerHTML = `
            <div class="contact-card">
                <span class="card-icon"><i class="fas fa-envelope"></i></span>
                <div class="card-content">
                    <span class="card-label">EMAIL</span>
                    <span class="card-value">${contact.email}</span>
                </div>
            </div>
            <div class="contact-card">
                <span class="card-icon"><i class="fas fa-phone"></i></span>
                <div class="card-content">
                    <span class="card-label">PHONE</span>
                    <span class="card-value">${contact.phone}</span>
                </div>
            </div>
        `;
    }

    // Render Experience Section
    renderExperience() {
        const { experiences, navigation } = this.data;

        // Find experience section index
        const expIndex = navigation.findIndex(n => n.id === 'experience') + 1;

        // Section numbers
        document.getElementById('exp-section-number').textContent = this.formatNumber(expIndex);
        document.getElementById('exp-bg-number').textContent = this.formatNumber(expIndex);

        // Timeline items
        const timelineEl = document.getElementById('timeline-container');
        timelineEl.innerHTML = experiences.map(exp => `
            <div class="timeline-item-modern">
                <div class="timeline-year">
                    <span class="year-number">${exp.startYear}</span>
                    <span class="year-dash">—</span>
                    <span class="year-number">${exp.endYear}</span>
                </div>
                <div class="timeline-card">
                    <div class="card-header">
                        <h3 class="company-name">${exp.company}</h3>
                        <span class="role-badge">${exp.role}</span>
                    </div>
                    <p class="role-type">${exp.type}</p>
                    <ul class="achievements">
                        ${exp.achievements.map(achievement => `
                            <li>
                                <span class="achievement-icon"><i class="fas fa-check"></i></span>
                                <span class="achievement-text">${achievement}</span>
                            </li>
                        `).join('')}
                    </ul>
                    <div class="card-tags">
                        ${exp.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render Projects Section
    renderProjects() {
        const { projects, navigation } = this.data;

        // Find projects section index
        const projIndex = navigation.findIndex(n => n.id === 'projects') + 1;

        // Section numbers
        document.getElementById('proj-section-number').textContent = this.formatNumber(projIndex);
        document.getElementById('proj-bg-number').textContent = this.formatNumber(projIndex);

        // Project items
        const projectsEl = document.getElementById('projects-container');
        projectsEl.innerHTML = projects.map((project, index) => `
            <article class="project-item ${project.featured ? 'project-featured' : ''} ${project.orientation === 'portrait' ? 'project-portrait' : ''}">
                <div class="project-image-wrapper ${project.orientation === 'portrait' ? 'portrait' : ''}">
                    <div class="project-slider" data-slider-id="${index}">
                        <div class="slider-track">
                            ${project.images.map((img, imgIndex) => `
                                <div class="slider-slide ${imgIndex === 0 ? 'active' : ''}">
                                    <img src="${img}" alt="${project.title} - ${imgIndex + 1}">
                                </div>
                            `).join('')}
                        </div>
                        ${project.images.length > 1 ? `
                            <button class="slider-btn slider-prev" aria-label="Previous">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <button class="slider-btn slider-next" aria-label="Next">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                            <div class="slider-dots">
                                ${project.images.map((_, imgIndex) => `
                                    <button class="slider-dot ${imgIndex === 0 ? 'active' : ''}"
                                            data-slide="${imgIndex}"
                                            aria-label="Go to slide ${imgIndex + 1}">
                                    </button>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                    <div class="project-image-overlay"></div>
                    <div class="project-number">${this.formatNumber(index + 1)}</div>
                </div>
                <div class="project-content">
                    <div class="project-meta">
                        <span class="meta-category">${project.category}</span>
                        ${project.year ? `<span class="meta-year">${project.year}</span>` : ''}
                        ${project.duration ? `<span class="meta-duration"><i class="fas fa-clock"></i> 개발기간 : ${project.duration}</span>` : ''}
                        ${project.github ? `<a href="${project.github}" target="_blank" class="project-github"><i class="fab fa-github"></i> GitHub</a>` : ''}
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                </div>
            </article>
        `).join('');
    }

    // Render Contact Section
    renderContact() {
        const { contact, socials, navigation } = this.data;

        // Find contact section index
        const contactIndex = navigation.findIndex(n => n.id === 'contact') + 1;

        // Section number
        document.getElementById('contact-section-number').textContent = this.formatNumber(contactIndex);

        // Contact info grid
        const contactGridEl = document.getElementById('contact-info-grid');
        contactGridEl.innerHTML = `
            <a href="mailto:${contact.email}" class="contact-info-card">
                <div class="info-card-icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <div class="info-card-content">
                    <span class="info-card-label">Email</span>
                    <span class="info-card-value">${contact.email}</span>
                </div>
                <span class="info-card-arrow"><i class="fas fa-arrow-right"></i></span>
            </a>
            <a href="tel:${contact.phone}" class="contact-info-card">
                <div class="info-card-icon">
                    <i class="fas fa-phone"></i>
                </div>
                <div class="info-card-content">
                    <span class="info-card-label">Phone</span>
                    <span class="info-card-value">${contact.phone}</span>
                </div>
                <span class="info-card-arrow"><i class="fas fa-arrow-right"></i></span>
            </a>
            <div class="contact-info-card">
                <div class="info-card-icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="info-card-content">
                    <span class="info-card-label">Location</span>
                    <span class="info-card-value">${contact.location}</span>
                </div>
            </div>
        `;

        // Social links
        const socialsEl = document.getElementById('contact-socials');
        socialsEl.innerHTML = socials.map(social => `
            <a href="${social.url}" target="_blank" class="social-link" aria-label="${social.label}">
                <i class="${social.icon}"></i>
            </a>
        `).join('');
    }

    // Render Footer
    renderFooter() {
        const { profile, footer } = this.data;

        // Logo
        document.getElementById('footer-logo').innerHTML = `
            <span class="logo-bracket">[</span>
            <span class="logo-text">${profile.logo}</span>
            <span class="logo-bracket">]</span>
        `;

        // Copyright and credit
        document.getElementById('footer-copyright').textContent = footer.copyright;
        document.getElementById('footer-credit').textContent = footer.credit;
    }

    // Initialize image sliders
    initSliders() {
        const sliderElements = document.querySelectorAll('.project-slider');

        sliderElements.forEach(slider => {
            const slides = slider.querySelectorAll('.slider-slide');
            const dots = slider.querySelectorAll('.slider-dot');
            const prevBtn = slider.querySelector('.slider-prev');
            const nextBtn = slider.querySelector('.slider-next');

            if (slides.length <= 1) return;

            let currentSlide = 0;
            let autoSlideInterval = null;

            const goToSlide = (index) => {
                // Handle wrap-around
                if (index < 0) index = slides.length - 1;
                if (index >= slides.length) index = 0;

                slides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === index);
                });
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
                currentSlide = index;
            };

            const nextSlide = () => goToSlide(currentSlide + 1);
            const prevSlide = () => goToSlide(currentSlide - 1);

            // Auto slide
            const startAutoSlide = () => {
                autoSlideInterval = setInterval(nextSlide, 4000);
            };

            const stopAutoSlide = () => {
                if (autoSlideInterval) {
                    clearInterval(autoSlideInterval);
                    autoSlideInterval = null;
                }
            };

            // Event listeners
            if (prevBtn) prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });

            if (nextBtn) nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    stopAutoSlide();
                    goToSlide(index);
                    startAutoSlide();
                });
            });

            // Pause on hover
            slider.addEventListener('mouseenter', stopAutoSlide);
            slider.addEventListener('mouseleave', startAutoSlide);

            // Start auto slide
            startAutoSlide();
        });
    }
}

// Initialize renderer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const renderer = new PortfolioRenderer();
    renderer.render();
});
