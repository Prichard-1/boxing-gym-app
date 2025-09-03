import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../config";

export default function BookingCheckout({ user }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  if (!user)
    return (
      <p className="text-center mt-10 text-red-500">
        Please log in to checkout.
      </p>
    );

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // Create payment intent on backend
      const { data } = await axios.post(
        `${API_BASE_URL}/create-payment-intent`,
        {
          email: user.email,
          amount: 1000, // Example amount in cents ($10)
        }
      );

      const clientSecret = data.clientSecret;

      // Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        toast.error(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("✅ Payment successful!");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Payment error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold mb-6">💳 Checkout</h1>
      <p className="mb-4">Hello, {user.name}! Enter your card details below:</p>

      <form
        onSubmit={handlePayment}
        className="w-full max-w-md p-6 bg-gray-900 rounded-xl text-white space-y-4"
      >
        <CardElement
          options={{
            style: {
              base: {
                color: "#fff",
                fontSize: "16px",
                "::placeholder": { color: "#888" },
              },
              invalid: { color: "#f44336" },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold shadow transition-colors disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay $10"}
        </button>
      </form>
    </div>
  );
}
