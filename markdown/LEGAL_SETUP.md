# Legal Pages Setup Guide

✅ **Terms of Service** and **Privacy Policy** pages have been created!

## 📝 What You Need to Customize

### 1. Contact Email (Required)

Replace `[Your Email Address]` in both files with your actual email:

**Files to update:**
- `/app/terms/page.tsx` (line ~189)
- `/app/privacy/page.tsx` (lines ~182, ~184)

**Example:**
```tsx
<li><strong>Email:</strong> support@pdfwonderkit.com</li>
```

### 2. Legal Jurisdiction (Required)

Replace `[Your Jurisdiction]` in Terms of Service:

**File:** `/app/terms/page.tsx` (line ~173)

**Example:**
```tsx
<p>These Terms shall be governed by the laws of Delaware, United States, without regard to conflict of law provisions.</p>
```

---

## ⚠️ Important Legal Notes

### 1. Have a Lawyer Review

These are **template documents** based on standard SaaS terms. You should:
- Have a lawyer review them for your specific situation
- Customize them for your jurisdiction
- Update them for any specific features you add

### 2. What's Covered

✅ **Terms of Service includes:**
- Subscription terms & payment
- Usage limits & restrictions
- Refund policy (no refunds)
- Liability limitations
- Intellectual property
- Termination rights

✅ **Privacy Policy includes:**
- What data you collect
- How you use data
- Third-party services (Clerk, Stripe, Render)
- **Most important:** Clarifies PDFs are processed client-side only
- GDPR & CCPA rights
- Cookie usage
- Data retention
- Security measures

---

## 🔒 Your Privacy Advantage

The **biggest selling point** in your Privacy Policy:

> **"WE DO NOT UPLOAD, STORE, OR ACCESS YOUR PDF FILES."**
> 
> All PDF processing happens entirely in your web browser. Your documents never leave your device.

This is a HUGE competitive advantage - emphasize it in your marketing!

---

## 📱 Where These Pages Appear

I've added them to:
- ✅ Footer on all pages (Terms, Privacy, Pricing links)
- ✅ Public routes (no login required)
- ✅ Responsive design matching your site

---

## 🌍 Compliance Considerations

### If You Have EU Users (GDPR)
- ✅ Privacy Policy covers data rights
- ✅ Need cookie consent banner (not implemented yet)
- ✅ Need data processing agreements with vendors

### If You Have California Users (CCPA)
- ✅ Privacy Policy covers data rights
- ✅ Need "Do Not Sell" option (not applicable if no data selling)

### General Requirements
- ✅ Terms linked at signup
- ✅ Privacy Policy accessible
- ⚠️ Consider adding checkbox at signup: "I agree to Terms of Service"

---

## 🚀 Next Steps

1. **Replace contact email** in both files
2. **Add your jurisdiction** in Terms
3. **Have lawyer review** (optional but recommended)
4. **Add to signup flow** - Link to Terms during account creation
5. **Consider cookie banner** if required by your jurisdiction

---

## 💡 Pro Tips

### For Extra Protection:
1. **Version your terms** - Keep old versions with effective dates
2. **Email users about changes** - Required for material changes
3. **Log acceptance** - Record when users accept terms
4. **Get lawyer contacts** - Have one available before issues arise

### For Better UX:
1. **Make terms readable** - The current versions are clear and simple
2. **Highlight key points** - Important clauses are bolded
3. **Easy to find** - Footer links on every page

---

## 📄 Files Created

```
/app/terms/page.tsx          - Terms of Service
/app/privacy/page.tsx        - Privacy Policy
/components/ui/Footer.tsx    - Footer with links
```

---

## ⚖️ Disclaimer

**I am not a lawyer.** These templates are for informational purposes only and do not constitute legal advice. You should consult with a qualified attorney to ensure compliance with applicable laws in your jurisdiction.

---

**Good luck with your launch!** 🚀

Legal protection is essential for any SaaS, and you're now covered with professional-looking, comprehensive legal pages.
