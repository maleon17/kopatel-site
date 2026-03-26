import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.93 6.779l-1.814 8.544c-.135.6-.485.746-.984.464l-2.72-2.004-1.314 1.265c-.145.145-.267.267-.548.267l.196-2.775 5.054-4.563c.22-.196-.048-.304-.34-.108L7.614 14.6l-2.668-.833c-.58-.181-.592-.58.121-.858l10.418-4.015c.483-.175.906.108.745.885z" fill="currentColor"/>
  </svg>
);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // закрываем меню при смене режима
      setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = menuOpen ? 'hidden' : '';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen, isMobile]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest('#burger') &&
        !target.closest('#sidebar') &&
        !target.closest('#mobile-nav')
      ) {
        closeMenu();
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <>
      <header>
        <div className="container">
          <div className="header-left">
            <button
              className={`burger${menuOpen ? ' open' : ''}`}
              id="burger"
              onClick={toggleMenu}
              aria-label="Меню"
            >
              <span></span><span></span><span></span>
            </button>
            <div className="logo">
              <Link to="/" style={{textDecoration:'none', color:'inherit'}}>kopatel.platform</Link>
            </div>
          </div>
          <div className="header-right">
            <nav>
              <ul>
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/games" className="nav-btn">Играть</Link></li>
                <li><a href="https://t.me/kopatel_support_bot" target="_blank" rel="noreferrer" className="nav-btn nav-btn-support">Поддержка</a></li>
              </ul>
            </nav>
            <Link to="/games" className="nav-btn mobile-play-btn">Играть</Link>
          </div>
        </div>
      </header>



      {/* Мобильное меню — только на мобильных */}
      {isMobile && (
        <div className={`mobile-nav${menuOpen ? ' open' : ''}`} id="mobile-nav">
          <div className="mobile-nav-content-wrapper">
            <p className="mobile-nav-title">Навигация</p>
            <ul>
              <li><Link to="/" onClick={closeMenu}>🏠 Главная</Link></li>
              <li><Link to="/the-lost-beyond" onClick={closeMenu}>⚔️ The lost beyond: reboot</Link></li>
            </ul>
            <p className="mobile-nav-title">Магазин</p>
            <ul>
              <li><Link to="/shop" onClick={closeMenu}>💳 Kopatelpay</Link></li>
              <li><Link to="/the-lost-beyond-shop" onClick={closeMenu}>🛒 Магазин TLB</Link></li>
              <li><Link to="/general-services" onClick={closeMenu}>🔧 Общие услуги</Link></li>
            </ul>
          </div>
          <div className="mobile-nav-actions">
            <p className="mobile-nav-title">Действия</p>
            <a href="https://t.me/copalpal" target="_blank" rel="noreferrer" className="mobile-action-btn mobile-action-tg" onClick={closeMenu}>
              <TgIcon /> Наш Telegram
            </a>
            <a href="https://t.me/kopatel_support_bot" target="_blank" rel="noreferrer" className="mobile-action-btn mobile-action-support" onClick={closeMenu}>🆘 Поддержка</a>
          </div>
        </div>
      )}

      {/* Оверлей — на мобильном под мобильным меню, на десктопе под сайдбаром */}
      <div className={`nav-overlay${menuOpen ? ' open' : ''}`} id="nav-overlay" onClick={closeMenu}></div>

      {/* Сайдбар — только на десктопе, после оверлея в DOM чтобы быть поверх него */}
      {!isMobile && (
        <div className={`sidebar${menuOpen ? ' open' : ''}`} id="sidebar">
          <div className="sidebar-content-wrapper">
            <div className="sidebar-nav-group">
              <div className="mobile-nav-title">Навигация</div>
              <ul>
                <li><Link to="/" onClick={closeMenu}>🏠 Главная</Link></li>
                <li><Link to="/games" onClick={closeMenu}>🎮 Все сервера</Link></li>
                <li><Link to="/the-lost-beyond" onClick={closeMenu}>⚔️ The lost beyond: reboot</Link></li>
              </ul>
              <div className="mobile-nav-title">Магазин</div>
              <ul>
                <li><Link to="/shop" onClick={closeMenu}>💳 Kopatelpay</Link></li>
                <li><Link to="/the-lost-beyond-shop" onClick={closeMenu}>🛒 Магазин TLB</Link></li>
                <li><Link to="/general-services" onClick={closeMenu}>🔧 Общие услуги</Link></li>
              </ul>
            </div>
            <div className="sidebar-actions">
              <div className="mobile-nav-title">О нас</div>
              <ul>
                <li>
                  <a href="https://t.me/copalpal" target="_blank" rel="noreferrer" className="nav-btn nav-btn-support" onClick={closeMenu}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{verticalAlign:'middle', marginRight:'8px'}}>
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.93 6.779l-1.814 8.544c-.135.6-.485.746-.984.464l-2.72-2.004-1.314 1.265c-.145.145-.267.267-.548.267l.196-2.775 5.054-4.563c.22-.196-.048-.304-.34-.108L7.614 14.6l-2.668-.833c-.58-.181-.592-.58.121-.858l10.418-4.015c.483-.175.906.108.745.885z" fill="white"/>
                    </svg>
                    Telegram канал
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
