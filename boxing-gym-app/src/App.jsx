import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Contacts from "./pages/Contacts";
import Plans from "./pages/Plans";
import Booking from "./pages/Bookings";
import TestStripe from "./components/TestStripe";
import Success from "./pages/Success";

function App() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/teststripe" element={<TestStripe/>}/>
          <Route path="/success" element={<Success/>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;



