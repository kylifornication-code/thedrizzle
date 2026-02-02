import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './aboutme.module.css';

interface JobDetail {
  id: string;
  title: string;
  period: string;
  location: string;
  description: string;
  technologies?: string;
}

const jobDetails: Record<string, JobDetail> = {
  'tmpl-sr-manager': {
    id: 'tmpl-sr-manager',
    title: 'Sr Manager, Security Engineering Partnerships, Disney',
    period: 'Mar 2025 to Present',
    location: 'Greater Seattle Area',
    description: 'Leading security engineering partnerships and driving strategic initiatives across Disney\'s security landscape. Building bridges between security teams and engineering organizations to create more secure products and experiences.'
  },
  'tmpl-sr-staff-secmgr': {
    id: 'tmpl-sr-staff-secmgr',
    title: 'Sr Staff Security Engineer | Manager',
    period: 'Aug 2022 to Mar 2025 · 2 yrs 8 mos',
    location: 'Greater Seattle Area · Hybrid',
    description: 'Secure the magic, and make it easy for engineers to build security into our products and experiences. We approach security through an engineering lens. We produce and procure Disney\'s enterprise-wide secure development services and programs that focus on developer enablement. My teams\' goals are to make security a resume worthy accolade for developers.',
    technologies: 'Managed Sec Tools: Snyk SCA, Whitehat SAST & DAST, Edgescan, Checkmarx SAST, Tenable ASM, ArmorCode ASPM, and multiple micro-services.'
  },
  'tmpl-sr-software-prod-eng': {
    id: 'tmpl-sr-software-prod-eng',
    title: 'Sr Software Product Engineer, DevOps Platforms and Enablement, Disney',
    period: 'Sep 2021 to Dec 2022 · 1 yr 4 mos',
    location: 'Seattle, WA · Hybrid',
    description: 'The more products I took on, the more I realized my system for productizing products and teams worked within Disney! I collaborated and helped lead 4 functional engineering teams - ranging from products related to entitlements and billing automation, to the engineering tools I\'ve worked on for years.\n\nFocused on ecosystem strategy, incident response improvements, reducing spend through enterprise licensing negotiations, and meaningful events to educate on technology. Represented Disney at DevOps Days, JUG, Gradle Dev Days, AWS re:Invent, UW WIT, and Informatics program.',
    technologies: 'Managed Technologies: GitHub, PagerDuty, New Relic, Datadog, LogicMonitor, Jenkins, Terraform, Vault, GitLab, GitLab CI/CD, Sonatype Nexus, MacStadium, multiple micro-services.'
  },
  'tmpl-senior-pm-dev-enablement': {
    id: 'tmpl-senior-pm-dev-enablement',
    title: 'Senior Product Manager, Developer Enablement and Engineering Platforms, Disney',
    period: 'Aug 2020 to Sep 2021 · 1 yr 2 mos',
    location: 'Seattle, WA · Hybrid',
    description: 'Change agent at company technology level during the 21st Century Fox acquisition—rationalized $2.5M in duplicate service contracts. Led GitHub.com approval across Disney; consolidated multiple GitHub and MSFT contracts with $1.2M savings.\n\nAutomated self-service and resilient services. Emphasis on cloud engineering, platform integrations, automation, and self-service across the SDLC.',
    technologies: 'Managed Technologies: GitHub, Bamboo, CircleCI, Jenkins, Octopus, TeamCity, Spinnaker, GitLab, GitLab CI/CD, Sonatype Nexus, MacStadium, multiple micro-services.'
  },
  'tmpl-devops-product-owner': {
    id: 'tmpl-devops-product-owner',
    title: 'DevOps Platform Product Owner, Enterprise Eng Shared Services, Disney',
    period: 'Apr 2018 to Aug 2020 · 2 yrs 5 mos',
    location: 'Seattle, WA · Hybrid',
    description: 'First product owner in Corporate engineering. Scaled GitLab from 50 to 10k users. Partnered with GitLab to build a self-service importer and led a million-dollar migration (3k users, 50k projects) reducing $500k in costs.\n\nPromoted DevSecOps culture, evolved CI/CD to serve 12k users, extended developer experience to QA and Security. Ran a Slackbot community of practice with 150+ technologists; measured DORA-like metrics early.',
    technologies: 'Managed Technologies: Slack, GitHub, GitLab, GitLab CI/CD, Sonatype Nexus, Jenkins, Puppet Pipelines (Distelli), FishEye/Crucible, MacStadium, micro-services.'
  },
  'tmpl-product-owner-solutions': {
    id: 'tmpl-product-owner-solutions',
    title: 'Product Owner/Solutions Engineer, Disney',
    period: 'Jan 2017 to May 2018 · 1 yr 5 mos',
    location: 'Seattle, WA · Hybrid',
    description: 'Joined amid multiple P2 incidents; drove reliability while migrating users from Perforce to GitHub. Built a Python-based self-service migration tool and helped establish the need for a dedicated product owner. Built cross-team relationships and became a known collaborator.',
    technologies: 'Managed Technologies: GitHub, GitLab, GitLab CI, Nexus, Slack, Confluence, Theme Press, FishEye/Crucible, micro-services. Languages: Bash, Python, JavaScript, HTML/CSS.'
  },
  'tmpl-webdesign-consultant': {
    id: 'tmpl-webdesign-consultant',
    title: 'Web Designer and Marketing Consultant, Kylifornication Web Design & Marketing',
    period: 'Jan 2014 to Jun 2021 · 7 yrs 6 mos',
    location: 'Greater Seattle Area · Hybrid',
    description: 'Built ~50 sites from custom apps to CMS. Evolved from WAMP/LAMP to AWS with ELB and autoscaling—background that powered later Disney cloud work.',
    technologies: 'Focus: Mobile UX (Android/Web/iOS), Front-end dev & design, jQuery, AJAX, HTML5/CSS3, CMS (WordPress, Wix, Squarespace, Volusion), SEO/SEM.'
  },
  'tmpl-lenovo-consultant': {
    id: 'tmpl-lenovo-consultant',
    title: 'Partner & Program Mgmt: Lenovo Consultant, Zones LLC',
    period: 'Jun 2016 to Jan 2017 · 8 mos',
    location: 'Auburn, WA · On-site',
    description: 'Developed GTM channel strategy; managed $25M+ quarterly pipeline; created cross-brand programs exceeding targets. Deepened skills in data tools and business-tech alignment.',
    technologies: 'Tools: MS Dynamics AX/CRM, Excel analytics; hardware subject matter expertise; reporting and incentives programs.'
  },
  'tmpl-tech-marketing-assoc': {
    id: 'tmpl-tech-marketing-assoc',
    title: 'Technical Marketing Associate, Rhino Security Labs',
    period: 'Jan 2016 to Jun 2016 · 6 mos',
    location: 'Greater Seattle Area',
    description: 'Led remote dev team for website v2, launched MSP offering, automated CRM and marketing via Python, Zapier, IFTTT. Built initial customer base for 3rd-party SIEM offering.'
  },
  'tmpl-director-marketing-pnw': {
    id: 'tmpl-director-marketing-pnw',
    title: 'Director of Marketing PNW, Xperience Adventures',
    period: 'Dec 2013 to Jun 2016 · 2 yrs 7 mos',
    location: 'Remote',
    description: 'Scaled events nationwide with remote planning model and SaaS partnerships. Ran web, vendors, and marketing. Learned to hustle and build win-win partnerships.'
  },
  'tmpl-central-munchies': {
    id: 'tmpl-central-munchies',
    title: 'Founder, Central Munchies',
    period: 'Apr 2014 to Dec 2015 · 1 yr 9 mos',
    location: 'Ellensburg, WA',
    description: 'Built a late-night food discovery and delivery mobile web-app through three rewrites, adding 12+ features. Learned agile product discovery, user research, and full-stack delivery.'
  }
};

