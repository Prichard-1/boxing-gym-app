const express = require("express");
const Stripe = require("stripe");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { planId } = req.body;

    const priceMap = {
      basic: 2000,
      pro: 5000,
      elite: 10000,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `${planId} Membership Plan` },
            unit_amount: priceMap[planId],
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/dashboard?success=true",
      cancel_url: "http://localhost:5173/plans?canceled=true",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
