import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import TheLostBeyondPage from './pages/TheLostBeyondPage';
import ShopPage from './pages/ShopPage';
import TLBShopPage from './pages/TLBShopPage';
import GeneralServicesPage from './pages/GeneralServicesPage';
import AccountPage from './pages/AccountPage';
import NotFoundPage from './pages/NotFoundPage';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter basename="/kopatel-site">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<><Header /><HomePage /></>} />
        <Route path="/games" element={<><Header /><GamesPage /></>} />
        <Route path="/the-lost-beyond" element={<><Header /><TheLostBeyondPage /></>} />
        <Route path="/shop" element={<><Header /><ShopPage /></>} />
        <Route path="/the-lost-beyond-shop" element={<><Header /><TLBShopPage /></>} />
        <Route path="/general-services" element={<><Header /><GeneralServicesPage /></>} />
        <Route path="/account" element={<><Header /><AccountPage /></>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
