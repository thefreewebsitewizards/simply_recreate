import React, { useState } from 'react';

export default function Footer() {
  const [modal, setModal] = useState(null); // 'privacy' | 'terms' | null
  const css = `
    footer { background:#1A1A1A; color:white; padding:4rem 2rem 2rem; }
    .footer-content { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(200px,1fr)); gap:2rem; }
    .footer-logo { font-family:'Poppins',sans-serif; font-weight:700; font-size:1.5rem; color:#FF7F50; margin-bottom:1rem; }
    .footer-logo span { color:#2E86DE; }
    .footer-about p { color:#ccc; line-height:1.6; margin-bottom:1.5rem; }
    .footer-links h3, .footer-contact h3 { color:white; font-size:1.2rem; margin-bottom:1.5rem; position:relative; padding-bottom:0.5rem; }
    .footer-links h3:after, .footer-contact h3:after { content:''; position:absolute; left:0; bottom:0; width:50px; height:2px; background:#FF7F50; }
    .footer-links ul { list-style:none; padding:0; margin:0; }
    .footer-links li { margin-bottom:0.75rem; }
    .footer-links a { color:#ccc; text-decoration:none; transition:color .3s; }
    .footer-links a:hover { color:#FF7F50; }
    .footer-contact p { color:#ccc; margin-bottom:0.75rem; display:flex; align-items:center; }
    .social-links { display:flex; gap:1rem; margin-top:1rem; }
    .social-links a { color:white; background:rgba(255,255,255,0.1); width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; transition:all .3s; }
    .social-links a:hover { background:#FF7F50; transform:translateY(-3px); }
    .footer-bottom { max-width:1200px; margin:3rem auto 0; padding-top:2rem; border-top:1px solid rgba(255,255,255,0.1); text-align:center; color:#999; font-size:0.9rem; }
    @media (max-width:768px){ .footer-content{ grid-template-columns:1fr; } }
    .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,.55); display:flex; align-items:center; justify-content:center; z-index:10000; }
    .modal { background:#fff; color:#111; width:92%; max-width:720px; border-radius:12px; box-shadow:0 10px 25px rgba(0,0,0,.25); overflow:hidden; }
    .modal-header { padding:16px; font-weight:700; font-size:18px; background:#1A1A1A; color:#fff; }
    .modal-content { padding:16px; max-height:60vh; overflow:auto; font-size:14px; line-height:1.6; }
    .modal-actions { padding:12px; display:flex; justify-content:flex-end; gap:12px; background:#f5f5f5; }
    .btn { background:#FF7F50; color:#fff; border:none; padding:8px 14px; border-radius:999px; cursor:pointer; }
  `;
  const close = () => setModal(null);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <footer>
        <div className="footer-content">
          <div className="footer-about">
            <div className="footer-logo">Simply<span>Recreate</span></div>
            <p>Bringing your creative visions to life through custom sublimation art and personalized products.</p>
            <div className="social-links">
              <a href="https://www.instagram.com/simply_recreate/" target="_blank" rel="noopener" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <circle cx="12" cy="12" r="4"></circle>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"></circle>
                </svg>
              </a>
              <a href="https://www.facebook.com/laura.stewart.355138/" target="_blank" rel="noopener" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2V9.6c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/customize">Customize</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>Products</h3>
            <ul>
              <li><a href="/shop?category=magnets">Magnets</a></li>
              <li><a href="/shop?category=totes">Tote Bags</a></li>
              <li><a href="/shop?category=bookmarks">Bookmarks</a></li>
              <li><a href="/shop?category=bottles">Glow Bottles</a></li>
              <li><a href="/shop?category=earrings">Earrings</a></li>
              <li><a href="/shop?category=mitts">Oven Mitts</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p>hello@simplyrecreate.com</p>
            <p>(555) 123-4567</p>
            <p>123 Creative St, Artville, USA</p>
            <p>Mon-Fri: 9am-5pm EST</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Simply Recreate. All rights reserved. | <a href="#" style={{color:'#FF7F50'}} onClick={(e)=>{e.preventDefault();setModal('privacy');}}>Privacy Policy</a> | <a href="#" style={{color:'#FF7F50'}} onClick={(e)=>{e.preventDefault();setModal('terms');}}>Terms of Service</a></p>
        </div>
      </footer>

      {modal && (
        <div className="modal-overlay" onClick={(e)=>{ if(e.target.classList.contains('modal-overlay')) setModal(null); }}>
          <div className="modal" role="dialog" aria-modal="true" aria-label={modal==='privacy'?'Privacy Policy':'Terms of Service'}>
            <div className="modal-header">{modal==='privacy'?'Privacy Policy':'Terms of Service'}</div>
            <div className="modal-content">
              {modal==='privacy' ? (
                <>
                  <p>We value your privacy. We collect only the data needed to process orders and improve your experience.</p>
                  <ul>
                    <li>Data: name, email, address, and order details</li>
                    <li>Cookies: used for basic site functionality</li>
                    <li>No sale of data: we do not sell your information</li>
                    <li>Requests: email hello@simplyrecreate.com for access or deletion</li>
                  </ul>
                </>
              ) : (
                <>
                  <p>Using this site constitutes agreement to the following terms.</p>
                  <ul>
                    <li>Orders: custom items are made-to-order</li>
                    <li>Returns: accepted for defects; customizations may be limited</li>
                    <li>Intellectual Property: upload only designs you own or have rights to</li>
                    <li>Contact: for support or questions, email hello@simplyrecreate.com</li>
                  </ul>
                </>
              )}
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={()=>setModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}