import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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

	// Experimental features for better compatibility
	experimental: {
		esmExternals: 'loose',
	},

	// Ignore build errors from pdfjs-dist during development
	typescript: {
		ignoreBuildErrors: false,
	},

	eslint: {
		ignoreDuringBuilds: false,
	},
};

export default nextConfig;
