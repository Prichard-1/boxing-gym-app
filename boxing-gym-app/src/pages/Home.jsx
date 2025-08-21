import Hero from "./Hero";


export default function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Why Train With Us?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our boxing gym provides professional coaching, flexible plans, and a
          community that helps you achieve your fitness goals. From beginners to
          pros, we’ve got you covered.
        </p>
      </section>
    </div>
  );
}
