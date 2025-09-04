import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Panels for different roles
import MemberPanel from "../components/panels/MemberPanel";
import TrainerPanel from "../components/panels/TrainerPanel";
import AdminPanel from "../components/panels/AdminPanel";

export default function Dashboard({ user, setUser }) {
  const [classes, setClasses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = "https://boxing-gym-backend.onrender.com/api";

  // Fetch classes and bookings
  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");

    const fetchClasses = async () => {
      try {
        const res = await fetch(`${API_BASE}/classes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setClasses(data);
      } catch (err) {
        console.error("Error fetching classes:", err);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_BASE}/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    Promise.all([fetchClasses(), fetchBookings()]).finally(() => setLoading(false));
  }, [user]);

  // Determine which panel to render
  const renderPanel = () => {
    if (!user) return <p>Please log in to access the dashboard.</p>;

    switch (user.role) {
      case "member":
        return <MemberPanel classes={classes} bookings={bookings} />;
      case "trainer":
        return <TrainerPanel classes={classes} bookings={bookings} />;
      case "admin":
        return <AdminPanel classes={classes} bookings={bookings} />;
      default:
        return <p>User role not recognized.</p>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar user={user} setUser={setUser} />

      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-10 space-y-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome, {user?.name || "Guest"}
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading dashboard...</p>
        ) : (
          renderPanel()
        )}
      </main>

      <Footer />
    </div>
  );
}

