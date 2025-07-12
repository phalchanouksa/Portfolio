// ===== GLITCH EFFECTS JAVASCRIPT =====

class GlitchEffects {
    constructor() {
        this.glitchElements = [];
        this.matrixElements = [];
        this.init();
    }
    
    init() {
        this.findGlitchElements();
        this.initMatrixEffect();
        this.bindEvents();
        this.startRandomGlitches();
    }
    
    findGlitchElements() {
        // Find all elements with glitch classes
        this.glitchElements = document.querySelectorAll('.glitch-text, .glitch-btn, .glitch-border');
        
        // Add glitch effect to elements
        this.glitchElements.forEach(element => {
            this.setupGlitchElement(element);
        });
    }
    
    setupGlitchElement(element) {
        // Create glitch layers
        const glitchLayers = this.createGlitchLayers(element);
        
        // Store reference to layers
        element.glitchLayers = glitchLayers;
        
        // Add random glitch timing
        element.glitchInterval = setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance
                this.triggerGlitch(element);
            }
        }, 3000 + Math.random() * 2000);
    }
    
    createGlitchLayers(element) {
        const text = element.textContent || element.getAttribute('data-text') || '';
        const layers = [];
        
        // Create red layer
        const redLayer = document.createElement('span');
        redLayer.className = 'glitch-layer glitch-red';
        redLayer.textContent = text;
        redLayer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            color: var(--glitch-red);
            opacity: 0;
            pointer-events: none;
            z-index: -1;
        `;
        
        // Create blue layer
        const blueLayer = document.createElement('span');
        blueLayer.className = 'glitch-layer glitch-blue';
        blueLayer.textContent = text;
        blueLayer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            color: var(--glitch-blue);
            opacity: 0;
            pointer-events: none;
            z-index: -2;
        `;
        
        element.style.position = 'relative';
        element.appendChild(redLayer);
        element.appendChild(blueLayer);
        
        layers.push(redLayer, blueLayer);
        return layers;
    }
    
    triggerGlitch(element) {
        const layers = element.glitchLayers;
        if (!layers) return;
        
        // Random glitch duration
        const duration = 100 + Math.random() * 200;
        
        // Show glitch layers
        layers.forEach((layer, index) => {
            layer.style.opacity = '0.8';
            layer.style.transform = `translate(${(Math.random() - 0.5) * 4}px, ${(Math.random() - 0.5) * 4}px)`;
            
            // Random glitch timing for each layer
            setTimeout(() => {
                layer.style.opacity = '0';
            }, duration + (index * 50));
        });
        
        // Add shake effect to main element
        element.classList.add('shake');
        setTimeout(() => {
            element.classList.remove('shake');
        }, duration);
    }
    
    initMatrixEffect() {
        // Create matrix rain effect
        this.matrixElements = document.querySelectorAll('.code-matrix');
        
        this.matrixElements.forEach(container => {
            this.createMatrixRain(container);
        });
    }
    
    createMatrixRain(container) {
        const characters = '01';
        const columns = Math.floor(container.offsetWidth / 20);
        
        for (let i = 0; i < columns; i++) {
            this.createMatrixColumn(container, characters, i);
        }
    }
    
    createMatrixColumn(container, characters, columnIndex) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.cssText = `
            position: absolute;
            top: -100%;
            left: ${columnIndex * 20}px;
            color: var(--primary-color);
            font-family: var(--font-secondary);
            font-size: 16px;
            line-height: 1;
            opacity: 0.7;
            animation: matrix-fall ${3 + Math.random() * 2}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        // Create falling characters
        const charCount = 20;
        for (let i = 0; i < charCount; i++) {
            const char = document.createElement('div');
            char.textContent = characters[Math.floor(Math.random() * characters.length)];
            char.style.cssText = `
                opacity: ${Math.random() * 0.5 + 0.5};
                animation-delay: ${i * 0.1}s;
            `;
            column.appendChild(char);
        }
        
        container.appendChild(column);
    }
    
    bindEvents() {
        // Mouse hover glitch effect
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('.glitch-text, .glitch-btn')) {
                this.triggerGlitch(e.target);
            }
        });
        
        // Click glitch effect
        document.addEventListener('click', (e) => {
            if (e.target.matches('.glitch-btn')) {
                this.triggerGlitch(e.target);
            }
        });
        
        // Scroll glitch effect
        window.addEventListener('scroll', throttle(() => {
            this.handleScrollGlitch();
        }, 100));
    }
    
    handleScrollGlitch() {
        // Trigger glitch on scroll for visible elements
        this.glitchElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && Math.random() < 0.05) {
                this.triggerGlitch(element);
            }
        });
    }
    
    startRandomGlitches() {
        // Global random glitch effects
        setInterval(() => {
            this.triggerRandomGlitch();
        }, 5000 + Math.random() * 5000);
    }
    
    triggerRandomGlitch() {
        // Random screen glitch effect
        this.createScreenGlitch();
        
        // Random element glitch
        if (this.glitchElements.length > 0) {
            const randomElement = this.glitchElements[Math.floor(Math.random() * this.glitchElements.length)];
            this.triggerGlitch(randomElement);
        }
    }
    
    createScreenGlitch() {
        // Create temporary screen glitch overlay
        const overlay = document.createElement('div');
        overlay.className = 'screen-glitch-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent 50%, 
                rgba(255, 0, 0, 0.1) 50%,
                transparent 50%,
                rgba(0, 0, 255, 0.1) 50%);
            background-size: 4px 4px;
            pointer-events: none;
            z-index: 9998;
            animation: screen-glitch 0.1s linear;
        `;
        
        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes screen-glitch {
                0% { transform: translateX(0); opacity: 0; }
                10% { transform: translateX(-2px); opacity: 1; }
                20% { transform: translateX(2px); opacity: 1; }
                30% { transform: translateX(-1px); opacity: 1; }
                40% { transform: translateX(1px); opacity: 1; }
                50% { transform: translateX(0); opacity: 0.5; }
                100% { transform: translateX(0); opacity: 0; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(overlay);
        
        // Remove overlay after animation
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 100);
    }
}

