const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Get all plans
router.get('/', async (req, res) => {
  const plans = [
    { id: 'basic', name: 'Basic', description: 'Access to gym and classes', price: 20 },
    { id: 'pro', name: 'Pro', description: 'Basic + personal training', price: 50 },
    { id: 'premium', name: 'Premium', description: 'All access + nutrition plan', price: 80 },
  ];
  res.json(plans);
});

// Create Stripe checkout session
router.post('/create-checkout-session', async (req, res) => {
  const { planId } = req.body;
  const prices = {
    basic: 'price_1XYZ...', 
    pro: 'price_2XYZ...',
    premium: 'price_3XYZ...',
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{ price: prices[planId], quantity: 1 }],
    success_url: `${process.env.CLIENT_URL}/dashboard?success=true`,
    cancel_url: `${process.env.CLIENT_URL}/plans?canceled=true`,
  });

  res.json({ sessionId: session.id });
});

module.exports = router;
