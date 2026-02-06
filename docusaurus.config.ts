import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import dotenv from 'dotenv';

// Load environment variables from .env.local for local development
dotenv.config({path: '.env.local'});

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'The Drizzle - Personal Stories from the PNW',
  tagline: 'A personal website for KJ',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://thedrizzle.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  // If deploying to root domain, use '/'
  baseUrl: '/',

  // No global scripts needed — social icons are inline SVGs now

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'kylifornication-code', // Usually your GitHub org/user name.
  projectName: 'thedrizzle-v2.1', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false, // Disable docs plugin since we're not using documentation
        blog: {
          showReadingTime: true,
          blogTitle: 'The Drizzle Blog',
          blogDescription: 'A light drizzle of content from the PNW',
          postsPerPage: 20,
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 20,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Remove editUrl to remove the "edit this page" links.
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'posthog-docusaurus',
      {
        apiKey: process.env.POSTHOG_API_KEY || '', // Read from environment variable
        appUrl: process.env.POSTHOG_APP_URL || 'https://us.i.posthog.com', // US instance (default)
        enableInDevelopment: false, // Disable in development mode
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/drizzle-hero.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'The Drizzle',
      logo: {
        alt: 'The Drizzle Logo',
        src: 'img/logo.png',
      },
      items: [
        {to: '/', label: 'Home', position: 'left'},
        {to: '/aboutme', label: 'Me Now', position: 'left'},
        {to: '/projects', label: 'Projects', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/kylifornication-code',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://gitlab.com/kylifornication',
          label: 'GitLab',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Site',
          items: [
            {
              label: 'Home',
              to: '/',
            },
            {
              label: 'About Me',
              to: '/aboutme',
            },
            {
              label: 'Projects',
              to: '/projects',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/kylifornication-code',
            },
            {
              label: 'GitLab',
              href: 'https://gitlab.com/kylifornication',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/kylejamescwu/',
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/kylifornication/',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/@kylifornication11',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Kylifornication (KJ). Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
