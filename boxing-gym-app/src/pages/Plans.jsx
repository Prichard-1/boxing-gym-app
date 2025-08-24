import React from "react";
import axios from "axios";

const plans = [
  { name: "basic", price: 20, desc: "Access to gym and classes" },
  { name: "pro", price: 50, desc: "Basic + personal training" },
  { name: "premium", price: 80, desc: "All access + nutrition plan" },
];

export default function Plans() {
  const handleSubscribe = async (plan) => {
    try {
      const res = await axios.post("http://localhost:5000/create-checkout-session", { plan });
      window.location.href = res.data.url; // Redirect to Stripe Checkout
    } catch (err) {
      console.error(err);
      alert("Failed to create checkout session.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 text-center grid md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div key={plan.name} className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-2 capitalize">{plan.name}</h2>
          <p className="mb-4">{plan.desc}</p>
          <p className="mb-4 font-semibold">${plan.price} / month</p>
          <button
            onClick={() => handleSubscribe(plan.name)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Subscribe
          </button>
        </div>
      ))}
    </div>
  );
}
