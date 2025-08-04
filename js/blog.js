// Blog functionality for dynamic markdown loading
class BlogManager {
    constructor() {
        this.posts = [
            {
                id: '1firstblogpost',
                title: 'Testing my first blog post',
                date: '2025-08-04',
                excerpt: 'This is my first blog post',
                file: '1firstblogpost.md'
            },
        ];
        this.modal = null;
        this.init();
    }

    init() {
        // Setup modal
        this.setupModal();
        
        // Load blog posts based on current page
        if (window.location.pathname.includes('blog.html')) {
            this.loadAllPosts();
        } else {
            this.loadLatestPosts();
        }
    }

    setupModal() {
        this.modal = document.getElementById('blog-modal');
        const closeBtn = document.getElementById('modal-close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        if (this.modal) {
            // Close modal when clicking outside
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
            
            // Close modal with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                    this.closeModal();
                }
            });
        }
    }

    async loadLatestPosts() {
        const container = document.getElementById('blog-posts-container');
        if (!container) return;

        // Show only the 2 most recent posts on home page
        const latestPosts = this.posts.slice(0, 2);
        
        for (const post of latestPosts) {
            const postElement = this.createPostPreview(post);
            container.appendChild(postElement);
        }
    }

    async loadAllPosts() {
        const container = document.getElementById('all-posts-container');
        if (!container) return;

        for (const post of this.posts) {
            const postElement = this.createPostCard(post);
            container.appendChild(postElement);
        }
    }

    createPostPreview(post) {
        const article = document.createElement('article');
        article.className = 'blog-post-preview';
        
        article.innerHTML = `
            <div class="y2k-window blog-card">
                <div class="window-content">
                    <div class="post-meta">
                        <time datetime="${post.date}">${this.formatDate(post.date)}</time>
                    </div>
                    <h3>${post.title}</h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <button class="read-more">Read More →</button>
                </div>
            </div>
        `;

        // Add click handler for opening modal
        const readButton = article.querySelector('.read-more');
        readButton.addEventListener('click', () => this.openModal(post));

        return article;
    }

    createPostCard(post) {
        const article = document.createElement('article');
        article.className = 'blog-post-card';
        article.id = post.id;
        
        article.innerHTML = `
            <div class="y2k-window blog-card">
                <div class="window-content">
                    <div class="post-meta">
                        <time datetime="${post.date}">${this.formatDate(post.date)}</time>
                    </div>
                    <h2>${post.title}</h2>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <button class="read-full-post" data-post="${post.file}">Read Full Post</button>
                </div>
            </div>
        `;

        // Add click handler for opening modal
        const readButton = article.querySelector('.read-full-post');
        readButton.addEventListener('click', () => this.openModal(post));

        return article;
    }

    async openModal(post) {
        if (!this.modal) return;
        
        try {
            // Set modal title and meta
            document.getElementById('modal-title').textContent = post.title;
            document.getElementById('modal-meta').textContent = this.formatDate(post.date);
            
            // Load and set content
            const content = await this.fetchPostContent(post.file);
            document.getElementById('modal-content').innerHTML = content;
            
            // Show modal
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
            
        } catch (error) {
            console.error('Error loading post:', error);
            document.getElementById('modal-content').innerHTML = '<p class="error">Sorry, could not load the full post content.</p>';
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeModal() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    }

    async fetchPostContent(filename) {
        try {
            const response = await fetch(`blog/posts/${filename}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();
            // Basic markdown to HTML conversion
            return markdown
                .replace(/^---\n[\s\S]*?---\n/, '') // Remove front matter
                .replace(/^# (.*)/gm, '<h2>$1</h2>')
                .replace(/^## (.*)/gm, '<h3>$1</h3>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br>');
        } catch (error) {
            console.error(`Error fetching post content for ${filename}:`, error);
            return '<p class="error">Failed to load post. Please try again later.</p>';
        }
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
}

// Initialize blog manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
});

// Handle hash navigation for blog posts
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const element = document.getElementById(hash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
