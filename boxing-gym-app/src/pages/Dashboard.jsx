// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // Mock data for demonstration. Replace with backend API calls later
  const [upcomingSessions, setUpcomingSessions] = useState([
    { id: 1, date: "2025-08-25", time: "10:00 AM", type: "Boxing Basics" },
    { id: 2, date: "2025-08-27", time: "2:00 PM", type: "Cardio Boxing" },
  ]);

  const [workoutPlans, setWorkoutPlans] = useState([
    { id: 1, name: "Beginner Boxing", daysPerWeek: 3 },
    { id: 2, name: "Strength & Conditioning", daysPerWeek: 2 },
  ]);

  const [progress, setProgress] = useState([
    { id: 1, title: "Punch Accuracy", percent: 75 },
    { id: 2, title: "Stamina", percent: 60 },
  ]);

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-b from-black to-red-600 text-white">
      <h1 className="text-4xl font-bold text-center mb-12">Your Dashboard</h1>

      {/* Upcoming Sessions */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Sessions</h2>
        {upcomingSessions.length === 0 ? (
          <p className="text-gray-200">No upcoming sessions. <Link to="/booking" className="text-red-400 underline">Book now</Link>.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="bg-white/20 backdrop-blur-md rounded-2xl p-4 shadow-md hover:scale-105 transition-transform duration-300"
              >
                <p className="font-semibold">{session.type}</p>
                <p>{session.date} at {session.time}</p>
                <Link to="/booking" className="text-red-400 underline mt-2 inline-block">
                  Reschedule
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Workout Plans */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Your Workout Plans</h2>
        {workoutPlans.length === 0 ? (
          <p className="text-gray-200">No workout plans. <Link to="/plans" className="text-red-400 underline">View Plans</Link>.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {workoutPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white/20 backdrop-blur-md rounded-2xl p-4 shadow-md hover:scale-105 transition-transform duration-300"
              >
                <p className="font-semibold">{plan.name}</p>
                <p>Days per week: {plan.daysPerWeek}</p>
                <Link to="/plans" className="text-red-400 underline mt-2 inline-block">
                  View Plan Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progress */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Progress</h2>
        {progress.length === 0 ? (
          <p className="text-gray-200">No progress yet. Start a workout to track your stats!</p>
        ) : (
          <div className="space-y-4">
            {progress.map((item) => (
              <div key={item.id}>
                <p className="font-semibold mb-1">{item.title}</p>
                <div className="w-full bg-white/20 rounded-full h-4">
                  <div
                    className="bg-red-600 h-4 rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
