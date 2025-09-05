import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newPlan, setNewPlan] = useState("");
  const [fitnessScaling, setFitnessScaling] = useState("Intermediate");

  // Use environment variable for API base URL
  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem("email"); 
      if (!email) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE}/profile?email=${email}`);
        setUser(res.data);
        setNewPlan(res.data.plan || "Free");
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [API_BASE]);

  const handlePlanUpgrade = async () => {
    if (!newPlan || newPlan === user.plan) return;

    try {
      const res = await axios.put(`${API_BASE}/profile`, {
        email: user.email,
        plan: newPlan,
      });
      setUser(res.data.user);
      toast.success("✅ Plan upgraded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to upgrade plan");
    }
  };

  if (loading) return <p className="text-center mt-20 text-white">Loading...</p>;
  if (!user)
    return (
      <p className="text-center mt-20 text-red-500">
        User not found or not logged in.
      </p>
    );

  return (
    <section className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <Toaster position="top-center" />
      <div className="bg-gray-800 p-8 rounded-3xl shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>

        <div className="flex justify-center mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-red-400"
          />
        </div>

        <p className="mb-2">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="mb-4">
          <strong>Current Plan:</strong> {user.plan || "Free"}
        </p>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Upgrade Plan</label>
          <select
            value={newPlan}
            onChange={(e) => setNewPlan(e.target.value)}
            className="w-full p-3 rounded text-black"
          >
            <option value="Free">Free</option>
            <option value="Basic">Basic</option>
            <option value="Pro">Pro</option>
            <option value="Premium">Premium</option>
          </select>
          <button
            onClick={handlePlanUpgrade}
            className="mt-3 w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold shadow transition-colors"
          >
            Upgrade Plan
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-3">📅 Booked Sessions</h2>
          {user.bookings && user.bookings.length > 0 ? (
            <ul className="space-y-3">
              {user.bookings.map((b, i) => (
                <li
                  key={i}
                  className="p-4 rounded-lg bg-gray-700 border border-gray-600"
                >
                  <p>
                    <strong>Session:</strong> {b.session}
                  </p>
                  <p>
                    <strong>Date:</strong> {b.date}
                  </p>
                  <p>
                    <strong>Status:</strong> {b.status}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings yet.</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">💪 Fitness Scaling</h2>
          <p>{fitnessScaling}</p>
        </div>
      </div>
    </section>
  );
}
