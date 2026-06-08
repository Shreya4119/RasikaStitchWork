# Pre-Launch Guide — Rasika Stitch Works Website
### For the Developer | Before Handover to Business Owner

---

## 1. NEXT STEPS BEFORE HANDOVER

### Step 1 — Choose a Hosting Platform
The website is a single HTML file with local images. It needs to be hosted online so customers can access it.

**Recommended options (all free or low-cost):**

| Platform | Cost | Best For |
|---|---|---|
| **Netlify** | Free | Drag-and-drop deploy, custom domain, HTTPS auto-configured |
| **GitHub Pages** | Free | Developers comfortable with Git |
| **Hostinger / GoDaddy** | ₹150–400/month | Non-technical owners, includes domain + email |

**Deploy steps on Netlify (easiest):**
1. Go to netlify.com → Sign up free
2. Drag and drop the entire `RasikaStitchWorks` folder onto the Netlify dashboard
3. Netlify assigns a free URL (e.g. `rasika-stitch.netlify.app`) instantly
4. Later, connect a custom domain like `rasikastichworks.in` (buy from GoDaddy ~₹800/year)

---

### Step 2 — Buy a Domain Name
Register a domain that matches the business. Suggested options:
- `rasikasstitchworks.com`
- `rasikastichworks.in` (.in domains are cheaper, ~₹500–800/year)
- `rasikasembroidery.com`

Buy from: GoDaddy, Namecheap, or Google Domains. Then connect it to Netlify in 5 minutes via DNS settings.

---

### Step 3 — Set Up Business Email
A professional email (e.g. `orders@rasikastichworks.in`) builds trust.
- **Google Workspace** — ₹125/user/month (most reliable)
- **Zoho Mail** — Free for 1 user (good enough to start)

Update the contact email in `index.html` once this is set up.

---

### Step 4 — Add a Payment Gateway (for actual orders)
Currently the website has an "Add to Cart" flow but no real payment. To accept online payments:

- **Razorpay** (recommended for India) — Free to register, 2% per transaction
- **Instamojo** — Simple, good for small businesses, no monthly fee

Both provide a payment link or embeddable button. You can start with a simple "Pay via Razorpay" button that opens a payment page — no backend required.

---

### Step 5 — Add Backend + Database (for persistent inventory)
Currently, product changes made in the admin panel are saved only in the browser (`localStorage`). For a real persistent product catalogue:

**Recommended: Firebase (free tier)**
1. Create a project at firebase.google.com
2. Enable **Firestore** (database) + **Firebase Auth** (secure admin login) + **Firebase Storage** (image uploads)
3. Replace the `localStorage` product array in `index.html` with Firestore reads/writes (~50 lines of JS)
4. The owner can then add/edit/delete products from any device and changes appear live for customers

**Without backend (simpler, short-term):**
The owner edits the `products` array directly in `index.html` or uses the built-in admin panel and shares the updated file with you to re-upload.

---

### Step 6 — WhatsApp Business Integration
Most Indian small businesses close sales over WhatsApp. Add a floating WhatsApp button:

```html
<a href="https://wa.me/91XXXXXXXXXX?text=Hi, I'm interested in your products"
   style="position:fixed;bottom:20px;right:20px;z-index:9999;
          background:#25D366;color:white;border-radius:50%;
          width:56px;height:56px;display:flex;align-items:center;
          justify-content:center;font-size:1.6rem;box-shadow:0 4px 12px rgba(0,0,0,0.2)">
  💬
</a>
```

Replace `91XXXXXXXXXX` with the owner's WhatsApp number. This alone can drive significant conversions.

---

### Step 7 — Google Analytics
Add Google Analytics to track visitors, popular products, and traffic sources — completely free.

