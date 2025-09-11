// SPA Router for Portfolio Website
class SPARouter {
    constructor() {
        // Determine base path for GitHub Pages project sites and local
        this.basePath = this.computeBasePath();
        this.routes = {
            '/': 'home',
            '/blog': 'blog',
            '/player': 'player'
        };
        this.currentRoute = null;
        this.previousRoute = null;
        this.init();
    }

    init() {
        // Handle initial load
        this.handleRoute();
        
        // Handle browser back/forward
        window.addEventListener('popstate', () => this.handleRoute());
        
        // Intercept all link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (link && this.isInternalLink(link.href)) {
                e.preventDefault();
                this.navigate(link.getAttribute('href'));
            }
        });
    }

    isInternalLink(href) {
        try {
            const url = new URL(href, window.location.origin);
            return url.origin === window.location.origin;
        } catch {
            return false;
        }
    }

    navigate(path) {
        // Handle hash-only navigation
        if (path.startsWith('#')) {
            const targetUrl = this.withBaseHash(path);
            if (window.location.href !== targetUrl) {
                window.history.pushState({}, '', targetUrl);
            }
            this.handleRoute();
            return;
        }

        // Clean to relative path (no leading slash)
        const rel = path.startsWith('/') ? path.slice(1) : path;
        const targetPath = rel.length ? this.basePath + rel : this.basePath;

        // Update URL without page reload
        const current = window.location.pathname + window.location.search + window.location.hash;
        const next = new URL(targetPath, window.location.origin).pathname;
        if (window.location.pathname !== next) {
            window.history.pushState({}, '', targetPath);
        }
        
        this.handleRoute();
    }

    handleRoute() {
        // Strip basePath from current pathname for route matching
        let path = window.location.pathname;
        const bp = this.basePath.endsWith('/') ? this.basePath.slice(0, -1) : this.basePath;
        if (bp && bp !== '/' && path.startsWith(bp)) {
            path = path.slice(bp.length);
            if (!path.startsWith('/')) path = '/' + path;
        }
        const hash = window.location.hash;
        const route = this.routes[path] || 'home';
        
        if (this.currentRoute === route) {
            // Handle hash navigation within the same route
            if (hash) {
                this.scrollToSection(hash);
            }
            return;
        }
        
        this.previousRoute = this.currentRoute;
        this.currentRoute = route;
        this.renderPage(route);
        
        // Handle hash navigation after page render
        if (hash) {
            setTimeout(() => this.scrollToSection(hash), 100);
        }
    }

    scrollToSection(hash) {
        const targetId = hash.substring(1);
        let targetElement;
        
        // Map old section IDs to new ones for home page
        if (this.currentRoute === 'home') {
            const sectionMap = {
                'about': 'home-about',
                'projects': 'home-projects', 
                'blog': 'home-blog',
                'contact': 'home-contact'
            };
            const mappedId = sectionMap[targetId];
            if (mappedId) {
                targetElement = document.getElementById(mappedId);
            }
        }
        
        if (targetElement) {
            const headerHeight = window.innerWidth <= 768 ? 70 : 0;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    renderPage(route) {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        // Add transition class for smooth page changes
        mainContent.classList.add('page-transition');

        // Hide all sections first
        this.hideAllSections();

        // Use requestAnimationFrame for smooth transitions
        requestAnimationFrame(() => {
            switch (route) {
                case 'home':
                    this.showHomePage();
                    break;
                case 'blog':
                    this.showBlogPage();
                    break;
                case 'player':
                    this.showPlayerPage();
                    break;
                default:
                    this.showHomePage();
            }

            // Update navigation active states
            this.updateNavigation(route);
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Trigger any necessary reinitializations
            this.triggerPageInit(route);

            // Remove transition class after animation
            setTimeout(() => {
                mainContent.classList.remove('page-transition');
            }, 300);
        });
    }

    hideAllSections() {
        const sections = document.querySelectorAll('.page-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });
    }

    showHomePage() {
        // Show home page sections
        const homeSections = document.querySelectorAll('#home-about, #home-projects, #home-blog, #home-contact');
        homeSections.forEach(section => {
            section.style.display = 'block';
        });
        
        // Hide blog-specific sections
        const blogSections = document.querySelectorAll('#blog-header, #all-blog-posts');
        blogSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Hide blog separator
        const blogSeparator = document.getElementById('blog-separator');
        if (blogSeparator) {
            blogSeparator.style.display = 'none';
        }
    }

    showBlogPage() {
        // Hide home page sections
        const homeSections = document.querySelectorAll('#home-about, #home-projects, #home-blog, #home-contact');
        homeSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show blog-specific sections
        const blogSections = document.querySelectorAll('#blog-header, #all-blog-posts');
        blogSections.forEach(section => {
            section.style.display = 'block';
        });
        
        // Hide blog separator
        const blogSeparator = document.getElementById('blog-separator');
        if (blogSeparator) {
            blogSeparator.style.display = 'none';
        }
    }

    showPlayerPage() {
        // For now, redirect to home since player is a floating component
        this.navigate('/');
    }

    updateNavigation(route) {
        // Update navigation links to reflect current route
        const navLinks = document.querySelectorAll('#overlay-nav nav a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                // Keep hash-based navigation for sections but ensure they work with SPA
                if (href.includes('#about') || href.includes('#projects') || href.includes('#contact')) {
                    // Point to base + hash for SPA navigation under project path
                    link.setAttribute('href', this.withBaseHash('#' + href.split('#')[1]));
                } else if (href.includes('blog.html')) {
                    link.setAttribute('href', this.basePath + 'blog');
                } else if (href === '/' || href === './' || href === '.') {
                    link.setAttribute('href', this.basePath);
                }
            }
        });

        // Show/hide back button and hamburger menu based on current route
        const backButton = document.getElementById('back-button');
        const hamburgerMenu = document.getElementById('hamburger-menu');
        
        if (backButton) {
            if (route === 'blog') {
                backButton.style.display = 'inline-block';
            } else {
                backButton.style.display = 'none';
            }
        }
        
        if (hamburgerMenu) {
            if (route === 'blog') {
                hamburgerMenu.style.display = 'none';
            } else {
                hamburgerMenu.style.display = 'flex';
            }
        }
    }

    triggerPageInit(route) {
        // Only reinitialize components when actually switching between different routes
        if (this.previousRoute !== route) {
            if (route === 'blog') {
                // Load blog posts when switching to blog page
                if (window.blogManager) {
                    window.blogManager.loadAllPosts();
                }
            } else if (route === 'home') {
                // Load latest posts when switching to home page
                if (window.blogManager) {
                    window.blogManager.loadLatestPosts();
                }
            }
        }
    }
}

// Initialize router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.spaRouter = new SPARouter();
});

// Helpers added to the class
SPARouter.prototype.computeBasePath = function () {
    try {
        const baseEl = document.querySelector('base[href]');
        if (baseEl) {
            let href = baseEl.getAttribute('href') || '/';
            if (!href.endsWith('/')) href += '/';
            return href;
        }
        if (location.hostname.endsWith('github.io')) {
            const parts = location.pathname.split('/').filter(Boolean);
            if (parts.length > 0) {
                return `/${parts[0]}/`;
            }
        }
        return '/';
    } catch (_) {
        return '/';
    }
};

SPARouter.prototype.withBaseHash = function (hash) {
    const h = hash.startsWith('#') ? hash : '#' + hash;
    return this.basePath + h;
};
