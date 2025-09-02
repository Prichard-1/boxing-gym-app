
import { useState, useEffect } from "react";
import axios from "axios";

export default function GymClasses() {
  const [classes, setClasses] = useState([]);
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [error, setError] = useState("");

  // Fetch classes
  const fetchClasses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/classes");
      setClasses(res.data);
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
      const res = await axios.post("http://localhost:5000/api/classes", { title, instructor });
      setClasses([...classes, res.data]);
      setTitle("");
      setInstructor("");
    } catch (err) {
      console.error("Add class error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Failed to add class");
    }
  };

  return (
    <div>
      <h2>Gym Classes</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {classes.map((cls) => (
          <li key={cls.id}>{cls.title} (Instructor: {cls.instructor})</li>
        ))}
      </ul>
      <form onSubmit={handleAddClass}>
        <input
          type="text"
          placeholder="Class Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Instructor"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
        />
        <button type="submit">Add Class</button>
      </form>
    </div>
  );
}
