import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY');

function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios.get('/api/plans').then(res => setPlans(res.data));
  }, []);

  const handleSubscribe = async (planId) => {
    const stripe = await stripePromise;
    const { data } = await axios.post('/api/create-checkout-session', { planId });
    await stripe.redirectToCheckout({ sessionId: data.sessionId });
  };

  return (
    <div className="max-w-7xl mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map(plan => (
        <div key={plan.id} className="border p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold">{plan.name}</h2>
          <p className="mt-2">{plan.description}</p>
          <p className="mt-4 text-2xl font-semibold">${plan.price}/month</p>
          <button
            onClick={() => handleSubscribe(plan.id)}
            className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Subscribe
          </button>
        </div>
      ))}
    </div>
  );
}

export default Plans;
