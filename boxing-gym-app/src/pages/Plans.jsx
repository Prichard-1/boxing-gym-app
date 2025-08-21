import { createCheckoutSession } from "../services/stripe";

function Plans() {
  const plans = [
    { id: "basic", name: "Basic Plan", price: 20, features: ["2 sessions/week"] },
    { id: "pro", name: "Pro Plan", price: 50, features: ["5 sessions/week", "Access to sparring"] },
    { id: "elite", name: "Elite Plan", price: 100, features: ["Unlimited sessions", "Personal trainer"] },
  ];

  const handleSubscribe = (planId) => {
    // Call Stripe Checkout session
    createCheckoutSession(planId);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan 🥊</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
            <p className="text-3xl font-bold mb-4">${plan.price}/mo</p>
            <ul className="mb-6 text-gray-600">
              {plan.features.map((f, i) => (
                <li key={i}>✅ {f}</li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan.id)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
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
