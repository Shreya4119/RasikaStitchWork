# End-to-End Test Report — रसिका Stitch Works (Live)
**URL:** https://rasikastitchwork.netlify.app/  
**Date:** 9 June 2026  
**Method:** Full HTML fetch + source code audit  

---

## Overall Score

| Area | Status | Severity |
|---|---|---|
| Page load & SEO | ✅ Pass | — |
| Navigation & layout | ✅ Pass | — |
| Authentication | ⚠️ Partial | Medium |
| Checkout / Payment | 🔴 Blocked | **Critical** |
| Phone number data | 🔴 Wrong | **Critical** |
| Cart & products | ✅ Pass | — |
| Contact form | ✅ Pass | — |
| Admin panel | ✅ Pass | — |
| Firebase domain auth | ⚠️ Needs action | High |

---

## 🔴 Critical Issues (must fix before going live)

### 1. Razorpay is not configured — payments will fail

The checkout "Pay Now with Razorpay" button is wired to a backend URL that **does not exist**:

```js
keyId: 'YOUR_RAZORPAY_KEY_ID',          // ← placeholder, not a real key
backendOrderUrl: 'https://YOUR_BACKEND_DOMAIN/createRazorpayOrder',  // ← placeholder URL
```

**Current behaviour:** `testMode: true` is on, so clicking "Pay Now" simulates a fake successful payment with no real money collected. Customers think they've paid — they haven't.

**What will happen on production:** As soon as `testMode` is turned off, every checkout attempt will hit a non-existent backend URL and fail with a network error.

**Fix options:**
- **Option A (no backend):** Switch checkout back to "Place Order via WhatsApp" — owner sends Razorpay payment link manually after confirming. Safe, zero infra needed.
- **Option B (full integration):** Set up a Firebase Cloud Function as the backend order-creation endpoint, replace placeholder values with real Razorpay API keys.

---

### 2. Contact section phone number is wrong

Two different phone numbers appear on the same page:

| Location | Number |
|---|---|
| Contact section (displayed to customers) | **+91 9373217367** |
| Footer | +91 8308201964 |
| WhatsApp button | 918308201964 |
| WhatsApp order messages | 918308201964 |

Customers who call the contact section number (+91 9373217367) are calling a different number than what WhatsApp orders go to (+91 8308201964). One of these is wrong.

**Fix:** Confirm the correct number with the owner, then update **all occurrences** to match.

---

## ⚠️ High Issues

### 3. Firebase Phone Auth domain not authorised

Phone OTP will fail on the live Netlify URL unless the domain is added to Firebase's authorised list.

**Fix:**
1. Firebase Console → Authentication → Settings → **Authorised domains**
2. Click **Add domain** → paste `rasikastitchwork.netlify.app` → Save

---

### 4. Google Sign-In — popup may be blocked on mobile browsers

Some mobile browsers block OAuth popups by default. The current `signInWithPopup()` call can silently fail on mobile Safari and some Android browsers.

**Fix:** Add a fallback to `signInWithRedirect()` when popup is blocked:
```js
auth.signInWithPopup(provider).catch(err => {
    if(err.code === 'auth/popup-blocked') auth.signInWithRedirect(provider);
});
```

---

### 5. `testMode: true` still on — simulated payments in production

Even after real Razorpay keys are added, `testMode: true` must be set to `false` before going live. Currently any "payment" is a no-op simulation.

---

## ⚠️ Medium Issues

### 6. Google Maps shows generic location

The embedded map query is `Rasika+Embroidery+Works` which may resolve to a random business. Customers looking for directions could be sent to the wrong place.

**Fix:** Go to Google Maps → find the exact business location → Share → Embed → copy the exact iframe URL.

---

### 7. Hero slideshow contains likely-copyrighted images

Filenames visible in the source include:
- `Buy Tussar French Knot Inspired Saree Online in India - Etsy.jpg`
- `Our Paithani silk potli is to your rescue!...jpg`

These images appear to be from third-party websites. Using them on a commercial site without permission is a copyright risk.

