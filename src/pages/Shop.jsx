import React, { useEffect, useMemo, useState, useRef } from 'react';

export default function Shop({ onNavigate }) {
  // Preserve design variables and product mappings
  const productImages = useMemo(() => ({
    magnet: '/magnets.JPG',
    tote: '/tote.JPG',
    bookmark: '/book.JPG',
    mirror: '/mirror.JPG',
    'glow-bottle': '/glow.JPG',
    earrings: '/ear.JPG',
    mitt: '/oven.JPG',
  }), []);
  const prices = useMemo(() => ({
    magnet: 8.99,
    tote: 14.99,
    bookmark: 5.99,
    mirror: 6.99,
    'glow-bottle': 12.99,
    earrings: 9.99,
    mitt: 15.99,
  }), []);
  const shapeOptions = useMemo(() => ({
    magnet: ['Rounded Rectangle','Circle','Square'],
    mirror: ['Circle'],
    earrings: ['Circle'],
    bookmark: ['Rectangle'],
    tote: ['Square'],
    mitt: ['Rounded Rectangle'],
    'glow-bottle': ['Rectangle'],
  }), []);

  // UI state for customization modal
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState('magnet');
  const [overlaySrc, setOverlaySrc] = useState('');
  const [scale, setScale] = useState(100); // percent
  const [selectedColor, setSelectedColor] = useState('#FF7F50');
  const [notes, setNotes] = useState('');
  const [qty, setQty] = useState(1);
  const [shape, setShape] = useState('Circle');

  // Shape sizing defaults
  const [frameScale, setFrameScale] = useState(100);
  const frameDims = useMemo(() => {
    const dimsByProduct = {
      magnet: { width: 240, height: 180, radius: 18 },
      tote: { width: 280, height: 280, radius: 12 },
      bookmark: { width: 140, height: 220, radius: 10 },
      mirror: { width: 180, height: 180, radius: 90 },
      'glow-bottle': { width: 160, height: 220, radius: 12 },
      earrings: { width: 160, height: 160, radius: 80 },
      mitt: { width: 220, height: 240, radius: 18 },
    };
    const base = dimsByProduct[currentProduct] || { width: 200, height: 200, radius: 16 };
    return {
      width: base.width,
      height: base.height,
      radius: shape === 'Circle' ? Math.min(base.width, base.height) / 2 : base.radius,
    };
  }, [currentProduct, shape]);
  const [cart, setCart] = useState(() => {
    try { const saved = localStorage.getItem('cart'); return saved ? JSON.parse(saved) : []; } catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);

  const overlayImgRef = useRef(null);
  const previewRef = useRef(null);
const shapeWrapRef = useRef(null);

  useEffect(() => {
    // Feather icons for upload icon
    if (window.feather && typeof window.feather.replace === 'function') {
      window.feather.replace();
    }
  }, [modalOpen]);

  const openCustomize = (prod) => {
    setCurrentProduct(prod);
    setOverlaySrc('');
    setScale(100);
    setSelectedColor('#FF7F50');
    setNotes('');
    setQty(1);
    setShape((shapeOptions[prod] && shapeOptions[prod][0]) || 'Square');
    setModalOpen(true);
  };

  // Auto-open modal when visiting /shop#customize (supports ?product=key)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const prod = params.get('product');
      if (window.location.hash === '#customize') {
        openCustomize(prod || 'magnet');
      }
    } catch {}
  }, []);

  // Auto-open modal when visiting /shop#customize (supports ?product=key)

  const addToCart = () => {
    const item = {
      name: `Custom ${currentProduct === 'glow-bottle' ? 'Glow Bottle' : currentProduct.charAt(0).toUpperCase() + currentProduct.slice(1)}`.replace('Magnet', 'Magnet').replace('Mitt', 'Oven Mitt').replace('Bookmark', 'Bookmark').replace('Mirror', 'Compact Mirror').replace('Earrings', 'Earrings'),
      product: currentProduct,
      productImg: productImages[currentProduct],
      overlay: overlaySrc || '',
      notes,
      qty: qty || 1,
      price: prices[currentProduct] || 0,
      color: selectedColor,
      shape,
    };
    const next = [...cart, item];
    setCart(next);
    try { localStorage.setItem('cart', JSON.stringify(next)); } catch {}
    setCartOpen(true);
    setModalOpen(false);
  };

  const onFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setOverlaySrc(ev.target.result);
    reader.readAsDataURL(file);
  };

  // drag & drop positioning roughly matching static
  const onDragStart = (e) => {
    e.dataTransfer.setData('text/plain', 'overlay');
  };
  const onDrop = (e) => {
    e.preventDefault();
    const target = shapeWrapRef.current || previewRef.current || e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (overlayImgRef.current) {
      overlayImgRef.current.style.left = (x - overlayImgRef.current.width/2) + 'px';
      overlayImgRef.current.style.top  = (y - overlayImgRef.current.height/2) + 'px';
      overlayImgRef.current.style.transform = '';
    }
  };

  const cartTotal = cart.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 1), 0);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7F50] to-[#FCE38A] opacity-90"></div>
        <div className="container mx-auto px-6 py-24 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Shop Our <span className="text-[#2E86DE]">Handcrafted</span> Collection</h1>
          <p className="text-lg text-white/90 mb-8">Discover magnets, totes, bookmarks, mirrors and more — ready to personalize.</p>
          <a href="#catalog" className="bg-white text-[#FF7F50] hover:bg-[#2E86DE] hover:text-white px-8 py-3 rounded-full font-bold transition-all shadow-md">Browse Products</a>
        </div>
      </section>

      {/* Product Catalog */}
      <main id="catalog" className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Our Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" id="product-grid">
          {/* Magnet */}
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all">
            <div className="h-56 bg-[#2E86DE]/10 flex items-center justify-center">
              <img src="/magnet.JPG" onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.src='/magnets.JPG';}} alt="Magnet" className="h-full object-contain" />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">Custom Magnet</h3>
              <p className="text-gray-600 mb-2">From $8.99</p>
              <p className="text-gray-500 mb-4 text-sm">Personalize your fridge magnets with your own design.</p>
              <button onClick={()=>openCustomize('magnet')} className="bg-[#FF7F50] hover:bg-[#2E86DE] text-white px-6 py-2 rounded-full text-sm font-bold transition-all">Customize</button>
            </div>
          </div>
          {/* Tote */}
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all">
            <div className="h-56 bg-[#FCE38A]/10 flex items-center justify-center">
              <img src="/tote.JPG" alt="Tote Bag" className="h-full object-contain" />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">Tote Bag</h3>
              <p className="text-gray-600 mb-2">From $14.99</p>
              <p className="text-gray-500 mb-4 text-sm">Durable tote bag perfect for everyday use.</p>
              <button onClick={()=>openCustomize('tote')} className="bg-[#FF7F50] hover:bg-[#2E86DE] text-white px-6 py-2 rounded-full text-sm font-bold transition-all">Customize</button>
            </div>
          </div>
          {/* Bookmark */}
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all">
            <div className="h-56 bg-[#FF7F50]/10 flex items-center justify-center">
              <img src="/book.JPG" alt="Bookmark" className="h-full object-contain" />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">Bookmark</h3>
              <p className="text-gray-600 mb-2">From $5.99</p>
              <p className="text-gray-500 mb-4 text-sm">Add personality to your reading routine.</p>
              <button onClick={()=>openCustomize('bookmark')} className="bg-[#FF7F50] hover:bg-[#2E86DE] text-white px-6 py-2 rounded-full text-sm font-bold transition-all">Customize</button>
            </div>
          </div>
          {/* Mirror */}
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all">
            <div className="h-56 bg-[#2E86DE]/10 flex items-center justify-center">
              <img src="/mirror.JPG" alt="Compact Mirror" className="h-full object-contain" />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">Compact Mirror</h3>
              <p className="text-gray-600 mb-2">From $6.99</p>
              <p className="text-gray-500 mb-4 text-sm">Portable mirror with customizable cover.</p>
              <button onClick={()=>openCustomize('mirror')} className="bg-[#FF7F50] hover:bg-[#2E86DE] text-white px-6 py-2 rounded-full text-sm font-bold transition-all">Customize</button>
            </div>
          </div>
          {/* Glow Bottle */}
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all">
            <div className="h-56 bg-[#FCE38A]/10 flex items-center justify-center">
              <img src="/glow.JPG" alt="Glow Bottle" className="h-full object-contain" />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">Glow-in-the-dark Bottle</h3>
              <p className="text-gray-600 mb-2">From $12.99</p>
              <p className="text-gray-500 mb-4 text-sm">Light up your style with a glowing design.</p>
              <button onClick={()=>openCustomize('glow-bottle')} className="bg-[#FF7F50] hover:bg-[#2E86DE] text-white px-6 py-2 rounded-full text-sm font-bold transition-all">Customize</button>
            </div>
          </div>
          {/* Earrings */}
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all">
            <div className="h-56 bg-[#FF7F50]/10 flex items-center justify-center">
              <img src="/ear.JPG" alt="Earrings" className="h-full object-contain" />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">Earrings</h3>
              <p className="text-gray-600 mb-2">From $9.99</p>
              <p className="text-gray-500 mb-4 text-sm">Make a statement with personalized earrings.</p>
              <button onClick={()=>openCustomize('earrings')} className="bg-[#FF7F50] hover:bg-[#2E86DE] text-white px-6 py-2 rounded-full text-sm font-bold transition-all">Customize</button>
            </div>
          </div>
          {/* Oven Mitts */}
          <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all">
            <div className="h-56 bg-[#2E86DE]/10 flex items-center justify-center">
              <img src="/oven.JPG" alt="Oven Mitt" className="h-full object-contain" />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">Oven Mitt</h3>
              <p className="text-gray-600 mb-2">From $15.99</p>
              <p className="text-gray-500 mb-4 text-sm">Heat-resistant mitt with your unique design.</p>
              <button onClick={()=>openCustomize('mitt')} className="bg-[#FF7F50] hover:bg-[#2E86DE] text-white px-6 py-2 rounded-full text-sm font-bold transition-all">Customize</button>
            </div>
          </div>
        </div>
      </main>

      {/* Customization Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1100] p-4" onClick={(e)=>{ if (e.target.classList.contains('bg-black/40')) setModalOpen(false); }}>
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl max-h-[85vh] overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Preview */}
              <div className="p-6 bg-[#F9FAFB] flex items-center justify-center min-h-[320px]">
                <div ref={previewRef} onDragOver={(e)=>e.preventDefault()} onDrop={onDrop} id="modal-preview" className="relative w-full h-full flex items-center justify-center">
                
                   {/* Visible Shape Frame */}
                   <div
                     aria-hidden
                     className="absolute"
                     style={{
                       top: '50%',
                       left: '50%',
                       transform: 'translate(-50%, -50%)',
                       // Use product-specific base dims, scaled by Shape Size slider
                       width: `${(frameDims.width * frameScale) / 100}px`,
                       height: `${(frameDims.height * frameScale) / 100}px`,
                       border: `6px solid ${selectedColor}`,
                       borderRadius: shape==='Circle' ? '50%' : (shape==='Square' ? '0' : `${frameDims.radius}px`),
                       background: '#ffffff'
                     }}
                   />
                   {overlaySrc && (
                     <img ref={overlayImgRef} id="modal-overlay" draggable src={overlaySrc} onDragStart={onDragStart} className="absolute object-contain" alt="Design" style={{ width: `${scale}%`, clipPath: shape==='Circle' ? 'circle(38% at 50% 50%)' : (shape==='Rectangle' ? 'inset(10% 10% 10% 10%)' : 'none') }} />
                   )}
                  {/* Shape Container that clips artwork */}
                  <div
                    ref={shapeWrapRef}
                    aria-hidden={false}
                    className="absolute flex items-center justify-center overflow-hidden"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: `${(frameDims.width * frameScale) / 100}px`,
                      height: `${(frameDims.height * frameScale) / 100}px`,
                      border: `6px solid ${selectedColor}`,
                      borderRadius: shape==='Circle' ? '50%' : (shape==='Square' ? '0' : `${frameDims.radius}px`),
                      background: '#ffffff'
                    }}
                    onDragOver={(e)=>e.preventDefault()}
                    onDrop={onDrop}
                  >
                    {overlaySrc && (
                      <img
                        ref={overlayImgRef}
                        id="modal-overlay"
                        draggable
                        src={overlaySrc}
                        onDragStart={onDragStart}
                        className="absolute object-contain"
                        alt="Design"
                        style={{
                          width: `${scale}%`,
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                    )}
                  </div>
                 </div>
              </div>
              {/* Controls */}
              <div className="p-6">
                <h3 id="modal-title" className="font-bold text-xl mb-4">Customize {currentProduct === 'glow-bottle' ? 'Glow Bottle' : currentProduct.charAt(0).toUpperCase() + currentProduct.slice(1)}</h3>
                <div className="mb-4">
                  <label className="block font-medium mb-2">Upload Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#FF7F50] transition-all" onClick={()=>document.getElementById('react-modal-file').click()}>
                    <input type="file" id="react-modal-file" className="hidden" accept="image/*" onChange={onFileChange} />
                    <i data-feather="upload" className="w-10 h-10 mx-auto text-[#FF7F50] mb-2"></i>
                    <p className="text-sm text-gray-600">Drag & drop or click to browse</p>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-2">Image Size</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min={20} max={200} step={5} value={scale} onChange={(e)=>setScale(parseInt(e.target.value,10))} className="w-full" />
                    <span className="text-sm text-gray-600">{scale}%</span>
                  </div>
                </div>
                {/* Accent Color */}
                <div className="mb-4">
                  <label className="block font-medium mb-2">Accent Color</label>
                  <div className="flex flex-wrap gap-2">
                    {['#FF7F50','#2E86DE','#FCE38A','#1A1A1A','#00B894','#E84393'].map(c => (
                      <button key={c} className={`w-8 h-8 rounded-full border border-gray-300 ring-2 ${selectedColor===c?'ring-[#2E86DE]':'ring-transparent'}`} style={{backgroundColor:c}} aria-label={c} onClick={()=>setSelectedColor(c)}></button>
                    ))}
                  </div>
                </div>
                {/* Shape Selector */}
                <div className="mb-4">
                  <label className="block font-medium mb-2">Shape</label>
                  <div className="flex flex-wrap gap-2">
                    {(shapeOptions[currentProduct] || ['Square']).map(opt => (
                      <button key={opt} className={`px-3 py-1 rounded-full border ${shape===opt?'border-[#2E86DE] text-[#2E86DE]':'border-gray-300 text-gray-700'}`} onClick={()=>setShape(opt)}>{opt}</button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-2">Notes</label>
                  <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50]" placeholder="Pattern, placement, text, etc." value={notes} onChange={(e)=>setNotes(e.target.value)}></textarea>
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-2">Quantity</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7F50]" value={qty} onChange={(e)=>setQty(parseInt(e.target.value,10))}>
                    {[1,2,3,4,5].map(n => (<option key={n} value={n}>{n}</option>))}
                  </select>
                </div>
                <div className="flex gap-3">
                  <button onClick={addToCart} className="flex-1 bg-[#FF7F50] hover:bg-[#2E86DE] text-white font-bold py-3 rounded-full">Add to Cart</button>
                  <button onClick={()=>setModalOpen(false)} className="px-4 py-3 rounded-full border border-gray-300">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Summary */}
      {cartOpen && (
        <aside className="fixed right-4 bottom-4 bg-white rounded-xl shadow-xl w-80 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold">Cart</h4>
            <button className="text-gray-500" onClick={()=>setCartOpen(false)}>Close</button>
          </div>
          <div className="space-y-3 max-h-64 overflow-auto">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <img src={item.productImg} className="w-12 h-12 object-contain" />
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
            <span className="font-bold">${cartTotal.toFixed(2)}</span>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={()=>onNavigate('/checkout')} className="flex-1 bg-[#2E86DE] text-white rounded-full py-2">Checkout</button>
            <button className="flex-1 bg-gray-100 rounded-full py-2" onClick={()=>setCartOpen(false)}>Continue Shopping</button>
          </div>
        </aside>
      )}
      <button onClick={()=>setCartOpen(!cartOpen)} className="fixed right-4 bottom-4 bg-[#FF7F50] text-white rounded-full px-4 py-2 shadow-md flex items-center gap-2" aria-label="Cart">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span>Cart</span>
      </button>
    </>
  );
}