1. Go to analytics.google.com → Create account → Get a Measurement ID (format: `G-XXXXXXXXXX`)
2. Add before `</head>` in `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 2. TESTING CHECKLIST

Complete all tests before going live. Check each item across **Desktop**, **Mobile (Android)**, and **Mobile (iPhone)**.

### Functional Testing

- [ ] All 4 product category cards open the catalogue and filter correctly
- [ ] Catalogue filter tabs (All / Traditional / Contemporary / Bridal) show correct products
- [ ] Search bar filters products by name in real time
- [ ] "Add to Cart" button adds item and updates cart badge count
- [ ] Cart sidebar opens and closes correctly
- [ ] Quantity +/– buttons work in cart; total updates correctly
- [ ] Remove item from cart works
- [ ] Cart persists after page refresh (localStorage)
- [ ] Contact form validates required fields (name, email, message)
- [ ] All navigation links scroll to correct sections
- [ ] Logo links back to top/home
- [ ] All product images load (no broken images)
- [ ] Admin panel opens when typing "admin" anywhere on the page
- [ ] Admin panel: adding a product appears in catalogue immediately
- [ ] Admin panel: deleting a product removes it from catalogue
- [ ] Admin panel close button works

### Visual / Responsive Testing

- [ ] Website looks correct on Desktop (1920×1080, 1366×768)
- [ ] Website looks correct on Tablet (768px width)
- [ ] Website looks correct on Mobile (375px–414px width)
- [ ] No horizontal scroll on mobile
- [ ] Hero section text is readable on all screen sizes
- [ ] Product cards don't overflow or overlap on mobile
- [ ] Footer columns stack neatly on mobile
- [ ] Logo displays correctly in navbar
- [ ] All fonts load (Playfair Display, Inter)

### Performance Testing

- [ ] Open Chrome DevTools → Lighthouse → Run audit
- [ ] Target scores: Performance > 80, Accessibility > 90, Best Practices > 90, SEO > 80
- [ ] All images are reasonably sized (compress any image over 1MB using tinypng.com)
- [ ] Page loads in under 4 seconds on a 4G mobile connection

### Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (Mac/iPhone)
- [ ] Edge (latest)
- [ ] Chrome on Android
- [ ] Safari on iPhone

### SEO & Discoverability

- [ ] Page has a meaningful `<title>` tag
- [ ] Page has a `<meta name="description">` tag
- [ ] All images have descriptive `alt` attributes
- [ ] Website URL is submitted to Google Search Console after launch

---

## 3. INVENTORY MANAGEMENT — OWNER'S GUIDE

### How to Open the Admin Panel

1. Open the website in any browser
2. Click anywhere on the page (not on an input field)
3. Type the word **admin** on your keyboard (you won't see it being typed)
4. The Admin Panel slides open automatically

> **Tip:** This is a hidden feature. Don't share this with customers.

---

### How to Add a New Product

1. Open the Admin Panel (type "admin")
2. Fill in all fields:
   - **Product Name** — e.g. "Blue Organza Saree"
   - **Category** — choose Sarees / Blouses / Embroidery Designs
   - **Style** — Traditional / Contemporary / Bridal
   - **Price** — enter amount in ₹ (numbers only, no ₹ symbol)
   - **Image URL** — the web link to the product photo (see below)
   - **Description** — one or two lines describing the product
3. Click **Add Product**
4. The product appears immediately in the catalogue

**How to get an Image URL for your product:**
- Upload the photo to Google Drive → right-click → "Get link" → change to "Anyone with link" → use that URL
- Or upload to a free image host like imgbb.com and copy the "Direct link"
- Or share the photo on WhatsApp Web, right-click the image → "Copy image address"

---

### How to Delete a Product

1. Open the Admin Panel (type "admin")
2. Scroll down to the **Manage Existing Products** list
3. Find the product you want to remove
4. Click the red **Delete** button next to it
5. The product is removed immediately from the catalogue

---

### How to Update a Product (Price / Description)

Currently the admin panel supports Add and Delete only. To update an existing product:
1. Delete the old version of the product
2. Add it again with the corrected details

*(If this is too inconvenient, ask your developer to add an "Edit" button to the admin panel — it's a straightforward addition.)*

---

### Important Note on Data Persistence

Changes made through the admin panel are saved in your **browser's memory** (localStorage). This means:
- ✅ Changes persist after closing and reopening the browser on the same device
- ❌ Changes are lost if you clear your browser history/cache
- ❌ Changes are NOT visible to customers unless the developer re-uploads the updated file (or Firebase is set up)

**Until a backend is set up:** after making changes, inform your developer so they can save the updated product list permanently into the website file.

---

## 4. SECURITY MEASURES

### Critical — Do These Before Launch

**4.1 Strengthen the Admin Password**
The current admin panel is triggered by typing the word "admin." This is easy to guess. Before launch, change the trigger word to something unpredictable.

In `index.html`, find:
```javascript
if (adminBuffer === 'admin') {
```
Change `'admin'` to a private phrase like `'rsw2024open'` and tell only the business owner.

---

**4.2 Add a Proper Admin Login (if using Firebase)**
If you set up Firebase Auth, replace the hidden-trigger panel with a real email + password login. This is the correct long-term solution. Firebase Auth is free and handles password hashing, session management, and brute-force protection automatically.

---

**4.3 Enable HTTPS**
Never launch on plain HTTP. Netlify, GitHub Pages, and most hosting platforms enable HTTPS (SSL) automatically and for free. Verify the site URL starts with `https://` before handing over.

HTTPS protects:
- Customer form submissions (name, email, address)
- Cart data in transit
- Admin panel access

---

**4.4 Protect the Contact Form from Spam**
The current contact form submits data but has no spam protection. Add Google reCAPTCHA v3 (invisible, no checkbox needed):

1. Register at google.com/recaptcha → get a Site Key
2. Add the reCAPTCHA script to the page
3. Verify the token on form submission

Alternatively, use **Formspree** (formspree.io) — a free form backend that handles spam filtering and emails you the submissions directly. No code needed beyond updating the form's `action` attribute.

---

**4.5 Sanitize All User Inputs**
The contact form and admin panel accept text input. Before any user-typed content is inserted into the page (e.g., product names in the admin panel), it must be sanitized to prevent XSS (Cross-Site Scripting) attacks.

In the admin panel JS, replace any `innerHTML` assignment with `textContent`, or sanitize strings using:
```javascript
function sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
```

---

**4.6 Never Store Sensitive Data in localStorage**
The current site uses localStorage for cart data only — this is fine. Never store passwords, payment details, or customer personal information in localStorage. It is accessible to any JavaScript on the page.

---

**4.7 Content Security Policy (CSP) Header**
Once hosted on Netlify, add a `netlify.toml` file to the project root:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; img-src * data:; font-src https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' 'unsafe-inline'"
```

This prevents clickjacking, MIME-type sniffing, and restricts what scripts can load on the page.

---

**4.8 Regular Backups**
Keep a dated backup of `index.html` and the `images/` folder after every significant update:
- Store on Google Drive or Dropbox
- Name files clearly: `index_2024-07-15.html`
- Keep at least 3 previous versions

---

### Good-to-Have (After Launch)

| Measure | Why | How |
|---|---|---|
| Google Search Console | Monitor for security issues Google detects | search.google.com/search-console |
| Monitor uptime | Get alerted if site goes down | uptimerobot.com (free) |
| Renew SSL cert | Netlify auto-renews, but verify yearly | Check Netlify dashboard |
| Update dependencies | If you add npm packages later | Run `npm audit` periodically |

---

## 5. HANDOVER CHECKLIST

Before giving the website to the business owner, confirm all of the following:

- [ ] Website is live on HTTPS hosting with a custom domain
- [ ] All product images load correctly on the live URL
- [ ] Logo displays correctly
- [ ] Contact form sends emails to the owner's business email
- [ ] WhatsApp button links to owner's correct number
- [ ] Admin panel trigger word has been changed from "admin"
- [ ] Owner has been shown how to use the admin panel (Add / Delete products)
- [ ] Owner has been given login credentials for: hosting platform, domain registrar, analytics
- [ ] Backup of all files handed to owner (Google Drive folder)
- [ ] Google Analytics is tracking live traffic
- [ ] Lighthouse performance score reviewed and images compressed if needed
- [ ] Owner understands: changes in admin panel are browser-local until backend is added

---

*Document prepared for Rasika Stitch Works website handover.*
*Website built with HTML, CSS, Vanilla JS | Hosted recommendation: Netlify | Backend recommendation: Firebase*
