import React, {useState, useEffect, useMemo, useCallback} from 'react';
import Layout from '@theme/Layout';
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

const GITLAB_USERNAME = 'kylifornication';
const GITLAB_API_URL = `https://gitlab.com/api/v4/users/${GITLAB_USERNAME}/projects`;
const SESSION_CACHE_KEY = 'drizzle_projects_cache';
const SESSION_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCachedProjects(): Project[] | null {
  try {
    const raw = sessionStorage.getItem(SESSION_CACHE_KEY);
    if (!raw) return null;
    const {data, timestamp} = JSON.parse(raw);
    if (Date.now() - timestamp > SESSION_CACHE_TTL) {
      sessionStorage.removeItem(SESSION_CACHE_KEY);
      return null;
    }
    return data as Project[];
  } catch {
    return null;
  }
}

function setCachedProjects(projects: Project[]) {
  try {
    sessionStorage.setItem(
      SESSION_CACHE_KEY,
      JSON.stringify({data: projects, timestamp: Date.now()}),
    );
  } catch {
    // sessionStorage may be unavailable (private browsing, quota exceeded)
  }
}

// Helper function to extract YouTube URL from topics
function getYouTubeUrl(topics: string[]): string | null {
  if (!topics || topics.length === 0) return null;

  const youtubeUrl = topics.find(topic =>
    topic.includes('youtube.com') || topic.includes('youtu.be')
  );

  return youtubeUrl || null;
}

export default function Projects(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchProjects = useCallback((signal?: AbortSignal) => {
    setLoading(true);
    setError(null);

    // Check session cache first
    const cached = getCachedProjects();
    if (cached) {
      setProjects(cached);
      setLoading(false);
      return;
    }

    fetch(GITLAB_API_URL, {
      headers: {'Content-Type': 'application/json'},
      signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitLab API returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const publicProjects = data.filter(
          (p: Project) => p.visibility === 'public',
        );
        setProjects(publicProjects);
        setCachedProjects(publicProjects);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return; // component unmounted
        setError('Failed to load projects. GitLab may be temporarily unavailable.');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchProjects(controller.signal);
    return () => controller.abort();
  }, [fetchProjects]);

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
              aria-label="Search projects"
            />
          </div>
          <div className={styles.filterContainer}>
            <select
              id="project-filter"
              className={styles.filterSelect}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              aria-label="Filter by status"
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
        ) : error ? (
          <div className={styles.emptyState}>
            <p>⛈️ {error}</p>
            <button
              className={styles.retryButton}
              onClick={() => {
                sessionStorage.removeItem(SESSION_CACHE_KEY);
                fetchProjects();
              }}
            >
              Try again
            </button>
          </div>
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
              const youtubeUrl = getYouTubeUrl(project.topics);

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
                      {youtubeUrl && (
                        <a
                          href={youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.youtubeLink}
                          aria-label="Watch demo video on YouTube"
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814" />
                          </svg>
                          <span>Demo</span>
                        </a>
                      )}
                      <a
                        href={project.web_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLink}
                      >
                        <span>View Project</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
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
