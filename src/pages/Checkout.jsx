import React, { useEffect, useMemo, useState } from 'react';

export default function Checkout({ onNavigate }) {
  const [cart, setCart] = useState(() => {
    try { const saved = localStorage.getItem('cart'); return saved ? JSON.parse(saved) : []; } catch { return []; }
  });

  const curated = useMemo(() => ({ magnet: '/magnets.JPG' }), []);

  useEffect(() => {
    if (window.feather && typeof window.feather.replace === 'function') {
      window.feather.replace();
    }
  }, []);

  const total = cart.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 1), 0);

  const [method, setMethod] = useState('card');
  const [message, setMessage] = useState(null); // { text, primaryLabel, onPrimary, secondaryLabel, onSecondary }

  const showMsg = (text, opts = {}) => setMessage({ text, ...opts });
  const hideMsg = () => setMessage(null);

  const placeOrder = () => {
    if (!cart || cart.length === 0) {
      showMsg('Your cart is empty. Please add items first.', {
        primaryLabel: 'Go to Shop',
        onPrimary: () => onNavigate('/shop'),
      });
      return;
    }
    const requiredIds = ['ship-name','ship-email','ship-address','ship-city','ship-state','ship-zip'];
    for (const id of requiredIds) {
      const el = document.getElementById(id);
      if (!el || !el.value.trim()) { el && el.focus(); showMsg('Please complete the shipping details.', { primaryLabel: 'OK' }); return; }
    }
    try { localStorage.removeItem('cart'); } catch {}
    setCart([]);
    showMsg('Order placed! We sent a confirmation to your email.', {
      primaryLabel: 'Go Home',
      onPrimary: () => onNavigate('/'),
    });
  };

  return (
    <>
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Shipping + Payment */}
          <section className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
            <form onSubmit={(e)=>e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <input id="ship-name" type="text" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50]" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input id="ship-email" type="email" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50]" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input id="ship-phone" type="tel" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50]" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Country</label>
                  <input id="ship-country" type="text" defaultValue="USA" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Street Address</label>
                <input id="ship-address" type="text" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium">City</label>
                  <input id="ship-city" type="text" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50]" />
                </div>
                <div>
                  <label className="block text-sm font-medium">State</label>
                  <input id="ship-state" type="text" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50]" />
                </div>
                <div>
                  <label className="block text-sm font-medium">ZIP</label>
                  <input id="ship-zip" type="text" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50]" />
                </div>
              </div>

              <h2 className="text-xl font-semibold mt-6 mb-4">Payment</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Method</label>
                  <select value={method} onChange={(e)=>setMethod(e.target.value)} id="pay-method" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50]">
                    <option value="card">Credit/Debit Card</option>
                    <option value="cod">Cash on Delivery</option>
                  </select>
                </div>
                {method === 'card' && (
                  <div id="card-fields" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Card Number</label>
                      <input type="text" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50]" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">CVV</label>
                      <input type="text" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50]" placeholder="123" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Expiry</label>
                      <input type="text" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50]" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Name on Card</label>
                      <input type="text" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50]" />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <button type="button" onClick={placeOrder} id="place-order" className="bg-[#FF7F50] text-white px-6 py-3 rounded-full font-bold">Place Order</button>
              </div>
            </form>
          </section>

          {/* Order Summary */}
          <aside className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 max-h-64 overflow-auto">
              {(!cart || cart.length === 0) ? (
                <p id="empty-note" className="text-sm text-gray-500">Your cart is empty. <a href="/shop" onClick={(e)=>{e.preventDefault(); onNavigate('/shop');}} className="text-[#FF7F50] underline">Go back to shop</a>.</p>
              ) : cart.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <img src={curated[item.product] || item.productImg} className="w-12 h-12 object-contain" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-gray-500">Qty: {item.qty}</div>
                  </div>
                  <div className="text-sm font-semibold">${((item.price||0) * (item.qty||1)).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-semibold">Total:</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
          </aside>
        </div>
      </main>

      {/* Message Modal */}
      {message && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1100] p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl">
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">Notice</h3>
              <p className="text-gray-700">{message.text}</p>
              <div className="mt-6 flex gap-3 justify-end">
                {message.secondaryLabel && (
                  <button className="px-4 py-2 rounded-full border border-gray-300" onClick={()=>{ hideMsg(); message.onSecondary && message.onSecondary(); }}>{message.secondaryLabel}</button>
                )}
                <button className="px-4 py-2 rounded-full bg-[#FF7F50] text-white" onClick={()=>{ hideMsg(); message.onPrimary && message.onPrimary(); }}>{message.primaryLabel || 'OK'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}