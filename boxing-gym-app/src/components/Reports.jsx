import { useState, useEffect } from "react";
import axios from "axios";

export default function Reports() {
  const [members, setMembers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersRes, classesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/members"),
          axios.get("http://localhost:5000/api/classes"),
        ]);

        setMembers(Array.isArray(membersRes.data) ? membersRes.data : []);
        setClasses(Array.isArray(classesRes.data) ? classesRes.data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="bg-white p-4 rounded shadow max-w-3xl mx-auto mt-8">
      <h2 className="font-bold text-2xl mb-4">Reports & Analytics</h2>

      <div className="mb-4">
        <h3 className="font-semibold">Total Members:</h3>
        <p>{members.length}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Total Classes:</h3>
        <p>{classes.length}</p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Upcoming Classes:</h3>
        <ul className="list-disc list-inside">
          {classes.map((c) => (
            <li key={c.id}>
              {c.title} (Instructor: {c.instructor}) on {c.date} at {c.time}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

