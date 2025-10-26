import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Customize from './pages/Customize.jsx';
import Shop from './pages/Shop.jsx';
import Checkout from './pages/Checkout.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

const routes = {
  '/': Home,
  '/customize': Customize,
  '/shop': Shop,
  '/checkout': Checkout,
  '/about': About,
  '/contact': Contact,
};

export default function App() {
  const [Component, setComponent] = useState(() => routes[window.location.pathname] || Home);

  useEffect(() => {
    const onPop = () => setComponent(() => routes[window.location.pathname] || Home);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (href) => {
    if (href.startsWith('http')) { window.location.href = href; return; }
    // Remove legacy redirects to deleted static HTML
    // SPA routes: strip hash for component selection but keep it in URL
    const pathOnly = href.split('#')[0];
    window.history.pushState({}, '', href);
    setComponent(() => routes[pathOnly] || Home);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      <Navbar onNavigate={navigate} />
      <div>
        <Component onNavigate={navigate} />
      </div>
      <Footer />
    </>
  );
}