import { useState} from "react";

function Contact(){
    const [form, setForm] = useState({name: "", email:"", message:""});

    const handleChange =(e)=>{
        setForm({ ...form, [e.target.name]: e.target.value});
    };
    const handleSubmit =(e) =>{
        e.preventDefault();
        console.log("Message submitted", form);
        
        //send to back end
        alert("Your message has been sent");
        setForm({name:"",email:"", message:""});
    };
    return(
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
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;