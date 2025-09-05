import { useState, useEffect } from 'react';

export default function Bookings() {
  const [session, setSession] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('gymUser'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!session || !date || !time || !user) return;

    const newBooking = {
      id: Date.now(),
      session,
      date,
      time,
      name: user.name,
      surname: user.surname || '',
      plan: user.plan || 'Basic',
    };

    setBookings((prev) => [...prev, newBooking]);
    setSession('');
    setDate('');
    setTime('');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📅 Book a Training Session</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Session Name</label>
          <input
            type="text"
            value={session}
            onChange={(e) => setSession(e.target.value)}
            placeholder="e.g. Boxing Fundamentals"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Book Session
        </button>
      </form>

      <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">🗂️ My Bookings</h3>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings yet. Fill out the form above to reserve your spot.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((b) => (
            <li key={b.id} className="bg-white border border-gray-200 shadow-sm rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-bold text-red-600">{b.session}</h4>
                <span className="text-sm text-gray-500">{b.date} at {b.time}</span>
              </div>
              <p className="text-sm text-gray-700">
                <strong>Booked by:</strong> {b.name} {b.surname}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Membership Plan:</strong> <span className="text-red-500 font-medium">{b.plan}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



