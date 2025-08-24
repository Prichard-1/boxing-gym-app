// src/pages/About.jsx
import React from "react";

export default function About() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl mx-6 my-10 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">About Boxing Gym</h1>
      <p className="text-lg md:text-xl text-center max-w-3xl mb-4">
        At Boxing Gym, we are dedicated to helping you achieve your fitness goals
        in a fun, motivating, and safe environment. Our professional trainers guide
        every session and provide personalized workout plans tailored to your needs.
      </p>
      <p className="text-lg md:text-xl text-center max-w-3xl">
        Whether you’re a beginner or an experienced boxer, we offer classes, one-on-one
        training, and community events to keep you engaged and inspired every step
        of the way.
      </p>
    </section>
  );
}