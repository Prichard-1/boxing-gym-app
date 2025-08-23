import Hero from "./Hero";


function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <h1 className="text-5xl font-bold mb-4">Iron Fist Boxing Gym</h1>
      <p className="text-lg mb-6">Train like a champion. Book your sessions today!</p>
      <div className="space-x-4">
        <a href="/register" className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700">Register</a>
        <a href="/booking" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Book Session</a>
      </div>
    </div>
  );
}

