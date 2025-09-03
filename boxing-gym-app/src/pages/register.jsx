import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

export default function Register({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("Free");
  const [role, setRole] = useState("member");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/register`, {
        name,
        email,
        password,
        plan,
        role,
      });

      toast.success(res.data.message || "Registration successful!");

      const registeredUser = res.data.user;
      setUser(registeredUser);
      localStorage.setItem("gymUser", JSON.stringify(registeredUser));

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setPlan("Free");
      setRole("member");

      navigate("/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
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
          className={`w-full py-3 rounded-lg font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