// ===== TEXT GLITCH ANIMATION =====

// Remove the TextGlitchAnimation class and its instantiation

// ===== IMAGE GLITCH EFFECT =====

class ImageGlitchEffect {
    constructor() {
        this.imageElements = [];
        this.init();
    }
    
    init() {
        this.findImageElements();
        this.bindEvents();
    }
    
    findImageElements() {
        this.imageElements = document.querySelectorAll('.project-image, .blog-image');
        
        this.imageElements.forEach(element => {
            this.setupImageGlitch(element);
        });
    }
    
    setupImageGlitch(element) {
        // Add glitch overlay
        const overlay = document.createElement('div');
        overlay.className = 'image-glitch-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, 
                transparent 30%, 
                rgba(255, 0, 0, 0.1) 30%, 
                rgba(255, 0, 0, 0.1) 40%, 
                transparent 40%);
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            pointer-events: none;
        `;
        
        element.appendChild(overlay);
        element.glitchOverlay = overlay;
    }
    
    bindEvents() {
        // Mouse hover image glitch
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.project-image, .blog-image')) {
                const container = e.target.closest('.project-image, .blog-image');
                this.triggerImageGlitch(container);
            }
        });
        
        // Mouse leave image glitch
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.project-image, .blog-image')) {
                const container = e.target.closest('.project-image, .blog-image');
                this.resetImageGlitch(container);
            }
        });
    }
    
    triggerImageGlitch(element) {
        const overlay = element.glitchOverlay;
        if (!overlay) return;
        
        overlay.style.transform = 'translateX(100%)';
        
        // Add random glitch effect
        setTimeout(() => {
            overlay.style.transform = 'translateX(-100%)';
        }, 300);
    }
    
    resetImageGlitch(element) {
        const overlay = element.glitchOverlay;
        if (!overlay) return;
        
        overlay.style.transform = 'translateX(-100%)';
    }
}

// ===== UTILITY FUNCTIONS =====

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
    new GlitchEffects();
    new ImageGlitchEffect();
}); 