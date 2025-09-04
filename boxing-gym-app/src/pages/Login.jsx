import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      toast.error("Invalid credentials");
      return;
    }

    localStorage.setItem("gymUser", JSON.stringify(user));
    setUser(user);
    toast.success(`Welcome back, ${user.name}!`);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10 p-4">
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
        className="bg-green-600 text-white p-2 rounded w-full hover:scale-105 transform transition-transform duration-300"
      >
        Login
      </button>
    </form>
  );
}
