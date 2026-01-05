# AdSense Setup Guide

## ✅ Implementation Complete!

Your PDF/EPUB Slicer app now has Google AdSense fully integrated with strategic ad placements. Here's what has been implemented:

## 🎯 **Ad Placements**

### **Homepage (No Document Uploaded)**
- **Header Ad**: Above file upload area
- **Footer Ad**: Below file upload area

### **PDF Interface**
- **Between Content Ad**: Between document viewer and tools
- **Sidebar Ad**: In the tools section sidebar

### **EPUB Interface**
- **Between Content Ad**: Between viewer and chapter selector
- **Sidebar Ad**: In the tools section sidebar

## 🔧 **Next Steps to Go Live**

### 1. **Get Your Real Ad Slot IDs from AdSense**
1. Sign in to your [Google AdSense account](https://www.google.com/adsense/)
2. Go to **Ads** → **By ad unit**
3. Create ad units for each placement:
   - `header-ad` (Horizontal banner)
   - `footer-ad` (Horizontal banner)
   - `sidebar-ad` (Vertical banner/rectangle)
   - `between-content-ad` (Rectangle/responsive)

### 2. **Update Ad Slot IDs**
Replace the placeholder ad slots in `/components/ads/AdPlacements.tsx`:

```typescript
// Current placeholder values (REPLACE THESE):
export function HeaderAd() {
	return (
		<AdBanner 
			adSlot="1234567890" // ← Replace with your real ad slot ID
			// ...
		/>
	);
}
```

### 3. **Environment Variables (Optional)**
Create `/frontend/.env.local`:

```bash
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-9935452437578823
NEXT_PUBLIC_ADSENSE_ENABLED=true
```

## 🎨 **Ad Visibility Logic**

- **Free Users**: See all ads
- **Pro/Business Users**: No ads shown
- **Easy to Control**: Change `userTier` prop in `ConditionalAds` components

## 🚀 **Testing Your Ads**

### **Development Testing**
```bash
cd frontend
npm run dev
```

### **Production Testing**
1. Deploy to your hosting platform
2. Ads may take 24-48 hours to start showing
3. Use AdSense's "Ad Review Center" to monitor performance

## 📊 **Ad Performance Optimization**

### **Strategic Placement Benefits**
- **Homepage ads**: Capture users before they engage
- **Between-content ads**: High visibility during workflow
- **Sidebar ads**: Persistent visibility without disrupting UX

### **Revenue Optimization Tips**
1. **Monitor CTR** in AdSense dashboard
2. **A/B test ad sizes** (auto vs. fixed dimensions)
3. **Experiment with ad formats** (display, native, matched content)
4. **Track user flow** with your existing Hotjar analytics

## ⚙️ **Technical Implementation Details**

### **Components Created**
- `AdSenseProvider.tsx`: Loads AdSense script
- `AdBanner.tsx`: Reusable ad component
- `AdPlacements.tsx`: Pre-configured ad placements
- `ConditionalAds.tsx`: Smart ad visibility control

### **Features**
- ✅ **Next.js optimized** with proper Script component
- ✅ **TypeScript support** with proper types
- ✅ **Error handling** for failed ad loads
- ✅ **Responsive design** with Tailwind classes
- ✅ **User tier integration** ready for premium features
- ✅ **Accessibility** with proper ARIA labels

## 🔒 **Privacy & Compliance**

Remember to update your privacy policy to mention:
- Google AdSense data collection
- Cookie usage for ads
- User tracking for ad personalization

## 💰 **Expected Revenue**

Based on document processing apps:
- **RPM**: $1-5 per 1000 page views
- **CTR**: 0.5-2% typical for productivity tools
- **Conversion**: Ads → Premium subscriptions boost

Your strategic placement should optimize both ad revenue AND conversion to paid tiers!

## 🎯 **Go Live Checklist**

- [ ] Replace placeholder ad slot IDs with real ones
- [ ] Test on production domain
- [ ] Monitor AdSense approval status
- [ ] Update privacy policy
- [ ] Set up AdSense payment info
- [ ] Configure user tier logic for premium users
- [ ] A/B test ad placements and formats

## 🆘 **Need Help?**

If you encounter issues:
1. Check browser console for AdSense errors
2. Verify ad slot IDs are correct
3. Ensure domain is approved in AdSense
4. Check [AdSense troubleshooting guide](https://support.google.com/adsense/answer/9274019)

**Your ads are ready to start generating revenue! 🚀**
