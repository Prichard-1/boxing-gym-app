export default function TrainerPanel() {
  return (
    <div className="space-y-6">
      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">Client Management</h2>
        <p>View client profiles, workouts, and progress.</p>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">Schedule Management</h2>
        <p>Manage upcoming sessions and classes.</p>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">Workout Planning</h2>
        <p>Create and assign custom workout plans for clients.</p>
      </section>
    </div>
  );
}
