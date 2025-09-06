import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import HotjarProvider from '../components/analytics/HotjarProvider';
import AdSenseProvider from '../components/analytics/AdSenseProvider';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

export const metadata: Metadata = {
	title: 'PDF/EPUB Slicer - Split Documents with Ease',
	description:
		'A modern web application to slice PDF and EPUB files by page ranges. Upload, preview, select, and download your document sections.',
	keywords: ['PDF', 'EPUB', 'slicer', 'document', 'split', 'extract pages'],
	icons: {
		icon: '/site-icon.ico',
		shortcut: '/site-icon.ico',
		apple: '/apple-touch-icon.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={inter.variable}>
			<body className='font-sans antialiased'>
				<AdSenseProvider />
				<HotjarProvider />
				<main className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
					{children}
				</main>
			</body>
		</html>
	);
}
