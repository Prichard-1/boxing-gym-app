import React from "react";
import { MemberPanel } from "./MemberPanel";
import { TrainerPanel } from "./TrainerPanel";
import { AdminPanel } from "./AdminPanel";

export default function Dashboard({ user }) {
  if (!user)
    return <p className="text-center mt-10 text-red-500">Please log in to access the dashboard.</p>;

  return (
    <div className="min-h-screen flex flex-col p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>

      {user.role === "member" && <MemberPanel />}
      {user.role === "trainer" && <TrainerPanel />}
      {user.role === "admin" && <AdminPanel />}
    </div>
  );
}
