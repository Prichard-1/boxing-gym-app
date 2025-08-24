import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51RzOqERrSQNJ6TlIT1e6XIcgh3PCnC1W6G64QqV6mlen4K3nSqOc232Zda8bRXDftV");

export default function BookingPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!date) {
      setMessage("Please select a date");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/create-booking", {
        name,
        email,
        date,
      });

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: res.data.id });
    } catch (err) {
      console.error(err);
      setMessage("Error processing payment. Try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Book a Session</h2>
      <form onSubmit={handleBooking} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Book & Pay
        </button>
      </form>
      {message && <p className="mt-4 text-red-600 font-medium">{message}</p>}
    </div>
  );
}
