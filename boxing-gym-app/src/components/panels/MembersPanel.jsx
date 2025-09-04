import React from "react";
import { Link } from "react-router-dom";

export default function MemberPanel({ classes, bookings }) {
  return (
    <div className="space-y-6">
      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">My Workouts</h2>
        <p>Track your booked classes and progress.</p>
        {bookings.length > 0 ? (
          <ul className="mt-2 list-disc pl-5">
            {bookings.map(b => (
              <li key={b.id}>
                {b.session} on {b.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings yet.</p>
        )}
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">Available Classes</h2>
        <ul className="mt-2 list-disc pl-5">
          {classes.map(c => (
            <li key={c.id}>
              {c.title} by {c.instructor} on {c.date} at {c.time}
            </li>
          ))}
        </ul>
        <Link
          to="/bookings"
          className="mt-2 inline-block text-blue-600 font-semibold hover:underline"
        >
          Book a Session
        </Link>
      </section>
    </div>
  );
}
