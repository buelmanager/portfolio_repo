// ========================================
// Navigation
// ========================================
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Advanced Scroll Trigger Animations
// ========================================

// Animation classes and their configurations
const animationConfig = {
    'fade-up': {
        initial: { opacity: 0, transform: 'translateY(60px)' },
        animated: { opacity: 1, transform: 'translateY(0)' }
    },
    'fade-down': {
        initial: { opacity: 0, transform: 'translateY(-60px)' },
        animated: { opacity: 1, transform: 'translateY(0)' }
    },
    'fade-left': {
        initial: { opacity: 0, transform: 'translateX(-80px)' },
        animated: { opacity: 1, transform: 'translateX(0)' }
    },
    'fade-right': {
        initial: { opacity: 0, transform: 'translateX(80px)' },
        animated: { opacity: 1, transform: 'translateX(0)' }
    },
    'fade-scale': {
        initial: { opacity: 0, transform: 'scale(0.8)' },
        animated: { opacity: 1, transform: 'scale(1)' }
    },
    'fade-rotate': {
        initial: { opacity: 0, transform: 'rotate(-10deg) scale(0.9)' },
        animated: { opacity: 1, transform: 'rotate(0) scale(1)' }
    },
    'clip-up': {
        initial: { clipPath: 'inset(100% 0 0 0)' },
        animated: { clipPath: 'inset(0 0 0 0)' }
    },
    'clip-left': {
        initial: { clipPath: 'inset(0 100% 0 0)' },
        animated: { clipPath: 'inset(0 0 0 0)' }
    },
    'blur-in': {
        initial: { opacity: 0, filter: 'blur(20px)' },
        animated: { opacity: 1, filter: 'blur(0)' }
    }
};

// Create scroll trigger observer
function createScrollTrigger(elements, options = {}) {
    const defaultOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const config = { ...defaultOptions, ...options };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay || 0;

                setTimeout(() => {
                    el.classList.add('animated');
                }, delay);

                if (!el.dataset.repeat) {
                    observer.unobserve(el);
                }
            } else if (entry.target.dataset.repeat) {
                entry.target.classList.remove('animated');
            }
        });
    }, config);

    elements.forEach(el => observer.observe(el));
    return observer;
}

// Initialize all scroll animations
function initScrollAnimations() {
    // Add animation classes to elements
    addAnimationClasses();

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('[data-animate]');
    createScrollTrigger(animatedElements);

    // Stagger animations for groups
    initStaggerAnimations();

    // Parallax effects
    initParallax();

    // Text reveal animations
    initTextReveal();

    // Progress animations
    initProgressAnimations();

    // Counter animations
    initCounterAnimations();
}

// Add animation classes to elements dynamically
function addAnimationClasses() {
    // Hero section
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroName = document.querySelector('.hero-name');
    const heroDescription = document.querySelector('.hero-description');
    const heroHighlights = document.querySelector('.hero-highlights');
    const heroButtons = document.querySelector('.hero-buttons');

    if (heroSubtitle) { heroSubtitle.dataset.animate = 'fade-up'; heroSubtitle.dataset.delay = '200'; }
    if (heroName) { heroName.dataset.animate = 'fade-up'; heroName.dataset.delay = '400'; }
    if (heroDescription) { heroDescription.dataset.animate = 'fade-up'; heroDescription.dataset.delay = '600'; }
    if (heroHighlights) { heroHighlights.dataset.animate = 'fade-up'; heroHighlights.dataset.delay = '800'; }
    if (heroButtons) { heroButtons.dataset.animate = 'fade-up'; heroButtons.dataset.delay = '1000'; }

    // Section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.dataset.animate = 'fade-up';
    });

    // Section labels
    document.querySelectorAll('.section-label').forEach(label => {
        label.dataset.animate = 'fade-right';
        label.dataset.delay = '100';
    });

    // Section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.dataset.animate = 'fade-up';
        title.dataset.delay = '200';
    });

    // About section
    const aboutIntro = document.querySelector('.about-intro');
    const competencies = document.querySelector('.competencies');
    const contactInfoGrid = document.querySelector('.contact-info-grid');

    if (aboutIntro) { aboutIntro.dataset.animate = 'fade-up'; aboutIntro.dataset.delay = '300'; }
    if (competencies) { competencies.dataset.animate = 'fade-up'; competencies.dataset.delay = '500'; }
    if (contactInfoGrid) { contactInfoGrid.dataset.animate = 'fade-up'; contactInfoGrid.dataset.delay = '700'; }

    // Timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.dataset.animate = 'fade-left';
        item.dataset.delay = (index * 200).toString();
    });

    // Skill categories
    document.querySelectorAll('.skill-category').forEach((card, index) => {
        card.dataset.animate = 'fade-up';
        card.dataset.delay = (index * 150).toString();
    });

    // Project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.dataset.animate = 'fade-scale';
        card.dataset.delay = (index * 100).toString();
    });

    // Contact section
    const contactLeft = document.querySelector('.contact-left');
    const contactRight = document.querySelector('.contact-right');

    if (contactLeft) { contactLeft.dataset.animate = 'fade-right'; }
    if (contactRight) { contactRight.dataset.animate = 'fade-left'; contactRight.dataset.delay = '300'; }
}

