"use client";

import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const data = {
      name: form[0].value,
      email: form[1].value,
      message: form[2].value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Message sent successfully!");
        form.reset();
      } else {
        alert(result.error || "Something went wrong");
      }
    } catch (error) {
      alert("Server error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 md:px-20 py-20">

      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Have questions or need support? We're here to help you on your skincare journey.
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT - INFO */}
        <div className="space-y-6">
          <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Email</h3>
            <p className="text-gray-600">support@beownedskin.co</p>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Phone</h3>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Working Hours</h3>
            <p className="text-gray-600">Mon - Sat, 10:00 AM - 7:00 PM</p>
          </div>
        </div>

        {/* RIGHT - FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-8 bg-gray-50 rounded-xl shadow-sm space-y-4"
        >
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <textarea
            placeholder="Your Message"
            required
            rows={5}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* BOTTOM CTA */}
      <div className="mt-20 text-center">
        <p className="text-gray-500">
          We usually respond within 24 hours.
        </p>
      </div>

    </div>
  );
}