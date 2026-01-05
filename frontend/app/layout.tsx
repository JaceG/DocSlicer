import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import HotjarProvider from '../components/analytics/HotjarProvider';
import ErrorBoundary from '../components/ErrorBoundary';
import { ClerkProvider } from '@clerk/nextjs';
// import AdSenseProvider from '../components/analytics/AdSenseProvider';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

export const metadata: Metadata = {
	metadataBase: new URL('https://www.docslicer.com'),
	title: {
		default: 'PDF Slicer - Split PDF Documents with Ease | DocSlicer',
		template: '%s | PDF Slicer',
	},
	description:
		'Split PDFs into smaller documents in seconds. 100% private & secure - your files never leave your device. Free plan available. Extract, split, and slice PDF pages effortlessly.',
	keywords: [
		'PDF slicer',
		'split PDF',
		'PDF splitter',
		'extract PDF pages',
		'split PDF online',
		'PDF page extractor',
		'divide PDF',
		'separate PDF pages',
		'PDF tool',
		'free PDF splitter',
		'secure PDF processing',
		'private PDF editor',
	],
	authors: [{ name: 'DocSlicer' }],
	creator: 'DocSlicer',
	publisher: 'DocSlicer',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	icons: {
		icon: [
			{ url: '/icon.svg', type: 'image/svg+xml' },
			{ url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		shortcut: '/favicon.ico',
		apple: [
			{ url: '/apple-touch-icon.svg', type: 'image/svg+xml' },
			{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
		],
	},
	manifest: '/site.webmanifest',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://www.docslicer.com',
		siteName: 'PDF Slicer - DocSlicer',
		title: 'PDF Slicer - Split PDF Documents with Ease',
		description:
			'Split PDFs into smaller documents in seconds. 100% private & secure - your files never leave your device. Free plan available.',
		images: [
			{
				url: '/og-image.svg',
				width: 1200,
				height: 630,
				alt: 'PDF Slicer - Split PDF Documents',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'PDF Slicer - Split PDF Documents with Ease',
		description:
			'Split PDFs into smaller documents in seconds. 100% private & secure - your files never leave your device.',
		images: ['/og-image.svg'],
		creator: '@docslicer',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		// Add your verification codes when ready
		// google: 'your-google-verification-code',
		// yandex: 'your-yandex-verification-code',
		// bing: 'your-bing-verification-code',
	},
	alternates: {
		canonical: 'https://www.docslicer.com',
	},
	other: {
		// 'google-adsense-account': 'ca-pub-9935452437578823',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// JSON-LD structured data for Google
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'PDF Slicer',
		alternateName: 'DocSlicer',
		url: 'https://www.docslicer.com',
		description:
			'Split PDFs into smaller documents in seconds. 100% private & secure - your files never leave your device.',
		applicationCategory: 'BusinessApplication',
		operatingSystem: 'Web Browser',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
			description: 'Free plan with 3 PDFs per month',
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			ratingCount: '127',
		},
		featureList: [
			'Split PDF by page ranges',
			'100% client-side processing',
			'No file uploads - complete privacy',
			'Free tier available',
			'Drag and drop interface',
		],
	};

	return (
		<ClerkProvider>
			<html lang='en' className={inter.variable}>
				<head>
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
					/>
				</head>
				<body className='font-sans antialiased'>
					{/* <AdSenseProvider /> */}
					<HotjarProvider />
					<ErrorBoundary>
						<main className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
							{children}
						</main>
					</ErrorBoundary>
				</body>
			</html>
		</ClerkProvider>
	);
}
