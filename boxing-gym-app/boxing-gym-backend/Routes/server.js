// server.js
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 🧠 In-memory stores
const users = [];
let bookings = [];

// 🔐 Registration
app.post("/register", (req, res) => {
  const { name, email, password, plan, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "Email already registered" });
  }

  const newUser = {
    name,
    email,
    password,
    plan,
    role: role || "member", // ✅ Default to member
  };

  users.push(newUser);
  res.status(201).json({ message: "User registered successfully!" });
});

// 🔑 Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  res.status(200).json({
    message: "Login successful!",
    name: user.name,
    email: user.email,
    plan: user.plan,
    role: user.role, // ✅ Include role
  });
});

// 📅 Bookings
app.post("/bookings", (req, res) => {
  const { user, session, date, status } = req.body;
  if (!user || !session || !date) {
    return res.status(400).json({ error: "Missing booking info" });
  }

  const newBooking = { user, session, date, status };
  bookings.push(newBooking);
  res.status(201).json({ message: "Booking saved successfully!" });
});

app.get("/bookings", (req, res) => {
  res.json(bookings);
});

// 👤 Profile
app.get("/profile", (req, res) => {
  const email = req.query.email;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ error: "User not found" });

  const userBookings = bookings.filter((b) => b.user.email === email);
  res.json({
    name: user.name,
    email: user.email,
    plan: user.plan,
    role: user.role,
    bookings: userBookings,
  });
});

app.put("/profile", (req, res) => {
  const { email, name, plan, role } = req.body;
  const userIndex = users.findIndex((u) => u.email === email);
  if (userIndex === -1) return res.status(404).json({ error: "User not found" });

  if (name) users[userIndex].name = name;
  if (plan) users[userIndex].plan = plan;
  if (role) users[userIndex].role = role;

  res.json({ message: "Profile updated successfully", user: users[userIndex] });
});

// 💳 Stripe Payment Intent
app.post("/create-payment-intent", async (req, res) => {
  const { amount, email } = req.body;
  if (!amount || !email) return res.status(400).json({ error: "Missing amount or email" });

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      receipt_email: email,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: "Payment failed" });
  }
});

// 🧾 Stripe Subscription Checkout
app.post("/create-checkout-session", async (req, res) => {
  const { planId } = req.body;

  const prices = {
    basic: "price_1XYZ...",
    pro: "price_2XYZ...",
    premium: "price_3XYZ...",
  };

  const selectedPrice = prices[planId];
  if (!selectedPrice) return res.status(400).json({ error: "Invalid plan ID" });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: selectedPrice, quantity: 1 }],
      success_url: `${process.env.CLIENT_URL}/dashboard?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/plans?canceled=true`,
    });

    res.json({ sessionId: session.id });
  } catch (err) {
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));



