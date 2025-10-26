import React, { useEffect } from 'react';

export default function About({ onNavigate }) {
  useEffect(() => {
    if (window.feather && typeof window.feather.replace === 'function') {
      window.feather.replace();
    }
  }, []);

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7F50] to-[#FCE38A] opacity-90"></div>
        <div className="container mx-auto px-6 py-24 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About <span className="text-[#2E86DE]">Simply Recreate</span></h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">We craft custom sublimation art and accessories — magnets, totes, bookmarks, mirrors and more. Each piece is made-to-order with care.</p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">Started from a love for playful, personalized art, Simply Recreate brings your ideas to life using high-quality sublimation techniques. We focus on bright color palettes, clean outlines, and durable finishes that look great and last long.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">What We Make</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Custom magnets in rounded rectangle, square, or circle</li>
              <li>Stylish tote bags with accent color options</li>
              <li>Bookmarks with placement guides</li>
              <li>Mirrors, glow bottles, earrings, oven mitts</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="text-center pb-12">
        <button onClick={()=>onNavigate('/customize')} className="inline-block bg-[#FF7F50] hover:bg-[#2E86DE] text-white px-8 py-3 rounded-full font-bold transition-all shadow-md">Start Designing</button>
      </div>
    </main>
  );
}