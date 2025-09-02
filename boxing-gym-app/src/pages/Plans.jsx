// src/pages/Plans.jsx
import React from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "R299/month",
    features: ["Access to gym equipment", "1 group class/week", "Locker room access"],
    color: "border-gray-300",
  },
  {
    name: "Fighter",
    price: "R499/month",
    features: ["Unlimited group classes", "Personalized training plan", "Priority booking"],
    color: "border-yellow-500",
  },
  {
    name: "Champion",
    price: "R799/month",
    features: ["1-on-1 coaching", "Nutrition guidance", "Exclusive merch", "24/7 gym access"],
    color: "border-red-600",
  },
];

export default function Plans() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-10">Membership Plans</h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border-2 ${plan.color} rounded-xl p-6 flex flex-col justify-between bg-gray-800 hover:scale-105 transition-transform`}
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p className="text-xl font-semibold mb-4">{plan.price}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to="/register"
              className="mt-auto bg-red-600 text-white py-2 px-4 rounded-lg text-center font-semibold hover:bg-red-700"
            >
              Join Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
