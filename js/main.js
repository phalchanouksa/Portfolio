// ===== MAIN JAVASCRIPT FILE =====

// Global variables
let currentPage = 'home';
let typingIndex = 0;
let typingText = '';
const typingWords = ['Developer','Creator', 'Vibe Coder', 'Bug Hunter'];
let isTyping = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 GlitchCoder Portfolio Initialized');
    
    showLoadingAnimation(() => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.add('fly-in');
        }
        
        // Ensure page starts at the top (hero section)
        window.scrollTo(0, 0);
        
        // Reset active navigation to home
        setTimeout(() => {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === 'home') {
                    link.classList.add('active');
                }
            });
        }, 100);
        
        initNavigation();
        initAnimations();
        initGlitchEffects();
        initBlogFilters();
        initTypingEffect();
        initScrollAnimations();
        initMatrixEffect();
        initMatrixBackground();
        // Matrix rain for navbar
        const canvas = document.getElementById('navbar-matrix-bg');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let width = canvas.width = canvas.offsetWidth;
            let height = canvas.height = canvas.offsetHeight;
            let fontSize = 14; // Smaller font for more density
            let columns = Math.floor(width / fontSize);
            let drops = Array(columns).fill(1);
            
            // Create multiple drops per column for more intense effect
            let dropSpeeds = Array(columns).fill(0).map(() => Math.random() * 2 + 1);
            let dropChars = Array(columns).fill(0).map(() => Math.random() > 0.5 ? '1' : '0');
            
            function resizeMatrix() {
                width = canvas.width = canvas.offsetWidth;
                height = canvas.height = canvas.offsetHeight;
                columns = Math.floor(width / fontSize);
                drops = Array(columns).fill(1);
                dropSpeeds = Array(columns).fill(0).map(() => Math.random() * 2 + 1);
                dropChars = Array(columns).fill(0).map(() => Math.random() > 0.5 ? '1' : '0');
            }
            window.addEventListener('resize', resizeMatrix);
            
            function drawMatrix() {
                ctx.fillStyle = 'rgba(10,20,10,0.15)';
                ctx.fillRect(0, 0, width, height);
                ctx.font = fontSize + 'px monospace';
                
                for (let i = 0; i < drops.length; i++) {
                    // Draw multiple characters per column for more density
                    for (let j = 0; j < 3; j++) {
                        const y = (drops[i] - j * 20) * fontSize;
                        if (y > 0 && y < height) {
                            // Vary opacity for depth effect
                            const opacity = Math.max(0.1, 1 - (j * 0.3));
                            ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
                            
                            // Randomly change characters
                            if (Math.random() < 0.1) {
                                dropChars[i] = Math.random() > 0.5 ? '1' : '0';
                            }
                            
                            ctx.fillText(dropChars[i], i * fontSize, y);
                        }
                    }
                    
                    // Reset drop when it goes off screen
                    if (drops[i] * fontSize > height + 60) {
                        drops[i] = 0;
                        dropSpeeds[i] = Math.random() * 2 + 1;
                        dropChars[i] = Math.random() > 0.5 ? '1' : '0';
                    }
                    
                    drops[i] += dropSpeeds[i] * 0.1;
                }
            }
            setInterval(drawMatrix, 50); // Faster refresh rate
        }

        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            setTimeout(() => heroSection.classList.add('fly-in'), 100);
        }
    });
});

