import React, {useEffect, useRef, useCallback} from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SocialIcon from '@site/src/components/SocialIcon';
import SubscriptionForm from '@site/src/components/SubscriptionForm';
import styles from './index.module.css';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observedCardsRef = useRef<Set<Element>>(new Set());

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).style.display = 'none';
  }, []);

  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const placeholder = (e.target as HTMLImageElement).parentElement?.querySelector(`.${styles.imagePlaceholder}`);
    if (placeholder) {
      (placeholder as HTMLElement).style.display = 'none';
    }
  }, []);

  useEffect(() => {
    // Create observer once and reuse
    if (observerRef.current) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          // Batch DOM updates using requestAnimationFrame
          requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          });
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all cards for animation
    const cards = document.querySelectorAll('.about-card');
    cards.forEach(card => {
      const cardElement = card as HTMLElement;
      // Set initial state
      cardElement.style.opacity = '0';
      cardElement.style.transform = 'translateY(20px)';
      cardElement.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      observerRef.current?.observe(card);
      observedCardsRef.current.add(card);
    });

    return () => {
      // Cleanup observer
      if (observerRef.current) {
        observedCardsRef.current.forEach(card => {
          observerRef.current?.unobserve(card);
        });
        observerRef.current.disconnect();
        observerRef.current = null;
        observedCardsRef.current.clear();
      }
    };
  }, []);


  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Personal Stories from the PNW">
      <div className={styles.modernHomepage}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>Welcome to The Drizzle</h1>
              <p className={styles.heroSubtitle}>Personal Stories from the PNW</p>
              <p className={styles.heroDescription}>
                I'm KJ, a passionate technologist and maker. Every so often I'll give you a drizzle of content from the place where it's always raining. This is my digital space where I share my operating system — how I think and work. Like what I do and want to support me? <a href="https://buymeacoffee.com/kylifornication">Buy me a coffee!</a>
              </p>

              <div className={styles.heroButtons}>
                <a href="/aboutme" className={styles.btnPrimary}>About Me</a>
                <a href="/projects" className={styles.btnSecondary}>My Projects</a>
              </div>
            </div>
            <div className={styles.heroImage}>
              <div className={styles.imagePlaceholder}>
                <div className={styles.placeholderContent}>
                  <div className={styles.placeholderIcon}>🌧️</div>
                  <div className={styles.placeholderText}>Loading...</div>
                </div>
              </div>
              <img 
                src="/img/drizzle-hero.png" 
                alt="The Drizzle Hero" 
                className={styles.heroImg} 
                loading="eager" 
                width="500" 
                height="333"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className={styles.aboutSection}>
          <div className={styles.container}>
            <h2>What I Do</h2>
            <div className={styles.aboutGrid}>
              <div className={`${styles.aboutCard} about-card`}>
                <div className={styles.cardIcon}>🚀</div>
                <h3>Product & Engineering</h3>
                <p>I've worked in Product, Engineering, and Security. I'm at my happiest when I'm building things and solving complex problems.</p>
              </div>
              <div className={`${styles.aboutCard} about-card`}>
                <div className={styles.cardIcon}>🖨️</div>
                <h3>3D Printing & Innovation</h3>
                <p>You'll find me constantly 3D printing and writing into my phone, scribbling down thoughts and ideas for the next big thing.</p>
              </div>
              <div className={`${styles.aboutCard} about-card`}>
                <div className={styles.cardIcon}>👨‍👩‍👧‍👦</div>
                <h3>Family First</h3>
                <p>I'm a dad, husband, brother, and my family is important to me. They're the foundation of everything I do.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Preview Section */}
        <section className={styles.blogSection}>
          <div className={styles.container}>
            <h2>Latest Thoughts</h2>
            <p className={styles.sectionDescription}>
              This site serves as a portfolio of my work, showcasing my current projects and providing a platform for my thoughts and ideas.
            </p>
            <div className={styles.blogActions}>
              <a href="/blog" className={styles.btnOutline}>Read My Blog</a>
              <a href="/projects" className={styles.btnOutline}>View Projects</a>
            </div>
          </div>
        </section>

        {/* Newsletter Subscription Section */}
        <section className={styles.subscriptionSection}>
          <div className={styles.container}>
            <h2>Stay Updated</h2>
            <p className={styles.sectionDescription}>
              Subscribe to get notified when I publish new posts and updates.
            </p>
            <SubscriptionForm />
          </div>
        </section>

        {/* Contact Section */}
        <section className={styles.contactSection}>
          <div className={styles.container}>
            <h2>Let's Connect</h2>
            <p>Have a project in mind or just want to chat? I'd love to hear from you!</p>
            <div className={styles.contactForm}>
              <div className={styles.socialLinksContainer}>
                <a
                  href="https://github.com/kylifornication-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="GitHub"
                >
                  <SocialIcon platform="github" />
                </a>
                <a
                  href="https://gitlab.com/kylifornication"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="GitLab"
                >
                  <SocialIcon platform="gitlab" />
                </a>
                <a
                  href="https://www.linkedin.com/in/kylejamescwu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="LinkedIn"
                >
                  <SocialIcon platform="linkedin" />
                </a>
                <a
                  href="https://www.instagram.com/kylifornication/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Instagram"
                >
                  <SocialIcon platform="instagram" />
                </a>
                <a
                  href="https://www.youtube.com/@kylifornication11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="YouTube"
                >
                  <SocialIcon platform="youtube" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
