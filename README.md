# The Drizzle - Personal Website

This is the repository for [The Drizzle](https://thedrizzle.dev), a personal website built with Docusaurus.

## Project Structure

```
.
├── blog/                # Blog posts
├── docs/                # Documentation (currently unused)
├── src/                 # React components and pages
├── static/              # Static assets (images, etc.)
├── docusaurus.config.ts # Docusaurus configuration
├── package.json         # Node.js dependencies
├── .gitlab-ci.yml       # GitLab Pages deployment config
└── .github/workflows/   # GitHub Actions workflows
```

## Quick Start

### Development

```bash
npm install
npm start
```

This starts a local development server at `http://localhost:3000`.

### Build

```bash
npm run build
```

This generates static content in the `build` directory.

## Deployment

The site is automatically deployed when changes are pushed to the `main` branch:

- **GitLab Pages**: Configured via `.gitlab-ci.yml`
- **GitHub Pages**: Configured via `.github/workflows/deploy.yml`

Both deployment methods build the Docusaurus site and deploy the static files to their respective platforms.

## License

Copyright © 2025 Kylifornication (KJ)

