import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Bookings() {
  const [session, setSession] = useState('');
  const [date, setDate] = useState('');
  const [bookings, setBookings] = useState([]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/bookings`, { session, date }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSession('');
      setDate('');
      fetchBookings();
    } catch (err) {
      console.error('Booking failed:', err);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Book a Session</h2>
      <form onSubmit={handleBooking} className="space-y-4">
        <input type="text" value={session} onChange={(e) => setSession(e.target.value)} placeholder="Session name" required className="w-full p-2 border rounded" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Book</button>
      </form>

      <h3 className="text-xl font-semibold mt-8">My Bookings</h3>
      <ul className="space-y-2 mt-2">
        {bookings.map((b) => (
          <li key={b.id} className="border p-3 rounded">
            {b.session} on {b.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
