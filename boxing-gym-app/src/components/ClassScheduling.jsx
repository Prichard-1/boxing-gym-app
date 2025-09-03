
import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

export default function ClassScheduling() {
  const [classes, setClasses] = useState([]);
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/classes`);
        setClasses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setClasses([]);
      }
    };
    fetchClasses();
  }, []);

  const handleAddClass = async (e) => {
    e.preventDefault();
    setError("");
    if (!title || !instructor) return setError("Title and instructor are required");

    try {
      const res = await axios.post(`${API_BASE_URL}/api/classes`, { title, instructor });
      setClasses([...classes, res.data]);
      setTitle("");
      setInstructor("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add class");
    }
  };

  return (
    <section className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-xl mb-2">Gym Classes</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {classes.map((c) => (
          <li key={c.id}>{c.title} (Instructor: {c.instructor})</li>
        ))}
      </ul>
      <form onSubmit={handleAddClass} className="mt-2 flex gap-2">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Instructor" value={instructor} onChange={(e) => setInstructor(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </section>
  );
}
