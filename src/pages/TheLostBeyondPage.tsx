import { useEffect, useState, useRef } from 'react';
import Footer from '../components/Footer';

type TabId = 'ip' | 'teams' | 'classes' | 'mechanics';

const TABS: { id: TabId; label: string }[] = [
  { id: 'ip', label: 'IP Адрес' },
  { id: 'teams', label: 'Команды' },
  { id: 'classes', label: 'Классы' },
  { id: 'mechanics', label: 'Механики' },
];

const TAB_INDEX: Record<TabId, number> = { ip: 0, teams: 1, classes: 2, mechanics: 3 };

const classItems = [
  { icon: '🔧', name: 'Инженер', desc: 'Возводит укрепления и поддерживает инфраструктуру фракции.' },
  { icon: '🚁', name: 'БПЛА', desc: 'Ведёт воздушную разведку с помощью дронов.' },
  { icon: '🎯', name: 'Снайпер', desc: 'Уничтожает противников с дальних дистанций.' },
  { icon: '⚔️', name: 'Боец', desc: 'Основа любой фракции — универсальный солдат ближнего боя.' },
  { icon: '💉', name: 'Медик', desc: 'Восстанавливает здоровье союзников прямо на поле боя.' },
  { icon: '🎖️', name: 'Офицер', desc: 'Назначается командиром. Координирует действия бойцов.' },
  { icon: '👑', name: 'Командир', desc: 'Лидер фракции, избранный голосованием игроков.' },
];

const mechanics = [
  { icon: '🕵️', title: 'Система ролей', desc: 'ПКМ пустой рукой по игроку — в чате появится его ник и роль.' },
  { icon: '📦', title: 'Стартовый кит', desc: <span>Команда <strong>/kit</strong> — получи стартовое снаряжение при входе на сервер.</span> },
  { icon: '🗳', title: 'Выборы лидеров', desc: <span><strong>/apply</strong> — подать заявку на лидера фракции. <strong>/vote</strong> — проголосовать. Лидер назначает до 2 офицеров: Shift + ЛКМ по игроку.</span> },
  { icon: '🎒', title: 'Эндер-сундук (/ec)', desc: 'Личный сундук — доступен вне боя (кулдаун 20 сек после урона). Всего 3 слота, первый открыт сразу.' },
];

