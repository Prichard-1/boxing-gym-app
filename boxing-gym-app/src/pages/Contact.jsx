import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
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

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
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
    </div>
  );
}

export default Contact;
