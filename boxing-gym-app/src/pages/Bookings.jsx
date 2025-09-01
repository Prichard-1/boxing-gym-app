import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Bookings({ user, setUser }) {
  const [session, setSession] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    if (!user) return;
    try {
      const res = await axios.get("http://localhost:5000/bookings");
      const userBookings = res.data.filter((b) => b.user.email === user.email);
      setBookings(userBookings);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBooking = async () => {
    if (!session || !date) {
      toast.error("Please select a session and date");
      return;
    }

    setLoading(true);
    try {
      const bookingData = { user: { name: user.name, email: user.email }, session, date, status: "confirmed" };
      await axios.post("http://localhost:5000/bookings", bookingData);
      toast.success("Booking confirmed!");
      setSession("");
      setDate("");
      fetchBookings();
    } catch (err) {
      console.error(err);
      toast.error("Error saving booking");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="text-center mt-10 text-red-500">Please log in to book a session.</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} setUser={setUser} />
      <main className="flex-grow max-w-3xl mx-auto w-full px-6 py-10">
        <Toaster position="top-center" />
        <h2 className="text-3xl font-bold mb-6 text-center">Book a Session</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Session Type"
            className="w-full p-3 rounded-lg border border-gray-600"
            value={session}
            onChange={(e) => setSession(e.target.value)}
          />
          <input
            type="date"
            className="w-full p-3 rounded-lg border border-gray-600"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={handleBooking} disabled={loading} className="w-full bg-red-600 py-3 rounded-lg text-white">
            {loading ? "Saving..." : "Confirm Booking"}
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">My Bookings</h3>
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <ul>
              {bookings.map((b, i) => (
                <li key={i}>
                  {b.session} - {b.date} ({b.status})
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

