import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

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
]);

export default clerkMiddleware(async (auth, request) => {
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
