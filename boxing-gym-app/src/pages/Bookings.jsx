import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../config"; 
import config from "../config";

export default function Bookings({ user }) {
  const [bookings, setBookings] = useState([]);
  const [session, setSession] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch existing bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/bookings`);
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.bookings)
        ? res.data.bookings
        : [];
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      toast.error("Failed to load bookings");
      setBookings([]);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Handle new booking
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to book a session");
      return;
    }

    if (user.role !== "member") {
      toast.error("Only members can book sessions");
      return;
    }

    if (!session || !date) {
      toast.error("Please select a session and date");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/api/bookings`, {
        user,
        session,
        date,
      });
      setBookings((prev) => [...prev, res.data]);
      toast.success("Booking successful!");
      setSession("");
      setDate("");
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          className={`bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Session"}
        </button>
      </form>

      <hr className="my-6" />

      <h2 className="text-xl font-bold mb-2">Your Bookings</h2>
      {Array.isArray(bookings) && bookings.length > 0 ? (
        <ul className="space-y-2">
          {bookings.map((b, index) => (
            <li
              key={b.id || `${b.session}-${b.date}-${index}`}
              className="border p-2 rounded"
            >
              <strong>Session:</strong> {b.session} <br />
              <strong>Date:</strong> {b.date} <br />
              <strong>User:</strong> {b.user?.name || b.user?.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings yet.</p>
      )}
    </div>
  );
}
