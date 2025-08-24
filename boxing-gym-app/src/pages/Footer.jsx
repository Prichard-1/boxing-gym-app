// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left side */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Boxing Gym 🥊. All rights reserved.
        </p>

        {/* Right side */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="/about" className="hover:text-gray-400">About</a>
          <a href="/contact" className="hover:text-gray-400">Contact</a>
          <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
