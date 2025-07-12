// ===== BLOG JAVASCRIPT =====

class BlogManager {
    constructor() {
        this.blogCards = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.blogData = [];
        this.init();
    }

    async init() {
        await this.loadBlogData();
        this.renderDynamicFilters();
        this.setupFilters();
        this.setupSearch();
        this.setupPagination();
        this.bindEvents();
        this.initBlogAnimations();
    }

    async loadBlogData() {
        // Fetch blog metadata from index.json
        try {
            const res = await fetch('blog/index.json');
            this.blogData = await res.json();
        } catch (e) {
            this.blogData = [];
        }
        this.renderBlogCards();
    }

    renderBlogCards() {
        const blogGrid = document.querySelector('.blog-grid');
        if (!blogGrid) return;
        blogGrid.innerHTML = '';
        const filteredData = this.getFilteredData();
        filteredData.forEach((post, index) => {
            const card = this.createBlogCard(post, index);
            blogGrid.appendChild(card);
        });
        this.updateCardCount(filteredData.length);
        this.animateNewCards();
    }

    createBlogCard(post, index) {
        const card = document.createElement('article');
        card.className = 'blog-card animate-on-scroll';
        card.setAttribute('data-category', post.category);
        card.setAttribute('data-id', post.filename);
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">${this.formatDate(post.date)}</span>
                    <span class="blog-category">${post.category.toUpperCase()}</span>
                    <span class="blog-read-time">${post.readTime ? post.readTime : ''}</span>
                </div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-tags">
                    ${(post.tags||[]).map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                </div>
                <a href="#" class="blog-link" data-post-id="${post.filename}">READ MORE →</a>
            </div>
        `;
        // Fix: Add click handler for the 'READ MORE' link
        card.querySelector('.blog-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.openBlogPost(post.filename);
        });
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('blog-link')) {
                this.openBlogPost(post.filename);
            }
        });
        return card;
    }

    getFilteredData() {
        let filtered = this.blogData;
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(post => post.category === this.currentFilter);
        }
        if (this.searchTerm) {
            const searchLower = this.searchTerm.toLowerCase();
            filtered = filtered.filter(post => 
                post.title.toLowerCase().includes(searchLower) ||
                post.excerpt.toLowerCase().includes(searchLower) ||
                (post.tags||[]).some(tag => tag.toLowerCase().includes(searchLower))
            );
        }
        return filtered;
    }

    renderDynamicFilters() {
        const blogFilters = document.querySelector('.blog-filters');
        if (!blogFilters) return;
        // Get unique categories from blogData
        const categories = Array.from(new Set(this.blogData.map(post => post.category)));
        // Always include 'all' at the start
        const allCategories = ['all', ...categories.filter(cat => cat && cat.toLowerCase() !== 'all')];
        blogFilters.innerHTML = allCategories.map(cat => `
            <button class="filter-btn${cat === 'all' ? ' active' : ''}" data-filter="${cat}">${cat.toUpperCase()}</button>
        `).join('');
    }

    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                this.setFilter(filter);
            });
        });
    }

    setFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('active');
            }
        });
        this.renderBlogCards();
    }

    setupSearch() {
        let searchContainer = document.querySelector('.blog-search');
        if (!searchContainer) {
            searchContainer = document.createElement('div');
            searchContainer.className = 'blog-search';
            searchContainer.innerHTML = `
                <input type="text" placeholder="Search posts..." class="search-input">
                <button class="search-btn">🔍</button>
            `;
            const blogHeader = document.querySelector('.blog-header');
            if (blogHeader) {
                blogHeader.appendChild(searchContainer);
            }
        }
        const searchInput = searchContainer.querySelector('.search-input');
        const searchBtn = searchContainer.querySelector('.search-btn');
        searchInput.addEventListener('input', debounce((e) => {
            this.searchTerm = e.target.value;
            this.renderBlogCards();
        }, 300));
        searchBtn.addEventListener('click', () => {
            this.searchTerm = searchInput.value;
            this.renderBlogCards();
        });
    }

    async openBlogPost(filename) {
        const post = this.blogData.find(p => p.filename === filename);
        if (!post) return;
        let markdown = '';
        try {
            const res = await fetch(`blog/${filename}`);
            markdown = await res.text();
        } catch (e) {
            markdown = '# Error\nCould not load blog post.';
        }
        // Parse frontmatter and content
        let content = markdown;
        let meta = {};
        if (markdown.startsWith('---')) {
            const end = markdown.indexOf('---', 3);
            if (end !== -1) {
                const yaml = markdown.substring(3, end).trim();
                content = markdown.substring(end + 3).trim();
                meta = this.parseYAML(yaml);
            }
        }
        // Render markdown to HTML
        const html = window.marked ? window.marked.parse(content) : content;
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'blog-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">×</button>
                <div class="modal-header">
                    <div class="modal-meta">
                        <span class="modal-category">${post.category.toUpperCase()}</span>
                        <span class="modal-date">${this.formatDate(post.date)}</span>
                    </div>
                    <h2 class="modal-title">${post.title}</h2>
                </div>
                <div class="modal-body blog-content">${html}</div>
                <div class="modal-tags">
                    ${(post.tags||[]).map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .blog-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; display: flex; align-items: center; justify-content: center; }
            .modal-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(5px); }
            .modal-content { position: relative; background: var(--background-light); border: 1px solid var(--primary-color); border-radius: 10px; padding: 30px; max-width: 800px; max-height: 80vh; overflow-y: auto; margin: 20px; animation: modal-glitch-in 0.5s cubic-bezier(.25,1.7,.5,.7); }
            .modal-close { position: absolute; top: 15px; right: 20px; background: none; border: none; color: var(--text-primary); font-size: 2rem; cursor: pointer; transition: var(--transition-fast); }
            .modal-close:hover { color: var(--primary-color); }
            .modal-header { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(0, 255, 65, 0.2); }
            .modal-meta { display: flex; gap: 15px; margin-bottom: 10px; font-size: 0.9rem; color: var(--text-muted); }
            .modal-title { color: var(--primary-color); margin: 0; }
            .modal-body { line-height: 1.8; }
            .modal-body p { font-size: 1.25rem; }
            .modal-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
            .modal-tag { background: rgba(0, 255, 65, 0.1); border: 1px solid var(--primary-color); padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; color: var(--primary-color); }
            @keyframes modal-glitch-in { 0% { opacity: 0; transform: scale(0.95) skewX(0deg) translateX(0); filter: blur(2px); box-shadow: 0 0 0 #00ff41, 0 0 0 #fff; } 10% { opacity: 1; transform: scale(1.05) skewX(-8deg) translateX(-8px); filter: blur(1.5px); box-shadow: 2px 0 8px #00ff41, -2px 0 8px #fff; } 20% { transform: scale(1.02) skewX(8deg) translateX(8px); filter: blur(1px); box-shadow: -2px 0 8px #00ff41, 2px 0 8px #fff; } 30% { transform: scale(0.98) skewX(-4deg) translateX(-4px); filter: blur(0.5px); box-shadow: 1px 0 4px #00ff41, -1px 0 4px #fff; } 40% { transform: scale(1.01) skewX(4deg) translateX(4px); filter: blur(0.5px); box-shadow: -1px 0 4px #00ff41, 1px 0 4px #fff; } 50% { transform: scale(1) skewX(0deg) translateX(0); filter: blur(0); box-shadow: 0 0 0 #00ff41, 0 0 0 #fff; } 100% { opacity: 1; transform: scale(1) skewX(0deg) translateX(0); filter: none; box-shadow: none; } }
        `;
        document.head.appendChild(style);
        document.body.appendChild(modal);
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeBlogPost();
            if (window.BreadcrumbNavInstance) window.BreadcrumbNavInstance.updateBreadcrumbs();
        });
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            this.closeBlogPost();
            if (window.BreadcrumbNavInstance) window.BreadcrumbNavInstance.updateBreadcrumbs();
        });
        document.body.style.overflow = 'hidden';
        if (window.BreadcrumbNavInstance) window.BreadcrumbNavInstance.updateBreadcrumbs();
    }

    closeBlogPost() {
        const modal = document.querySelector('.blog-modal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
            if (window.BreadcrumbNavInstance) window.BreadcrumbNavInstance.updateBreadcrumbs();
        }
    }

    initBlogAnimations() {
        // Add hover effects to blog cards
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.blog-card')) {
                const card = e.target.closest('.blog-card');
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 30px rgba(0, 255, 65, 0.2)';
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.blog-card')) {
                const card = e.target.closest('.blog-card');
                card.style.transform = '';
                card.style.boxShadow = '';
            }
        });
    }

    animateNewCards() {
        const cards = document.querySelectorAll('.blog-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    updateCardCount(count) {
        // Update any card count display
        const countElement = document.querySelector('.blog-count');
        if (countElement) {
            countElement.textContent = `${count} post${count !== 1 ? 's' : ''}`;
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    parseYAML(yaml) {
        // Simple YAML frontmatter parser for key: value pairs and arrays
        const obj = {};
        yaml.split('\n').forEach(line => {
            const match = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
            if (match) {
                let key = match[1];
                let value = match[2];
                if (value.startsWith('[') && value.endsWith(']')) {
                    // Array
                    value = value.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
                }
                obj[key] = value;
            }
        });
        return obj;
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

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
}); 