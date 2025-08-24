// src/pages/Workout.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Workout() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("https://wger.de/api/v2/exercise/?language=2&limit=12") // English, top 12
      .then((res) => setExercises(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="min-h-screen py-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-white">
        Workouts
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-6 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
          >
            {/* Example image placeholder */}
            <img
              src={`/images/exercises/${exercise.id}.jpg`} // optional: custom images
              alt={exercise.name}
              className="w-full h-40 object-cover rounded-xl mb-4"
              onError={(e) =>
                (e.target.src =
                  "/images/exercises/default-exercise.jpg") // fallback image
              }
            />

            <h3 className="text-2xl font-bold mb-2">{exercise.name}</h3>

            <p className="text-gray-700 mb-4">
              {exercise.description.replace(/<[^>]*>?/gm, "") || "No description available."}
            </p>

            <a
              href="/register"
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition-colors text-center"
            >
              Try This Exercise
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
