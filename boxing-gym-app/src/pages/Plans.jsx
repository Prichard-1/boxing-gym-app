// src/pages/Plans.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Plans({ user }) {
  const navigate = useNavigate();

  if (!user) return <p className="text-center mt-10 text-red-500">Please log in first.</p>;

  const plans = [
    {
      name: "Basic",
      price: "$20/month",
      description: "Access to 1 session per week",
    },
    {
      name: "Premium",
      price: "$50/month",
      description: "Access to unlimited sessions and premium classes",
    },
  ];

  const handleSelectPlan = (planName) => {
    // Save membership plan in localStorage
    localStorage.setItem("membershipPlan", planName);
    toast.success(`✅ You selected the ${planName} plan!`);
    navigate("/bookings"); // Redirect to bookings page
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white py-10">
      <h1 className="text-4xl font-bold mb-10">Choose Your Membership Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col justify-between"
          >
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <p className="text-gray-300 mb-4">{plan.description}</p>
            <p className="text-xl font-semibold mb-4">{plan.price}</p>
            <button
              onClick={() => handleSelectPlan(plan.name)}
              className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg font-semibold transition-colors"
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
