// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

import robotsTxt from 'astro-robots-txt';



// https://astro.build/config
export default defineConfig({
    site: 'https://nye.today',
  integrations: [tailwind(), react({
      include: ['**/react/*'], experimentalReactChildren: true
    }), sitemap(), robotsTxt()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    }
  })
});