const timelineItems = [
  {id: 'tmpl-sr-manager', icon: '🚀', title: 'Sr Manager, Security Engineering Partnerships', period: 'Mar 2025 - Present', description: 'Leading security engineering partnerships and driving strategic initiatives across Disney\'s security landscape. Building bridges between security teams and engineering organizations to create more secure products and experiences.'},
  {id: 'tmpl-sr-staff-secmgr', icon: '🔓', title: 'Sr Staff Security Engineer | Manager', period: 'Aug 2022 - Mar 2025', description: 'Secured the magic by making security a resume-worthy accolade for developers. Managed enterprise-wide secure development services and programs focused on developer enablement, overseeing tools like Snyk, Whitehat, Checkmarx, and Tenable.'},
  {id: 'tmpl-sr-software-prod-eng', icon: '⚙️', title: 'Sr Software Product Engineer, DevOps Platforms', period: 'Sep 2021 - Dec 2022', description: 'Led 4 functional engineering teams across entitlements, billing automation, and engineering tools. Focused on ecosystem strategy, reducing enterprise licensing spend, and representing Disney at external events like DevOps Days and AWS RE:Invent.'},
  {id: 'tmpl-senior-pm-dev-enablement', icon: '📈', title: 'Senior Product Manager, Developer Enablement', period: 'Aug 2020 - Sep 2021', description: 'Navigated the 21st Century Fox acquisition, rationalizing $2.5M in duplicate service contracts. Led GitHub.com approval across the company and consolidated multiple contracts, saving $1.2M in licensing costs.'},
  {id: 'tmpl-devops-product-owner', icon: '🔧', title: 'DevOps Platform Product Owner', period: 'Apr 2018 - Aug 2020', description: 'First product person in Corporate engineering, scaling GitLab from 50 to 10k users. Ran a million-dollar migration project, reducing costs by $500k. Built a Slackbot community of 150+ technologists and measured DORA metrics before it was mainstream.'},
  {id: 'tmpl-product-owner-solutions', icon: '🎯', title: 'Product Owner/Solutions Engineer', period: 'Jan 2017 - May 2018', description: 'Started during fire drills, learned enterprise dynamics, and built self-service migration tools. Developed relationships across teams and executives, making a name as a collaborator who could get into meetings others couldn\'t access.'},
  {id: 'tmpl-webdesign-consultant', icon: '💻', title: 'Web Design & Marketing Consultant', period: 'Jan 2014 - Jun 2021', description: 'Built ~50 custom websites and web apps, scaling from LAMP to AWS with load balancers and autoscaling. This side hustle provided the perfect foundation for my Disney cloud migration work and taught me rapid prototyping and modular design.'},
  {id: 'tmpl-lenovo-consultant', icon: '🏢', title: 'Partner & Program Mgmt: Lenovo Consultant', period: 'Jun 2016 - Jan 2017', description: 'First big company experience at Zones LLC, working with Lenovo. Developed GTM channel strategy, managed $25M+ quarterly pipeline, and created cross-brand programs that helped every brand exceed their targets. Learned the intersection of business and technology.'},
  {id: 'tmpl-tech-marketing-assoc', icon: '🔒', title: 'Technical Marketing Associate', period: 'Jan 2016 - Jun 2016', description: 'Rhino Security Labs - Led remote dev team on website redesign, built automated CRM pipelines, and helped launch their first managed service provider offering. Learned that automation is key to scaling security operations.'},
  {id: 'tmpl-director-marketing-pnw', icon: '🏃‍♂️', title: 'Director of Marketing PNW', period: 'Dec 2013 - Jun 2016', description: 'Xperience Adventures - My first startup! Grew events from dozens to 200+ by developing remote planning models and partnerships. Learned to hustle, say yes to challenges, and that good things happen through motion and win-win situations.'},
  {id: 'tmpl-central-munchies', icon: '🍕', title: 'Founder, Central Munchies', period: 'Apr 2014 - Dec 2015', description: 'College startup solving late-night food delivery in Ellensburg. Built a mobile web-app through three full rewrites, adding 12 features beyond the original POC. Learned rapid iteration, user research, and the full startup journey from problem to solution.'}
];

