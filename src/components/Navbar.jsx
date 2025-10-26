import React, { useState } from 'react';

export default function Navbar({ onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const css = `
    header { position: sticky; top: 0; z-index: 1000; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
    nav { max-width: 1100px; margin: 0 auto; height: 88px; padding: 0 1.5rem; display: flex; align-items: center; justify-content: space-between; }
    .logo { font-weight: 700; font-size: 1.5rem; color: #FF7F50; text-decoration: none; display: flex; align-items: center; }
    .logo span { color: #2E86DE; }
    .nav-links { list-style: none; display: flex; gap: 2rem; align-items: center; }
    .nav-links a { color: #1A1A1A; text-decoration: none; font-weight: 500; font-size: 1rem; }
    .nav-links a:hover { color: #FF7F50; }
    .cta-button { background: #FF7F50; color: white; padding: 0.75rem 1.5rem; border-radius: 50px; font-weight: 600; margin-left: 1rem; margin-right: 1.25rem; }
    .cta-button:hover { background: #2E86DE; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(255,127,80,0.3); }
    .mobile-menu-button { display: none; background: none; border: none; color: #1A1A1A; font-size: 1.5rem; cursor: pointer; }
    .mobile-menu { display: none; position: absolute; top: 100%; left: 0; width: 100%; background: white; padding: 1rem; box-shadow: 0 5px 10px rgba(0,0,0,0.1); }
    .mobile-menu a { display: block; padding: 0.75rem 0; color: #1A1A1A; text-decoration: none; border-bottom: 1px solid #F9FAFB; }
    .mobile-menu a:hover { color: #FF7F50; }
    @media (max-width: 768px) { .nav-links { display: none; } .mobile-menu-button { display: block; } .mobile-menu { display: none; } .mobile-menu.active { display: block; } }
  `;

  const link = (href) => (e) => { e.preventDefault(); onNavigate(href); setMobileOpen(false); };

  return (
    <header>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <nav>
        <a href="/" onClick={link('/')} className="logo">Simply<span>Recreate</span></a>
        <button className="mobile-menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <ul className="nav-links">
          <li><a href="/" onClick={link('/')}>Home</a></li>
          <li><a href="/shop" onClick={link('/shop')}>Shop</a></li>
          <li><a href="/customize" onClick={link('/customize')}>Customize</a></li>
          <li><a href="/about" onClick={link('/about')}>About</a></li>
          <li><a href="/contact" onClick={link('/contact')}>Contact</a></li>
          <li><a href="/customize" onClick={link('/customize')} className="cta-button">Start Designing</a></li>
        </ul>
        <div className={`mobile-menu ${mobileOpen ? 'active' : ''}`}>
          <a href="/" onClick={link('/')}>Home</a>
          <a href="/shop" onClick={link('/shop')}>Shop</a>
          <a href="/customize" onClick={link('/customize')}>Customize</a>
          <a href="/about" onClick={link('/about')}>About</a>
          <a href="/contact" onClick={link('/contact')}>Contact</a>
          <a href="/customize" onClick={link('/customize')} className="cta-button mt-2">Start Designing</a>
        </div>
      </nav>
    </header>
  );
}