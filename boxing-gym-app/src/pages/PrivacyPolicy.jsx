// src/pages/PrivacyPolicy.jsx
import React from "react";

export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl mx-6 my-10 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

      <p className="text-lg md:text-xl text-center max-w-3xl mb-4">
        Your privacy is very important to us at Boxing Gym. We only collect
        personal information that is necessary to provide you with our services
        and ensure a safe, personalized experience.
      </p>

      <p className="text-lg md:text-xl text-center max-w-3xl mb-4">
        We do not sell or share your personal information with third parties
        without your consent. All collected data is securely stored and managed
        in accordance with applicable privacy laws.
      </p>

      <p className="text-lg md:text-xl text-center max-w-3xl mb-4">
        By using our website and services, you agree to our collection and use
        of information as described in this Privacy Policy.
      </p>

      <p className="text-lg md:text-xl text-center max-w-3xl">
        If you have any questions about your privacy or the handling of your
        personal information, please <a href="/contact" className="text-blue-600 hover:underline">contact us</a>.
      </p>
    </section>
  );
}
