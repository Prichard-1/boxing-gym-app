import React from "react";
import GymManagement from "./GymManagement";
import ClassScheduling from "./ClassScheduling";
import Reports from "./Reports";

export default function AdminPanel() {
  return (
    <div className="space-y-6 p-6">
      <GymManagement />
      <ClassScheduling />
      <Reports />
    </div>
  );
}
