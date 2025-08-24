import 'dotenv/config';
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(bodyParser.json());

// Map plan names to Price IDs (for subscription)
const priceMap = {
  basic: process.env.PRICE_BASIC,
  pro_plan: process.env.PRICE_PRO_PLAN,
  premium: process.env.PRICE_PREMIUM,
};

// Sample available slots (for one-time bookings)
const allSlots = ["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"];

// Test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Get available slots for a date
app.get('/api/slots', (req, res) => {
  res.json(allSlots);
});

// Create checkout session for **subscription plans**
app.post('/api/create-subscription', async (req, res) => {
  const { plan } = req.body;

  if (!priceMap[plan]) {
    return res.status(400).json({ error: 'Invalid plan selected' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceMap[plan], quantity: 1 }],
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe subscription error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create checkout session for **one-time bookings**
app.post('/api/create-booking', async (req, res) => {
  const { name, email, date, time } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Gym Session - ${date} at ${time}`,
            },
            unit_amount: 2000, // $20 per session
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/booking`,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripe booking error:', err);
    res.status(500).json({ error: 'Failed to create Stripe session' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
