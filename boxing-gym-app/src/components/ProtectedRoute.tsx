// src/components/ProtectedRoute.tsx
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface User {
  name: string;
  role: string;
}

interface ProtectedRouteProps {
  user: User | null;
  allowedRoles: string[];
  children: ReactNode;
}

export default function ProtectedRoute({ user, allowedRoles, children }: ProtectedRouteProps) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
