import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookingCheckout from "./pages/BookingCheckout";
import TestStripe from "./components/TestStripe";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Bookings from "./pages/Bookings.jsx";

// Stripe
const stripePromise = loadStripe("YOUR_STRIPE_KEY_HERE");

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;

    fetch(`http://localhost:5000/profile?email=${email}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} setUser={setUser} />
      <main className="flex-grow p-6 bg-gray-100">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
          />

          {/* Booking for Members */}
          <Route
            path="/bookings"
            element={user ? <Bookings user={user} setUser={setUser} /> : <Navigate to="/login" />}
          />

          {/* Stripe Checkout */}
          <Route
            path="/checkout"
            element={
              user ? (
                <Elements stripe={stripePromise}>
                  <BookingCheckout user={user} />
                </Elements>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Test Stripe */}
          <Route path="/test-stripe" element={<TestStripe />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
