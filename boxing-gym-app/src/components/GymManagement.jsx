import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export default function GymManagement() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/members`);
        setMembers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setMembers([]);
      }
    };
    fetchMembers();
  }, []);

  const handleAddMember = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email) return setError("Name and email are required");

    try {
      const res = await axios.post(`${API_BASE_URL}/api/members`, { name, email });
      setMembers([...members, res.data]);
      setName("");
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add member");
    }
  };

  return (
    <section className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-xl mb-2">Gym Members</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {members.map((m) => (
          <li key={m.id}>{m.name} ({m.email})</li>
        ))}
      </ul>
      <form onSubmit={handleAddMember} className="mt-2 flex gap-2">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </section>
  );
}
