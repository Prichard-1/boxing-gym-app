import React from "react";

export function AdminPanel() {
  return (
    <div className="space-y-6">
      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">Gym Management</h2>
        <p>Monitor membership, attendance, and revenue.</p>
      </section>
      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">Class Scheduling</h2>
        <p>Manage class schedules, instructors, and capacity.</p>
      </section>
      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">Reports</h2>
        <p>Generate reports on attendance and member engagement.</p>
      </section>
    </div>
  );
}
