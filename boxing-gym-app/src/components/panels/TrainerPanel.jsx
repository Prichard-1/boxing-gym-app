import React from "react";

export default function TrainerPanel({ classes, bookings }) {
  return (
    <div className="space-y-6">
      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">Client Management</h2>
        <p>View client bookings and attendance.</p>
        <ul className="mt-2 list-disc pl-5">
          {bookings.map(b => (
            <li key={b.id}>
              {b.userEmail} booked {b.session} on {b.date}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">Schedule Management</h2>
        <ul className="mt-2 list-disc pl-5">
          {classes.map(c => (
            <li key={c.id}>
              {c.title} by {c.instructor} on {c.date} at {c.time}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
