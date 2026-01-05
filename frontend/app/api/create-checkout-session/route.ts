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

		const body = await req.json();
		const { priceId } = body;

		if (!priceId) {
			return NextResponse.json(
				{ error: 'Price ID is required' },
				{ status: 400 }
			);
		}

		// Get or create Stripe customer
		const email = user.emailAddresses[0]?.emailAddress;
		if (!email) {
			return NextResponse.json(
				{ error: 'User email not found' },
				{ status: 400 }
			);
		}

		// Check if user already has a Stripe customer ID
		let customerId = user.publicMetadata.stripeCustomerId as string | undefined;

		if (!customerId) {
			// Create new Stripe customer
			const customer = await stripe.customers.create({
				email,
				metadata: {
					clerkUserId: userId,
				},
			});
			customerId = customer.id;
		}

		// Create checkout session
		const session = await stripe.checkout.sessions.create({
			customer: customerId,
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			mode: 'subscription',
			success_url: `${process.env.NEXT_PUBLIC_APP_URL || req.headers.get('origin')}/dashboard?success=true`,
			cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || req.headers.get('origin')}/pricing?canceled=true`,
			metadata: {
				clerkUserId: userId,
			},
		});

		return NextResponse.json({ sessionId: session.id, url: session.url });
	} catch (error) {
		console.error('Error creating checkout session:', error);
		const errorMessage = error instanceof Error ? error.message : 'Internal server error';
		return NextResponse.json(
			{ 
				error: 'Failed to create checkout session',
				details: errorMessage,
				// Include more debug info in development
				...(process.env.NODE_ENV === 'development' && { stack: error instanceof Error ? error.stack : undefined })
			},
			{ status: 500 }
		);
	}
}
