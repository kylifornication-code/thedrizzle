import React, {useState, useEffect, useMemo, useCallback} from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './projects.module.css';

interface Project {
  name: string;
  description: string;
  web_url: string;
  avatar_url: string;
  last_activity_at: string;
  star_count: number;
  forks_count: number;
  topics: string[];
  visibility: string;
}

// Module-level cache for expensive computations
const statusCache = new Map<string, string>();
const categoryCache = new Map<string, string>();
const dateFormatCache = new Map<string, string>();

// Cache current time to avoid repeated Date() calls
let cachedNow: number | null = null;
function getCachedNow(): number {
  if (cachedNow === null) {
    cachedNow = Date.now();
    // Refresh cache every minute
    setTimeout(() => { cachedNow = null; }, 60000);
  }
  return cachedNow;
}

export default function Projects(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const GITLAB_USERNAME = 'kylifornication';
  const GITLAB_API_URL = `https://gitlab.com/api/v4/users/${GITLAB_USERNAME}/projects`;

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(GITLAB_API_URL, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        const publicProjects = data.filter((p: Project) => p.visibility === 'public');
        setProjects(publicProjects);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [GITLAB_API_URL]);

  const getProjectStatus = useCallback((project: Project): string => {
    const cacheKey = project.last_activity_at;
    if (statusCache.has(cacheKey)) {
      return statusCache.get(cacheKey)!;
    }
    
    const lastActivity = new Date(project.last_activity_at).getTime();
    const now = getCachedNow();
    const daysSinceActivity = Math.floor((now - lastActivity) / (1000 * 60 * 60 * 24));
    
    let status: string;
    if (daysSinceActivity < 30) status = 'active';
    else if (daysSinceActivity < 90) status = 'experimental';
    else status = 'archived';
    
    statusCache.set(cacheKey, status);
    return status;
  }, []);

  const getProjectCategory = useCallback((project: Project): string => {
    const cacheKey = `${project.name}|${project.description || ''}`;
    if (categoryCache.has(cacheKey)) {
      return categoryCache.get(cacheKey)!;
    }
    
    const name = project.name.toLowerCase();
    const description = (project.description || '').toLowerCase();
    
    let category: string;
    if (name.includes('web') || name.includes('frontend') || name.includes('ui')) category = '🌐 Web';
    else if (name.includes('api') || name.includes('backend') || name.includes('server')) category = '⚙️ Backend';
    else if (name.includes('mobile') || name.includes('app')) category = '📱 Mobile';
    else if (name.includes('data') || name.includes('ml') || name.includes('ai')) category = '🤖 Data';
    else if (name.includes('tool') || name.includes('cli') || name.includes('util')) category = '🔧 Tools';
    else category = '💻 General';
    
    categoryCache.set(cacheKey, category);
    return category;
  }, []);

  const formatLastUpdated = useCallback((dateString: string): string => {
    if (dateFormatCache.has(dateString)) {
      return dateFormatCache.get(dateString)!;
    }
    
    const date = new Date(dateString).getTime();
    const now = getCachedNow();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let formatted: string;
    if (diffDays === 1) formatted = '1 day ago';
    else if (diffDays < 7) formatted = `${diffDays} days ago`;
    else if (diffDays < 30) formatted = `${Math.floor(diffDays / 7)} weeks ago`;
    else formatted = `${Math.floor(diffDays / 30)} months ago`;
    
    dateFormatCache.set(dateString, formatted);
    return formatted;
  }, []);

  const filteredProjects = useMemo(() => {
    const statusOrder: Record<string, number> = { 'active': 1, 'experimental': 2, 'archived': 3 };
    const searchLower = searchTerm.toLowerCase();
    
    const filtered = projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchLower);
      const status = getProjectStatus(project);
      const matchesFilter = filterStatus === 'all' || status === filterStatus;
      return matchesSearch && matchesFilter;
    });
    
    return [...filtered].sort((a, b) => {
      const statusA = getProjectStatus(a);
      const statusB = getProjectStatus(b);
      return statusOrder[statusA] - statusOrder[statusB];
    });
  }, [projects, searchTerm, filterStatus, getProjectStatus]);

  return (
    <Layout
      title="Projects"
      description="Digital Project Drizzle - A collection of digital experiments and creations from the PNW">
      <div className={styles.modernProjectsPage}>
        <div className={styles.projectsHeader}>
          <h1 className={styles.projectsTitle}>Digital Project Drizzle</h1>
          <p className={styles.projectsSubtitle}>A collection of digital experiments and creations from the PNW</p>
          <p className={styles.projectsDescription}>
            Every project is a drop in the digital storm - some gentle drizzles, others full downpours of innovation.
          </p>
        </div>
        
        <div className={styles.projectsControls}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              id="project-search"
              placeholder="Search through the storm..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.filterContainer}>
            <select
              id="project-filter"
              className={styles.filterSelect}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Projects</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
              <option value="experimental">Experimental</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className={styles.loading}>🌧️ Gathering projects from the digital storm...</div>
        ) : filteredProjects.length === 0 ? (
          <div className={styles.emptyState}>
            <p>🌧️ No projects found - the clouds are empty today</p>
          </div>
        ) : (
          <div className={styles.projectsGrid}>
            {filteredProjects.map((project) => {
              const status = getProjectStatus(project);
              const category = getProjectCategory(project);
              const lastUpdated = formatLastUpdated(project.last_activity_at);
              const statusCapitalized = status.charAt(0).toUpperCase() + status.slice(1);
              
              return (
                <div key={project.web_url} className={styles.projectCard} data-status={status}>
                  <div className={styles.projectHeader}>
                    <div className={styles.projectAvatar}>
                      <img
                        src={project.avatar_url || 'https://gitlab.com/assets/gitlab_logo-7ae504fe4f68fdebb3c2034e36621930cd36ea87924c11ff65dbcb8ed50dca58.png'}
                        alt={`${project.name} avatar`}
                        loading="lazy"
                      />
                    </div>
                    <div className={`${styles.projectStatusBadge} ${styles[`status${statusCapitalized}`]}`}>
                      {status === 'active' ? '⚡' : status === 'experimental' ? '🧪' : '📦'} {statusCapitalized}
                    </div>
                  </div>
                  
                  <div className={styles.projectContent}>
                    <div className={styles.projectTitleSection}>
                      <h3 className={styles.projectTitle}>{project.name}</h3>
                      <div className={styles.projectCategory}>{category}</div>
                    </div>
                    
                    <p className={styles.projectDescription}>
                      {project.description || 'No description available - just another drop in the digital storm.'}
                    </p>
                    
                    <div className={styles.projectMeta}>
                      <div className={styles.projectStats}>
                        <span className={styles.statItem}>🌟 {project.star_count || 0}</span>
                        <span className={styles.statItem}>🔀 {project.forks_count || 0}</span>
                        <span className={styles.statItem}>📅 {lastUpdated}</span>
                      </div>
                    </div>
                    
                    {project.topics && project.topics.length > 0 && (
                      <div className={styles.projectTopics}>
                        {project.topics.map((topic, idx) => (
                          <span key={idx} className={styles.projectTopic}>{topic}</span>
                        ))}
                      </div>
                    )}
                    
                    <div className={styles.projectActions}>
                      <a
                        href={project.web_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLink}
                      >
                        <span>View Project</span>
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}

