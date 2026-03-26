import Footer from '../components/Footer';

const teamMembers = [
  { nick: 'slastica', role: 'Владелец / Основатель', desc: 'Основал проект, определяет его направление и обеспечивает развитие платформы.' },
  { nick: 'maleon17', role: 'Админ / Разработчик', desc: 'Создал главного бота, бота поддержки и мод на верификацию.' },
  { nick: 'UlanaFo', role: 'Админ / Строитель', desc: 'Декорировал здания — школу и жилые дома.' },
  { nick: 'bibidistra', role: 'Разработчик / Строитель', desc: 'Создал сайт проекта, участвовал в строительстве, делал и расставлял NPC по карте.' },
  { nick: 'TamerlanKumys', role: 'Админ / Разработчик / Строитель', desc: 'Участвовал в разработке ботов и мода, перенёс всю карту на сервер. Первый инвестор.' },
  { nick: 'J0J0Bro', role: 'Билдер', desc: 'Реставрировал старые постройки, чинил дороги, застраивал кратеры.' },
  { nick: 'danlk228567', role: 'Строитель', desc: 'Участвовал в декорировании зданий.' },
  { nick: 'Caxarocek', role: 'Тех-админ / Разработчик', desc: 'Чистит сервер и моды от багов. Держит всё в рабочем состоянии.' },
  { nick: 'Coolcant', role: 'Строитель', desc: 'Построил масштабную сеть канализаций под городом.' },
  { nick: 'Nexlorin', role: 'Строитель / Художник', desc: 'Создал логотип для главного меню сборки, участвовал в строительстве.' },
  { nick: 'Ромчик Guliash', role: 'Донатер / Тестер', desc: 'Искал баги, активно участвовал в жизни сервера.' },
  { nick: 'RoguePrime20', role: 'Билдер', desc: 'Декорировал здания и редактировал карту.' },
  { nick: 'Kaktus', role: 'Пиарщик / Строитель', desc: 'Участвовал в раскрутке сервера и помогал строить.' },
  { nick: 'hisvas', role: 'Билдер / Разработчик', desc: 'Делает карту и NPC.' },
];

const thanks = ['sysle4ek', 'kitmoma', 'ezrealai', 'Dragon'];

export default function HomePage() {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>kopatel.platform</h1>
          <p>Мульти-проект с множеством жанров на твой вкус и выбор. Захватывающие приключения ждут тебя!</p>
          <div className="status">
            <span className="dot"></span> Узнать больше
          </div>
          <div className="scroll-arrow" onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="container">
          <h2>О kopatel.platform</h2>
          <p className="about-lead">kopatel.platform — это не просто сервер. Это платформа, где каждый найдёт что-то своё.</p>
          <p>Идея простая: вместо одного сервера с одной тематикой — несколько независимых проектов под одной крышей. Каждый со своей атмосферой, механиками и сообществом.</p>
          <p>Сейчас активен первый проект — <strong>The Lost Beyond: Reboot</strong>: постапокалипсис, две враждующие фракции, зомби и война за выживание.</p>
          <p>Но это только начало. Платформа растёт, и новые миры уже в разработке.</p>
        </div>
      </section>

      <section className="behind-scenes" id="team">
        <div className="container">
          <h2>За кулисами</h2>
          <p className="section-subtitle">Люди, которые это сделали</p>
          <div className="team-grid">
            {teamMembers.map((m) => (
              <div className="team-card" key={m.nick}>
                <div className="team-nick">{m.nick}</div>
                <div className="team-role">{m.role}</div>
                <div className="team-desc">{m.desc}</div>
              </div>
            ))}
          </div>
          <div className="thanks-block">
            <h3>Отдельная благодарность</h3>
            <div className="thanks-list">
              {thanks.map((t) => (
                <span className="thanks-nick" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="community">
        <div className="container">
          <h2>Присоединяйтесь к сообществу</h2>
          <p>Будьте в курсе всех новостей и обновлений!</p>
          <div className="community-links">
            <a href="https://t.me/copalpal" target="_blank" rel="noreferrer" className="link-btn">Telegram Канал</a>
            <a href="https://t.me/kopatel_support_bot" target="_blank" rel="noreferrer" className="link-btn">Поддержка</a>
          </div>
        </div>
      </section>

      <Footer
        title="kopatel.platform"
        subtitle="Мульти-проект для настоящих геймеров"
        navLinks={[
          { label: 'Главная', href: '/' },
          { label: 'Проекты', href: '/games' },
          { label: 'О платформе', href: '/#about' },
        ]}
      />
    </>
  );
}