import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

/**
 * Development-only endpoint to upgrade current user to premium
 * WARNING: This should NEVER be enabled in production!
 */
export async function POST() {
	// Only allow in development
	if (process.env.NODE_ENV === 'production') {
		return NextResponse.json(
			{ error: 'This endpoint is disabled in production' },
			{ status: 403 }
		);
	}

	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json(
				{ error: 'Not authenticated' },
				{ status: 401 }
			);
		}

		// Update user metadata to premium
		await (await clerkClient()).users.updateUserMetadata(userId, {
			publicMetadata: {
				subscription: {
					tier: 'premium',
				},
			},
		});

		return NextResponse.json({
			success: true,
			message: 'Upgraded to premium! Refresh the page.',
		});
	} catch (error) {
		console.error('Error upgrading to premium:', error);
		return NextResponse.json(
			{ error: 'Failed to upgrade' },
			{ status: 500 }
		);
	}
}

/**
 * Development-only endpoint to downgrade current user to free
 */
export async function DELETE() {
	// Only allow in development
	if (process.env.NODE_ENV === 'production') {
		return NextResponse.json(
			{ error: 'This endpoint is disabled in production' },
			{ status: 403 }
		);
	}

	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json(
				{ error: 'Not authenticated' },
				{ status: 401 }
			);
		}

		// Update user metadata to free
		await (await clerkClient()).users.updateUserMetadata(userId, {
			publicMetadata: {
				subscription: {
					tier: 'free',
				},
			},
		});

		return NextResponse.json({
			success: true,
			message: 'Downgraded to free! Refresh the page.',
		});
	} catch (error) {
		console.error('Error downgrading to free:', error);
		return NextResponse.json(
			{ error: 'Failed to downgrade' },
			{ status: 500 }
		);
	}
}