export default function AboutMe(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobDetail | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timelineScrollRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback((jobId: string) => {
    const job = jobDetails[jobId];
    if (job) {
      setSelectedJob(job);
      setModalOpen(true);
    }
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedJob(null);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [modalOpen, closeModal]);

  const scrollToItem = useCallback((index: number) => {
    const newIndex = Math.max(0, Math.min(index, timelineItems.length - 1));
    setCurrentIndex(newIndex);
    if (timelineScrollRef.current) {
      const itemHeight = 220;
      const scrollTop = newIndex * itemHeight;
      timelineScrollRef.current.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  }, []);

  const handlePrevious = useCallback(() => {
    scrollToItem(currentIndex - 1);
  }, [currentIndex, scrollToItem]);

  const handleNext = useCallback(() => {
    scrollToItem(currentIndex + 1);
  }, [currentIndex, scrollToItem]);

  const isFirstItem = currentIndex === 0;
  const isLastItem = currentIndex === timelineItems.length - 1;

  return (
    <Layout
      title="Me Now"
      description="My Story and Why I Built The Drizzle">
      <div className={styles.modernAboutPage}>
        {/* Hero Section */}
        <section className={styles.aboutHeroSection}>
          <div className={styles.aboutHeroContent}>
            <div className={styles.aboutHeroText}>
              <h1 className={styles.aboutHeroTitle}>Me Now</h1>
              <p className={styles.aboutHeroSubtitle}>My Story and Why I Built The Drizzle</p>
              <p className={styles.aboutHeroDescription}>
                From PNW roots to tech leadership, here's the journey that shaped my approach to building, leading, and creating in the digital world.
              </p>
              <p>
                To learn about me more, check out my <a href="https://kylifornication-code.github.io/astro-career-walking-deck/" target="_blank" rel="noopener noreferrer">career walking site</a>, or my <a href="https://kylifornication.gitlab.io/thedrizzle/blog/2025/09/01/my-operating-system/" target="_blank" rel="noopener noreferrer">operating system</a>
              </p>
            </div>
            <div className={styles.aboutHeroImage}>
              <img src="/img/spaceneedle.png" alt="Space Needle" className={styles.aboutHeroImg} />
              <p className={styles.imageAttribution}>Courtesy of Google Whisk AI</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className={styles.aboutContent}>
          {/* Life Section */}
          <section className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>Behind the Scenes: Life</h2>
            <div className={styles.storyCards}>
              <div className={styles.storyCard}>
                <div className={styles.cardIcon}>👨‍👩‍👧‍👦</div>
                <h3>Family First</h3>
                <p>My family is a huge part of my life. Between my son's sports and my own athletic events, our schedule stays packed. I'm grateful to have an active family and a home filled with things we've built ourselves.</p>
                <div className={styles.cardHighlight}>
                  From the dining room table to custom library shelves, my wife and I are always working on new projects and taking every opportunity to create with our hands.
                </div>
              </div>
              
              <div className={styles.storyCard}>
                <div className={styles.cardIcon}>🏔️</div>
                <h3>PNW Roots</h3>
                <p>You'll often find us on the slopes, hiking trails, or doing all the typical PNW activities. I grew up in a small town called Hoquiam—meaning "Hungry for Wood"—with parents who were always working on houses, cars, or whatever project my dad could find to flip.</p>
                <div className={styles.cardHighlight}>Their hustle taught me the value of hard work.</div>
              </div>
              
              <div className={styles.storyCard}>
                <div className={styles.cardIcon}>🏃‍♂️</div>
                <h3>Competitive Spirit</h3>
                <p>Playing sports year-round and into college shaped me into both a team player and a leader. If you're around me long enough, you'll probably end up running with me, pushing past your limits, or trying something that challenges you.</p>
                <div className={styles.cardHighlight}>
                  My competitive nature and background drive me to constantly strive for more in everything I do.
                </div>
              </div>
              
              <div className={`${styles.storyCard} ${styles.storyCardFull}`}>
                <div className={styles.cardIcon}><center>🎯</center></div>
                <h3>What I'm into</h3>
                <p>I have no problem admitting that I'm a bit of an enthusiastic business/tech nerd. I enjoy listening to nonfiction books and have a regular lineup of business/tech podcasts that I listen to often. Watching TV at home, we mostly watch competition shows and sports. I have the side-quest type dream of getting on the TV show Survivor. I've watched all 50+ of the seasons and some seasons multiple times.</p>
                <p>I like getting outdoors, too. I'm a hobby runner and love a challenging trail run and road race. I have a family of snowboarders and can be found at Snoqualmie (Silver Fir or East) and White Pass.</p>
              </div>
            </div>

            {/* Bo Schembechler Quote Section */}
            <div className={styles.quoteSection}>
              <blockquote className={styles.inspirationalQuote}>
                <h4>The late great Bo Schembechler's 'The Team' speech still rings in my ears when I think about how some of the best coaches built their teams.</h4>
                <p>"No man, no coach, is more important than the team. The team, the team, the team!"</p>
                <div className={styles.videoContainer}>
                  <iframe
                    src="https://www.youtube.com/embed/UrvwWfIeHu0?si=kGaZ0zM8uPsuEtTD"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </blockquote>
            </div>
          </section>

          {/* Work Section */}
          <section className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>Behind the Scenes: Work</h2>
            <div className={styles.workContent}>
              <div className={styles.workImage}>
                <img src="/img/castle.png" alt="Office" className={styles.workImg} />
                <p className={styles.imageAttribution}>Courtesy of Google Whisk AI</p>
              </div>
              <div className={styles.timelineContainer}>
                <div className={styles.timelineScroll} ref={timelineScrollRef}>
                  <div className={styles.timeline}>
                    {timelineItems.map((item, index) => (
                      <div key={item.id} className={styles.timelineItem}>
                        <div className={styles.timelineMarker}>
                          <div className={styles.timelineIcon}>{item.icon}</div>
                        </div>
                        <div className={styles.timelineContent}>
                          <h3>{item.title}</h3>
                          <p className={styles.timelinePeriod}>{item.period}</p>
                          <p>{item.description}</p>
                          <button
                            className={styles.readMoreBtn}
                            onClick={() => openModal(item.id)}
                          >
                            Read more
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Floating Action Buttons */}
                <div className={styles.timelineNavFabs}>
                  <button
                    className={styles.fab}
                    onClick={handlePrevious}
                    disabled={isFirstItem}
                    aria-label="Previous position"
                  >
                    <span>↑</span>
                  </button>
                  <button
                    className={styles.fab}
                    onClick={handleNext}
                    disabled={isLastItem}
                    aria-label="Next position"
                  >
                    <span>↓</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>Behind the Scenes: Core Values</h2>
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🤝</div>
                <h3>Leadership+Teamwork</h3>
                <p>I'm a big believer that leaders lead - no matter what. I started playing team sports when I was 4yr old and I can't remember a time I wasn't on a team. Teamwork is the entry fee for being a leader and I believe I was built to lead. It's something I gravitate towards. I flex leading from the back, allowing others to lead the way and from the front, where I break ground and show what can be done.</p>
              </div>
              
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>💎</div>
                <h3>Integrity</h3>
                <p>Integrity is table stakes in life. As my career has progressed and life has become heavier with responsibility, I've found being and showing high integrity keeps me grounded. Some know it as karma, but I believe what you put out into the world is what you get back.</p>
              </div>
              
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>⚙️</div>
                <h3>Curiosity+Humility</h3>
                <p>I think of curiosity and humility as the same coin with different sides. They're part of my core values because curiosity is a core fundamental of learning and humility is a fundamental of openness. I'm innately curious and I've developed the emotional intelligence to have humility to new experiences, learnings, and what life throws at me.</p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🏔️</div>
                <h3>Continuous Growth</h3>
                <p>Continuous learning is something that drives a lot of my purpose. It's enabled me to excel in tech and in school. Along with family, learning new things is what I believe what makes my life so rich. I have lofty goals of becoming a professor and learning all I can in this lifetime.</p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🏋️‍♀️</div>
                <h3>Hard Work</h3>
                <p>I'm highly competitive. I played team and individual sports my entire life, coached high school wrestling for years, and my family has a large collection of boardgames we compete with each other in. I love logic games, chess, and games that have social elements of negotiation. I'm always pushing myself and those around me to set big goals.</p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🔧</div>
                <h3>Maker</h3>
                <p>If you're not making you're consuming. This value is something my family shares. I grew up in a family of DIYers and with the introduction of AI it's now easier than ever to create. I love to 3d print, write, and work on my house as well as in the digital world.</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedJob && (
        <div className={styles.modalOverlay} onClick={closeModal} aria-hidden="false">
          <div className={styles.modalDialog} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal} aria-label="Close">×</button>
            <div className={styles.modalContent}>
              <h3>{selectedJob.title}</h3>
              <p><strong>{selectedJob.period} · {selectedJob.location}</strong></p>
              <p style={{whiteSpace: 'pre-line'}}>{selectedJob.description}</p>
              {selectedJob.technologies && (
                <p><strong>{selectedJob.technologies}</strong></p>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

