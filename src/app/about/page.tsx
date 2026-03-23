export default function AboutPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">

      {/* HERO */}
      <section className="px-6 md:px-20 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
          BE OWNED SKIN
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Skincare today is noisy, confusing, and often built on trends rather than truth.
          <br />At BE OWNED SKIN, we exist to change that.
        </p>
      </section>

      {/* INTRO */}
      <section className="px-6 md:px-20 pb-20 flex justify-center">
        <p className="text-gray-600 max-w-2xl text-lg leading-relaxed text-center">
          We are not just a skincare brand.
          <br />
          <span className="text-gray-900 font-semibold">
            We are a data-driven skin intelligence system
          </span>{" "}
          designed to help individuals understand, track, and optimize their skin with precision.
        </p>
      </section>

      {/* PHILOSOPHY */}
      <section className="px-6 md:px-20 py-20 bg-gray-100 rounded-xl shadow-sm mx-6 md:mx-20">
        <h2 className="text-3xl font-bold mb-6 text-center">OUR PHILOSOPHY</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Skincare is not random. It’s data.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Scientific Understanding – Rooted in dermatological principles",
            "Personalization – No one-size-fits-all routines",
            "Consistency – Results come from disciplined execution",
          ].map((item, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIFFERENCE */}
      <section className="px-6 md:px-20 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">WHAT MAKES US DIFFERENT</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Most brands sell products. We build protocols.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Skin tracking methodologies",
            "Structured routines",
            "Evidence-based ingredients",
            "Continuous optimization",
          ].map((item, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* APPROACH */}
      <section className="px-6 md:px-20 py-20 bg-gray-100 rounded-xl shadow-sm">
        <h2 className="text-3xl font-bold text-center mb-10">OUR APPROACH</h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">1. Decode</h3>
            <p className="text-gray-600">Understand your skin baseline</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">2. Design</h3>
            <p className="text-gray-600">Create structured routines</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">3. Optimize</h3>
            <p className="text-gray-600">Track and refine results</p>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="px-6 md:px-20 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">OUR VISION</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          To build India’s most trusted science-first skincare ecosystem—
          where individuals make informed, data-backed decisions.
        </p>
      </section>

      {/* MISSION */}
      <section className="px-6 md:px-20 py-20 bg-gray-100 rounded-xl shadow-sm text-center">
        <h2 className="text-3xl font-bold mb-6">OUR MISSION</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          To empower people to own their skin through clarity, structure, and scientific thinking.
        </p>
      </section>

      {/* NAME */}
      <section className="px-6 md:px-20 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">THE NAME</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          “BE OWNED” is a mindset.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 text-gray-700">
          <span>• Take control</span>
          <span>• Understand deeply</span>
          <span>• Build discipline</span>
        </div>

        <p className="mt-8 text-lg font-semibold">
          You don’t just treat your skin — you own it.
        </p>
      </section>

    </div>
  );
}