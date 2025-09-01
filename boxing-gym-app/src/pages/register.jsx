import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("Free");
  const [role, setRole] = useState("member"); // ✅ Default role

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
        plan,
        role, // ✅ Send role to backend
      });

      toast.success(res.data.message);

      if (onRegister) {
        onRegister({ name, email, plan, role }); // Optional callback
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <Toaster position="top-center" />
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-xl w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded text-black"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded text-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded text-black"
        />

        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className="w-full p-3 mb-4 rounded text-black"
        >
          <option value="Free">Free</option>
          <option value="Basic">Basic</option>
          <option value="Pro">Pro</option>
          <option value="Premium">Premium</option>
        </select>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 mb-6 rounded text-black"
        >
          <option value="member">Member</option>
          <option value="trainer">Trainer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
}
