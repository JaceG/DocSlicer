import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2025-12-15.clover',
});

export async function POST(req: Request) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		const user = await currentUser();
		if (!user) {
			return NextResponse.json(
				{ error: 'User not found' },
				{ status: 404 }
			);
		}

		// Get Stripe customer ID from user metadata
		const customerId = user.publicMetadata.stripeCustomerId as string | undefined;

		if (!customerId) {
			return NextResponse.json(
				{ error: 'No subscription found' },
				{ status: 400 }
			);
		}

		// Create portal session
		const session = await stripe.billingPortal.sessions.create({
			customer: customerId,
			return_url: `${process.env.NEXT_PUBLIC_APP_URL || req.headers.get('origin')}/dashboard`,
		});

		return NextResponse.json({ url: session.url });
	} catch (error) {
		console.error('Error creating portal session:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
