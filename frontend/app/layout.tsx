import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import HotjarProvider from '../components/analytics/HotjarProvider';
import ErrorBoundary from '../components/ErrorBoundary';
import { ClerkProvider } from '@clerk/nextjs';
import { TOOLS_COUNT } from '@/lib/tools/config';
// import AdSenseProvider from '../components/analytics/AdSenseProvider';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

export const metadata: Metadata = {
	metadataBase: new URL('https://www.pdfwonderkit.com'),
	title: {
		default: `PDF Wonder Kit - Complete PDF Toolkit | ${TOOLS_COUNT} Tools in One`,
		template: '%s | PDF Wonder Kit',
	},
	description: `Complete PDF toolkit with ${TOOLS_COUNT} tools: split, merge, compress, convert to HTML, protect, sign, annotate, OCR, and more. 100% private & secure - your files never leave your device. Free plan available.`,
	keywords: [
		'PDF toolkit',
		'PDF tools',
		'split PDF',
		'merge PDF',
		'compress PDF',
		'sign PDF',
		'annotate PDF',
		'PDF OCR',
		'PDF editor',
		'PDF converter',
		'free PDF tools',
		'secure PDF processing',
		'private PDF editor',
		'PDF wonder kit',
	],
	authors: [{ name: 'PDF Wonder Kit' }],
	creator: 'PDF Wonder Kit',
	publisher: 'PDF Wonder Kit',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	// Next.js will automatically use /app/favicon.ico and /app/icon.svg
	manifest: '/site.webmanifest',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://www.pdfwonderkit.com',
		siteName: 'PDF Wonder Kit',
		title: 'PDF Wonder Kit - Complete PDF Toolkit',
		description: `Complete PDF toolkit with ${TOOLS_COUNT} tools: split, merge, compress, protect, sign, annotate, OCR, and more. 100% private & secure - your files never leave your device.`,
		images: [
			{
				url: '/og-image.svg',
				width: 1200,
				height: 630,
				alt: 'PDF Wonder Kit - Complete PDF Toolkit',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'PDF Wonder Kit - Complete PDF Toolkit',
		description: `${TOOLS_COUNT} PDF tools in one: split, merge, compress, sign, annotate, OCR & more. 100% private & secure - your files never leave your device.`,
		images: ['/og-image.svg'],
		creator: '@pdfwonderkit',
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
		canonical: 'https://www.pdfwonderkit.com',
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
	name: 'PDF Wonder Kit',
	alternateName: 'PDFWonderKit',
	url: 'https://www.pdfwonderkit.com',
		description: `Complete PDF toolkit with ${TOOLS_COUNT} tools: split, merge, compress, protect, sign, annotate, OCR, and more. 100% private & secure - your files never leave your device.`,
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
			ratingValue: '4.9',
			ratingCount: '267',
		},
		featureList: [
			`${TOOLS_COUNT} PDF tools in one platform`,
			'Split, merge, compress PDFs',
			'Sign and annotate documents',
			'OCR for scanned PDFs (12+ languages)',
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
					{/* Static favicons for Google Search Console and crawlers */}
					<link rel="icon" type="image/x-icon" href="/favicon.ico" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
					<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
					
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
