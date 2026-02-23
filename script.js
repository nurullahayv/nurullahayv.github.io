// ===== BLOG APPLICATION =====

const App = {
  posts: [],
  currentView: 'home',

  // Initialize the app
  async init() {
    await this.loadPosts();
    this.renderBlogCards();
    this.setupNavScroll();
    this.setupScrollReveal();
    this.setupSmoothScroll();
    this.handleRoute();
    window.addEventListener('popstate', () => this.handleRoute());
  },

  // Load posts from JSON
  async loadPosts() {
    try {
      const response = await fetch('posts.json');
      this.posts = await response.json();
      // Sort by date descending
      this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (e) {
      console.warn('Could not load posts.json, using inline data.');
      this.posts = [];
    }
  },

  // Format date to Turkish locale
  formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  // Render blog cards
  renderBlogCards() {
    const container = document.getElementById('blog-list');
    if (!container) return;

    container.innerHTML = this.posts.map((post, index) => `
      <article class="blog-card reveal reveal-delay-${(index % 4) + 1}" onclick="App.showPost('${post.id}')" role="button" tabindex="0">
        <div class="ticket-notch"></div>
        <div class="blog-card-inner">
          <div class="blog-card-meta">
            <span class="blog-card-date">${this.formatDate(post.date)}</span>
            ${post.tags ? post.tags.map(tag => `<span class="blog-card-tag">${tag}</span>`).join('') : ''}
          </div>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-excerpt">${post.excerpt}</p>
        </div>
        <span class="blog-card-arrow">→</span>
      </article>
    `).join('');

    // Re-observe new elements
    this.observeRevealElements();
  },

  // Show individual post
  showPost(postId) {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return;

    history.pushState({ postId }, '', `#post/${postId}`);
    this.renderPostDetail(post);
  },

  // Render post detail view
  renderPostDetail(post) {
    const mainContent = document.getElementById('main-content');
    const postDetail = document.getElementById('post-detail');

    mainContent.style.display = 'none';
    postDetail.innerHTML = `
      <div class="container page-transition">
        <button class="post-back" onclick="App.goHome()">
          ← Yazılara dön
        </button>
        <div class="post-detail-header">
          <div class="post-detail-date">${this.formatDate(post.date)}</div>
          <h1 class="post-detail-title">${post.title}</h1>
          ${post.tags ? `
            <div class="post-detail-tags">
              ${post.tags.map(tag => `<span class="blog-card-tag">${tag}</span>`).join('')}
            </div>
          ` : ''}
        </div>
        <div class="post-detail-content">
          ${post.content}
        </div>
      </div>
    `;
    postDetail.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Go back to home
  goHome() {
    history.pushState({}, '', window.location.pathname);
    const mainContent = document.getElementById('main-content');
    const postDetail = document.getElementById('post-detail');

    postDetail.classList.remove('active');
    postDetail.innerHTML = '';
    mainContent.style.display = '';

    this.currentView = 'home';
    this.observeRevealElements();
  },

  // Handle routes
  handleRoute() {
    const hash = window.location.hash;
    if (hash.startsWith('#post/')) {
      const postId = hash.replace('#post/', '');
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        this.renderPostDetail(post);
        return;
      }
    }
    this.goHome();
  },

  // Navbar scroll effect
  setupNavScroll() {
    const nav = document.querySelector('.nav');
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            nav.classList.add('scrolled');
          } else {
            nav.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  },

  // Intersection Observer for scroll reveals
  setupScrollReveal() {
    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    this.observeRevealElements();
  },

  // Observe/re-observe reveal elements
  observeRevealElements() {
    if (!this.revealObserver) return;
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      this.revealObserver.observe(el);
    });
  },

  // Smooth scroll for anchor links
  setupSmoothScroll() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link && !link.getAttribute('href').startsWith('#post/')) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  },

  // Scroll to blog section
  scrollToBlog() {
    const blog = document.getElementById('blog');
    if (blog) {
      blog.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

// Start the app
document.addEventListener('DOMContentLoaded', () => App.init());