// Stagger animations for lists
function initStaggerAnimations() {
    const staggerGroups = [
        { selector: '.competencies-list li', delay: 100 },
        { selector: '.timeline-details li', delay: 80 },
        { selector: '.skill-tags span', delay: 50 },
        { selector: '.project-tags span', delay: 50 },
        { selector: '.hero-highlights li', delay: 150 },
        { selector: '.contact-details .contact-detail-item', delay: 150 }
    ];

    staggerGroups.forEach(group => {
        const elements = document.querySelectorAll(group.selector);
        elements.forEach((el, index) => {
            el.dataset.animate = 'fade-up';
            el.dataset.delay = (index * group.delay).toString();
        });
    });

    // Re-observe staggered elements
    const staggeredElements = document.querySelectorAll('[data-animate]');
    createScrollTrigger(staggeredElements);
}

// Parallax scrolling effects
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    const heroBackground = document.querySelector('.hero-background img');
    const contactBackground = document.querySelector('.contact-background img');

    // Add parallax data attributes
    if (heroBackground) heroBackground.dataset.parallax = '0.3';
    if (contactBackground) contactBackground.dataset.parallax = '0.2';

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    function updateParallax() {
        const scrolled = window.pageYOffset;

        // Hero background parallax
        if (heroBackground) {
            const rate = scrolled * 0.4;
            heroBackground.style.transform = `translateY(${rate}px) scale(1.1)`;
        }

        // Contact background parallax
        if (contactBackground) {
            const contactSection = document.querySelector('.contact');
            if (contactSection) {
                const rect = contactSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const rate = (window.innerHeight - rect.top) * 0.15;
                    contactBackground.style.transform = `translateY(${rate}px) scale(1.1)`;
                }
            }
        }

        // Skill images parallax
        document.querySelectorAll('.skill-image img').forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const rate = (window.innerHeight - rect.top) * 0.08;
                img.style.transform = `translateY(${rate}px) scale(1.05)`;
            }
        });

        // Project images parallax
        document.querySelectorAll('.project-image img').forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const rate = (window.innerHeight - rect.top) * 0.05;
                img.style.transform = `translateY(${rate}px) scale(1.02)`;
            }
        });
    }
}

// Text reveal animations
function initTextReveal() {
    // Split text into lines for reveal animation
    const revealTexts = document.querySelectorAll('.text-reveal');

    revealTexts.forEach(text => {
        const words = text.textContent.split(' ');
        text.innerHTML = words.map((word, i) =>
            `<span class="word" style="--word-index: ${i}"><span class="word-inner">${word}</span></span>`
        ).join(' ');
    });

    // Character by character reveal for hero name
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const text = heroName.textContent;
        heroName.innerHTML = text.split('').map((char, i) =>
            `<span class="char" style="--char-index: ${i}">${char}</span>`
        ).join('');

        setTimeout(() => {
            heroName.classList.add('revealed');
        }, 500);
    }
}

