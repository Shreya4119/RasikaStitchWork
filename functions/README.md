# Razorpay Backend Stub

This directory contains a minimal backend stub for creating Razorpay payment orders.

## Setup

1. Install dependencies:

```bash
cd functions
npm install
```

2. Configure your Razorpay credentials as environment variables:

```bash
export RAZORPAY_KEY_ID=your_key_id
export RAZORPAY_KEY_SECRET=your_key_secret
```

On Windows PowerShell:

```powershell
$env:RAZORPAY_KEY_ID='your_key_id'
$env:RAZORPAY_KEY_SECRET='your_key_secret'
```

3. Run locally:

```bash
npm start
```

4. Update `index.html` in the frontend:

- Set `razorpayConfig.enabled = true`
- Set `razorpayConfig.testMode = false` for real payments
- Set `razorpayConfig.keyId` to your Razorpay key ID
- Set `razorpayConfig.backendOrderUrl` to your deployed backend endpoint, for example:
  `https://your-domain.com/createRazorpayOrder`

> For local testing without a live Razorpay backend, keep `razorpayConfig.testMode = true` and the checkout flow will simulate payment success.

## Deployment

This can be deployed as a standalone Express service or as a Firebase Function.

If you deploy as a Firebase Function, use a function URL such as:

`https://<project>.cloudfunctions.net/createRazorpayOrder`

and update the frontend accordingly.
