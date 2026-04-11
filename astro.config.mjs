// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://glenrobisonrealestate.com',
  integrations: [sitemap({
    filter: (page) => !page.includes('/admin') && !page.includes('/all-pages'),
  })],
  vite: {
    plugins: [tailwindcss()],
  },
});
