---
hide:
  - navigation
---

<div><h2>GitLab Projects</h2></div>
<div id="gitlab-projects"></div>

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

function createProjectHTML(project) {
    return `
        <div class="project-card">
            <div class="project-avatar">
                <img src="${project.avatar_url || 'https://gitlab.com/assets/gitlab_logo-7ae504fe4f68fdebb3c2034e36621930cd36ea87924c11ff65dbcb8ed50dca58.png'}" alt="${project.name} avatar">
            </div>
            <div class="project-details">
            <h2>${project.name}</h2>
            <p>${project.description || 'No description available'}</p>
            <a href="${project.web_url}" target="_blank" class="project-link">View Project</a>
            </div>
            <div class="project-info">
            <div class="project-meta">
                <span>🌟 ${project.star_count}</span>
                <span>🔀 ${project.forks_count}</span>
            </div>
            </div>
        </div>
    `;
}

async function displayProjects() {
    const projectsContainer = document.getElementById('gitlab-projects');
    if (!projectsContainer) {
        console.error('Projects container not found');
        return;
    }

    projectsContainer.innerHTML = '<div class="loading">Loading projects...</div>';
    
    const projects = await fetchGitLabProjects();
    console.log('Fetched projects:', projects); // Debug log
    
    if (!projects || projects.length === 0) {
        projectsContainer.innerHTML = '<p>No projects found or error loading projects.</p>';
        return;
    }

    const projectsHTML = projects
        .filter(project => project.visibility === 'public')
        .map(createProjectHTML)
        .join('');

    projectsContainer.innerHTML = projectsHTML;
}

// Add event listener to initialize
document.addEventListener('DOMContentLoaded', displayProjects);

// Add corresponding CSS
const styles = `
<style>
.project-card {
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    padding: 16px;
    margin: 16px;
    background: #fff;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    gap: 1rem;
    min-width: 350px;
}

.project-avatar {
    display: flex;
    width: 90px;
    height: 90px;
    float: left;
    border-radius: 4px;
}

.project-details {
    float: left;
    width: 70%;
}

.project-info {
    float: left;
    width: 10%;
}

.project-card h2 {
    color: black;
    margin: 0 0 8px 0;
}

.project-card p {
    color: black;
    margin: 0;
}

.project-meta {
    margin: 8px 0;
    color: black;
    text-align: right;
}

.project-meta span {
    display: block;
    margin-bottom: 4px;
}

.project-link {
    display: inline-block;
    padding: 8px 16px;
    background: white;
    text-decoration: none;
    border-radius: 4px;
    margin-top: 8px;
    border: 2px solid #74918E;
    color: darkgreen;
    float: left;
    transition: background-color 0.3s, color 0.3s;
}

.project-link:hover {
    background: #74918E;
    color: white;
}

.loading {
    text-align: center;
    padding: 20px;
    color: white;
    font-size: 20px;
}
</style>
`;


// Initialize
document.head.insertAdjacentHTML('beforeend', styles);
document.addEventListener('DOMContentLoaded', displayProjects);
</script>

