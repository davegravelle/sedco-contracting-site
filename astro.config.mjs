import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	content: {
		collections: true,
	},
	integrations: [tailwind(), sitemap()],
	image: {
		service: { entrypoint: 'astro/assets/services/sharp' }
	},
	site: 'https://sedcocontracting.com ',
});