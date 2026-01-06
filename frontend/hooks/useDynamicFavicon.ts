'use client';

import { useEffect } from 'react';

interface ToolColors {
	from: string;
	to: string;
}

// Map of tool color classes to actual hex colors
const COLOR_MAP: Record<string, ToolColors> = {
	blue: { from: '#3b82f6', to: '#2563eb' },
	indigo: { from: '#6366f1', to: '#4f46e5' },
	emerald: { from: '#10b981', to: '#059669' },
	purple: { from: '#a855f7', to: '#9333ea' },
	orange: { from: '#f97316', to: '#ea580c' },
	cyan: { from: '#06b6d4', to: '#0891b2' },
	rose: { from: '#f43f5e', to: '#e11d48' },
	amber: { from: '#f59e0b', to: '#d97706' },
	sky: { from: '#0ea5e9', to: '#0284c7' },
	violet: { from: '#8b5cf6', to: '#7c3aed' },
	teal: { from: '#14b8a6', to: '#0d9488' },
	red: { from: '#ef4444', to: '#dc2626' },
	stone: { from: '#78716c', to: '#57534e' },
	pink: { from: '#ec4899', to: '#db2777' },
	lime: { from: '#84cc16', to: '#65a30d' },
	fuchsia: { from: '#d946ef', to: '#c026d3' },
	yellow: { from: '#eab308', to: '#ca8a04' },
	slate: { from: '#64748b', to: '#475569' },
	zinc: { from: '#71717a', to: '#52525b' },
};

function extractColorFromClass(colorClass: string): ToolColors {
	// Extract color name from class like "bg-gradient-to-br from-blue-500 to-blue-600"
	const match = colorClass.match(/from-(\w+)-\d+/);
	if (match && COLOR_MAP[match[1]]) {
		return COLOR_MAP[match[1]];
	}
	return COLOR_MAP.blue; // Default to blue
}

function generateFaviconSvg(colors: ToolColors, iconPath: string): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
		<defs>
			<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" style="stop-color:${colors.from};stop-opacity:1" />
				<stop offset="100%" style="stop-color:${colors.to};stop-opacity:1" />
			</linearGradient>
		</defs>
		<rect width="32" height="32" rx="6" fill="url(#grad)"/>
		<g transform="translate(6, 6)" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			${iconPath}
		</g>
	</svg>`;
}

// Simplified icon paths for common tools (20x20 viewBox, translated to center)
const ICON_PATHS: Record<string, string> = {
	split: '<circle cx="10" cy="4" r="2"/><circle cx="10" cy="16" r="2"/><path d="M10 6v4m0 2v4"/>',
	merge: '<path d="M4 6h12M4 10h12M4 14h12"/>',
	compress: '<path d="M4 14l6-6 6 6M10 8v10"/>',
	organize: '<path d="M1 1h8v8H1zM11 1h8v8h-8zM1 11h8v8H1zM11 11h8v8h-8z"/>',
	'images-to-pdf': '<rect x="2" y="2" width="16" height="16" rx="2"/><circle cx="7" cy="7" r="2"/><path d="M18 14l-4-4-6 6"/>',
	'pdf-to-images': '<rect x="2" y="2" width="16" height="16" rx="2"/><path d="M2 14l4-4 3 3 4-4 5 5"/>',
	'page-numbers': '<path d="M4 4h12M4 10h12M4 16h8"/><text x="16" y="18" font-size="8" fill="white">#</text>',
	protect: '<rect x="5" y="9" width="10" height="9" rx="1"/><path d="M7 9V6a3 3 0 1 1 6 0v3"/>',
	unlock: '<rect x="5" y="9" width="10" height="9" rx="1"/><path d="M7 9V6a3 3 0 1 1 6 0"/>',
	watermark: '<path d="M10 2v16M6 6l4-4 4 4M6 14l4 4 4-4"/>',
	'split-bookmarks': '<path d="M4 2h12v16l-6-4-6 4z"/>',
	'remove-blanks': '<path d="M4 2h12v16H4zM8 8l4 4M12 8l-4 4"/>',
	repair: '<path d="M14 2l4 4-10 10H4v-4z"/>',
	annotate: '<path d="M4 16h2l8-8-2-2-8 8zM12 6l2 2"/>',
	sign: '<path d="M2 18c2-2 4-4 6-2s4 0 6-2 4-4 4-4"/>',
	forms: '<rect x="2" y="2" width="16" height="16" rx="2"/><path d="M6 6h8M6 10h8M6 14h4"/>',
	ocr: '<circle cx="10" cy="10" r="6"/><path d="M14 14l4 4"/>',
	compare: '<path d="M8 2v16M4 6h8M4 10h8M4 14h8M12 6h4M12 10h4M12 14h4"/>',
	metadata: '<circle cx="10" cy="10" r="8"/><path d="M10 6v1M10 10v4"/>',
};

export function useDynamicFavicon(toolId: string, colorClass: string) {
	useEffect(() => {
		const colors = extractColorFromClass(colorClass);
		const iconPath = ICON_PATHS[toolId] || ICON_PATHS.split;
		const svgString = generateFaviconSvg(colors, iconPath);
		
		// Convert SVG to data URL
		const encodedSvg = encodeURIComponent(svgString);
		const dataUrl = `data:image/svg+xml,${encodedSvg}`;
		
		// Find or create the favicon link element
		let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
		if (!link) {
			link = document.createElement('link');
			link.rel = 'icon';
			document.head.appendChild(link);
		}
		
		// Update the favicon
		link.type = 'image/svg+xml';
		link.href = dataUrl;
		
		// Also update apple-touch-icon if it exists
		const appleIcon = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement;
		if (appleIcon) {
			appleIcon.href = dataUrl;
		}
	}, [toolId, colorClass]);
}
