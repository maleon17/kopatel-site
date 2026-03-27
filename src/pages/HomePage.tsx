import Footer from '../components/Footer';

type TeamMember = {
  nick: string;
  role: string;
  desc: string;
  groups: string[];
};

const teamMembers: TeamMember[] = [
  // Core Team
  { nick: 'slastica', role: 'Владелец / Основатель', desc: 'Основал проект, определяет его направление и обеспечивает развитие платформы.', groups: ['core'] },
  { nick: 'maleon17', role: 'Админ / Разработчик', desc: 'Создал главного бота, бота поддержки и мод на верификацию. Отвечает за ботов, авторизацию и сайт.', groups: ['core'] },
  { nick: 'bibidistra', role: 'Разработчик', desc: 'Создал сайт проекта, участвовал в строительстве, делал и расставлял NPC по карте.', groups: ['core', 'tlb'] },
  { nick: 'TamerlanKumys', role: 'Разработчик / Первый инвестор', desc: 'Участвовал в разработке ботов и мода, перенёс всю карту на сервер. Первый инвестор.', groups: ['core'] },
  { nick: 'Caxarocek', role: 'Тех-админ / Разработчик', desc: 'Чистит сервер и моды от багов. Держит всё в рабочем состоянии. Создает кастомные моды.', groups: ['core', 'tlb'] },
  // Server Team (The Lost Beyond)
  { nick: 'hisvas', role: 'Билдер / Разработчик', desc: 'Делает карту и NPC.', groups: ['tlb'] },
  { nick: 'UlanaFo', role: 'Строитель', desc: 'Декорировал здания — школу и жилые дома.', groups: ['tlb'] },
  { nick: 'J0J0Bro', role: 'Билдер', desc: 'Реставрировал старые постройки, чинил дороги, застраивал кратеры.', groups: ['tlb'] },
  { nick: 'danlk228567', role: 'Строитель', desc: 'Участвовал в декорировании зданий.', groups: ['tlb'] },
  { nick: 'Coolcant', role: 'Строитель', desc: 'Построил масштабную сеть канализаций под городом.', groups: ['tlb'] },
  { nick: 'RoguePrime20', role: 'Билдер', desc: 'Декорировал здания и редактировал карту.', groups: ['tlb'] },
  { nick: 'Nexlorin', role: 'Художник', desc: 'Создал логотип для главного меню сборки, участвовал в строительстве.', groups: ['tlb'] },
  { nick: 'Kaktus', role: 'Пиарщик / Строитель', desc: 'Участвовал в раскрутке сервера и помогал строить.', groups: ['tlb'] },
];

const specialThanks = ['Ромчик Guliash', 'sysle4ek', 'kitmoma', 'ezrealai', 'Dragon'];

export default function HomePage() {
  const coreTeam = teamMembers.filter(m => m.groups.includes('core'));
  const serverTeam = teamMembers.filter(m => m.groups.includes('tlb'));

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
          <h2 className="section-title">За кулисами</h2>
          <p className="section-subtitle">Люди, которые оживили проект</p>

          {/* Core Team Section */}
          <div className="team-section">
            <h3 className="team-section-title">
              <span className="section-marker core-marker"></span>
              Те, кто всё придумал и запустил
            </h3>
            <div className="team-grid">
              {coreTeam.map((m) => (
                <div className="team-card core-card" key={m.nick}>
                  <div className="team-nick core-nick">{m.nick}</div>
                  <div className="team-role">{m.role}</div>
                  <div className="team-desc">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Server Team Section */}
          <div className="team-section">
            <h3 className="team-section-title">
              <span className="section-marker tlb-marker"></span>
              Те, кто создавал мир Lost Beyond
            </h3>
            <div className="team-grid">
              {serverTeam.map((m) => (
                <div className="team-card" key={m.nick}>
                  <div className="team-nick">{m.nick}</div>
                  <div className="team-role">{m.role}</div>
                  <div className="team-desc">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Thanks Section */}
          <div className="team-section">
            <h3 className="team-section-title">
              <span className="section-marker thanks-marker"></span>
              Отдельное спасибо
            </h3>
            <div className="thanks-cloud">
              {specialThanks.map((name) => (
                <span className="thanks-tag" key={name}>{name}</span>
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