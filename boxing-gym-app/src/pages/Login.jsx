import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Load users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Find matching user
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      toast.error("Invalid email or password");
      return;
    }

    // Set user in app state and localStorage
    setUser(user);
    localStorage.setItem("gymUser", JSON.stringify(user));

    toast.success(`Welcome back, ${user.name}!`);
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto mt-10 p-4 border rounded shadow"
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-green-600 text-white rounded hover:scale-105 transform transition-transform duration-300"
      >
        Login
      </button>
    </form>
  );
}
