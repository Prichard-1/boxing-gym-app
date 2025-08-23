const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-checkout-session', async (req, res) => {
  const { planId } = req.body;
  const prices = {
    basic: 'price_1XYZ...', // Stripe price IDs
    pro: 'price_2XYZ...',
    premium: 'price_3XYZ...',
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price: prices[planId],
        quantity: 1,
      },
    ],
    success_url: `${process.env.CLIENT_URL}/dashboard?success=true`,
    cancel_url: `${process.env.CLIENT_URL}/plans?canceled=true`,
  });

  res.json({ sessionId: session.id });
});
