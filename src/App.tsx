import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import TheLostBeyondPage from './pages/TheLostBeyondPage';
import ShopPage from './pages/ShopPage';
import TLBShopPage from './pages/TLBShopPage';
import GeneralServicesPage from './pages/GeneralServicesPage';
import NotFoundPage from './pages/NotFoundPage';
import './index.css';

export default function App() {
  return (
    <BrowserRouter basename="/Kopatel.platform">
      <Routes>
        <Route path="/" element={<><Header /><HomePage /></>} />
        <Route path="/games" element={<><Header /><GamesPage /></>} />
        <Route path="/the-lost-beyond" element={<><Header /><TheLostBeyondPage /></>} />
        <Route path="/shop" element={<><Header /><ShopPage /></>} />
        <Route path="/the-lost-beyond-shop" element={<><Header /><TLBShopPage /></>} />
        <Route path="/general-services" element={<><Header /><GeneralServicesPage /></>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
