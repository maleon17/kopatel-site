import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function GeneralServicesPage() {
  return (
    <>
      <section className="hero general-services-hero">
        <div className="hero-content">
          <h1>Общие Услуги</h1>
          <p>Услуги для всех проектов kopatel.platform!</p>
          <div className="status">
            <span className="dot"></span> Все платежи безопасны
          </div>
          <div className="scroll-arrow" onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </section>

      <section className="general-shop" id="general-shop">
        <div className="container">
          <h2>Общие Услуги</h2>
          <div className="no-services-block">
            <p className="no-services-text">
              Общих услуг пока нет — сейчас на платформе один сервер, поэтому все товары находятся в магазине The lost beyond: reboot.
            </p>
            <Link to="/the-lost-beyond-shop" className="project-btn" style={{ display: 'inline-block', marginTop: '20px' }}>
              Перейти в магазин TLB
            </Link>
          </div>
        </div>
      </section>

      <section className="support" id="support">
        <div className="container">
          <h2>Нужна помощь?</h2>
          <p>Наша поддержка всегда готова помочь вам!</p>
          <div className="support-links">
            <a href="https://t.me/kopatel_support_bot" target="_blank" rel="noreferrer" className="link-btn">Поддержка в Telegram</a>
            <a href="https://t.me/kopatel_platform_bot" target="_blank" rel="noreferrer" className="link-btn">Информационный бот</a>
          </div>
        </div>
      </section>

      <Footer
        title="Общие Услуги"
        subtitle="Услуги для всех проектов kopatel.platform"
        navLinks={[
          { label: 'Услуги', href: '/general-services' },
          { label: 'Магазин', href: '/shop' },
          { label: 'Главная', href: '/' },
        ]}
      />
    </>
  );
}
