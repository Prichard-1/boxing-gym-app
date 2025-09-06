import { useState, useEffect } from "react";
import API_BASE_URL from "../config";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/contacts`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setContacts(data.reverse()); // show latest first
      }
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
        fetchContacts();
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert("Failed to send message. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us 📩</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            autoComplete="off"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            autoComplete="off"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
            autoComplete="off"
          />
          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-green-600 font-semibold text-center">
            ✅ Your message has been sent!
          </p>
        )}
      </div>

      <div className="w-full max-w-3xl">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Contacts 🧾</h3>
        {contacts.length === 0 ? (
          <p className="text-gray-500">No messages received yet.</p>
        ) : (
          <ul className="space-y-4">
            {contacts.map((c) => (
              <li key={c.id || c.email + c.message} className="bg-white border border-gray-200 shadow-sm rounded-lg p-4">
                <p className="text-lg font-semibold text-green-700">{c.name}</p>
                <p className="text-sm text-gray-600">{c.email}</p>
                <p className="mt-2 text-gray-800">{c.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Contact;
