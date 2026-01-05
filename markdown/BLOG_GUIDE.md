# Blog System Guide

## Overview
The blog is designed as an SEO content marketing channel that:
1. Ranks for high-volume keywords (e.g., "how to split pdf")
2. Provides genuine value to readers
3. Converts readers into PDF Slicer users

---

## File Structure

```
frontend/
├── app/
│   └── blog/
│       ├── page.tsx                           # Blog index (lists all posts)
│       └── how-to-split-pdf-on-computer/
│           └── page.tsx                       # First blog post
│       └── [future-post-slug]/
│           └── page.tsx                       # Add more posts here
├── components/
│   └── blog/
│       └── BlogLayout.tsx                     # Reusable post layout with CTA
└── public/
    └── sitemap.xml                            # Update with new posts
```

---

## Adding a New Blog Post

### Step 1: Create the Post Folder

```bash
mkdir -p frontend/app/blog/your-post-slug
```

### Step 2: Create the Page File

Create `frontend/app/blog/your-post-slug/page.tsx`:

```tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { BlogLayout, BlogPost } from '@/components/blog/BlogLayout';

const postData: BlogPost = {
  slug: 'your-post-slug',
  title: 'Your Post Title (Keep Under 60 Characters)',
  description: 'A compelling description that makes people want to read. Under 160 chars.',
  date: '2026-01-15',  // Publication date
  readTime: '6 min read',
  category: 'Tutorials',  // Tutorials, Tips, Privacy, etc.
  author: 'DocSlicer Team',
  tags: ['keyword1', 'keyword2', 'keyword3'],
  featured: false,  // Set true to feature on blog index
};

export const metadata: Metadata = {
  title: postData.title,
  description: postData.description,
  keywords: ['keyword1', 'keyword2', 'keyword3', 'etc'],
  openGraph: {
    title: postData.title,
    description: postData.description,
    type: 'article',
    publishedTime: postData.date,
    url: `https://www.docslicer.com/blog/${postData.slug}`,
  },
  alternates: {
    canonical: `https://www.docslicer.com/blog/${postData.slug}`,
  },
};

export default function YourPostName() {
  return (
    <BlogLayout post={postData}>
      {/* Your content here using prose styling */}
      <p>
        Introduction paragraph that hooks the reader...
      </p>

      <h2>First Section Heading</h2>
      <p>Content...</p>

      {/* Add callouts, code blocks, etc. */}

      <h2>Conclusion</h2>
      <p>
        Final thoughts and CTA to try{' '}
        <Link href='/' className='text-blue-600 font-semibold hover:underline'>
          PDF Slicer
        </Link>
        .
      </p>
    </BlogLayout>
  );
}
```

### Step 3: Add to Blog Index

Update `frontend/app/blog/page.tsx` - add your post to the `blogPosts` array:

```tsx
const blogPosts = [
  // Existing posts...
  {
    slug: 'your-post-slug',
    title: 'Your Post Title',
    description: 'Brief description for the card...',
    date: '2026-01-15',
    readTime: '6 min read',
    category: 'Tutorials',
    icon: FileText,  // Import from lucide-react
    featured: false,
    tags: ['keyword1', 'keyword2'],
  },
];
```

### Step 4: Update Sitemap

Add to `frontend/public/sitemap.xml`:

```xml
<!-- Blog: Your Post Title -->
<url>
  <loc>https://www.docslicer.com/blog/your-post-slug</loc>
  <lastmod>2026-01-15</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### Step 5: Deploy

Deploy your changes and submit the new URL to Google Search Console.

---

## Content Guidelines

### SEO Best Practices

1. **Title**: Under 60 characters, includes primary keyword
2. **Description**: Under 160 characters, compelling, includes keyword
3. **H1**: Same as title (handled by BlogLayout)
4. **H2s**: Use for major sections, include secondary keywords
5. **H3s**: Use for subsections
6. **Links**: Link to other blog posts and the homepage
7. **Keywords**: Natural usage, 1-2% density

### Content Structure

1. **Quick Answer Box** - Give immediate value
2. **Introduction** - Hook + promise
3. **Table of Contents** - For long posts
4. **Main Content** - Detailed sections
5. **FAQ Section** - Targets long-tail keywords
6. **Conclusion** - Summary + CTA

### Styling Classes

The BlogLayout wraps content in Tailwind prose classes. Use:

```tsx
// Standard paragraphs
<p>Text here...</p>

// Headings (auto-styled)
<h2 id='section-id'>Section Title</h2>
<h3>Subsection</h3>

// Lists
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<ol>
  <li>Step 1</li>
  <li>Step 2</li>
</ol>

// Code blocks
<pre><code>{`code here`}</code></pre>

// Inline code
<code>inline code</code>

// Links
<Link href='/' className='text-blue-600 font-semibold hover:underline'>
  PDF Slicer
</Link>

// Custom callout boxes (use not-prose to escape prose styling)
<div className='not-prose bg-green-50 dark:bg-green-900/20 border-2 border-green-200 rounded-xl p-6'>
  Your custom styled content
</div>
```

---

## Blog Post Ideas

### High-Value Keywords

| Keyword | Monthly Searches | Priority |
|---------|------------------|----------|
| how to split pdf | 27,100 | ✅ Done |
| how to merge pdf | 40,500 | High |
| how to compress pdf | 49,500 | High |
| pdf to word | 301,000 | Medium |
| how to rotate pdf | 18,100 | Medium |
| pdf editor free | 74,000 | High |
| how to remove pages from pdf | 14,800 | High |
| how to add pages to pdf | 6,600 | Medium |

### Suggested Posts

1. **"How to Merge Multiple PDFs into One Document"**
   - Keywords: merge pdf, combine pdf, join pdf
   - Angle: Compare methods, lead to DocSlicer when merge feature launches

2. **"Best Free PDF Tools for Privacy-Conscious Users"**
   - Keywords: secure pdf, private pdf editor
   - Angle: Compare tools, highlight our privacy advantage

3. **"PDF Compression: Reduce File Size Without Quality Loss"**
   - Keywords: compress pdf, reduce pdf size
   - Angle: Explain methods, mention we're adding this feature

4. **"How to Extract Images from a PDF"**
   - Keywords: extract images from pdf
   - Angle: Educational, leads to our tool for page extraction

5. **"PDF Security: What Happens When You Upload to Online Tools?"**
   - Keywords: pdf security, online pdf safety
   - Angle: Privacy education, strong differentiator for us

---

## Analytics & Performance

### Track These Metrics

1. **Organic Traffic** - via Google Search Console
2. **Keyword Rankings** - target top 10 for primary keywords
3. **Conversion Rate** - blog visitors → homepage visits
4. **Bounce Rate** - aim for < 70%
5. **Time on Page** - aim for > 3 minutes

### SEO Tools

- Google Search Console: Rankings, clicks, indexing
- Google Analytics: Traffic, behavior, conversions
- Ahrefs/SEMrush: Keyword research, competitor analysis
- Screaming Frog: Technical SEO audits

---

## Maintenance

### Monthly Tasks

1. Update dates on evergreen content
2. Fix any broken links
3. Add internal links to new posts
4. Update sitemap with new posts
5. Check Search Console for errors

### Quarterly Tasks

1. Review keyword rankings
2. Update outdated information
3. Add new posts based on keyword research
4. Audit and improve low-performing posts

---

## Questions?

Contact: admin@docslicer.com

---

**Last Updated**: January 5, 2026
