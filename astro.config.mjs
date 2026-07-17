import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// Config runs in Node at build time, not through Vite, so it reads process.env
// directly rather than import.meta.env.
const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://terracoreapp.co';

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    icon(),
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        if (item.url === `${SITE_URL}/`) {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        }
        return item;
      },
    }),
  ],
  site: SITE_URL,
  devToolbar: { enabled: false },
});