export default function TheLostBeyondPage() {
  const [activeTab, setActiveTab] = useState<TabId>('ip');
  const [prevTab, setPrevTab] = useState<TabId | null>(null);
  const [animating, setAnimating] = useState(false);
  const [online, setOnline] = useState<string>('0');
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchOnline = async () => {
      try {
        const r = await fetch('https://api.mcsrvstat.us/2/game11.gamely.pro:24001');
        const d = await r.json();
        setOnline(d.players ? String(d.players.online) : '0');
      } catch {
        setOnline('—');
      }
    };
    fetchOnline();
    const t = setInterval(fetchOnline, 5000);
    return () => clearInterval(t);
  }, []);

  const copyIP = () => {
    const SERVER_IP = 'game11.gamely.pro:24001';
    navigator.clipboard.writeText(SERVER_IP).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => alert('Ошибка при копировании IP'));
  };

  const handleTabChange = (newTab: TabId) => {
    if (newTab === activeTab || animating) return;
    setPrevTab(activeTab);
    setAnimating(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveTab(newTab);
      setAnimating(false);
      setPrevTab(null);
    }, 300);
  };

  const getDirection = (from: TabId, to: TabId) => {
    return TAB_INDEX[to] > TAB_INDEX[from] ? 'forward' : 'backward';
  };

  const direction = prevTab ? getDirection(prevTab, activeTab) : 'forward';

  const getAnimClass = () => {
    if (!animating) return 'tab-anim-idle';
    if (isMobile) {
      return direction === 'forward' ? 'tab-anim-exit-up' : 'tab-anim-exit-down';
    } else {
      return direction === 'forward' ? 'tab-anim-exit-left' : 'tab-anim-exit-right';
    }
  };

  const renderTabContent = (tabId: TabId) => {
    switch (tabId) {
      case 'ip':
        return (
          <div className="tab-content active">
            <h3>IP Адрес Сервера</h3>
            <div className="ip-box" onClick={copyIP}>
              <span id="server-ip">{copied ? '✓ Скопировано!' : 'game11.gamely.pro:24001'}</span>
              <span className="copy-hint">Нажми, чтобы скопировать</span>
            </div>
            <p>Версия: 1.20.1 | Режим: Выживание</p>
          </div>
        );
      case 'teams':
        return (
          <div className="tab-content active">
            <h3>Команды Сервера</h3>
            <p>Два непримиримых лагеря. Каждый игрок принадлежит к одной из фракций — информация о твоей команде появится после регистрации через бота.</p>
            <div className="teams">
              <div className="team blue">
                <h4>Синяя Команда</h4>
                <p>Фракция стратегии и обороны. Синие держат позиции и действуют слаженно.</p>
              </div>
              <div className="team red">
                <h4>Красная Команда</h4>
                <p>Фракция натиска и агрессии. Красные атакуют первыми и не отступают.</p>
              </div>
            </div>
          </div>
        );
      case 'classes':
        return (
          <div className="tab-content active">
            <h3>Классы Персонажей</h3>
            <p>Каждый класс — своя роль на поле боя. Класс выбирается при регистрации через бота.</p>
            <div className="class-list">
              {classItems.map((c) => (
                <div className="class-item" key={c.name}>
                  <h4>{c.icon} {c.name}</h4>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'mechanics':
        return (
          <div className="tab-content active">
            <h3>Механики Сервера</h3>
            <div className="class-list">
              {mechanics.map((m) => (
                <div className="class-item" key={m.title}>
                  <h4>{m.icon} {m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <section className="hero game-hero" id="game">
        <div className="hero-content">
          <h1>The lost beyond: reboot</h1>
          <p>Эпические битвы между Красными и Синими командами! Сражайтесь против вражеской команды и зомби в мире выживания. Выберите свой класс и покажите свою тактику на поле боя!</p>
          <div className="status">
            <span className="dot"></span> Сейчас в игре: <b>{online}</b>
          </div>
          <div className="scroll-arrow" onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </section>

      <section className="about" id="about-server">
        <div className="container">
          <h2>О сервере</h2>
          <p className="about-lead">The Lost Beyond: Reboot — постапокалиптический выживач на Minecraft 1.20.1.</p>
          <p>Мир пережил катастрофу. Города превратились в руины, улицы захвачены зомби, а выжившие разделились на два непримиримых лагеря — <strong>Красных</strong> и <strong>Синих</strong>. Каждая фракция борется за контроль над территорией, ресурсами и выживание своих.</p>
          <p>Выбери класс — от снайпера и медика до инженера и командира. Участвуй в выборах лидера фракции, координируй атаки с офицерами и отвоёвывай позиции у противника. Зомби не разбирают, кто свой — они угроза для всех.</p>
          <p>Карта создана вручную командой билдеров: разрушенные здания, школы, жилые дома, канализации под городом и десятки NPC расставленных по всей локации. Каждый уголок — это атмосфера настоящего постапокалипсиса.</p>
        </div>
      </section>

      <section className="registration" id="registration">
        <div className="container">
          <h2>Как начать играть?</h2>
          <p>Регистрация проходит через нашего Telegram-бота. Нажми кнопку ниже, напиши <strong>/start</strong> и следуй инструкции.</p>
          <a href="https://t.me/kopatel_platform_bot" target="_blank" rel="noreferrer" className="project-btn" style={{ fontSize: '18px', padding: '16px 40px', display: 'inline-block', marginTop: '20px' }}>
            Зарегистрироваться
          </a>
        </div>
      </section>

      <section className="info-tabs">
        <div className="container">
          <div className="tabs">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`tab-button${activeTab === t.id ? ' active' : ''}`}
                onClick={() => handleTabChange(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className={`tab-anim-wrapper ${getAnimClass()}`}>
            {renderTabContent(activeTab)}
          </div>
        </div>
      </section>

      <Footer
        title="The lost beyond: reboot"
        subtitle="Часть kopatel.platform"
        navLinks={[
          { label: 'Игра', href: '/the-lost-beyond' },
          { label: 'Магазин', href: '/the-lost-beyond-shop' },
          { label: 'Главная', href: '/' },
        ]}
      />
    </>
  );
}
