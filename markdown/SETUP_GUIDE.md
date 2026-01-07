# PDF Wonder Kit SaaS Setup Guide

Congratulations! Your PDF Wonder Kit app now has a complete SaaS monetization system with Stripe subscriptions and Clerk authentication. Follow this guide to complete the setup.

## ✅ What's Been Set Up

### 1. Stripe Products & Pricing ✅
- **Premium Monthly**: $2/month
- **Premium Yearly**: $20/year (save $4!)
- Product IDs added to `.env`

### 2. Authentication with Clerk ✅
- Sign in/sign up pages
- User profile management
- Protected routes

### 3. Subscription Management ✅
- Usage tracking (localStorage)
- Tier-based limits
- Upgrade prompts
- User dashboard

### 4. Stripe Integration ✅
- Checkout sessions
- Webhook handling
- Customer portal

---

## 🚀 Next Steps to Go Live

### Step 1: Set Up Clerk (Required)

1. **Create a Clerk account**: Go to https://clerk.com and sign up
2. **Create a new application**
3. **Get your API keys**:
   - Go to **API Keys** in the Clerk dashboard
   - Copy your **Publishable Key** and **Secret Key**
4. **Update your `.env` file**:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

5. **Configure allowed redirect URLs in Clerk**:
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`

### Step 2: Configure Stripe Webhooks (Required)

1. **Install Stripe CLI** (for testing):
   ```bash
   brew install stripe/stripe-cli/stripe
   stripe login
   ```

2. **Forward webhooks to your local server** (development):
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   
3. **Copy the webhook signing secret** and add to `.env`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

4. **For production**, create a webhook endpoint in Stripe Dashboard:
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events to listen for:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`

### Step 3: Test the Flow

1. **Start your development server**:
   ```bash
   cd frontend
   npm run dev
   ```

2. **Open the app**: http://localhost:3000

3. **Test the user journey**:
   - Sign up for a new account
   - Try uploading PDFs (free tier: 3 PDFs, 25MB limit)
   - Click "Upgrade to Premium"
   - Use test card: `4242 4242 4242 4242` (any future date, any CVC)
   - Verify you're upgraded in the dashboard

4. **Test webhooks** (with Stripe CLI running):
   - Complete a test payment
   - Check terminal for webhook events
   - Verify user metadata updated in Clerk

### Step 4: Update Environment Variables

Add this to your `.env`:
```env
# App URL (for redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Change to your production URL
```

---

## 📊 Pricing Tiers

### Free Tier
- ✅ 3 PDFs per month
- ✅ 25MB file size limit
- ✅ Up to 3 page ranges
- ✅ Basic processing
- ❌ No ZIP downloads
- ❌ Ads shown

### Premium Tier ($2/month or $20/year)
- ✅ Unlimited PDFs
- ✅ 100MB file size limit
- ✅ Unlimited page ranges
- ✅ ZIP downloads
- ✅ No ads
- ✅ Priority processing
- ✅ Cloud saves (7 days)

---

## 🔧 Key Files Created

### Authentication
- `middleware.ts` - Clerk authentication middleware
- `app/sign-in/[[...sign-in]]/page.tsx` - Sign in page
- `app/sign-up/[[...sign-up]]/page.tsx` - Sign up page

### Subscription Management
- `lib/subscription/types.ts` - Type definitions
- `lib/subscription/hooks.ts` - React hooks for subscription data
- `lib/subscription/usage.ts` - Usage tracking

### API Routes
- `app/api/create-checkout-session/route.ts` - Stripe checkout
- `app/api/create-portal-session/route.ts` - Customer portal
- `app/api/webhooks/stripe/route.ts` - Webhook handler

### UI Components
- `app/pricing/page.tsx` - Pricing page
- `app/dashboard/page.tsx` - User dashboard
- `components/subscription/UpgradePrompt.tsx` - Upgrade prompts
- `components/subscription/UsageBanner.tsx` - Usage warnings

### Scripts
- `scripts/setup-stripe.js` - Stripe product setup (already run)

---

## 🧪 Testing with Stripe Test Cards

Use these test cards for different scenarios:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

All cards: Use any future expiry date, any 3-digit CVC, any ZIP code.

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Update Clerk keys to production keys
- [ ] Update Stripe keys to live keys (remove `_test_`)
- [ ] Set up production Stripe webhooks
- [ ] Update `NEXT_PUBLIC_APP_URL` to your domain
- [ ] Configure allowed origins in Clerk dashboard
- [ ] Test the complete user flow in production
- [ ] Set up Stripe billing portal configuration
- [ ] Enable Stripe Customer Portal in dashboard

---

## 💡 Tips for Success

### 1. Start with Test Mode
- Keep everything in test mode until you've fully tested
- Use Stripe test cards
- Monitor webhook events in Stripe dashboard

### 2. Monitor Your Users
- Check Clerk dashboard for user signups
- Monitor Stripe dashboard for subscriptions
- Watch for failed webhooks

### 3. Customer Support
- Set up email notifications in Stripe
- Add a support email to your Clerk settings
- Consider adding a help/FAQ page

### 4. Marketing
- Add social proof on pricing page
- Consider adding testimonials
- A/B test pricing (monthly vs yearly emphasis)

---

## 📚 Resources

- **Clerk Docs**: https://clerk.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Stripe Testing**: https://stripe.com/docs/testing

---

## 🐛 Troubleshooting

### Webhooks Not Working
1. Ensure Stripe CLI is running (`stripe listen --forward-to...`)
2. Check webhook signing secret in `.env`
3. Look for errors in terminal/Stripe dashboard

### User Not Upgraded After Payment
1. Check webhook events in Stripe dashboard
2. Verify webhook endpoint is receiving events
3. Check Clerk user metadata was updated
4. Look for errors in API logs

### Authentication Issues
1. Verify Clerk keys are correct
2. Check allowed redirect URLs
3. Clear browser cookies and try again

---

## 🎉 You're All Set!

Your app is now monetized! Here's what happens next:

1. **Users sign up** → They get free tier (3 PDFs/month)
2. **They hit limits** → Upgrade prompts appear
3. **They upgrade** → Stripe checkout → Webhook → Premium activated
4. **They manage billing** → Stripe Customer Portal

**Need help?** Open an issue or check the Stripe/Clerk documentation.

Good luck with your SaaS! 🚀
