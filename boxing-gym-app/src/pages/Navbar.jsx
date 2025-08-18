import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-md font-bold">
            BG
          </div>
          <span className="font-bold text-lg">BoxingGym</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/plans">Plans</Link>
          <Link to="/contacts">Contacts</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/booking">Booking</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex space-x-4">
          <Link to="/login" className="text-gray-700 hover:text-black">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
