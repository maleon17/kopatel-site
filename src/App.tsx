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
const SCROLL_DURATION = 400;
const FADE_IN = 250;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function smoothScrollToTop(duration: number): Promise<void> {
  return new Promise((resolve) => {
    const start = window.scrollY;
    if (start === 0) { resolve(); return; }
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start * (1 - easeOutCubic(progress)));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    };
    requestAnimationFrame(step);
  });
}

function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [phase, setPhase] = useState<'idle' | 'out' | 'scrolling' | 'in'>('idle');
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    // 1. Fade out
    setPhase('out');

    const outTimer = setTimeout(async () => {
      // 2. Swap content, start scroll
      setDisplayChildren(children);
      setPhase('scrolling');
      await smoothScrollToTop(SCROLL_DURATION);

      // 3. Fade in
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
