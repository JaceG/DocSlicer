import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	// Disable x-powered-by header
	poweredByHeader: false,

	// Compression
	compress: true,

	// SEO: Redirect non-www to www for canonical URL consistency
	async redirects() {
		return [
			{
				source: '/:path*',
				has: [
					{
						type: 'host',
						value: 'pdfwonderkit.com',
					},
				],
				destination: 'https://www.pdfwonderkit.com/:path*',
				permanent: true, // 301 redirect for SEO
			},
		];
	},

	// Increase body size limit for PDF uploads (default is 1MB)
	serverActions: {
		bodySizeLimit: '100mb', // Allow up to 100MB for PDF uploads
	},

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

	// Headers for caching and security
	async headers() {
		const isDev = process.env.NODE_ENV === 'development';

		return [
			{
				// Cache static assets
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
			{
				// Serve webmanifest with correct content type
				source: '/site.webmanifest',
				headers: [
					{
						key: 'Content-Type',
						value: 'application/manifest+json',
					},
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
