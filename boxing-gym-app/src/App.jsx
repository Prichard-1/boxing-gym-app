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
import Footer from "./components/Footer";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/wallpaper.jpg')" }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main content with glassmorphism */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-10">
        <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hero" element={<Hero />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/teststripe" element={<TestStripe />} />
            <Route path="/success" element={<Success />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
