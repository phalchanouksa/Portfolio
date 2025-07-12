// ===== ANIMATIONS JAVASCRIPT =====

class AnimationController {
    constructor() {
        this.animatedElements = [];
        this.intersectionObserver = null;
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.bindEvents();
        this.initParallaxEffects();
        this.initHoverEffects();
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, options);
    }
    
    bindEvents() {
        // Observe elements for animation
        this.observeElements();
        
        // Re-observe on window resize
        window.addEventListener('resize', debounce(() => {
            this.observeElements();
        }, 250));
        
        // Handle scroll events for parallax
        window.addEventListener('scroll', throttle(() => {
            this.updateParallax();
        }, 16));
    }
    
    observeElements() {
        const elements = document.querySelectorAll('.animate-on-scroll, .project-card, .blog-card');
        
        elements.forEach(element => {
            if (!this.animatedElements.includes(element)) {
                this.animatedElements.push(element);
                this.intersectionObserver.observe(element);
            }
        });
    }
    
    animateElement(element) {
        // Add animation class based on element type
        if (element.classList.contains('project-card') || element.classList.contains('blog-card')) {
            element.classList.add('fade-in');
        } else {
            element.classList.add('animate-on-scroll', 'visible');
        }
        
        // Add glitch effect randomly
        if (Math.random() < 0.3) {
            setTimeout(() => {
                element.classList.add('random-glitch');
                setTimeout(() => {
                    element.classList.remove('random-glitch');
                }, 200);
            }, Math.random() * 1000);
        }
    }
    
    initParallaxEffects() {
        this.parallaxElements = document.querySelectorAll('.parallax');
    }
    
    updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        this.parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }
    
    initHoverEffects() {
        // Add hover effects to interactive elements
        const hoverElements = document.querySelectorAll('.project-card, .blog-card, .btn');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.addHoverEffect(element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.removeHoverEffect(element);
            });
        });
    }
    
    addHoverEffect(element) {
        // Add subtle glow effect
        element.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.3)';
        
        // Add scale effect for cards
        if (element.classList.contains('project-card') || element.classList.contains('blog-card')) {
            element.style.transform = 'translateY(-5px) scale(1.02)';
        }
    }
    
    removeHoverEffect(element) {
        element.style.boxShadow = '';
        element.style.transform = '';
    }
}

// ===== TYPING ANIMATION =====

// TypingAnimation class removed to avoid conflict with main.js

// ===== PARTICLE SYSTEM =====

class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.particleCount = 50;
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particle-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.3;
        `;
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 255, 65, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===== SCROLL PROGRESS =====

class ScrollProgress {
    constructor() {
        this.progressBar = null;
        this.init();
    }
    
    init() {
        this.createProgressBar();
        this.bindEvents();
    }
    
    createProgressBar() {
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'scroll-progress';
        this.progressBar.innerHTML = '<div class="progress-fill"></div>';
        
        const style = document.createElement('style');
        style.textContent = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: rgba(0, 255, 65, 0.2);
                z-index: 1001;
            }
            .progress-fill {
                height: 100%;
                background: var(--primary-color);
                width: 0%;
                transition: width 0.1s ease;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(this.progressBar);
    }
    
    bindEvents() {
        window.addEventListener('scroll', throttle(() => {
            this.updateProgress();
        }, 16));
    }
    
    updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        this.progressBar.querySelector('.progress-fill').style.width = scrollPercent + '%';
    }
}

// ===== CURSOR EFFECTS =====
// (Removed custom cursor feature)

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

document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
    // new TypingAnimation(); // Removed
    new ParticleSystem();
    new ScrollProgress();
    // Removed custom cursor initialization
}); 