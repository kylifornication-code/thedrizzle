---
hide:
  - toc
  - navigation
---

<div class="modern-homepage">
  <!-- Hero Section -->
  <section class="hero-section">
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title">Welcome to The Drizzle</h1>
        <p class="hero-subtitle">Personal Stories from the PNW</p>
        <p class="hero-description">I'm KJ, a passionate technologist that loves building stuff. This is my digital space where I share my operating system — how I think and work.</p>
        <div class="hero-buttons">
          <a href="aboutme" class="btn btn-primary">About Me</a>
          <a href="projects" class="btn btn-secondary">My Projects</a>
        </div>
      </div>
      <div class="hero-image">
        <img src="img/drizzle-hero.png" alt="The Drizzle Hero" class="hero-img">
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section class="about-section">
    <div class="container">
      <h2>What I Do</h2>
      <div class="about-grid">
        <div class="about-card">
          <div class="card-icon">🚀</div>
          <h3>Product & Engineering</h3>
          <p>I've worked in Product, Engineering, and Security. I'm at my happiest when I'm building things and solving complex problems.</p>
        </div>
        <div class="about-card">
          <div class="card-icon">🖨️</div>
          <h3>3D Printing & Innovation</h3>
          <p>You'll find me constantly 3D printing and writing into my phone, scribbling down thoughts and ideas for the next big thing.</p>
        </div>
        <div class="about-card">
          <div class="card-icon">👨‍👩‍👧‍👦</div>
          <h3>Family First</h3>
          <p>I'm a dad, husband, brother, and my family is important to me. They're the foundation of everything I do.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Blog Preview Section -->
  <section class="blog-section">
    <div class="container">
      <h2>Latest Thoughts</h2>
      <p class="section-description">This site serves as a portfolio of my work, showcasing my current projects and providing a platform for my thoughts and ideas.</p>
      <div class="blog-actions">
        <a href="blog" class="btn btn-outline">Read My Blog</a>
        <a href="projects" class="btn btn-outline">View Projects</a>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="contact-section">
    <div class="container">
      <h2>Let's Connect</h2>
      <p>Have a project in mind or just want to chat? I'd love to hear from you!</p>
      <div class="contact-form">
        <div class="form-container">
          <script src="https://www.cognitoforms.com/f/seamless.js" data-key="JyxLnYwMIUSwUYewiHQ4jQ" data-form="1"></script>
        </div>
      </div>
    </div>
  </section>
</div>

<style>

/* Modern Homepage Styles */
.modern-homepage {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #e2e8f0;
}

/* Hero Section */
.hero-section {
  padding: 1rem 1rem;
  min-height: 80vh;
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 2px solid #334155;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-text {
  animation: fadeInUp 0s ease-out;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #60a5fa, #34d399, #fbbf24);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #94a3b8;
  margin-bottom: 1.5rem;
  font-weight: 300;
}

.hero-description {
  font-size: 1.125rem;
  color: #cbd5e1;
  margin-bottom: 2.5rem;
  max-width: 500px;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 0.875rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
  background: transparent;
  color: #60a5fa;
  border-color: #60a5fa;
}

.btn-secondary:hover {
  background: #60a5fa;
  color: #0f172a;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: #94a3b8;
  border-color: #475569;
}

.btn-outline:hover {
  background: #475569;
  color: white;
  transform: translateY(-2px);
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeInRight 0s ease-out 0.3s both;
}

.hero-img {
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transition: transform 0.1s ease;
}

.hero-img:hover {
  transform: scale(1.05);
}

/* About Section */
.about-section {
  padding: 2.5rem 2rem;
  border-bottom: 2px solid #334155;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.about-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  color: #f1f5f9;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.about-card {
  background: transparent;
  padding: 2.5rem;
  border-radius: 1rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #334155;
}

.about-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.about-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #f1f5f9;
}

.about-card p {
  color: #94a3b8;
  line-height: 1.6;
}

/* Blog Section */
.blog-section {
  padding: 2.5rem 2rem;
  border-bottom: 2px solid #334155;
}

.blog-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  color: #f1f5f9;
}

.section-description {
  text-align: center;
  font-size: 1.125rem;
  color: #94a3b8;
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.blog-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Contact Section */
.contact-section {
  padding: 2.5rem 2rem;
}

.contact-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #f1f5f9;
}

.contact-section p {
  text-align: center;
  color: #94a3b8;
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
}

.contact-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-container {
  background: transparent;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid #334155;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .about-grid {
    grid-template-columns: 1fr;
  }
  
  .blog-actions {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 1rem 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .about-section,
  .blog-section,
  .contact-section {
    padding: 1.5rem 1rem;
  }
}
</style>

<script>
// Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  // Add intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards for animation
  document.querySelectorAll('.about-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });

  // Add hover effects for buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});
</script>