// Interactive About Terminal
function startInteractiveTerminal() {
  const terminal = document.getElementById('about-terminal');
  if (!terminal) return;
  
  // Create system info data
  const systemInfo = {
    user: "phal",
    hostname: "portfolio.dev"
  };

  const skills = [
    "JavaScript",
    "Python", 
    "Django",
    "Refine",
    "React",
    "Node.js",
    "TypeScript",
 
  ];

  const personalInfo = [
    "Born: Cambodia",
    "Date of Birth: May 02, 2004",
    "Language: Khmer (Native), English",
    "Education: Watbo Primary School, 10 January High School, Angkor University (Computer Science, Bachelor Degree)",
    "Role: Full Stack Developer", 
    "Hobby: Working out at home, Singing",
    "Interest: Gaming (RDR2 my favorite)",
    "Fuel: Coffee (lots of it)",
    "Goal: Building awesome things"
  ];

  // Add terminal header with Oh My Posh style
  terminal.innerHTML = `
    <div class='terminal-header'>
      <span class='terminal-dot red'></span>
      <span class='terminal-dot yellow'></span>
      <span class='terminal-dot green'></span>
      <span class='terminal-title'>Interactive Terminal v2.1.0</span>
    </div>
    <div class='terminal-body'></div>
  `;
  
  const body = terminal.querySelector('.terminal-body');
  
  // Create the initial input line inside the body
  const inputLine = document.createElement('div');
  inputLine.className = 'terminal-input-line';
  inputLine.innerHTML = `
    <span class='terminal-prompt'>${systemInfo.user}@${systemInfo.hostname} ~ $ </span>
    <input type='text' class='terminal-input' autocomplete='off'>
  `;
  
  body.appendChild(inputLine);
  
  const input = inputLine.querySelector('.terminal-input');
  
  // Available commands
  const commands = {
    'help': () => {
      return `Available commands:
  help     - Show this help message
  whoami   - Show current user
  skills   - Display skills
  info     - Display personal information
  clear    - Clear terminal
  about    - Show about information`;
    },
    
    'whoami': () => {
      return 'Phal Chanouksa';
    },
    
    'skills': () => {
      return `Loading skills matrix...
[${skills.map(skill => `"${skill}"`).join(', ')}];`;
    },
    
    'info': () => {
      return `Loading personal information...
${personalInfo.map(info => `  ${info}`).join('\n')}`;
    },
    
    'clear': () => {
      body.innerHTML = '';
      return null; // Don't add output line
    },
    
    'about': () => {
      return `Welcome to ${systemInfo.user}@${systemInfo.hostname}

I'm a Full Stack Developer passionate about creating amazing web experiences.
This terminal is part of my portfolio website.

Type "help" to see available commands.`;
    }
  };

  function addLine(content, type = 'output') {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}-line`;
    
    if (type === 'command') {
      line.innerHTML = `<span class='terminal-prompt'>$</span> <span class='command-text'>${content}</span>`;
    } else {
      line.innerHTML = `<span class='output-text'>${content}</span>`;
    }
    
    // Insert before the current input line
    const currentInputLine = body.querySelector('.terminal-input-line');
    if (currentInputLine) {
      body.insertBefore(line, currentInputLine);
    } else {
      body.appendChild(line);
    }
    
    // Auto-scroll to show the new content
    body.scrollTop = body.scrollHeight;
  }

  function processCommand(cmd) {
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    // Add command to terminal
    addLine(cmd, 'command');
    
    // Process command
    if (commands[command]) {
      const result = commands[command](args);
      if (result !== null) {
        addLine(result);
      }
    } else if (command) {
      addLine(`Command not found: ${command}. Type "help" for available commands.`);
    }
    
    // Create new input line
    createNewInputLine();
  }
  
  function createNewInputLine() {
    // Remove the old input line
    const oldInputLine = body.querySelector('.terminal-input-line');
    if (oldInputLine) {
      oldInputLine.remove();
    }
    
    // Create new input line
    const inputLine = document.createElement('div');
    inputLine.className = 'terminal-input-line';
    inputLine.innerHTML = `
      <span class='terminal-prompt'>${systemInfo.user}@${systemInfo.hostname} ~ $ </span>
      <input type='text' class='terminal-input' autocomplete='off'>
    `;
    
    body.appendChild(inputLine);
    
    // Update references
    const newInput = inputLine.querySelector('.terminal-input');
    
    // Set up event listeners for new input
    newInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = newInput.value.trim();
        if (cmd) {
          processCommand(cmd);
        }
      }
    });
    
    // Focus the new input
    newInput.focus();
    
    // Scroll to bottom to show the new input line
    body.scrollTop = body.scrollHeight;
    
    // Update global references
    input = newInput;
  }

  // Handle input for initial input line
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      if (cmd) {
        processCommand(cmd);
      }
    }
  });

  // Focus input on terminal click
  terminal.addEventListener('click', () => {
    const currentInput = terminal.querySelector('.terminal-input');
    if (currentInput) {
      currentInput.focus();
    }
  });



  // Initial focus
  input.focus();
  
  // Show welcome message
  setTimeout(() => {
    addLine('Welcome to Interactive Terminal v2.1.0');
    addLine('Type "help" to see available commands.');
    addLine('');
  }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
  startInteractiveTerminal();
});

// ===== INITIALIZATION FUNCTIONS =====

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            navigateToPage(targetPage);
        });
    });
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        }
    });
}

function initAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.hero-content, .about-content, .project-card, .blog-card');
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('fade-in');
    });
    

}

function initGlitchEffects() {
    // Add random glitch effects to elements
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
        // Random glitch timing
        setInterval(() => {
            if (Math.random() < 0.13) { // 13% chance every interval
                element.classList.add('random-glitch');
                // Subtle color flicker
                if (Math.random() < 0.25) {
                    element.style.color = ['#fff', '#f0f', '#0ff', '#ff0', '#0f0'][Math.floor(Math.random()*5)];
                }
                // Subtle position jitter
                if (Math.random() < 0.25) {
                    element.style.transform = `translate(${(Math.random()*2-1).toFixed(1)}px, ${(Math.random()*2-1).toFixed(1)}px)`;
                }
                // Subtle text-shadow flicker
                if (Math.random() < 0.5) {
                    element.style.textShadow = '2px 0 #f0f, -2px 0 #ff0, 0 2px #0f0, 0 -2px #f00';
                }
                setTimeout(() => {
                    element.classList.remove('random-glitch');
                    element.style.color = '';
                    element.style.transform = '';
                    element.style.textShadow = '';
                }, 120 + Math.random()*80);
            }
        }, 1800);
    });
}

function initBlogFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter blog cards
            blogCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('fade-in');
                }
            });
        });
    });
}

function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    function switchWord() {
        if (typingIndex < typingWords.length) {
            const currentWord = typingWords[typingIndex];
            glitchText(typingElement, () => {
                typingElement.textContent = currentWord;
                setTimeout(() => {
                    typingIndex = (typingIndex + 1) % typingWords.length;
                    setTimeout(switchWord, 1800);
                }, 1200);
            }, currentWord);
        }
    }
    setTimeout(switchWord, 1000);
}

function typeText(element, text, callback) {
    let index = 0;
    element.textContent = '';
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        } else {
            if (callback) callback();
        }
    }
    type();
}

function glitchText(element, callback, nextWord) {
    const originalText = nextWord || element.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let frame = 0;
    const maxFrames = 10;
    function glitchFrame() {
        let glitched = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.5) {
                glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitched += originalText[i] || '';
            }
        }
        element.textContent = glitched;
        frame++;
        if (frame < maxFrames) {
            setTimeout(glitchFrame, 40);
        } else {
            if (callback) callback();
        }
    }
    glitchFrame();
}

function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    scrollElements.forEach(el => observer.observe(el));
}

function initMatrixEffect() {
    const matrixContainer = document.querySelector('.code-matrix');
    if (!matrixContainer) return;
    
    // Create multiple falling characters for more intense effect
    function createMatrixCharacter() {
        // Create multiple characters at once
        for (let i = 0; i < 3; i++) {
            const char = document.createElement('div');
            char.textContent = Math.random() > 0.5 ? '1' : '0';
            char.style.position = 'absolute';
            char.style.left = Math.random() * 100 + '%';
            char.style.top = '-20px';
            char.style.color = 'var(--primary-color)';
            char.style.fontSize = Math.random() * 18 + 8 + 'px';
            char.style.opacity = Math.random() * 0.7 + 0.3;
            char.style.animation = `matrix-fall ${Math.random() * 4 + 1.5}s linear`;
            char.style.zIndex = Math.floor(Math.random() * 10);
            
            matrixContainer.appendChild(char);
            
            // Remove character after animation
            setTimeout(() => {
                if (char.parentNode) {
                    char.parentNode.removeChild(char);
                }
            }, 5500);
        }
    }
    
    // Create characters more frequently
    setInterval(createMatrixCharacter, 50);
    
    // Additional burst of characters every few seconds
    setInterval(() => {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const char = document.createElement('div');
                char.textContent = Math.random() > 0.5 ? '1' : '0';
                char.style.position = 'absolute';
                char.style.left = Math.random() * 100 + '%';
                char.style.top = '-20px';
                char.style.color = 'var(--primary-color)';
                char.style.fontSize = Math.random() * 16 + 10 + 'px';
                char.style.opacity = Math.random() * 0.8 + 0.2;
                char.style.animation = `matrix-fall ${Math.random() * 3 + 2}s linear`;
                
                matrixContainer.appendChild(char);
                
                setTimeout(() => {
                    if (char.parentNode) {
                        char.parentNode.removeChild(char);
                    }
                }, 5000);
            }, i * 100);
        }
    }, 3000);
}

function initMatrixBackground() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Matrix rain configuration
    const fontSize = 12;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);
    const dropSpeeds = Array(columns).fill(0).map(() => Math.random() * 2 + 0.5);
    const dropChars = Array(columns).fill(0).map(() => Math.random() > 0.5 ? '1' : '0');
    const dropOpacities = Array(columns).fill(0).map(() => Math.random() * 0.8 + 0.2);
    
    // Handle window resize
    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    
    function drawMatrix() {
        // Clear canvas with fade effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, width, height);
        
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            // Draw multiple characters per column for more density
            for (let j = 0; j < 4; j++) {
                const y = (drops[i] - j * 15) * fontSize;
                if (y > 0 && y < height) {
                    // Vary opacity for depth effect
                    const opacity = Math.max(0.1, dropOpacities[i] - (j * 0.2));
                    ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
                    
                    // Randomly change characters
                    if (Math.random() < 0.05) {
                        dropChars[i] = Math.random() > 0.5 ? '1' : '0';
                    }
                    
                    ctx.fillText(dropChars[i], i * fontSize, y);
                }
            }
            
            // Reset drop when it goes off screen
            if (drops[i] * fontSize > height + 80) {
                drops[i] = 0;
                dropSpeeds[i] = Math.random() * 2 + 0.5;
                dropChars[i] = Math.random() > 0.5 ? '1' : '0';
                dropOpacities[i] = Math.random() * 0.8 + 0.2;
            }
            
            drops[i] += dropSpeeds[i] * 0.1;
        }
    }
    
    // Start the animation
    setInterval(drawMatrix, 40);
}



// ===== PAGE NAVIGATION =====

function navigateToPage(pageName) {
    const currentPageElement = document.querySelector(`#${currentPage}`);
    const targetPageElement = document.querySelector(`#${pageName}`);
    const navLinks = document.querySelectorAll('.nav-link');
    if (!targetPageElement) return;
    // Update navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });
    // Matrix glitch overlay effect
    const glitchOverlay = document.createElement('div');
    glitchOverlay.className = 'matrix-glitch-overlay';
    document.body.appendChild(glitchOverlay);
    setTimeout(() => {
        glitchOverlay.remove();
        if (currentPageElement) {
            currentPageElement.classList.remove('active');
        }
        targetPageElement.classList.add('active');
        currentPage = pageName;
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 330);
}

// ===== UTILITY FUNCTIONS =====

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function openContact() {
    // Simple contact modal or redirect
    alert('Contact functionality would be implemented here!\nEmail: hello@glitchcoder.dev');
}

function showLoadingAnimation(callback) {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-background">
            <canvas id="loading-matrix"></canvas>
            <div class="loading-overlay"></div>
        </div>
        <div class="loading-content">
            <div class="loading-logo">
                <span class="glitch-text" data-text="GLITCH">Ouksa</span>
                <span class="logo-subtitle">Portfolio</span>
            </div>
            <div class="loading-terminal">
                <div class="terminal-header">
                    <span class="terminal-dot red"></span>
                    <span class="terminal-dot yellow"></span>
                    <span class="terminal-dot green"></span>
                    <span class="terminal-title">System Initialization</span>
                </div>
                <div class="terminal-body" id="loading-terminal-body">
                    <div class="terminal-line">
                        <span class="terminal-prompt">$</span>
                        <span class="command-text">./initialize_portfolio.sh</span>
                    </div>
                </div>
            </div>
            <div class="loading-progress">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <div class="progress-text">0%</div>
            </div>
        </div>
    `;
    
    // Add enhanced loading screen styles
    const style = document.createElement('style');
    style.textContent = `
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--background-dark);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.8s ease;
        }
        
        .loading-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        
        #loading-matrix {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.3;
        }
        
        .loading-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, rgba(0,255,65,0.1) 0%, transparent 70%);
        }
        
        .loading-content {
            position: relative;
            z-index: 2;
            text-align: center;
            color: var(--primary-color);
            max-width: 600px;
            width: 90%;
        }
        
        .loading-logo {
            margin-bottom: 40px;
            font-family: var(--font-primary);
            font-size: 3rem;
            font-weight: 900;
            color: #00ff41;
            letter-spacing: 4px;
            text-shadow: 0 0 20px #00ff41, 0 0 40px #00ff41;
        }
        
        .loading-logo .logo-subtitle {
            display: block;
            font-size: 1rem;
            color: #7fd0ff;
            letter-spacing: 2px;
            margin-top: 10px;
            text-shadow: 0 0 10px #0080ff;
        }
        
        .loading-terminal {
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid #00ff41;
            border-radius: 8px;
            margin-bottom: 30px;
            font-family: 'Share Tech Mono', monospace;
            overflow: hidden;
        }
        
        .loading-terminal .terminal-header {
            background: rgba(0, 255, 65, 0.1);
            padding: 10px 15px;
            display: flex;
            align-items: center;
            gap: 8px;
            border-bottom: 1px solid #00ff41;
        }
        
        .loading-terminal .terminal-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }
        
        .loading-terminal .terminal-dot.red { background: #ff5f56; }
        .loading-terminal .terminal-dot.yellow { background: #ffbd2e; }
        .loading-terminal .terminal-dot.green { background: #27c93f; }
        
        .loading-terminal .terminal-title {
            color: #00ff41;
            font-size: 0.9rem;
            margin-left: 10px;
        }
        
        .loading-terminal .terminal-body {
            padding: 20px;
            max-height: 200px;
            overflow-y: auto;
        }
        
        .loading-terminal .terminal-line {
            margin-bottom: 8px;
            font-size: 0.9rem;
        }
        
        .loading-terminal .terminal-prompt {
            color: #00ff41;
            margin-right: 8px;
        }
        
        .loading-terminal .command-text {
            color: #ffffff;
        }
        
        .loading-terminal .output-text {
            color: #7fd0ff;
            margin-left: 20px;
        }
        
        .loading-progress {
            display: flex;
            align-items: center;
            gap: 20px;
            justify-content: center;
        }
        
        .progress-bar {
            width: 300px;
            height: 6px;
            background: rgba(0, 255, 65, 0.2);
            border-radius: 3px;
            overflow: hidden;
            border: 1px solid #00ff41;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #00ff41, #00ffff);
            width: 0%;
            transition: width 0.3s ease;
            box-shadow: 0 0 10px #00ff41;
        }
        
        .progress-text {
            color: #00ff41;
            font-family: var(--font-primary);
            font-size: 1.2rem;
            min-width: 50px;
        }
        
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
        
        .glitch-text {
            position: relative;
        }
        
        .glitch-text::before,
        .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        .glitch-text::before {
            animation: glitch 0.3s infinite;
            color: #ff0080;
            z-index: -1;
        }
        
        .glitch-text::after {
            animation: glitch 0.3s infinite reverse;
            color: #0080ff;
            z-index: -2;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(loadingScreen);
    
    // Initialize loading matrix background
    const canvas = document.getElementById('loading-matrix');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);
    
    function drawLoadingMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, width, height);
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const y = drops[i] * fontSize;
            if (y > 0 && y < height) {
                ctx.fillStyle = `rgba(0, 255, 65, ${Math.random() * 0.8 + 0.2})`;
                ctx.fillText(Math.random() > 0.5 ? '1' : '0', i * fontSize, y);
            }
            
            if (drops[i] * fontSize > height + 20) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const matrixInterval = setInterval(drawLoadingMatrix, 50);
    
    // Loading sequence
    const terminalBody = document.getElementById('loading-terminal-body');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    const loadingSteps = [
        { text: 'Checking system requirements...', delay: 200, progress: 15 },
        { text: 'Loading core modules...', delay: 300, progress: 35 },
        { text: 'Initializing matrix background...', delay: 250, progress: 55 },
        { text: 'Setting up glitch effects...', delay: 300, progress: 75 },
        { text: 'Configuring terminal interface...', delay: 250, progress: 90 },
        { text: 'Loading project data...', delay: 200, progress: 95 },
        { text: 'System ready. Welcome to the matrix.', delay: 200, progress: 100 }
    ];
    
    let currentStep = 0;
    
    function addLoadingStep() {
        if (currentStep >= loadingSteps.length) {
            // Loading complete
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                clearInterval(matrixInterval);
                setTimeout(() => {
                    document.body.removeChild(loadingScreen);
                    if (typeof callback === 'function') callback();
                }, 400);
            }, 500);
            return;
        }
        
        const step = loadingSteps[currentStep];
        
        setTimeout(() => {
            // Add output line
            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-line';
            outputLine.innerHTML = `<span class="output-text">${step.text}</span>`;
            terminalBody.appendChild(outputLine);
            
            // Update progress
            progressFill.style.width = step.progress + '%';
            progressText.textContent = step.progress + '%';
            
            // Scroll to bottom
            terminalBody.scrollTop = terminalBody.scrollHeight;
            
            currentStep++;
            addLoadingStep();
        }, step.delay);
    }
    
    // Start loading sequence
    setTimeout(addLoadingStep, 500);
}

// ===== ERROR HANDLING =====

window.addEventListener('error', function(e) {
    console.error('🚨 Error:', e.error);
    // Add error handling logic here
});

// ===== PERFORMANCE OPTIMIZATION =====

// Debounce function for scroll events
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

// Throttle function for frequent events
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

// ===== EXPORT FUNCTIONS =====

// Make functions available globally
window.scrollToSection = scrollToSection;
window.openContact = openContact;
window.navigateToPage = navigateToPage; 