import React from "react";

const workouts = [
  {
    title: "30-Minute At-Home Boxing Workout",
    src: "https://www.youtube.com/embed/jCTEVKRTuS8",
    description: "A full-body boxing workout you can do at home to build stamina and strength.",
  },
  {
    title: "How to Fight for Beginners",
    src: "https://www.youtube.com/embed/C3TbxWTxVqg",
    description: "Introductory fight moves to improve balance, coordination, and basic fighting skills.",
  },
  {
    title: "20-Minute Full Body Workout (No Equipment)",
    src: "https://www.youtube.com/embed/wIynl3at0Rs",
    description: "High-intensity, equipment-free full-body workout suitable for all fitness levels.",
  },
  {
    title: "6-Pack Abs for Beginners You Can Do Anywhere",
    src: "https://www.youtube.com/embed/3p8EBPVZ2Iw",
    description: "Beginner-friendly abs routine to strengthen your core without any equipment.",
  },
];

export default function Workout() {
  return (
    <section className="min-h-screen py-20 px-6 bg-gray-100 text-gray-900">
      <h1 className="text-5xl font-extrabold text-center mb-16 text-red-600">
        Workouts
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
        {workouts.map((workout, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative aspect-video">
              <iframe
                className="w-full h-full"
                src={workout.src}
                title={workout.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-red-600">{workout.title}</h2>
              <p className="text-gray-700">{workout.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
