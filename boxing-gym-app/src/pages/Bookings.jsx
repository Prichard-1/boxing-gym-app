import { useState } from 'react';

export default function Bookings() {
  const [session, setSession] = useState('');
  const [date, setDate] = useState('');
  const [bookings, setBookings] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!session || !date) return;

    const newBooking = {
      id: Date.now(),
      session,
      date,
    };

    setBookings((prev) => [...prev, newBooking]);
    setSession('');
    setDate('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Book a Session</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={session}
          onChange={(e) => setSession(e.target.value)}
          placeholder="Session name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Book
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-8">Booked Sessions</h3>
      {bookings.length === 0 ? (
        <p className="text-gray-500 mt-2">No bookings yet.</p>
      ) : (
        <ul className="space-y-2 mt-2">
          {bookings.map((b) => (
            <li key={b.id} className="border p-3 rounded">
              <strong>{b.session}</strong> on <em>{b.date}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


