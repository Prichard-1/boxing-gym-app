import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      setUser(res.data.user);
      localStorage.setItem("gymUser", JSON.stringify(res.data.user));

      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <Toaster position="top-center" />
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-xl w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

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
          className="w-full p-3 mb-6 rounded text-black"
        />

        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

