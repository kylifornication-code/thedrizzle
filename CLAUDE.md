# CLAUDE.md — Project conventions for The Drizzle

## Project overview

Personal blog & portfolio at **thedrizzle.dev**, built with Docusaurus 3.9.2, React 19, and TypeScript 5.6.

## Tech stack

- **Framework**: Docusaurus 3 (classic preset, docs disabled, blog enabled)
- **Language**: TypeScript (strict mode)
- **Styling**: CSS Modules + Infima CSS framework
- **Analytics**: PostHog (via posthog-docusaurus plugin)
- **Hosting**: GitLab Pages / static deploy
- **Icons**: Inline SVGs via `src/components/SocialIcon` — no external icon CDNs

## Code conventions

- Use functional React components with hooks; no class components
- CSS Modules (`.module.css`) for page/component styles; `src/css/custom.css` for global overrides
- Theme overrides live in `src/theme/` (swizzled wrappers around `@theme-original/*`)
- Prefer `useCallback` / `useMemo` for expensive computations in components
- Use `AbortController` for fetch calls in `useEffect` to prevent memory leaks
- Always add `aria-label` or `aria-hidden` attributes for accessibility
- Keep bundle size minimal — no heavy external dependencies for simple tasks

## Build & validation

```bash
npm ci            # install deps
npm run build     # production build (must pass before merging)
npm run start     # local dev server
npx tsc --noEmit  # type-check only (note: JSX namespace warnings are pre-existing)
```

## File structure

```
src/
  components/     # Shared React components (SocialIcon, etc.)
  css/            # Global CSS (custom.css)
  pages/          # Top-level pages (index, aboutme, projects) + CSS Modules
  theme/          # Docusaurus theme overrides (Root, Footer)
static/           # Static assets (images, favicon)
blog/             # Blog posts (MDX/MD)
```

## Important patterns

- **Dark/light theming**: CSS custom properties defined in `custom.css` (`:root` and `[data-theme='dark']`)
- **Footer icons**: Injected via MutationObserver in `src/theme/Footer/index.tsx`, not external JS
- **Projects page**: Fetches from GitLab API v4 (public, no auth), cached in sessionStorage for 5 min
- **JSON-LD**: Structured data injected in `src/theme/Root/index.tsx`

## Review guidelines

- Run `npm run build` to verify the site compiles before opening an MR
- Keep changes focused — one concern per MR
- Prefer editing existing files over creating new ones
- Do not add unnecessary dependencies
