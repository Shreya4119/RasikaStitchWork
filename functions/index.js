const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');

const keyId = process.env.RAZORPAY_KEY_ID || '';
const keySecret = process.env.RAZORPAY_KEY_SECRET || '';

if (!keyId || !keySecret) {
  console.warn('Razorpay keys are not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.');
}

const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ready', razorpayConfigured: !!keyId && !!keySecret });
});

app.post('/createRazorpayOrder', async (req, res) => {
  if (!keyId || !keySecret) {
    return res.status(500).json({ error: 'Razorpay credentials are not configured.' });
  }

  const { amount, currency, receipt, customer, notes } = req.body;
  if (!amount || !currency || !receipt) {
    return res.status(400).json({ error: 'Missing required fields: amount, currency, receipt.' });
  }

  try {
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
      payment_capture: 1,
      notes: {
        ...notes,
        customerName: customer?.name || '',
        customerEmail: customer?.email || '',
        customerContact: customer?.contact || '',
      },
    });
    return res.json(order);
  } catch (error) {
    console.error('Razorpay create order error:', error);
    return res.status(500).json({ error: error.message || 'Failed to create Razorpay order.' });
  }
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Razorpay backend listening on port ${PORT}`);
  });
}

module.exports = app;
