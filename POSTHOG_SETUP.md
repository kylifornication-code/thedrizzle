# PostHog API Key Security Setup

This document explains how to securely configure PostHog API keys for both local development and GitHub Actions deployment.

## ✅ Implementation: GitHub Secrets + Environment Variables 

This is the **recommended approach** and has been implemented in this repository.

### How It Works

1. **Config reads from environment variables**: `docusaurus.config.ts` reads `POSTHOG_API_KEY` and `POSTHOG_APP_URL` from environment variables
2. **GitHub Secrets store the key**: The API key is stored securely in GitHub repository secrets
3. **GitHub Actions injects secrets**: The workflow passes secrets as environment variables during build
4. **Never committed to repo**: The API key never appears in your codebase

## Setup Instructions

### 1. Configure GitHub Secrets

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

   - **Name**: `POSTHOG_API_KEY`
     - **Value**: Your PostHog API key (e.g. NOT REAL, `phc_OmgPtyrTlfb9usTlVNJTh1RNbDhY5tPiHF3WFgGV5rd`)
   
   - **Name**: `POSTHOG_APP_URL` (optional)
     - **Value**: Your PostHog instance URL (defaults to `https://us.i.posthog.com` if not set)
     - Only set this if you're using a different instance (EU, self-hosted, etc.)

### 2. Local Development Setup

For local development, create a `.env.local` file in the root directory:

```bash
POSTHOG_API_KEY=your_posthog_api_key_here
POSTHOG_APP_URL=https://us.i.posthog.com
```

**Note**: `.env.local` is already in `.gitignore`, so it won't be committed.

Alternatively, you can set environment variables directly:

```bash
export POSTHOG_API_KEY=your_key_here
npm run start
```

### 3. Verify the Setup

1. **Local**: Run `npm run build` with your `.env.local` file and verify PostHog tracking works
2. **CI/CD**: Push to your main branch and check the GitHub Actions workflow logs to ensure the build succeeds

## Alternative Options (Not Implemented)

### Option 2: Build-time Script Injection
- **Pros**: More explicit control, can add validation
- **Cons**: Requires additional build scripts, more complex
- **Use case**: When you need custom validation or transformation of secrets

### Option 3: Separate Config File (Gitignored)
- **Pros**: Simple for local development
- **Cons**: Still requires GitHub Secrets for CI/CD, less flexible
- **Use case**: When you want a config file approach

### Option 4: Encrypted Config with SOPS/Age
- **Pros**: Very secure, version-controlled encrypted secrets
- **Cons**: Overkill for single API key, requires additional tooling
- **Use case**: Large teams with many secrets, compliance requirements

## Security Best Practices

✅ **DO:**
- Store API keys in GitHub Secrets
- Use environment variables in your config
- Keep `.env.local` in `.gitignore`
- Rotate keys if accidentally exposed
- Use different keys for dev/staging/production if needed

❌ **DON'T:**
- Commit API keys to the repository
- Hardcode keys in config files
- Share keys in chat/email
- Use production keys in development

## Troubleshooting

### Build fails with "API key not found"
- Verify GitHub Secrets are set correctly
- Check the secret names match exactly: `POSTHOG_API_KEY` and `POSTHOG_APP_URL`
- Ensure the workflow has access to secrets (check repository settings)

### PostHog not tracking in production
- Verify the build step shows the environment variables are set (they'll be masked in logs)
- Check PostHog dashboard for incoming events
- Verify `enableInDevelopment: false` isn't blocking tracking

### Local development not working
- Ensure `.env.local` exists and has the correct format
- Restart the dev server after creating/modifying `.env.local`
- Check that environment variables are being read: `console.log(process.env.POSTHOG_API_KEY)` (remove after testing)

