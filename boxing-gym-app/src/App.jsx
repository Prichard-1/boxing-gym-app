import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Workout from "./pages/Workout";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Success from "./pages/Success";

// Stripe Components (if needed)
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import BookingCheckout from "./pages/BookingCheckout.jsx";
import TestStripe from "./components/TestStripe";

const stripePromise = loadStripe("YOUR_STRIPE_KEY_HERE");

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;

    fetch(`http://localhost:5000/profile?email=${email}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('https://share.google/images/xVe0HZgCe4zF7vPLe')",
      }}
    >
      <Navbar user={user} setUser={setUser} />

      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-10">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/success" element={<Success />} />

          {/* Protected pages */}
          <Route
            path="/dashboard"
            element={user ? <Dashboard user={user} setUser={setUser} /> : <Navigate to="/login" />}
          />
          <Route
            path="/userprofile"
            element={user ? <UserProfile user={user} /> : <Navigate to="/login" />}
          />

          {/* Bookings */}
          <Route
            path="/bookings"
            element={user ? <Bookings user={user} setUser={setUser} /> : <Navigate to="/login" />}
          />
          <Route
            path="/booking"
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
