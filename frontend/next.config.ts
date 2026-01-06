import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	// Disable x-powered-by header
	poweredByHeader: false,

	// Compression
	compress: true,

	webpack: (config, { isServer }) => {
		// Fix for PDF.js in browser
		if (!isServer) {
			config.resolve.alias.canvas = false;
			config.resolve.alias.encoding = false;
		}

		// Handle PDF.js worker
		config.resolve.alias = {
			...config.resolve.alias,
			'pdfjs-dist/build/pdf.worker.min.mjs':
				'pdfjs-dist/build/pdf.worker.min.mjs',
		};

		return config;
	},

	// Build configuration
	typescript: {
		ignoreBuildErrors: false,
	},

	eslint: {
		ignoreDuringBuilds: false,
	},

	// Headers for caching - disable in development to avoid stale assets
	async headers() {
		const isDev = process.env.NODE_ENV === 'development';

		return [
			{
				source: '/_next/static/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: isDev
							? 'no-store, no-cache, must-revalidate, proxy-revalidate'
							: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/favicon.ico',
				headers: [
					{
						key: 'Cache-Control',
						value: isDev ? 'no-cache' : 'public, max-age=86400',
					},
				],
			},
		];
	},
};

export default nextConfig;
