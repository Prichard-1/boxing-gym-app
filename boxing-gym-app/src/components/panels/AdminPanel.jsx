import React from "react";

export default function AdminPanel({ classes, bookings }) {
  return (
    <div className="space-y-6">
      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">Gym Management</h2>
        <p>Total Classes: {classes.length}</p>
        <p>Total Bookings: {bookings.length}</p>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">Class Scheduling</h2>
        <ul className="mt-2 list-disc pl-5">
          {classes.map(c => (
            <li key={c.id}>
              {c.title} by {c.instructor} on {c.date} at {c.time}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">Reports</h2>
        <p>Total Users: N/A (implement later with backend DB)</p>
        <p>Total Bookings: {bookings.length}</p>
      </section>
    </div>
  );
}



