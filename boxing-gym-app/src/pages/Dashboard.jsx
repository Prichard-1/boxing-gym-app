import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function Dashboard({ user, setUser }) {
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} setUser={setUser} />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-red-500 text-xl">Please log in to access the dashboard.</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Panels defined inside Dashboard.jsx
  const MemberPanel = () => (
    <div className="space-y-6">
      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">My Workouts</h2>
        <p>Track your workout history, sets, reps, and progress.</p>
      </section>
      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">My Schedule</h2>
        <p>View upcoming classes or personal training sessions.</p>
        <Link to="/bookings" className="mt-2 inline-block text-red-600 font-semibold hover:underline">
          Book a Session
        </Link>
      </section>
      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-bold text-xl mb-2">Progress</h2>
        <p>Track fitness goals, weight, and body metrics.</p>
      </section>
    </div>
  );

  const TrainerPanel = () => (
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

  const AdminPanel = () => (
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

  const renderPanel = () => {
    switch (user.role) {
      case "member":
        return <MemberPanel />;
      case "trainer":
        return <TrainerPanel />;
      case "admin":
        return <AdminPanel />;
      default:
        return <p>User role not recognized.</p>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} setUser={setUser} />

      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-10 space-y-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Welcome, {user.name}</h1>
        {renderPanel()}
      </main>

      <Footer />
    </div>
  );
}
