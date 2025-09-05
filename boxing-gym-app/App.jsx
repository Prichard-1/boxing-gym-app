import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
;

// Pages
import Home from "./pages/Home.jsx";
import Hero from "./pages/Hero.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
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
        <Route path="/workout" element={<Workout />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/success" element={<Success />} />

        {/* Auth pages */}
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />

       
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}
