// ===== NAVIGATION JAVASCRIPT =====

class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.lastScrollTop = 0;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.initScrollEffects();
        this.initActiveLink();
    }
    
    bindEvents() {
        // Mobile menu toggle
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }
        
        // Close mobile menu when clicking on a link (only on small screens)
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) this.closeMobileMenu();
            });
        });
        
        // Close mobile menu when clicking outside (only if menu is open)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && this.navMenu.classList.contains('active')) {
                if (!e.target.closest('.navbar')) {
                    this.closeMobileMenu();
                }
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', debounce(() => {
            this.handleResize();
        }, 250));
    }
    
    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    handleResize() {
        // Close mobile menu on desktop
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }
    
    initScrollEffects() {
        // Navbar background on scroll
        window.addEventListener('scroll', throttle(() => {
            this.handleScroll();
        }, 100));
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove navbar background
        if (scrollTop > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > this.lastScrollTop && scrollTop > 100) {
            // Scrolling down
            this.navbar.classList.add('nav-hidden');
        } else {
            // Scrolling up
            this.navbar.classList.remove('nav-hidden');
        }
        
        this.lastScrollTop = scrollTop;
    }
    
    initActiveLink() {
        // Update active link based on current section
        window.addEventListener('scroll', throttle(() => {
            this.updateActiveLink();
        }, 100));
    }
    
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ===== SMOOTH SCROLLING =====

class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Handle all internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                this.scrollToTarget(link.getAttribute('href'));
            }
        });
    }
    
    scrollToTarget(target) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;
        
        const targetPosition = targetElement.offsetTop - 80; // Account for fixed navbar
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        requestAnimationFrame(animation);
    }
    
    ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
}

// ===== BREADCRUMB NAVIGATION =====
// (Breadcrumb feature removed)

// ===== KEYBOARD NAVIGATION =====

class KeyboardNavigation {
    constructor() {
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });
    }
    
    handleKeyPress(e) {
        // Escape key - close mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.querySelector('.nav-menu.active');
            if (mobileMenu) {
                document.querySelector('.hamburger').click();
            }
        }
        
        // Arrow keys for navigation (when focused on nav)
        if (e.target.closest('.nav-menu')) {
            const navLinks = Array.from(document.querySelectorAll('.nav-link'));
            const currentIndex = navLinks.indexOf(e.target);
            
            switch (e.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % navLinks.length;
                    navLinks[nextIndex].focus();
                    break;
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    const prevIndex = currentIndex === 0 ? navLinks.length - 1 : currentIndex - 1;
                    navLinks[prevIndex].focus();
                    break;
            }
        }
        
        // Number keys for quick navigation
        if (e.key >= '1' && e.key <= '9') {
            const navLinks = document.querySelectorAll('.nav-link');
            const index = parseInt(e.key) - 1;
            if (navLinks[index]) {
                e.preventDefault();
                navLinks[index].click();
            }
        }
    }
}

// ===== UTILITY FUNCTIONS =====

function debounce(func, wait) {
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

// ===== INITIALIZATION =====

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new SmoothScroll();
    // BreadcrumbNav removed
    new KeyboardNavigation();
}); 