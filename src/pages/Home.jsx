import React, { useEffect } from 'react';

export default function Home({ onNavigate }) {
  useEffect(() => {
    if (window.feather && typeof window.feather.replace === 'function') {
      window.feather.replace();
    }
  }, []);

  return (
    <main>
      {/* Hero aligned to Contact standard */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7F50] to-[#FCE38A] opacity-90"></div>
        <div className="container mx-auto px-6 py-24 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Create Something <span className="text-[#2E86DE]">Uniquely Yours</span></h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">Custom sublimation art that brings your ideas to life — magnets, tote bags, bookmarks and more!</p>
          <div className="flex items-center justify-center gap-4">
            <button onClick={()=>onNavigate('/shop#customize')} className="inline-block bg-white text-[#FF7F50] hover:bg-[#2E86DE] hover:text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg">Start Customizing</button>
            <button onClick={()=>onNavigate('/shop')} className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#FF7F50] px-8 py-3 rounded-full font-bold transition-all">Browse Shop</button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our <span className="text-[#FF7F50]">Handcrafted</span> Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 items-start">
            {/* Product 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="h-64 bg-[#2E86DE]/10 flex items-center justify-center rounded-lg mb-4">
                <img src="/magnets.JPG" alt="Custom Magnet" className="h-full object-contain" />
              </div>
              <h3 className="font-bold text-xl mb-1 text-gray-900">Custom Magnets</h3>
              <p className="text-gray-600 mb-4">From $8.99</p>
              <button onClick={()=>onNavigate('/shop')} className="bg-[#FF7F50] hover:bg-[#2E86DE] text-white px-6 py-3 rounded-full font-bold transition-all">Customize</button>
            </div>
            {/* Product 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="h-64 bg-[#FCE38A]/10 flex items-center justify-center rounded-lg mb-4">
                <img src="/tote.JPG" alt="Tote Bag" className="h-full object-contain" />
              </div>
              <h3 className="font-bold text-xl mb-1 text-gray-900">Tote Bags</h3>
              <p className="text-gray-600 mb-4">From $14.99</p>
              <button onClick={()=>onNavigate('/shop')} className="bg-[#FF7F50] hover:bg-[#2E86DE] text-white px-6 py-3 rounded-full font-bold transition-all">Customize</button>
            </div>
            {/* Product 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="h-64 bg-[#FF7F50]/10 flex items-center justify-center rounded-lg mb-4">
                <img src="/book.JPG" alt="Bookmark" className="h-full object-contain" />
              </div>
              <h3 className="font-bold text-xl mb-1 text-gray-900">Bookmarks</h3>
              <p className="text-gray-600 mb-4">From $5.99</p>
              <button onClick={()=>onNavigate('/shop')} className="bg-[#FF7F50] hover:bg-[#2E86DE] text-white px-6 py-3 rounded-full font-bold transition-all">Customize</button>
            </div>
            {/* Product 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="h-64 bg-[#2E86DE]/10 flex items-center justify-center rounded-lg mb-4">
                <img src="/glow.JPG" alt="Glow Bottle" className="h-full object-contain" />
              </div>
              <h3 className="font-bold text-xl mb-1 text-gray-900">Glow Bottles</h3>
              <p className="text-gray-600 mb-4">From $12.99</p>
              <button onClick={()=>onNavigate('/shop')} className="bg-[#FF7F50] hover:bg-[#2E86DE] text-white px-6 py-3 rounded-full font-bold transition-all">Customize</button>
            </div>
          </div>
          <div className="text-center mt-12">
            <button onClick={()=>onNavigate('/shop')} className="inline-block border-2 border-[#FF7F50] text-[#FF7F50] hover:bg-[#FF7F50] hover:text-white px-8 py-3 rounded-full font-bold transition-all">View All Products</button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-[#F9FAFB]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How It <span className="text-[#2E86DE]">Works</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="bg-[#FF7F50]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i data-feather="shopping-bag" className="text-[#FF7F50] w-10 h-10"></i>
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900">1. Choose Your Item</h3>
              <p className="text-gray-600">Select from our collection of high-quality sublimation products</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="bg-[#2E86DE]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i data-feather="upload" className="text-[#2E86DE] w-10 h-10"></i>
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900">2. Upload Your Design</h3>
              <p className="text-gray-600">Add your artwork or describe your vision in our design notes</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="bg-[#FCE38A]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i data-feather="truck" className="text-[#FCE38A] w-10 h-10"></i>
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900">3. We Create & Ship</h3>
              <p className="text-gray-600">We handcraft your item with care and ship it directly to you</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA aligned to Contact style */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7F50] to-[#FCE38A] opacity-90"></div>
        <div className="container mx-auto px-6 pt-20 pb-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Create Something Unique?</h2>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto">Upload your design today and we'll transform it into a beautiful custom product!</p>
          <button onClick={()=>onNavigate('/shop#customize')} className="inline-block bg-white text-[#FF7F50] hover:bg-[#2E86DE] hover:text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg">Start Designing Now</button>
        </div>
      </section>

      {/* Floating Cart */}
      <a href="/checkout" onClick={(e)=>{e.preventDefault(); onNavigate('/checkout');}} className="fixed right-4 bottom-4 bg-[#FF7F50] hover:bg-[#2E86DE] text-white rounded-full px-4 py-2 shadow-md flex items-center gap-2 transition-all" aria-label="Cart">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span>Cart</span>
      </a>
    </main>
  );
}