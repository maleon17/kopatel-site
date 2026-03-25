import Footer from '../components/Footer';

const purchaseItem = (itemName: string, price: string) => {
  const text = encodeURIComponent(`Хочу купить: ${itemName}\nЦена: ${price} ⭐`);
  window.open(`https://t.me/kopatel_platform_bot?text=${text}`, '_blank');
};

const items = [
  {
    title: 'Смена Команды',
    desc: 'Перейдите в другую команду (Синие ↔ Красные) в The lost beyond: reboot.',
    price: '150 ⭐',
    link: 'https://t.me/kopatel_platform_bot?text=%F0%9F%94%84%20%D0%A1%D0%BC%D0%B5%D0%BD%D0%B0%20%D1%84%D1%80%D0%B0%D0%BA%D1%86%D0%B8%D0%B8',
    btnStyle: {},
  },
  {
    title: 'Смена Класса',
    desc: 'Выберите новый класс для вашего персонажа в The lost beyond: reboot.',
    price: '100 ⭐',
    link: 'https://t.me/kopatel_platform_bot?text=%F0%9F%8E%92%20%D0%A1%D0%BC%D0%B5%D0%BD%D0%B0%20%D0%BA%D0%B8%D1%82%D0%B0',
    btnStyle: {},
  },
  {
    title: '✅ Разбан',
    desc: 'Разблокировка аккаунта на любом проекте платформы.',
    price: '250 ⭐',
    link: 'https://t.me/kopatel_platform_bot?text=%E2%9C%85%20%D0%A0%D0%B0%D0%B7%D0%B1%D0%B0%D0%BD',
    btnStyle: { background: 'linear-gradient(90deg, #3498db, #2980b9)' },
  },
  {
    title: '📦 Ender Chest',
    desc: 'Дополнительные слоты личного эндер-сундука (/ec). Подробности — в боте.',
    price: 'от 50 ⭐',
    link: 'https://t.me/kopatel_platform_bot?text=%F0%9F%93%A6%20Ender%20Chest',
    btnStyle: { background: 'linear-gradient(90deg, #8e44ad, #6c3483)' },
  },
];

export default function TLBShopPage() {
  return (
    <>
      <section className="hero shop-hero">
        <div className="hero-content">
          <h1>Магазин The lost beyond: reboot</h1>
          <p>Игровые преимущества для The lost beyond: reboot!</p>
          <div className="status">
            <span className="dot"></span> Все платежи безопасны
          </div>
          <div className="scroll-arrow" onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </section>

      <section className="game-shop" id="game-shop">
        <div className="container">
          <h2>The lost beyond: reboot</h2>
          <p>Выберите игровые преимущества для The lost beyond: reboot!</p>
          <div className="donate-options">
            {items.map((item) => (
              <div className="option" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="price">{item.price}</div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="purchase-btn"
                  style={item.btnStyle}
                  onClick={(e) => {
                    e.preventDefault();
                    purchaseItem(item.title, item.price);
                  }}
                >
                  Купить
                </a>
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
          </div>
        </div>
      </section>

      <Footer
        title="Магазин The lost beyond: reboot"
        subtitle="Официальный магазин игровых преимуществ"
        navLinks={[
          { label: 'Магазин TLB', href: '/the-lost-beyond-shop' },
          { label: 'Магазин', href: '/shop' },
          { label: 'Главная', href: '/' },
        ]}
      />
    </>
  );
}
