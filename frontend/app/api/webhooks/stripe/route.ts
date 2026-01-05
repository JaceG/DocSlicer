import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { clerkClient } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2025-12-15.clover',
});

// Use the appropriate webhook secret based on environment
const webhookSecret = 
	process.env.NODE_ENV === 'production'
		? process.env.STRIPE_WEBHOOK_SECRET_PRODUCTION!
		: process.env.STRIPE_WEBHOOK_SECRET_DEVELOPMENT!;

export async function POST(req: Request) {
	const body = await req.text();
	const signature = (await headers()).get('stripe-signature');

	if (!signature) {
		return NextResponse.json(
			{ error: 'No signature' },
			{ status: 400 }
		);
	}

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
	} catch (err) {
		console.error('Webhook signature verification failed:', err);
		return NextResponse.json(
			{ error: 'Invalid signature' },
			{ status: 400 }
		);
	}

	try {
		switch (event.type) {
			case 'checkout.session.completed': {
				const session = event.data.object as Stripe.Checkout.Session;
				const clerkUserId = session.metadata?.clerkUserId;

				if (!clerkUserId) {
					console.error('No Clerk user ID in session metadata');
					break;
				}

				// Update user metadata with subscription info
				await (await clerkClient()).users.updateUserMetadata(clerkUserId, {
					publicMetadata: {
						subscription: {
							tier: 'premium',
							stripeCustomerId: session.customer as string,
							stripeSubscriptionId: session.subscription as string,
						},
						stripeCustomerId: session.customer as string,
					},
				});

				console.log(`Subscription activated for user ${clerkUserId}`);
				break;
			}

			case 'customer.subscription.updated': {
				const subscription = event.data.object as Stripe.Subscription;
				const customerId = subscription.customer as string;

				// Find user by Stripe customer ID
				const users = await (await clerkClient()).users.getUserList({
					limit: 1,
				});

				const user = users.data.find(
					(u) => u.publicMetadata.stripeCustomerId === customerId
				);

				if (user) {
					const isActive = subscription.status === 'active';
					await (await clerkClient()).users.updateUserMetadata(user.id, {
						publicMetadata: {
							subscription: {
								tier: isActive ? 'premium' : 'free',
								stripeCustomerId: customerId,
								stripeSubscriptionId: subscription.id,
								currentPeriodEnd: subscription.currentPeriodEnd,
								cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
							},
						},
					});

					console.log(`Subscription updated for user ${user.id}`);
				}
				break;
			}

			case 'customer.subscription.deleted': {
				const subscription = event.data.object as Stripe.Subscription;
				const customerId = subscription.customer as string;

				// Find user by Stripe customer ID
				const users = await (await clerkClient()).users.getUserList({
					limit: 1,
				});

				const user = users.data.find(
					(u) => u.publicMetadata.stripeCustomerId === customerId
				);

				if (user) {
					await (await clerkClient()).users.updateUserMetadata(user.id, {
						publicMetadata: {
							subscription: {
								tier: 'free',
								stripeCustomerId: customerId,
							},
						},
					});

					console.log(`Subscription cancelled for user ${user.id}`);
				}
				break;
			}

			default:
				console.log(`Unhandled event type: ${event.type}`);
		}

		return NextResponse.json({ received: true });
	} catch (error) {
		console.error('Error processing webhook:', error);
		return NextResponse.json(
			{ error: 'Webhook processing failed' },
			{ status: 500 }
		);
	}
}
