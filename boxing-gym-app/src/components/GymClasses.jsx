
import { useState, useEffect } from "react";
import axios from "axios";

export default function GymClasses() {
  const [classes, setClasses] = useState([]);
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [error, setError] = useState("");

  // Use environment variable for API base URL
  const API_BASE = import.meta.env.VITE_API_URL;

  // Fetch classes
  const fetchClasses = async () => {
    try {
      const res = await axios.get(`${API_BASE}/classes`);
      setClasses(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch classes:", err.response?.data || err.message);
      setError("Failed to load classes");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Add new class
  const handleAddClass = async (e) => {
    e.preventDefault();
    setError("");
    if (!title || !instructor) return setError("Title and instructor are required");

    try {
      const res = await axios.post(`${API_BASE}/classes`, { title, instructor });
      setClasses([...classes, res.data]);
      setTitle("");
      setInstructor("");
    } catch (err) {
      console.error("Add class error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Failed to add class");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Gym Classes</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul className="mb-6 space-y-2">
        {classes.map((cls) => (
          <li key={cls.id} className="p-2 bg-gray-800 rounded">
            {cls.title} (Instructor: {cls.instructor})
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddClass} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Class Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded text-black"
        />
        <input
          type="text"
          placeholder="Instructor"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          className="p-2 rounded text-black"
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 py-2 rounded font-semibold shadow transition-colors"
        >
          Add Class
        </button>
      </form>
    </div>
  );
}
