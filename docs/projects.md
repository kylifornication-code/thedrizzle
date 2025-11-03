---
hide:
  - navigation
  - toc
---

<div class="modern-projects-page">
  <div class="projects-header">
    <h1 class="projects-title">Digital Project Drizzle</h1>
    <p class="projects-subtitle">A collection of digital experiments and creations from the PNW</p>
    <p class="projects-description">Every project is a drop in the digital storm - some gentle drizzles, others full downpours of innovation.</p>
  </div>
  
  <div class="projects-controls">
    <div class="search-container">
      <input type="text" id="project-search" placeholder="Search through the storm..." class="search-input">
    </div>
    <div class="filter-container">
      <select id="project-filter" class="filter-select">
        <option value="all">All Projects</option>
        <option value="active">Active</option>
        <option value="archived">Archived</option>
        <option value="experimental">Experimental</option>
      </select>
    </div>
  </div>
  
  <div id="gitlab-projects" class="projects-grid"></div>
</div>

<script>
const GITLAB_USERNAME = 'kylifornication';
const GITLAB_TOKEN = 'glpat-Xy7ykAd3H17CXjutajaH'; 
const GITLAB_API_URL = `https://gitlab.com/api/v4/users/${GITLAB_USERNAME}/projects`;

async function fetchGitLabProjects() {
    console.log('Fetching projects...');
    try {
        const response = await fetch(GITLAB_API_URL, {
            headers: {
                'PRIVATE-TOKEN': GITLAB_TOKEN,
                'Content-Type': 'application/json'
            }
        });
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Projects found:', data.length);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}

function getProjectStatus(project) {
    const lastActivity = new Date(project.last_activity_at);
    const now = new Date();
    const daysSinceActivity = Math.floor((now - lastActivity) / (1000 * 60 * 60 * 24));
    
    if (daysSinceActivity < 30) return 'active';
    if (daysSinceActivity < 90) return 'experimental';
    return 'archived';
}

function getProjectCategory(project) {
    const name = project.name.toLowerCase();
    const description = (project.description || '').toLowerCase();
    
    if (name.includes('web') || name.includes('frontend') || name.includes('ui')) return '🌐 Web';
    if (name.includes('api') || name.includes('backend') || name.includes('server')) return '⚙️ Backend';
    if (name.includes('mobile') || name.includes('app')) return '📱 Mobile';
    if (name.includes('data') || name.includes('ml') || name.includes('ai')) return '🤖 Data';
    if (name.includes('tool') || name.includes('cli') || name.includes('util')) return '🔧 Tools';
    return '💻 General';
}

function formatLastUpdated(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
}

function createProjectHTML(project) {
    const status = getProjectStatus(project);
    const category = getProjectCategory(project);
    const lastUpdated = formatLastUpdated(project.last_activity_at);
    
    return `
        <div class="project-card" data-status="${status}" data-category="${category}" data-name="${project.name.toLowerCase()}">
            <div class="project-header">
                <div class="project-avatar">
                    <img src="${project.avatar_url || 'https://gitlab.com/assets/gitlab_logo-7ae504fe4f68fdebb3c2034e36621930cd36ea87924c11ff65dbcb8ed50dca58.png'}" alt="${project.name} avatar">
                </div>
                <div class="project-status-badge status-${status}">
                    ${status === 'active' ? '⚡' : status === 'experimental' ? '🧪' : '📦'} ${status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
            </div>
            
            <div class="project-content">
                <div class="project-title-section">
                    <h3 class="project-title">${project.name}</h3>
                    <div class="project-category">${category}</div>
                </div>
                
                <p class="project-description">${project.description || 'No description available - just another drop in the digital storm.'}</p>
                
                <div class="project-meta">
                    <div class="project-stats">
                        <span class="stat-item">🌟 ${project.star_count || 0}</span>
                        <span class="stat-item">🔀 ${project.forks_count || 0}</span>
                        <span class="stat-item">📅 ${lastUpdated}</span>
                    </div>
                </div>
                
                <div class="project-actions">
                    <a href="${project.web_url}" target="_blank" rel="noopener" class="project-link">
                        <span>View Project</span>
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
}

let allProjects = [];

function filterProjects() {
    const searchTerm = document.getElementById('project-search').value.toLowerCase();
    const filterStatus = document.getElementById('project-filter').value;
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const name = card.dataset.name;
        const status = card.dataset.status;
        const matchesSearch = name.includes(searchTerm);
        const matchesFilter = filterStatus === 'all' || status === filterStatus;
        
        if (matchesSearch && matchesFilter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

async function displayProjects() {
    const projectsContainer = document.getElementById('gitlab-projects');
    if (!projectsContainer) {
        console.error('Projects container not found');
        return;
    }

    projectsContainer.innerHTML = '<div class="loading">🌧️ Gathering projects from the digital storm...</div>';
    
    allProjects = await fetchGitLabProjects();
    console.log('Fetched projects:', allProjects);
    
    if (!allProjects || allProjects.length === 0) {
        projectsContainer.innerHTML = '<div class="empty-state"><p>🌧️ No projects found - the clouds are empty today</p></div>';
        return;
    }

    const publicProjects = allProjects.filter(project => project.visibility === 'public');
    const projectsHTML = publicProjects.map(createProjectHTML).join('');

    projectsContainer.innerHTML = projectsHTML;
    
    // Add event listeners for search and filter
    document.getElementById('project-search').addEventListener('input', filterProjects);
    document.getElementById('project-filter').addEventListener('change', filterProjects);
}

// Add event listener to initialize
document.addEventListener('DOMContentLoaded', displayProjects);

// Add corresponding CSS
const styles = `
<style>
/* Modern Projects Page Styles */
.modern-projects-page {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #e2e8f0;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

/* Header Section */
.projects-header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #334155;
}

.projects-title {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(135deg, #60a5fa, #34d399, #fbbf24);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
    line-height: 1.1;
}

.projects-subtitle {
    font-size: 1.5rem;
    color: #94a3b8;
    margin-bottom: 1rem;
    font-weight: 300;
}

.projects-description {
    font-size: 1.125rem;
    color: #cbd5e1;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
}

/* Controls Section */
.projects-controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    justify-content: center;
}

.search-container, .filter-container {
    flex: 1;
    min-width: 200px;
}

.search-input, .filter-select {
    width: 100%;
    padding: 0.75rem 1rem;
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 0.5rem;
    color: #e2e8f0;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.search-input:focus, .filter-select:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
}

.search-input::placeholder {
    color: #64748b;
}

/* Projects Grid */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
}

/* Project Cards */
.project-card {
    background: transparent;
    border: 1px solid #334155;
    border-radius: 1rem;
    padding: 1.5rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: #60a5fa;
}

.project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(96, 165, 250, 0.05), rgba(52, 211, 153, 0.05));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
}

