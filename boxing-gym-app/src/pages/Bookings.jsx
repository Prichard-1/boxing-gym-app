import { useState } from 'react';
import useBookings from '../hooks/useBookings';

export default function Bookings() {
  const [session, setSession] = useState('');
  const [date, setDate] = useState('');
  const { bookings, loading, error, createBooking } = useBookings();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBooking({ session, date });
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
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Booking...' : 'Book'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      <h3 className="text-xl font-semibold mt-8">My Bookings</h3>
      {loading && bookings.length === 0 ? (
        <p className="text-gray-500 mt-2">Loading bookings...</p>
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

