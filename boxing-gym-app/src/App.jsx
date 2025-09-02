import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import RoleGuard from "./components/RoleGuard.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Hero from "./pages/Hero.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx"; // exact match
import Workout from "./pages/Workout.jsx";
import Plans from "./pages/Plans.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Bookings from "./pages/Bookings.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Success from "./pages/Success.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  // Persist login state
  useEffect(() => {
    const storedUser = localStorage.getItem("gymUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("gymUser", JSON.stringify(user));
    else localStorage.removeItem("gymUser");
  }, [user]);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/profile" element={user ? <UserProfile user={user} /> : <Navigate to="/login" />} />
        <Route path="/bookings" element={user ? <Bookings user={user} /> : <Navigate to="/login" />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} setUser={setUser} /> : <Navigate to="/login" />} />


        {/* Admin only */}
        <Route path="/admin/reports" element={<RoleGuard user={user} allowedRoles={["admin"]}><ReportsPage /></RoleGuard>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}
