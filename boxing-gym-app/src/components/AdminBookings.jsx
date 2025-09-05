import useAdminBookings from '../components/useAdminBookings';

export default function AdminBookings() {
  const { bookings, loading, error } = useAdminBookings();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Admin: All Bookings</h2>
      {loading ? (
        <p className="text-gray-500">Loading bookings...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">User</th>
              <th className="border p-2 text-left">Session</th>
              <th className="border p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td className="border p-2">{b.user?.name || 'Unknown'}</td>
                <td className="border p-2">{b.session}</td>
                <td className="border p-2">{b.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