.project-card:hover::before {
    opacity: 1;
}

/* Project Header */
.project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
}

.project-avatar {
    width: 60px;
    height: 60px;
    border-radius: 0.75rem;
    overflow: hidden;
    border: 2px solid #334155;
}

.project-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.project-status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.status-active {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
    border: 1px solid rgba(34, 197, 94, 0.3);
}

.status-experimental {
    background: rgba(251, 191, 36, 0.2);
    color: #fbbf24;
    border: 1px solid rgba(251, 191, 36, 0.3);
}

.status-archived {
    background: rgba(107, 114, 128, 0.2);
    color: #6b7280;
    border: 1px solid rgba(107, 114, 128, 0.3);
}

/* Project Content */
.project-content {
    position: relative;
    z-index: 1;
}

.project-title-section {
    margin-bottom: 1rem;
}

.project-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #f1f5f9;
    margin: 0 0 0.5rem 0;
    line-height: 1.3;
}

.project-category {
    font-size: 0.875rem;
    color: #60a5fa;
    font-weight: 500;
}

.project-description {
    color: #94a3b8;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
}

/* Project Meta */
.project-meta {
    margin-bottom: 1.5rem;
}

.project-stats {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.stat-item {
    font-size: 0.875rem;
    color: #64748b;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

/* Project Actions */
.project-actions {
    display: flex;
    justify-content: flex-end;
}

.project-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: transparent;
    color: #60a5fa;
    text-decoration: none;
    border: 1px solid #60a5fa;
    border-radius: 0.5rem;
    font-weight: 500;
    font-size: 0.875rem;
    transition: all 0.3s ease;
}

.project-link:hover {
    background: #60a5fa;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(96, 165, 250, 0.3);
}

/* Loading and Empty States */
.loading, .empty-state {
    text-align: center;
    padding: 3rem 2rem;
    color: #94a3b8;
    font-size: 1.125rem;
}

.loading {
    background: linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(52, 211, 153, 0.1));
    border-radius: 1rem;
    border: 1px solid #334155;
}

.empty-state {
    background: transparent;
    border: 2px dashed #334155;
    border-radius: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .modern-projects-page {
        padding: 1rem;
    }
    
    .projects-title {
        font-size: 2.5rem;
    }
    
    .projects-controls {
        flex-direction: column;
    }
    
    .projects-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .project-card {
        padding: 1.25rem;
    }
}

@media (max-width: 480px) {
    .projects-title {
        font-size: 2rem;
    }
    
    .project-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
    }
    
    .project-stats {
        flex-direction: column;
        gap: 0.5rem;
    }
}
</style>
`;

// Initialize
document.head.insertAdjacentHTML('beforeend', styles);
document.addEventListener('DOMContentLoaded', displayProjects);
</script>

