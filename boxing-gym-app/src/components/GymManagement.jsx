import { useState, useEffect } from "react";
import axios from "axios";

export default function GymManagement() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("Free");
  const [role, setRole] = useState("member");
  const [error, setError] = useState("");

  // Fetch members from backend
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/members");
        setMembers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setMembers([]);
      }
    };
    fetchMembers();
  }, []);

  // Add new member
  const handleAddMember = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email) return setError("Name and email are required");

    try {
      const res = await axios.post("http://localhost:5000/api/members", {
        name,
        email,
        plan,
        role,
      });

      // Push only the member object returned by the backend
      setMembers([...members, res.data.member]);

      // Reset form
      setName("");
      setEmail("");
      setPlan("Free");
      setRole("member");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add member");
    }
  };

  return (
    <section className="bg-white p-4 rounded shadow max-w-md mx-auto mt-8">
      <h2 className="font-bold text-xl mb-2">Gym Members</h2>
      {error && <p className="text-red-500">{error}</p>}

      <ul className="mb-4">
        {members.map((m) => (
          <li key={m.id}>
            {m.name} ({m.email}) - {m.plan}, {m.role}
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddMember} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="Free">Free</option>
          <option value="Basic">Basic</option>
          <option value="Pro">Pro</option>
          <option value="Premium">Premium</option>
        </select>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="member">Member</option>
          <option value="trainer">Trainer</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Add Member
        </button>
      </form>
    </section>
  );
}
