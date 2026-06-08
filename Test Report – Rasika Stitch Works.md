# Test Report — Rasika Stitch Works Website
**Date:** 8 June 2026  
**Tested by:** Claude (automated code + asset audit)  
**Scope:** Functional / UI, Content & Copy, Performance / SEO, Security

---

## Summary

| Area | Status | Issues Found |
|---|---|---|
| Functional / UI | ⚠️ Mostly working | 2 bugs (contact form, footer links) |
| Content & Copy | ⚠️ Minor issues | Brand name inconsistency, wrong category labels |
| Performance / SEO | ❌ Needs work | Missing meta description, 13 oversized images, 2.8 MB logo |
| Security | 🔴 Critical items | Admin password = "admin", XSS risk in innerHTML |

---

## 1. Functional / UI Testing

### ✅ Passing

- Navigation links scroll to correct sections (Home, Products, Catalogue, About, Contact)
- Logo links back to top
- Hamburger menu appears on mobile and toggles correctly
- Hero slideshow auto-advances every 4.5 s; prev/next/dot controls work
- All 4 product category cards open the catalogue and apply the correct filter
- Catalogue filter tabs (All / Traditional / Contemporary / Bridal) function correctly
- Search bar filters products in real time by name and category
- "Add to Cart" button adds item and updates the cart badge count
- Duplicate items increment quantity correctly instead of creating a second row
- Cart sidebar opens and closes; overlay click closes it
- Quantity +/– buttons work in cart; total updates correctly
- Remove item from cart works
- Cart persists after page refresh (localStorage ✓)
- Product modal opens with correct image, name, price, description, and category
- Quantity selector in modal works and carries correct quantity into cart
- Toast notifications appear and auto-dismiss
- WhatsApp floating button is present and links to correct number (+91 8308201964)
- "Place Order via WhatsApp" button in cart generates a formatted order message correctly
- Admin panel opens when typing "admin" on keyboard (not focused on an input)
- Admin panel: adding a product appears in the catalogue immediately
- Admin panel: deleting a product removes it from the catalogue and cart
- Admin slideshow manager: captions and featured-product assignment work; Save/Reset work

---

### ❌ Bugs Found

#### Bug 1 — Critical: Contact form does not actually send messages
**Location:** `submitForm()` function, line 1158  
**Problem:** The form submission handler shows a success toast ("Message sent!") and resets the form, but no data is ever sent anywhere. There is no backend, no email service (Formspree, Netlify Forms, etc.), and no API call. A customer who fills in the form believes their message was received — it was not.  
**Fix:** Integrate Formspree (free, 50 submissions/month):
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```
Or wire up the existing `submitForm` to a `fetch()` POST to a Formspree/EmailJS endpoint. Remove the fake success toast until the backend is live.

---

#### Bug 2 — Footer "Our Products" links use wrong category names
**Location:** `index.html` lines 809–812  
**Problem:** Two footer links call `filterToCategory()` with values that don't match any product in the data:

| Footer Link | Calls | Actual category name |
|---|---|---|
| Embroidery Designs | `filterToCategory('Embroidery')` | `'Embroidery Designs'` |
| Dresses | `filterToCategory('Dresses')` | — doesn't exist (it's `'Suits & Kurties'`) |

Clicking either link populates the search box with the wrong text and shows zero results.

**Fix:**
```js
// Line 809
onclick="filterToCategory('Embroidery Designs')"

