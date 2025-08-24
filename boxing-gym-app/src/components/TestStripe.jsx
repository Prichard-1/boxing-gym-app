import React, { useEffect } from "react";

const TestStripe = () => {
  useEffect(() => {
    console.log("Stripe key:", import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  }, []);

  return (
    <div>
      <h2>Check the console for your Stripe key</h2>
    </div>
  );
};

export default TestStripe;
