import React, { useEffect, useState } from "react";
import axios from "axios";

function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/plans")
      .then(res => {
        console.log("Plans fetched:", res.data);
        setPlans(res.data);
      })
      .catch(err => console.error("Error fetching plans:", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Subscription Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="mb-2">{plan.description}</p>
            <p className="font-bold mb-4">${plan.price} / month</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => handleSubscribe(plan.id)}
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plans;
