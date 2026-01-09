import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
	'/',
	'/pricing',
	'/terms',
	'/privacy',
	'/compliance',
	'/blog(.*)',
	'/sign-in(.*)',
	'/sign-up(.*)',
	'/api/webhooks/stripe',
	'/sitemap.xml',
	'/robots.txt',
	// Tool routes (SEO landing pages)
	'/split',
	'/merge',
	'/compress',
	'/organize',
	'/images-to-pdf',
	'/pdf-to-images',
	'/page-numbers',
	'/protect',
	'/unlock',
	'/watermark',
	'/split-by-bookmarks',
	'/remove-blank-pages',
	'/repair',
	'/annotate',
	'/sign',
	'/fill-forms',
	'/ocr',
	'/compare',
	'/edit-metadata',
	'/pdf-to-html',
]);

// Old domains that should redirect to the new domain
const OLD_DOMAINS = ['docslicer.com', 'www.docslicer.com', 'docslicer.onrender.com'];
const NEW_DOMAIN = 'www.pdfwonderkit.com';

export default clerkMiddleware(async (auth, request) => {
	const hostname = request.headers.get('host') || '';
	
	// 301 redirect from old domains to new domain
	if (OLD_DOMAINS.some(domain => hostname.includes(domain))) {
		const url = new URL(request.url);
		url.hostname = NEW_DOMAIN;
		url.protocol = 'https:';
		return NextResponse.redirect(url.toString(), 301);
	}
	
	if (!isPublicRoute(request)) {
		await auth.protect();
	}
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
};
