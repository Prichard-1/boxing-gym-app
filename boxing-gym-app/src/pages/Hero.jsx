import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-center text-white py-24 px-6">
      {/* Tagline */}
      <div className="inline-block bg-gray-800 text-sm px-4 py-1 rounded-full mb-6">
        Professional Boxing Training
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold">
        Train Like a <span className="text-primary">Champion</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
        Join our world-class boxing gym and unleash your potential with expert trainers, modern equipment, and a supportive community.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <Link
          to="/register"
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800"
        >
          Start Your Journey
        </Link>
        <Link
          to="/plans"
          className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600"
        >
          View Plans
        </Link>
      </div>
    </section>
  );
}

export default Hero;
