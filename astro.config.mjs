import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

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
        if (item.url === 'https://terracoreapp.co/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        }
        return item;
      },
    }),
  ],
  site: 'https://terracoreapp.co',
  devToolbar: { enabled: false },
});
