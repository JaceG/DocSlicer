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

		// Optimize chunks for better loading
		config.optimization = {
			...config.optimization,
			splitChunks: {
				...config.optimization.splitChunks,
				cacheGroups: {
					...config.optimization.splitChunks?.cacheGroups,
					default: {
						minChunks: 2,
						priority: -20,
						reuseExistingChunk: true,
					},
				},
			},
		};

		return config;
	},

	// Experimental features for better compatibility
	experimental: {
		esmExternals: 'loose',
	},

	// Build configuration
	typescript: {
		ignoreBuildErrors: false,
	},

	eslint: {
		ignoreDuringBuilds: false,
	},

	// Headers for better caching
	async headers() {
		return [
			{
				source: '/_next/static/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/favicon.ico',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=86400',
					},
				],
			},
		];
	},
};

export default nextConfig;