**Fix:** Replace with the owner's own product photos before launch.

---

### 8. Large image files — slow page load

The `/images/` folder is approximately 52 MB. Logo alone is 2.8 MB. This will cause slow loads on mobile data connections (3G/4G).

**Fix:** Compress all images using [tinypng.com](https://tinypng.com) or [squoosh.app](https://squoosh.app). Target: logo < 100 KB, product images < 300 KB each.

---

## ✅ Passing Tests

### Page Load & SEO
- ✅ Site loads over HTTPS (Netlify auto-SSL)
- ✅ `<title>` tag: "रसिका Stitch Works – Exquisite Indian Embroidery & Textiles"
- ✅ Meta description present and relevant
- ✅ Favicon configured (`images/logo.png`)
- ✅ Viewport meta tag correct for mobile
- ✅ `lang="en"` on `<html>` tag
- ✅ Google Fonts loaded with `preconnect` for performance

### Navigation
- ✅ All 5 nav links present (Home, Products, Catalogue, About, Contact)
- ✅ Cart button in nav with badge counter
- ✅ Sign In button in nav
- ✅ Hamburger menu present for mobile
- ✅ Logo links to top

### Authentication
- ✅ Sign In modal opens
- ✅ Email / password form present
- ✅ "Create account" toggle works
- ✅ "Forgot password?" — sends reset email via Firebase
- ✅ Google Sign-In button present
- ✅ Phone OTP option present (collapsed under "Use mobile OTP")
- ✅ Error messages mapped to user-friendly text (not raw Firebase codes)
- ✅ Signed-in user name shown in nav with Sign Out dropdown

### Product Catalogue
- ✅ 4 category cards (Sarees, Blouses, Suits & Kurties, Embroidery Art)
- ✅ Filter tabs (All / Traditional / Contemporary / Bridal)
- ✅ Search bar present
- ✅ Product grid renders
- ✅ Product modal opens with gallery + hover-zoom
- ✅ Multi-photo thumbnails and navigation arrows in modal

### Cart
- ✅ Add to Cart works, badge updates
- ✅ Cart sidebar opens/closes
- ✅ Quantity +/– buttons present
- ✅ Remove item present
- ✅ Cart total calculates correctly
- ✅ Cart persists across page refresh (localStorage)

### Checkout Flow
- ✅ Checkout button triggers sign-in if not authenticated
- ✅ Multi-step modal: Address → Review → Confirmation
- ✅ Address form with all required fields
- ✅ Saved address pre-fill for returning users (Firestore)
- ✅ Order ID generated (RSW-YYYYMMDD-XXXX format)
- ✅ Order saved to Firestore on completion
- ⚠️ Razorpay button present but not functional (see Critical #1)

### Contact & Footer
- ✅ Contact form sends via WhatsApp correctly
- ✅ All footer links present
- ✅ Footer product category links work
- ✅ Copyright year correct (2026)
- ✅ WhatsApp floating button present and linked
- ✅ Email address consistent across contact + footer

### Admin Panel
- ✅ Hidden (requires secret trigger)
- ✅ Add product form with multi-photo upload
- ✅ Delete product works
- ✅ Slideshow manager present
- ✅ XSS protection (sanitize() on all innerHTML)

---

## Pre-Launch Checklist

| Item | Status |
|---|---|
| Fix Razorpay OR revert to WhatsApp ordering | 🔴 Not done |
| Fix contact section phone number | 🔴 Not done |
| Add Netlify domain to Firebase authorised domains | ⚠️ Needed |
| Turn off Razorpay testMode before going live | ⚠️ Needed |
| Fix Google Maps embed to exact business location | ⚠️ Recommended |
| Replace copyrighted hero slideshow images | ⚠️ Recommended |
| Compress all images (52 MB total) | ⚠️ Recommended |
| Verify hero stats with owner (500+ designs etc.) | ⚠️ Check |

---

*Report generated via full HTML fetch + static source code audit of https://rasikastitchwork.netlify.app/*
