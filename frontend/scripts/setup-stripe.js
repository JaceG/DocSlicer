#!/usr/bin/env node

/**
 * Stripe Product Setup Script
 * Creates subscription products and prices for PDF Slicer
 */

// Load environment variables
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function setupStripeProducts() {
  console.log('🚀 Setting up Stripe products...\n');

  try {
    // Create the Premium product
    console.log('Creating Premium product...');
    const product = await stripe.products.create({
      name: 'PDF Wonder Kit Premium',
      description: 'Unlimited PDFs, larger files, ZIP downloads, and no ads',
      metadata: {
        features: JSON.stringify([
          'Unlimited PDFs',
          '100MB file size limit',
          'Unlimited page ranges',
          'ZIP downloads',
          'No ads',
          'Priority processing',
          'Cloud saves for 7 days'
        ])
      }
    });
    console.log('✅ Product created:', product.id);

    // Create monthly price ($2/month)
    console.log('\nCreating monthly price ($2/month)...');
    const monthlyPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: 200, // $2.00 in cents
      currency: 'usd',
      recurring: {
        interval: 'month',
        interval_count: 1,
      },
      nickname: 'Monthly',
    });
    console.log('✅ Monthly price created:', monthlyPrice.id);

    // Create yearly price ($20/year)
    console.log('\nCreating yearly price ($20/year)...');
    const yearlyPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: 2000, // $20.00 in cents
      currency: 'usd',
      recurring: {
        interval: 'year',
        interval_count: 1,
      },
      nickname: 'Yearly (Save 17%!)',
    });
    console.log('✅ Yearly price created:', yearlyPrice.id);

    // Print the results
    console.log('\n' + '='.repeat(60));
    console.log('✨ SUCCESS! Copy these IDs to your .env file:\n');
    console.log('STRIPE_PRODUCT_ID=' + product.id);
    console.log('STRIPE_PRICE_MONTHLY=' + monthlyPrice.id);
    console.log('STRIPE_PRICE_YEARLY=' + yearlyPrice.id);
    console.log('='.repeat(60));

    return {
      productId: product.id,
      monthlyPriceId: monthlyPrice.id,
      yearlyPriceId: yearlyPrice.id,
    };
  } catch (error) {
    console.error('❌ Error setting up Stripe products:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupStripeProducts();
