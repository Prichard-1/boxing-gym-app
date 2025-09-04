// src/pages/Dashboard.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MemberPanel from "../components/panels/MemberPanel";
import TrainerPanel from "../components/panels/TrainerPanel";
import AdminPanel from "../components/panels/AdminPanel";


export default function Dashboard({ user, setUser }) {
  const renderPanel = () => {
    switch (user.role) {
      case "member":
        return <MemberPanel />;
      case "trainer":
        return <TrainerPanel />;
      case "admin":
        return <AdminPanel />;
      default:
        return null; // ProtectedRoute prevents invalid roles from reaching here
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} setUser={setUser} />
      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-10 space-y-6">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Welcome, {user.name}
        </h1>
        {renderPanel()}
      </main>
      <Footer />
    </div>
  );
}