// Progress/skill bar animations
function initProgressAnimations() {
    const progressBars = document.querySelectorAll('.progress-bar');

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const value = bar.dataset.progress || 100;
                bar.style.setProperty('--progress', `${value}%`);
                bar.classList.add('animated');
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));
}

// Counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.counter);
                const duration = parseInt(counter.dataset.duration) || 2000;
                const suffix = counter.dataset.suffix || '';

                animateCounter(counter, target, duration, suffix);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target, duration, suffix) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);

        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target + suffix;
        }
    }

    requestAnimationFrame(update);
}

// ========================================
// Scroll Progress Indicator
// ========================================
function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// ========================================
// Magnetic Effect on Buttons
// ========================================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .project-link, .contact-socials a');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ========================================
// Image Reveal on Scroll
// ========================================
function initImageReveal() {
    const images = document.querySelectorAll('.skill-image, .project-image');

    images.forEach(imgContainer => {
        imgContainer.classList.add('image-reveal');
    });

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                imageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// Smooth Section Transitions
// ========================================
function initSectionTransitions() {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                // Add sequential animation to children
                const children = entry.target.querySelectorAll('[data-animate]');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animated');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1, rootMargin: '-10% 0px -10% 0px' });

    sections.forEach(section => sectionObserver.observe(section));
}

// ========================================
// Cursor Trail Effect
// ========================================
function initCursorTrail() {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;

        trail.style.left = `${trailX}px`;
        trail.style.top = `${trailY}px`;

        requestAnimationFrame(animate);
    }

    animate();

    // Scale effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => trail.classList.add('hover'));
        el.addEventListener('mouseleave', () => trail.classList.remove('hover'));
    });
}

// ========================================
// Back to Top Button
// ========================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Project Cards Tilt Effect
// ========================================
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========================================
// Horizontal Scroll Animation for Skills
// ========================================
function initHorizontalScroll() {
    const skillTags = document.querySelectorAll('.skill-tags');

    skillTags.forEach(container => {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const tags = entry.target.querySelectorAll('span');
                    tags.forEach((tag, index) => {
                        tag.style.animationDelay = `${index * 0.1}s`;
                        tag.classList.add('tag-animate');
                    });
                }
            });
        }, { threshold: 0.5 });

        scrollObserver.observe(container);
    });
}

// ========================================
// Initialize on DOM Load
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    initScrollAnimations();
    initScrollProgress();
    initMagneticButtons();
    initImageReveal();
    initSectionTransitions();
    initHorizontalScroll();
    // initCursorTrail(); // Uncomment for cursor trail effect

    // Add visible class to hero section immediately
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.classList.add('visible');
        heroSection.classList.add('in-view');
    }

    // Trigger initial animations for hero
    setTimeout(() => {
        document.querySelectorAll('.hero-right [data-animate]').forEach(el => {
            el.classList.add('animated');
        });
    }, 300);
});

// ========================================
// Scroll-based Color Theme (Optional)
// ========================================
function initScrollColorTheme() {
    const darkSections = document.querySelectorAll('.about, .contact');

    const colorObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.body.classList.add('dark-section-visible');
                navbar.classList.add('light-text');
            } else {
                document.body.classList.remove('dark-section-visible');
                navbar.classList.remove('light-text');
            }
        });
    }, { threshold: 0.5 });

    darkSections.forEach(section => colorObserver.observe(section));
}

// ========================================
// Performance Optimization
// ========================================
// Throttle scroll events
function throttle(func, limit) {
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

// Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Handle resize
window.addEventListener('resize', debounce(() => {
    // Recalculate positions if needed
}, 250));

console.log('%c Portfolio Loaded Successfully! ', 'background: linear-gradient(135deg, #b8956c, #d4b896); color: #2d2622; font-size: 14px; padding: 10px; border-radius: 4px;');
