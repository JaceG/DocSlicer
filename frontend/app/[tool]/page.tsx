import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ALL_TOOLS, getToolBySlug, getAllToolSlugs } from '@/lib/tools/config';
import HomeContent from '@/components/home/HomeContent';

interface ToolPageProps {
	params: Promise<{
		tool: string;
	}>;
}

// Generate static params for all tools at build time
export async function generateStaticParams() {
	return getAllToolSlugs().map((slug) => ({
		tool: slug,
	}));
}

// Generate unique metadata for each tool page
export async function generateMetadata({
	params,
}: ToolPageProps): Promise<Metadata> {
	const { tool: slug } = await params;
	const tool = getToolBySlug(slug);

	if (!tool) {
		return {
			title: 'Tool Not Found',
		};
	}

	const baseUrl = 'https://www.docslicer.com';

	return {
		title: `${tool.label} - Free Online PDF Tool | DocSlicer`,
		description: tool.longDescription,
		keywords: tool.keywords,
		openGraph: {
			title: `${tool.label} - Free Online PDF Tool`,
			description: tool.longDescription,
			url: `${baseUrl}/${tool.slug}`,
			siteName: 'DocSlicer',
			type: 'website',
			images: [
				{
					url: '/og-image.svg',
					width: 1200,
					height: 630,
					alt: tool.label,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: `${tool.label} - Free Online PDF Tool`,
			description: tool.longDescription,
			images: ['/og-image.svg'],
		},
		alternates: {
			canonical: `${baseUrl}/${tool.slug}`,
		},
	};
}

export default async function ToolPage({ params }: ToolPageProps) {
	const { tool: slug } = await params;
	const tool = getToolBySlug(slug);

	if (!tool) {
		notFound();
	}

	return <HomeContent initialTool={tool.id} />;
}