// Line 812 — change label AND value
<li><a href="#" onclick="filterToCategory('Suits &amp; Kurties')">Suits &amp; Kurties</a></li>
```

---

### ⚠️ Warnings

- The `scrollTo(sel)` custom function shadows the native `window.scrollTo`. This works fine for now but could silently break third-party scripts added later (e.g. analytics, payment SDKs). Rename it to `smoothScrollTo(sel)` to be safe.
- Admin panel has no confirmation dialog before deleting a product. Accidental deletions are permanent in the current session.

---

## 2. Content & Copy Review

### ❌ Brand Name Inconsistent
The brand appears under four different spellings across the page:

| Location | Text shown |
|---|---|
| Nav logo | रासिका Stitch Works |
| Hero h1 | रासिका Stitchwork |
| About badge | रासिका Stitchwork |
| Footer copyright | रासिका Stitchwork |
| Page `<title>` | रासिका Stitch Works |

**Fix:** Decide on one canonical form — "रासिका Stitch Works" matches the nav and title — and apply it everywhere.

---

### ⚠️ Other Copy Issues

- **About section description** mentions "custom bridal blouses, suits & kurties, rangoli mats, wall art, and bespoke embroidery" — good and accurate. No factual errors found.
- **Stats on hero** (500+ Designs, 1000+ Happy Clients, 15+ Years Experience) — verify these are accurate before going live; they are marketing claims.
- **Business hours** (Mon–Sat 10 AM–7 PM, Sunday Closed) — confirm with the owner.
- **Google Maps iframe** uses the generic query `Rasika+Embroidery+Works` which may resolve to a random listing. Update with the business's exact Maps link or embed URL from Google Maps → Share → Embed.
- **"Dresses"** appears in the footer product list but there is no Dresses category on the site. Change to "Suits & Kurties" (see Bug 2 above).

---

### ✅ No Issues Found

- Phone number (+91 8308201964) is consistent across Contact section, footer, and WhatsApp link
- Email (rasikaembroidaryworks@gmail.com) is consistent in Contact and footer
- All product names and descriptions are complete and readable
- All `alt` attributes on product and about images are descriptive
- No obvious spelling mistakes found in headings, buttons, or labels
- Hero badge, section headings, and button labels are clear

---

## 3. Performance & SEO Audit

### ❌ Missing SEO Tags
```html
<!-- ADD these inside <head> -->
<meta name="description" content="Shop exquisite hand-embroidered sarees, bridal blouses, suits and embroidery art by Rasika Stitch Works. 15+ years of craftsmanship. Pan-India delivery.">
<meta property="og:title" content="रासिका Stitch Works – Indian Embroidery & Textiles">
<meta property="og:description" content="Handcrafted sarees, bridal blouses, suits and embroidery art. Shop or partner wholesale.">
<meta property="og:image" content="images/logo.png">
<link rel="canonical" href="https://YOUR-DOMAIN.com/">
```

---

### ❌ No Favicon
The browser tab shows a blank icon. Add:
```html
<link rel="icon" type="image/png" href="images/logo.png">
```

---

### ❌ Oversized Images — 13 files over 1 MB

This will significantly hurt page load time, especially on mobile. Compress all images at [tinypng.com](https://tinypng.com) or [squoosh.app](https://squoosh.app) before deploying.

| File | Size | Target |
|---|---|---|
| `images/logo.png` | **2.8 MB** | < 100 KB |
| `embroidaryArticles/artwork.png` | 1.9 MB | < 300 KB |
| `embroidaryArticles/Rangoli Maat.png` | 1.7 MB | < 300 KB |
| `embroidaryArticles/Rangoli Mat 2.png` | 1.6 MB | < 300 KB |
| `saree/Saree.png` | 1.7 MB | < 300 KB |
| `saree/Screenshot…161627.png` | 1.6 MB | < 300 KB |
| `saree/Screenshot…162046.png` | 1.7 MB | < 300 KB |
| `saree/Screenshot…161724.png` | 1.6 MB | < 300 KB |
| + 5 more over 1 MB | — | Compress all |

Total images folder: **52 MB** — this should be under 5 MB for a fast website.

---

### ⚠️ Hero Slideshow Uses Likely Copyrighted Images
Several slideshow images have filenames that indicate they were sourced from third-party sites (Etsy, social media):
- `Buy Tussar French Knot Inspired Saree Online in India - Etsy.jpg`
- `Our Paithani silk potli is to your rescue!...jpg`
- `25 Vintage Living Room Ideas for 2024.jpg`

These are likely copyrighted and should be replaced with the owner's own product photos before the site goes live.

---

### ✅ SEO / Performance Passing

- `<title>` tag is meaningful and keyword-rich ✓
- `<meta charset="UTF-8">` and `<meta name="viewport">` present ✓
- `lang="en"` set on `<html>` tag ✓
- Google Fonts loaded with `<link rel="preconnect">` for performance ✓
- `loading="lazy"` on the Google Maps iframe ✓
- `smooth scroll` via CSS `scroll-behavior: smooth` ✓
- All product images have `alt` text ✓
- Responsive breakpoints at 1100px, 768px, and 480px ✓

---

## 4. Security Audit

### 🔴 Critical: Admin trigger word is "admin"
As documented in the Pre-Launch Guide, the current trigger `if(adminBuffer === 'admin')` is trivially guessable. Any visitor who reads the source code or guesses can access the admin panel.

**Fix before launch:** Change `'admin'` to a private passphrase (e.g. `'rsw2026secure'`) in line 1169 of `index.html`. Tell only the business owner.

---

### 🔴 XSS Risk in innerHTML with Unsanitised Admin Input
Functions `renderCatalogue`, `syncCart`, `openProduct`, and `renderAdminList` inject product data (name, description, category) directly into `innerHTML` via template literals. If a product name is added with the admin panel containing `<script>` or `<img onerror=...>` tags, it would execute as JavaScript.

**Fix:** Sanitise strings before inserting into HTML. Add this helper and use it everywhere product data is rendered:
```javascript
function sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
// Then replace ${p.name} with ${sanitize(p.name)}, etc.
```

---

### ⚠️ Contact Form Has No Spam Protection
No reCAPTCHA or rate limiting. Low priority before launch but should be addressed.

---

### ✅ Security Passing

- Cart uses `localStorage` only — no sensitive data stored
- HTTPS will be auto-configured on Netlify (recommended host)
- No passwords or API keys hardcoded in the file
- WhatsApp order link uses `encodeURIComponent()` correctly
- No external scripts loaded from untrusted CDNs

---

## 5. Pre-Launch Checklist Status

| Item | Status |
|---|---|
| Fix contact form (Bug 1) | ❌ Not done |
| Fix footer product links (Bug 2) | ❌ Not done |
| Change admin password from "admin" | ❌ Not done |
| Add meta description and favicon | ❌ Not done |
| Compress all images (13 files > 1MB, logo 2.8MB) | ❌ Not done |
| Replace likely-copyrighted slideshow images | ❌ Not done |
| Fix brand name inconsistency | ❌ Not done |
| Sanitise admin panel innerHTML inputs | ❌ Not done |
| Update Google Maps embed with exact location | ⚠️ Check |
| Verify hero stats with owner | ⚠️ Check |
| All product images load (no broken paths) | ✅ All 31 image paths verified |
| Logo loads | ✅ |
| WhatsApp button links to correct number | ✅ |
| Cart persists on refresh | ✅ |
| Mobile hamburger menu works | ✅ |
| Admin panel functional | ✅ |

---

*Report prepared by Claude — Rasika Stitch Works website audit, June 2026.*
