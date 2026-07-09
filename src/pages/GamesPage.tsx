import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function GamesPage() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero games-hero" id="games">
        <div className="hero-content">
          <h1>Игровые Режимы</h1>
          <p>Выберите свой любимый режим и погрузитесь в мир приключений!</p>
          <div className="status">
            <span className="dot paused"></span> Режимы временно на паузе
          </div>
          <div className="scroll-arrow" onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </section>

      <section className="games-showcase">
        <div className="container">
          <div className="games-grid">
            <div className="game-card paused">
              <div className="game-image">
                <div className="game-badge paused">На паузе</div>
              </div>
              <div className="game-info">
                <h3>The lost beyond: reboot</h3>
                <p>Эпические битвы между Красными и Синими командами! Сражайтесь против вражеской команды и зомби в мире выживания.</p>
                <div className="game-features">
                  <span className="feature">PvP</span>
                  <span className="feature">Классы</span>
                  <span className="feature">Зомби</span>
                  <span className="feature">Команды</span>
                </div>
                <div className="game-stats">
                  <div className="stat">
                    <span className="stat-label">Версия:</span>
                    <span className="stat-value">1.20.1</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Статус:</span>
                    <span className="stat-value" style={{ color: '#f39c12' }}>На паузе</span>
                  </div>
                </div>
                <Link to="/the-lost-beyond" className="game-btn">Подробнее</Link>
              </div>
            </div>

            <div className="game-card coming-soon">
              <div className="game-image">
                <div className="game-badge">СКОРО</div>
              </div>
              <div className="game-info">
                <h3>Coming Soon</h3>
                <p>Новые измерения уже на подходе, главное — не трогать серую кнопку...</p>
                <div className="game-features">
                  <span className="feature">Тайна</span>
                  <span className="feature">2026</span>
                </div>
                <div className="game-stats">
                  <div className="stat">
                    <span className="stat-label">Статус:</span>
                    <span className="stat-value">В разработке</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Релиз:</span>
                    <span className="stat-value">2026</span>
                  </div>
                </div>
                <button onClick={() => navigate('/notfound')} className="game-btn disabled">Не кликать!</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-to-play">
        <div className="container">
          <h2>Как начать играть?</h2>
          <div className="steps">
            {[
              { n: 1, title: 'Выберите режим', desc: 'Нажмите на интересующий вас режим' },
              { n: 2, title: 'Перейдите в бота', desc: 'Напишите нашему информационному боту' },
              { n: 3, title: 'Получите инструкцию', desc: 'Бот пришлет полную инструкцию по игре' },
              { n: 4, title: 'Играйте!', desc: 'Следуйте инструкции и наслаждайтесь игрой' },
            ].map((s) => (
              <div className="step" key={s.n}>
                <div className="step-number">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
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
            <a href="https://t.me/copalpal" target="_blank" rel="noreferrer" className="link-btn">Telegram Канал</a>
          </div>
        </div>
      </section>

      <Footer
        title="Режимы kopatel.platform"
        subtitle="Выберите свой игровой режим"
        navLinks={[
          { label: 'Режимы', href: '/games' },
          { label: 'Главная', href: '/' },
          { label: 'Магазин', href: '/shop' },
        ]}
      />
    </>
  );
}
