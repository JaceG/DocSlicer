# PDF Wonder Kit - Frontend

This is a [Next.js](https://nextjs.org) application for a comprehensive PDF toolkit with 18+ tools including splitting, merging, compression, signing, OCR, and more.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Troubleshooting

### Build Errors (ENOENT: next-font-manifest.json or pages-manifest.json)

If you encounter errors about missing manifest files, this is a known issue with Next.js where the `.next` build cache becomes corrupted. This commonly happens when:
- The dev server is interrupted mid-build
- Rapid file changes trigger conflicting builds
- Adding new pages or tools to the site

**Quick Fix:**

Run the included fix script:

```bash
./fix-build.sh
```

**Manual Fix:**

```bash
# Kill all processes
pkill -9 -f "next dev"

# Clean the build
rm -rf .next
rm -rf node_modules/.cache
npm cache clean --force

# Rebuild
npm run build

# Start dev server
npm run dev
```

### Next.js Version

This project uses Next.js 15.5.9. Do NOT upgrade to Next.js 16 without migrating the webpack configuration to Turbopack, as Next.js 16 has breaking changes.

## Project Structure

```
app/
├── [tool]/          # Dynamic routes for each tool
├── api/             # API routes (Stripe, PDF processing)
├── blog/            # Blog posts and guides
├── dashboard/       # User dashboard
└── pricing/         # Pricing page

components/
├── ads/             # AdSense components
├── analytics/       # Hotjar, AdSense providers
├── slicer/          # PDF splitting components
├── merger/          # PDF merging components
├── compressor/      # PDF compression components
└── ...              # Other tool components

lib/
├── pdf/             # PDF processing utilities
├── security/        # Security configuration
├── subscription/    # Stripe subscription hooks
└── tools/           # Tool configuration and metadata
```

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
STRIPE_SECRET_KEY=your_stripe_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js GitHub repository](https://github.com/vercel/next.js)
