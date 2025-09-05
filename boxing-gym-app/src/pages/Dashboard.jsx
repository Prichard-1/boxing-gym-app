import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import AdminBookings from "../components/AdminBookings"; // adjust path if needed

// ===== Member Panel =====
const MemberPanel = () => (
  <div className="space-y-6">
    <section className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-xl mb-2">My Workouts</h2>
      <p>Track your workout history, sets, reps, and progress.</p>
    </section>
    <section className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-xl mb-2">My Schedule</h2>
      <p>View upcoming classes or personal training sessions.</p>
    </section>
    <section className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-xl mb-2">Progress</h2>
      <p>Track fitness goals, weight, and body metrics.</p>
    </section>
  </div>
);

// ===== Trainer Panel =====
const TrainerPanel = () => (
  <div className="space-y-6">
    <section className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-xl mb-2">Client Management</h2>
      <p>View client profiles, workouts, and progress.</p>
    </section>
    <section className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-xl mb-2">Schedule Management</h2>
      <p>Manage upcoming sessions and classes.</p>
    </section>
    <section className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-xl mb-2">Workout Planning</h2>
      <p>Create and assign custom workout plans for clients.</p>
    </section>
  </div>
);

// ===== Admin Panel =====
const AdminPanel = () => (
  <div className="space-y-6">
    <section className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-xl mb-2">Gym Management</h2>
      <p>Manage members, trainers, and gym resources.</p>
    </section>
    <section className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-xl mb-2">Class Scheduling</h2>
      <p>Create, edit, and manage classes and sessions.</p>
    </section>
    <section className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-xl mb-2">Reports</h2>
      <p>View reports, analytics, and attendance.</p>
    </section>
    <section className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-xl mb-2">All Bookings</h2>
      <AdminBookings />
    </section>
  </div>
);

// ===== Dashboard Component =====
export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const renderPanel = () => {
    if (!user) return <p className="text-red-500 text-xl">Please log in.</p>;

    switch (user.role) {
      case "member":
        return <MemberPanel />;
      case "trainer":
        return <TrainerPanel />;
      case "admin":
        return <AdminPanel />;
      default:
        return <p className="text-red-500 text-xl">User role not recognized.</p>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} setUser={setUser} />
      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-10 space-y-6">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Welcome, {user?.name || "Guest"}
        </h1>
        {renderPanel()}
      </main>
      <Footer />
    </div>
  );
}
