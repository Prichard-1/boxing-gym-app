import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import config from "../config";

export default function SignUp({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return toast.error("Fill all fields");

    setLoading(true);
    try {
      const res = await axios.post(`${config.API_BASE_URL}/api/register`, { name, email, password });
      const user = { ...res.data.user, token: res.data.token };
      setUser(user);
      localStorage.setItem("gymUser", JSON.stringify(user));
      localStorage.setItem("gymUserToken", res.data.token);
      toast.success(res.data.message || "Sign up successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="max-w-md mx-auto mt-10 p-4 border rounded shadow space-y-4">
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" disabled={loading} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" disabled={loading} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" disabled={loading} />
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}

