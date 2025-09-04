// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";

// Mock user type
interface User {
  name: string;
  role: "member" | "trainer" | "admin";
}

function App() {
  // Example user state (replace with auth logic / context later)
  const [user, setUser] = useState<User | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Dashboard - open to all valid roles */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user} allowedRoles={["member", "trainer", "admin"]}>
              <Dashboard user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />

        {/* Example: Admin-only route */}
        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute user={user} allowedRoles={["admin"]}>
              <Dashboard user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
