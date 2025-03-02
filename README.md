# My Personal Website

This project is a personal website built using MkDocs. It includes a homepage, a list of current GitLab projects, and a blog section. The website is designed to showcase my work and share my thoughts through blog posts.

## Project Structure

- `docs/index.md`: Homepage with introductory content about the website and the author.
- `docs/projects.md`: A list of current GitLab projects with descriptions and links.
- `docs/blog/index.md`: Main blog section with links to individual blog posts or summaries of recent posts.
- `mkdocs.yml`: Configuration file for MkDocs, defining site name, theme, and navigation structure.

## Local Setup Instructions

1. Clone the repository:
   ```
   git clone https://gitlab.com/kylifornication/kylifornication.info.git
   cd kylifornication.info
   ```

2. Use the Makefile to set up the project:
> Download (make here)[https://ftp.gnu.org/gnu/make/]
   ```
   make setup
   ```

3. Serve the website locally:
   ```
   make serve
   ```

4. Open your browser and go to `localhost:8000` to view the website.

### Deployment: GitLab Pages

To deploy to GitLab Pages, use the Makefile:
   ```
   make deploy
   ```

Ensure you have a `.gitlab-ci.yml` file configured for MkDocs. Push your changes to the `main` branch, and GitLab will automatically build and deploy your site.

### Deployment: GitLab Pages

To deploy to GitLab Pages, ensure you have a `.gitlab-ci.yml` file configured for MkDocs. Push your changes to the `main` branch, and GitLab will automatically build and deploy your site.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

[![Built with Material for MkDocs](https://img.shields.io/badge/Material_for_MkDocs-526CFE?style=for-the-badge&logo=MaterialForMkDocs&logoColor=white)](https://squidfunk.github.io/mkdocs-material/)