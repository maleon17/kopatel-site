import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function ShopPage() {
  const navigate = useNavigate();
  return (
    <>
      <section className="hero shop-hero">
        <div className="hero-content">
          <h1>Kopatelpay</h1>
          <p>Поддержите сервер и получите эксклюзивные преимущества!</p>
          <div className="status">
            <span className="dot"></span> Все платежи безопасны
          </div>
          <div className="scroll-arrow" onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </section>

      <section className="shop-catalog">
        <div className="container">
          <h2>Выберите режим для покупки</h2>
          <p>Выберите игровой режим для просмотра доступных товаров и донатов!</p>

          <div className="shop-modes">
            <div className="mode-card">
              <div className="mode-image">
                <div className="mode-badge">АКТИВЕН</div>
              </div>
              <div className="mode-info">
                <h3>The lost beyond: reboot</h3>
                <p>Эпические битвы между Красными и Синими командами! Сражайтесь против вражеской команды и зомби в мире выживания.</p>
                <div className="mode-features">
                  <span className="feature">PvP</span>
                  <span className="feature">Классы</span>
                  <span className="feature">Зомби</span>
                  <span className="feature">Команды</span>
                </div>
                <Link to="/the-lost-beyond-shop" className="mode-btn" style={{ background: 'linear-gradient(90deg, #2ecc71, #27ae60)' }}>
                  Перейти в магазин
                </Link>
              </div>
            </div>

            <div className="mode-card coming-soon">
              <div className="mode-image">
                <div className="mode-badge">СКОРО</div>
              </div>
              <div className="mode-info">
                <h3>Новый Режим</h3>
                <p>Товары этого измерения еще не материализовались. Попытка покупки может привести к дестабилизации реальности.</p>
                <div className="mode-features">
                  <span className="feature">Тайна</span>
                  <span className="feature">2026</span>
                  <span className="feature">Скоро</span>
                </div>
                <button onClick={() => navigate('/notfound')} className="mode-btn disabled">НЕ КЛИКАТЬ</button>
              </div>
            </div>

            <div className="mode-card">
              <div className="mode-image">
                <div className="mode-badge">АКТИВЕН</div>
              </div>
              <div className="mode-info">
                <h3>Общие Услуги</h3>
                <p>Услуги для всех проектов kopatel.platform! Разблокировка аккаунтов и другие общие преимущества.</p>
                <div className="mode-features">
                  <span className="feature">Разбан</span>
                  <span className="feature">Все проекты</span>
                  <span className="feature">Поддержка</span>
                </div>
                <Link to="/general-services" className="mode-btn" style={{ background: 'linear-gradient(90deg, #3498db, #2980b9)' }}>
                  Перейти в магазин
                </Link>
              </div>
            </div>
          </div>

          <div className="shop-info">
            <h3>Как работает магазин?</h3>
            <p>Выберите интересующий вас режим, затем перейдите в его магазин для покупки игровых преимуществ и донатов.</p>
          </div>
        </div>
      </section>

      <section className="support" id="support">
        <div className="container">
          <h2>Нужна помощь?</h2>
          <p>Наша поддержка всегда готова помочь вам с покупками и вопросами!</p>
          <div className="support-links">
            <a href="https://t.me/kopatel_support_bot" target="_blank" rel="noreferrer" className="link-btn">Поддержка в Telegram</a>
            <a href="https://t.me/kopatel_platform_bot" target="_blank" rel="noreferrer" className="link-btn">Информационный бот</a>
          </div>
        </div>
      </section>

      <Footer
        title="Магазин kopatel.platform"
        subtitle="Официальный магазин игровых преимуществ"
        navLinks={[
          { label: 'The lost beyond', href: '/the-lost-beyond-shop' },
          { label: 'Общие услуги', href: '/general-services' },
          { label: 'Главная', href: '/' },
        ]}
      />
    </>
  );
}
