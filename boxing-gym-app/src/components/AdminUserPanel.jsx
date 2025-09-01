// AdminUserPanel.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUserPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const updateRole = async (email, newRole) => {
    await axios.put("http://localhost:5000/profile", { email, role: newRole });
    toast.success("Role updated");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      {users.map((u) => (
        <div key={u.email} className="mb-4">
          <p>{u.name} ({u.email}) — {u.role}</p>
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
