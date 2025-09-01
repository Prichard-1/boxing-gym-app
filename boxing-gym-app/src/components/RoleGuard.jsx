// RoleGuard.jsx
import { Navigate } from "react-router-dom";

export default function RoleGuard({ user, allowedRoles, children }) {
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
}
