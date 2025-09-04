import { Link } from "react-router-dom";

export default function MemberPanel() {
  return (
    <div className="space-y-6">
      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">My Workouts</h2>
        <p>Track your workout history, sets, reps, and progress.</p>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">My Schedule</h2>
        <p>View upcoming classes or personal training sessions.</p>
        <Link
          to="/bookings"
          className="mt-2 inline-block text-red-600 font-semibold hover:underline"
        >
          Book a Session
        </Link>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">Progress</h2>
        <p>Track fitness goals, weight, and body metrics.</p>
      </section>
    </div>
  );
}

