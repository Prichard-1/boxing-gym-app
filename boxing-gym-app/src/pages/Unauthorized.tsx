// src/pages/Unauthorized.tsx
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-red-500">Access Denied</h1>
      <p className="mb-4">You do not have permission to view this page.</p>
      <Link to="/dashboard" className="text-blue-500 hover:underline">
        Go back to Dashboard
      </Link>
    </div>
  );
}
