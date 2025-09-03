// AdminUserPanel.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import toast from "react-hot-toast";

export default function AdminUserPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/users`);
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const updateRole = async (email, newRole) => {
    try {
      await axios.put(`${API_BASE_URL}/api/users`, { email, role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, role: newRole } : u))
      );
      toast.success("Role updated");
    } catch (err) {
      console.error("Error updating role:", err);
      toast.error("Failed to update role");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      {users.map((u) => (
        <div key={u.email} className="mb-4">
          <p>
            {u.name} ({u.email}) — {u.role}
          </p>
          <select
            value={u.role}
            onChange={(e) => updateRole(u.email, e.target.value)}
          >
            <option value="member">Member</option>
            <option value="trainer">Trainer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      ))}
    </div>
  );
}
