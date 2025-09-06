import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./pages/Footer.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Hero from "./pages/Hero.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Bookings from "./pages/Bookings";
import About from "./pages/About.jsx";
import Plans from "./pages/Plans.jsx";
import Contact from "./pages/Contact.jsx";
import Workout from "./pages/Workout.jsx";
import Success from "./pages/Success.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("gymUser")) || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("gymUser", JSON.stringify(user));
      localStorage.setItem("gymUserToken", user.token || "");
    } else {
      localStorage.removeItem("gymUser");
      localStorage.removeItem("gymUserToken");
    }
  }, [user]);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <ToastContainer />

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/success" element={<Success />} />

        {/* Protected pages */}
        <Route
          path="/bookings"
          element={
            <ProtectedRoute user={user}>
              <Bookings user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plans"
          element={
            <ProtectedRoute user={user}>
              <Plans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workout"
          element={
            <ProtectedRoute user={user}>
              <Workout />
            </ProtectedRoute>
          }
        />

        {/* Auth pages */}
        <Route
          path="/login"
          element={user ? <Navigate to="/bookings" /> : <Login setUser={setUser} />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/bookings" /> : <SignUp setUser={setUser} />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}

