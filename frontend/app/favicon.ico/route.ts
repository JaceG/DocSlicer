import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(request: NextRequest) {
	try {
		// Read the favicon file from the public directory
		const faviconPath = join(process.cwd(), 'public', 'favicon.ico');
		const faviconBuffer = readFileSync(faviconPath);

		// Return the favicon with proper headers
		return new NextResponse(faviconBuffer, {
			status: 200,
			headers: {
				'Content-Type': 'image/x-icon',
				'Cache-Control': 'public, max-age=86400', // Cache for 1 day
			},
		});
	} catch (error) {
		console.error('Error serving favicon:', error);
		return new NextResponse('Favicon not found', { status: 404 });
	}
}
