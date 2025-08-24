import 'dotenv/config';
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(bodyParser.json());

// Map plan names to Price IDs
const priceMap = {
  basic: process.env.PRICE_BASIC,
  pro_plan: process.env.PRICE_PRO_PLAN,
  premium: process.env.PRICE_PREMIUM,
  
};

// Test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Create checkout session dynamically based on selected plan
app.post('/create-checkout-session', async (req, res) => {
  const { plan } = req.body; // Expect plan name: 'basic', 'standard', 'premium', or 'pro'

  if (!priceMap[plan]) {
    return res.status(400).json({ error: 'Invalid plan selected' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription', // use 'payment' if one-time
      line_items: [
        { price: priceMap[plan], quantity: 1 },
      ],
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
