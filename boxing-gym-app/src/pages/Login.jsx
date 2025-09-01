import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      localStorage.setItem("email", res.data.email);

      setUser({
        name: res.data.name,
        email: res.data.email,
        plan: res.data.plan,
        role: res.data.role, // ✅ Added
      });

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-gray-900 text-white rounded-xl">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded mb-4 text-black"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 rounded mb-4 text-black"
      />

      <button
        onClick={handleLogin}
        className="w-full py-3 bg-red-600 hover:bg-red-700 rounded font-semibold"
      >
        Login
      </button>
    </div>
  );
}

