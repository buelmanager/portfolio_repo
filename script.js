// ========================================
// Custom Cursor
// ========================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Main cursor - instant follow
    cursorX += (mouseX - cursorX) * 0.5;
    cursorY += (mouseY - cursorY) * 0.5;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    // Follower - smooth follow
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    cursorFollower.style.left = `${followerX}px`;
    cursorFollower.style.top = `${followerY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, .project-item, .skill-pill, .contact-info-card, .timeline-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

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
// Scroll Progress Indicator
// ========================================
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
});

// ========================================
// Scroll Reveal Animations
// ========================================
function createObserver(elements, className = 'visible', options = {}) {
    const defaultOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const config = { ...defaultOptions, ...options };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
                observer.unobserve(entry.target);
            }
        });
    }, config);

    elements.forEach(el => observer.observe(el));
    return observer;
}

// Timeline items animation
const timelineItems = document.querySelectorAll('.timeline-item-modern');
createObserver(timelineItems);

// Project items animation
const projectItems = document.querySelectorAll('.project-item');
createObserver(projectItems);

// Generic data-animate elements
const animatedElements = document.querySelectorAll('[data-animate]');
createObserver(animatedElements, 'animated');

// ========================================
// Stagger Animations
// ========================================
function initStaggerAnimations() {
    const staggerContainers = [
        { selector: '.skills-showcase', children: '.skill-pill', delay: 100 },
        { selector: '.contact-info-grid', children: '.contact-info-card', delay: 150 },
        { selector: '.hero-highlights', children: '.highlight-item', delay: 150 }
    ];

    staggerContainers.forEach(container => {
        const parent = document.querySelector(container.selector);
        if (!parent) return;

        const children = parent.querySelectorAll(container.children);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * container.delay);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        // Set initial styles
        children.forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(30px)';
            child.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        observer.observe(parent);
    });
}

// ========================================
// Parallax Effects
// ========================================
function initParallax() {
    const heroImage = document.querySelector('.hero-image-frame img');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;

                // Hero image parallax
                if (heroImage && scrolled < window.innerHeight) {
                    const rate = scrolled * 0.3;
                    heroImage.style.transform = `translateY(${rate}px) scale(1.1)`;
                }

                ticking = false;
            });
            ticking = true;
        }
    });
}

// ========================================
// Magnetic Button Effect
// ========================================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .social-link, .nav-cta');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ========================================
// Text Split Animation
// ========================================
function initTextSplitAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    // All words animate together with same delay
    const words = heroTitle.querySelectorAll('.word');
    words.forEach((word) => {
        word.style.animationDelay = '0.3s';
    });
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 100;
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
// Project Card Tilt Effect
// ========================================
function initProjectTilt() {
    const projectImages = document.querySelectorAll('.project-image-wrapper');

    projectImages.forEach(image => {
        image.addEventListener('mousemove', (e) => {
            const rect = image.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        image.addEventListener('mouseleave', () => {
            image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ========================================
// Floating Badge Animation Enhancement
// ========================================
function initFloatingBadges() {
    const badges = document.querySelectorAll('.floating-badge');

    badges.forEach((badge, index) => {
        // Add slight random movement on mouse move
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            badge.style.transform = `translate(${x * (index + 1) * 0.3}px, ${y * (index + 1) * 0.3}px)`;
        });
    });
}

// ========================================
// Section Number Counter Animation
// ========================================
function initSectionNumbers() {
    const sectionNumbers = document.querySelectorAll('.section-number');

    sectionNumbers.forEach(num => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    num.style.opacity = '0.02';
                    num.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });

        num.style.opacity = '0';
        num.style.transform = 'translateY(50px)';
        num.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';

        observer.observe(num.closest('section'));
    });
}

// ========================================
// Marquee Pause on Hover
// ========================================
function initMarquee() {
    const marquee = document.querySelector('.marquee');
    const marqueeContent = document.querySelector('.marquee-content');

    if (marquee && marqueeContent) {
        marquee.addEventListener('mouseenter', () => {
            marqueeContent.style.animationPlayState = 'paused';
        });

        marquee.addEventListener('mouseleave', () => {
            marqueeContent.style.animationPlayState = 'running';
        });
    }
}

// ========================================
// Scroll-based Section Background
// ========================================
function initScrollBackground() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const windowHeight = window.innerHeight;

                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    const sectionTop = rect.top;
                    const sectionHeight = rect.height;

                    if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
                        const progress = 1 - (sectionTop / windowHeight);
                        const clampedProgress = Math.max(0, Math.min(1, progress));

                        // Subtle parallax for section backgrounds
                        const bgElements = section.querySelectorAll('.section-number, .hero-bg-text, .contact-bg-text');
                        bgElements.forEach(el => {
                            el.style.transform = `translateY(${clampedProgress * 30}px)`;
                        });
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    });
}

// ========================================
// Initialize Everything
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initStaggerAnimations();
    initParallax();
    initMagneticButtons();
    initTextSplitAnimation();
    initProjectTilt();
    initFloatingBadges();
    initSectionNumbers();
    initMarquee();
    initScrollBackground();

    // Initial reveal for hero elements
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-tag, .hero-description, .hero-highlights, .hero-actions');
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 600 + index * 200);
        });
    }, 100);

    console.log('%c Portfolio Loaded! ', 'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; font-size: 14px; padding: 10px 20px; border-radius: 8px;');
});

// ========================================
// Performance Optimization
// ========================================
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

// ========================================
// Lazy Load Images
// ========================================
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoad();
