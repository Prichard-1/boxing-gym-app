import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Load users from localStorage or create empty array
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if email already exists
    if (users.some((u) => u.email === email)) {
      toast.error("User with this email already exists");
      return;
    }

    // Create new user and save
    const newUser = { name, email, password, role: "user" };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Set user in app state and localStorage
    setUser(newUser);
    localStorage.setItem("gymUser", JSON.stringify(newUser));

    toast.success("Registration successful!");
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-md mx-auto mt-10 p-4 border rounded shadow"
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
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
        className="w-full p-2 bg-blue-600 text-white rounded hover:scale-105 transform transition-transform duration-300"
      >
        Register
      </button>
    </form>
  );
}

