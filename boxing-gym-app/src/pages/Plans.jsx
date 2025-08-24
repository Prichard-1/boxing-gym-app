// src/pages/Plans.jsx
import React from "react";

// Example images: put your images in public/images/plans/
const plans = [
  {
    title: "Basic Plan",
    price: "$20/month",
    benefits: ["Access to gym equipment", "1 group class/week", "Community support"],
    image: "/images/basic-plan.jpg",
  },
  {
    title: "Pro Plan",
    price: "$50/month",
    benefits: ["All Basic benefits", "3 group classes/week", "Personal training session"],
    image: "/images/pro-plan.jpg",
  },
  {
    title: "Elite Plan",
    price: "$80/month",
    benefits: ["All Pro benefits", "Unlimited classes", "Personal coaching", "Nutrition guide"],
    image: "/images/elite-plan.jpg",
  },
];

export default function Plans() {
  return (
    <section className="min-h-screen py-20 bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl mx-6 my-10 p-8">
      <h1 className="text-4xl font-bold mb-12 text-center">Our Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white shadow-2xl rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={plan.image}
              alt={plan.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-4">{plan.title}</h2>
              <p className="text-xl text-gray-700 mb-4">{plan.price}</p>
              <ul className="text-gray-600 mb-6">
                {plan.benefits.map((benefit, i) => (
                  <li key={i} className="mb-2">• {benefit}</li>
                ))}
              </ul>
              <a
                href="/register"
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-red-700 transition-colors"
              >
                Choose Plan
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
