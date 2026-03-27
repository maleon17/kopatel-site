import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import TheLostBeyondPage from './pages/TheLostBeyondPage';
import ShopPage from './pages/ShopPage';
import TLBShopPage from './pages/TLBShopPage';
import GeneralServicesPage from './pages/GeneralServicesPage';
import NotFoundPage from './pages/NotFoundPage';
import './index.css';

const FADE_OUT = 150;
const FADE_IN = 250;

function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle');
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    // 1. Fade out
    setPhase('out');

    const outTimer = setTimeout(() => {
      // 2. Моментальный скролл пока темно
      window.scrollTo(0, 0);
      // 3. Swap контента
      setDisplayChildren(children);
      // 4. Fade in
      setPhase('in');
      const inTimer = setTimeout(() => setPhase('idle'), FADE_IN);
      return () => clearTimeout(inTimer);
    }, FADE_OUT);

    return () => clearTimeout(outTimer);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`page-transition page-transition--${phase}`}>
      {displayChildren}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/Kopatel.platform">
      <Routes>
        <Route path="/" element={<PageTransition><><Header /><HomePage /></></PageTransition>} />
        <Route path="/games" element={<PageTransition><><Header /><GamesPage /></></PageTransition>} />
        <Route path="/the-lost-beyond" element={<PageTransition><><Header /><TheLostBeyondPage /></></PageTransition>} />
        <Route path="/shop" element={<PageTransition><><Header /><ShopPage /></></PageTransition>} />
        <Route path="/the-lost-beyond-shop" element={<PageTransition><><Header /><TLBShopPage /></></PageTransition>} />
        <Route path="/general-services" element={<PageTransition><><Header /><GeneralServicesPage /></></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
    </BrowserRouter>
  );
}
