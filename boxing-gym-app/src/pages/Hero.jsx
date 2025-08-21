export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-red-600 to-black text-white py-20 rounded-2xl shadow-lg">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Welcome to Boxing Gym
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Train like a champion. Book your sessions, track your progress, and
          stay motivated with our boxing community.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/plans"
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-200"
          >
            View Plans
          </a>
          <a
            href="/register"
            className="bg-black border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900"
          >
            Join Now
          </a>
        </div>
      </div>
    </section>
  );
}
