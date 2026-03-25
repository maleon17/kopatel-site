import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import TheLostBeyondPage from './pages/TheLostBeyondPage';
import ShopPage from './pages/ShopPage';
import TLBShopPage from './pages/TLBShopPage';
import GeneralServicesPage from './pages/GeneralServicesPage';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/the-lost-beyond" element={<TheLostBeyondPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/the-lost-beyond-shop" element={<TLBShopPage />} />
        <Route path="/general-services" element={<GeneralServicesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
