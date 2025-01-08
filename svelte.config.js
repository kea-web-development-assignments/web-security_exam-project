import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			'$node-modules': './node_modules',
		},
		csrf: {
			checkOrigin: true,
		},
		csp: {
			directives: {
				'default-src': [
					'self',
					'http://api.mapbox.com/',
					'https://*.mapbox.com/',
					'unsafe-inline'
				],
				'img-src': [
					'self',
					'data:',
					process.env.PUBLIC_DO_SPACES_IMAGE_CDN,
				],
				'script-src': [
					'self',
					'blob:',
					'http://api.mapbox.com/',
					'unsafe-inline'
				]
			},
		}
	},
	preprocess: vitePreprocess(),
};

export default config;
