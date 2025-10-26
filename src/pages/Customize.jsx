import React, { useEffect } from 'react';

const products = [
  { key: 'magnet', name: 'Magnet', caption: 'Rounded rectangle outline for placement.', action: (onNavigate)=>onNavigate('/customize?product=magnet'), icon: (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" stroke="#2E86DE" strokeWidth="4">
      <rect x="30" y="20" width="100" height="80" rx="16" ry="16" />
    </svg>
  ) },
  { key: 'tote', name: 'Tote Bag', caption: 'Simple tote with handle guide.', action: (onNavigate)=>onNavigate('/customize?product=tote'), icon: (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" stroke="#FF7F50" strokeWidth="4">
      <path d="M40 100 H120 V60 H40 Z" />
      <path d="M60 60 C60 40 100 40 100 60" />
      <path d="M60 60 L60 40" />
      <path d="M100 60 L100 40" />
    </svg>
  ) },
  { key: 'bookmark', name: 'Bookmark', caption: 'Slim bookmark with punch hole.', action: (onNavigate)=>onNavigate('/customize?product=bookmark'), icon: (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" stroke="#2E86DE" strokeWidth="4">
      <rect x="60" y="20" width="40" height="90" rx="10" />
      <circle cx="100" cy="34" r="6" fill="none" stroke="#2E86DE" />
    </svg>
  ) },
  { key: 'glow-bottle', name: 'Glow Bottle', caption: 'Bottle silhouette with cap.', action: (onNavigate)=>onNavigate('/customize?product=glow-bottle'), icon: (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" stroke="#FF7F50" strokeWidth="4">
      <rect x="65" y="40" width="30" height="52" rx="8" />
      <rect x="70" y="28" width="20" height="14" rx="4" />
    </svg>
  ) },
  { key: 'earrings', name: 'Earrings', caption: 'Simple hooks with circular drops.', action: (onNavigate)=>onNavigate('/customize?product=earrings'), icon: (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" stroke="#2E86DE" strokeWidth="4" strokeLinecap="round">
      <path d="M60 50 Q80 30 100 50" />
      <circle cx="75" cy="70" r="10" />
      <circle cx="95" cy="70" r="10" />
    </svg>
  ) },
  { key: 'mitt', name: 'Oven Mitt', caption: 'Mitten outline for sizing reference.', action: (onNavigate)=>onNavigate('/customize?product=mitt'), icon: (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" stroke="#FF7F50" strokeWidth="4">
      <path d="M60 95 C60 60 80 40 100 45 C120 50 130 70 120 95 Z" />
    </svg>
  ) },
];

export default function Customize({ onNavigate }) {
  useEffect(() => {
    if (window.feather && typeof window.feather.replace === 'function') {
      window.feather.replace();
    }
  }, []);

  return (
    <>
      {/* Hero section aligned to Contact page standard */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7F50] to-[#FCE38A] opacity-90"></div>
        <div className="container mx-auto px-6 py-24 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Customize Your <span className="text-[#2E86DE]">Design</span></h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">Upload artwork, pick colors, and preview shapes before adding to cart.</p>
        </div>
      </section>

      {/* Grid of product guides */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {products.map(p => (
            <div key={p.key} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold mb-3 text-gray-900">{p.name}</h3>
              <div className="flex items-center justify-center h-40 mb-4">
                {p.icon}
              </div>
              <p className="text-gray-600 text-sm mb-4">{p.caption}</p>
              {/* Removed per-card Customize button per request */}
              
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-6">Guides are approximate and for placement reference only.</p>
      </main>

      {/* Floating Cart */}
      <a href="/checkout" onClick={(e)=>{e.preventDefault(); onNavigate('/checkout');}} className="fixed right-4 bottom-4 bg-[#FF7F50] hover:bg-[#2E86DE] text-white rounded-full px-4 py-2 shadow-md flex items-center gap-2 transition-all" aria-label="Cart">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span>Cart</span>
      </a>
    </>
  );
}