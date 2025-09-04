import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function Bookings({ user }) {
  const [bookings, setBookings] = useState([]);
  const [session, setSession] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(storedBookings);
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to book a session");
      return;
    }

    if (user.role !== "user") {
      toast.error("Only regular users can book sessions");
      return;
    }

    if (!session || !date) {
      toast.error("Please select a session and date");
      return;
    }

    setLoading(true);

    const newBooking = {
      userEmail: user.email,
      session,
      date,
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    toast.success("Booking successful!");
    setSession("");
    setDate("");
    setLoading(false);
  };

  // Filter bookings for current user
  const userBookings = bookings.filter((b) => b.userEmail === user?.email);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Book a Session</h1>

      <form onSubmit={handleBooking} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Session:</label>
          <input
            type="text"
            value={session}
            onChange={(e) => setSession(e.target.value)}
            placeholder="Enter session name"
            className="border p-2 w-full rounded"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full rounded"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Session"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Your Bookings</h2>
        {userBookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <ul className="space-y-2">
            {userBookings.map((booking, index) => (
              <li key={index} className="border p-3 rounded">
                <strong>Session:</strong> {booking.session} <br />
                <strong>Date:</strong> {booking.date}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

