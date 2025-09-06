import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../config"; // ✅ Correct import

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Enter email and password");

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/login`, {
        email,
        password,
      });

      const user = { ...res.data.user, token: res.data.token };
      setUser(user);
      localStorage.setItem("gymUser", JSON.stringify(user));
      localStorage.setItem("gymUserToken", res.data.token);
      toast.success(res.data.message || "Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto mt-10 p-4 border rounded shadow space-y-4"
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        disabled={loading}
      />
      <button
        type="submit"
        className="w-full p-2 bg-black text-white rounded hover:bg-gray-800"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
