// Import blog functionality if on home page
if (!window.location.pathname.includes('blog.html')) {
    // Load blog posts on home page
    const script = document.createElement('script');
    script.src = 'js/blog.js';
    document.head.appendChild(script);
}

// Theme: apply saved or system preference ASAP
(function applyInitialTheme() {
    try {
        const saved = localStorage.getItem('theme');
        // Default to dark when no saved preference
        const theme = saved || 'dark';
        document.documentElement.setAttribute('data-theme', theme);
    } catch (_) { /* no-op */ }
})();

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle hookup
    const toggle = document.getElementById('theme-toggle');
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        try { localStorage.setItem('theme', theme); } catch (_) {}
    };
    if (toggle) {
        toggle.addEventListener('click', (e) => {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            const apply = () => setTheme(next);

            // Smooth cross-fade using View Transitions API when available
            if (!prefersReducedMotion && document.startViewTransition) {
                document.documentElement.classList.add('theme-transition');
                document.startViewTransition(() => {
                    apply();
                }).finished.finally(() => {
                    document.documentElement.classList.remove('theme-transition');
                });
            } else {
                // Fallback: brief CSS transitions via a helper class
                document.documentElement.classList.add('theme-transition');
                apply();
                setTimeout(() => {
                    document.documentElement.classList.remove('theme-transition');
                }, 450);
            }
        });
    }
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const overlayNav = document.getElementById('overlay-nav');
    const navLinks = overlayNav.querySelectorAll('nav a');
    const header = document.querySelector('header');

    // Mobile detection
    const isMobile = () => window.innerWidth <= 768;
    const isSmallMobile = () => window.innerWidth <= 480;

    // Toggle menu with hamburger button
    if (hamburgerMenu && overlayNav) {
        hamburgerMenu.addEventListener('click', (e) => {
            e.preventDefault();
            overlayNav.classList.toggle('active');
            document.body.classList.toggle('nav-active');
            
            // Prevent body scroll when menu is open on mobile
            if (isMobile()) {
                if (overlayNav.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        });

        // Add touch event for better mobile responsiveness
        hamburgerMenu.addEventListener('touchstart', (e) => {
            // The click event is sufficient, no need to preventDefault here
        }, { passive: true });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (overlayNav.classList.contains('active')) {
                overlayNav.classList.remove('active');
                document.body.classList.remove('nav-active');
                document.body.style.overflow = ''; // Restore scroll
            }
        });
    });

    // Close menu when clicking outside on mobile
    overlayNav.addEventListener('click', (e) => {
        if (e.target === overlayNav) {
            overlayNav.classList.remove('active');
            document.body.classList.remove('nav-active');
            document.body.style.overflow = '';
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlayNav.classList.contains('active')) {
            overlayNav.classList.remove('active');
            document.body.classList.remove('nav-active');
            document.body.style.overflow = '';
        }
    });

    // Add scrolled class to header on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        // Throttle scroll events for better performance on mobile
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, 10);
    }, { passive: true });

    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        // Close menu on orientation change
        if (overlayNav.classList.contains('active')) {
            overlayNav.classList.remove('active');
            document.body.classList.remove('nav-active');
            document.body.style.overflow = '';
        }
        
        // Recalculate viewport height for mobile browsers
        setTimeout(() => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }, 100);
    });

    // Set initial viewport height for mobile browsers
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);

    // Improve touch interactions for buttons
    const touchElements = document.querySelectorAll('.icon-button, .contact-link-btn, .project-card');
    
    touchElements.forEach(element => {
        // Add touch feedback
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = '';
        }, { passive: true });
    });

    // Smooth scrolling for anchor links on mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerHeight = isMobile() ? 70 : 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optimize animations for mobile devices
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
    }

    // Scroll Reveal (progressive enhancement)
    (function initScrollReveal() {
        const targets = document.querySelectorAll([
            '.project-card',
            '.blog-post-card',
            '.blog-post-preview',
            '.content-container > *',
            '.y2k-window',
            '.tech-stack li',
            '.contact-link-btn',
            '.view-all-btn'
        ].join(','));

        // If user prefers reduced motion, reveal instantly
        if (prefersReducedMotion.matches) {
            targets.forEach(el => el.classList.add('reveal-in'));
            return;
        }

        // Add base class for reveal
        targets.forEach(el => el.classList.add('reveal'));

        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-in');
                    // Remove base class once animated in (optional)
                    // entry.target.classList.remove('reveal');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        });

        targets.forEach(t => io.observe(t));
    })();

    // Handle focus for keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

});
