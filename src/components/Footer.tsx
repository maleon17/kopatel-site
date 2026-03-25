import { Link } from 'react-router-dom';

interface FooterProps {
  title?: string;
  subtitle?: string;
  navLinks?: { label: string; href: string; external?: boolean }[];
}

export default function Footer({
  title = 'kopatel.platform',
  subtitle = 'Мульти-проект для настоящих геймеров',
  navLinks = [
    { label: 'Главная', href: '/' },
    { label: 'Проекты', href: '/games' },
    { label: 'Магазин', href: '/shop' },
  ],
}: FooterProps) {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
          <div className="footer-section">
            <h4>Навигация</h4>
            <ul>
              {navLinks.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
                  ) : (
                    <Link to={l.href}>{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h4>Социальные сети</h4>
            <ul>
              <li><a href="https://t.me/copalpal" target="_blank" rel="noreferrer">Telegram</a></li>
              <li><a href="https://t.me/kopatel_platform_bot" target="_blank" rel="noreferrer">Бот</a></li>
              <li><a href="https://t.me/kopatel_support_bot" target="_blank" rel="noreferrer">Поддержка</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 kopatel.platform. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
