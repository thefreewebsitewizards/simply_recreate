import React, { useEffect } from 'react';

export default function Contact({ onNavigate }) {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch with <span className="text-[#2E86DE]">Simply Recreate</span></h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">Questions about orders, custom designs, or collaborations? We’d love to hear from you.</p>
        </div>
      </section>

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-4">We’re here to help</h2>
            <p className="text-gray-600 mb-4">Fill out the form, and we’ll get back to you as soon as possible.</p>
            <form onSubmit={(e)=>e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <input type="text" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50]" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input type="email" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea rows="5" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50]"></textarea>
              </div>
              <button className="bg-[#FF7F50] hover:bg-[#2E86DE] text-white rounded-full px-6 py-2 shadow-md transition-all">Send Message</button>
            </form>
          </div>

        </div>
      </main>

      <div className="text-center pb-12">
        <button onClick={()=>onNavigate('/shop')} className="inline-block border-2 border-[#FF7F50] text-[#FF7F50] hover:bg-[#FF7F50] hover:text-white px-8 py-3 rounded-full font-bold transition-all">Browse Shop</button>
      </div>
    </main>
  );
}