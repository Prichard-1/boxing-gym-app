import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ReportsPage from "./pages/ReportsPage";
import RoleGuard from "./components/RoleGuard";

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

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/workouts" element={<Workout />} />
        <Route path="/profile" element={<UserProfile user={user} />} />
        <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
        <Route path="/bookings" element={<Bookings user={user} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/success" element={<Success />} />

        {/* Protected admin route */}
        <Route
          path="/admin/reports"
          element={
            <RoleGuard user={user} allowedRoles={["admin"]}>
              <ReportsPage />
            </RoleGuard>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}
