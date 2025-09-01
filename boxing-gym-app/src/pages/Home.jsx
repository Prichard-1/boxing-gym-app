import Hero from "./Hero";

function Home() {
  const reviews = [
    {
      name: "John M.",
      text: "The trainers here are amazing! I’ve gained so much confidence and strength.",
    },
    {
      name: "Sarah K.",
      text: "Genaro Boxing Gym is the best decision I made for my fitness journey. Highly recommend!",
    },
    {
      name: "Michael B.",
      text: "Great environment, friendly community, and top-notch coaching.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      {/* Hero Section */}
      <h1 className="text-5xl font-bold mb-4">Genaro_Boxing Gym</h1>
      <p className="text-lg mb-6">Train like a champion. Book your sessions today!</p>
      <div className="space-x-4 mb-16">
        <a
          href="/register"
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
        >
          Register
        </a>
        <a
          href="/booking"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Book Session
        </a>
      </div>

      {/* Testimonials Section */}
      <section className="w-full max-w-6xl py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300"
            >
              {/* Star Ratings */}
              <div className="flex justify-center mb-4 text-yellow-400">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <span key={i}>&#9733;</span> // ★ Unicode star
                  ))}
              </div>

              <p className="text-gray-700 italic mb-4">"{review.text}"</p>
              <h3 className="text-red-600 font-semibold">{review.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
