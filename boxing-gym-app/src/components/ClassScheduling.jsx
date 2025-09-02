import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ClassScheduling() {
  const [classes, setClasses] = useState([]);
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch classes from backend
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/classes");
        setClasses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch classes");
      }
    };
    fetchClasses();
  }, []);

  // Add new class
  const handleAddClass = async (e) => {
    e.preventDefault();
    if (!title || !instructor || !date || !time) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/classes", {
        title,
        instructor,
        date,
        time,
      });

      setClasses([...classes, res.data.class]);
      toast.success(res.data.message);

      setTitle("");
      setInstructor("");
      setDate("");
      setTime("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to add class");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white p-4 rounded shadow max-w-md mx-auto mt-8">
      <Toaster position="top-center" />
      <h2 className="font-bold text-xl mb-2">Gym Classes</h2>
      <ul className="mb-4">
        {classes.map((c) => (
          <li key={c.id}>
            {c.title} - {c.instructor} ({c.date} @ {c.time})
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddClass} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Instructor"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className={`py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding..." : "Add Class"}
        </button>
      </form>
    </section>
  );
}
