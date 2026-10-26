// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

const site = 'https://luciano-consulting.web.app';

// Republished posts (frontmatter `canonicalUrl`) declare the original on another site as
// canonical, so they stay out of the sitemap: it should only list this site's canonical URLs.
const blogDir = new URL('./src/content/blog/', import.meta.url);
const republishedPages = new Set(
  readdirSync(blogDir)
    .filter((file) => file.endsWith('.md'))
    .flatMap((file) => {
      const source = readFileSync(new URL(file, blogDir), 'utf8');
      if (!/^canonicalUrl:/m.test(source)) return [];
      const lang = /^lang:\s*["']?(es|en)/m.exec(source)?.[1];
      return [new URL(`${lang === 'en' ? '/en' : ''}/blog/${file.replace(/\.md$/, '')}/`, site).href];
    })
);

// https://astro.build/config
export default defineConfig({
  site,

  // Booking used to live on its own page; it's now a section of the home.
  redirects: {
    '/booking': '/#booking',
    '/en/booking': '/en/#booking'
  },

  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false
    }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap({ filter: (page) => !republishedPages.has(page) })]
});