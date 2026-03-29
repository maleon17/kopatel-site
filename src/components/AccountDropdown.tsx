import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserData } from '../utils/auth';

interface AccountDropdownProps {
  user: UserData | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export default function AccountDropdown({
  user,
  isOpen,
  onClose,
  onOpenLogin,
  onLogout,
}: AccountDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="account-dropdown" ref={dropdownRef}>
      {user ? (
        // Logged in
        <div className="dropdown-content">
          <div className="dropdown-avatar">
            <div
              className="skin-face-avatar"
              style={{
                backgroundImage: `url(${import.meta.env.VITE_FLASK_URL}/skin/${user.minecraft})`,
              }}
            />
          </div>
          <div className="dropdown-info">
            <div className="dropdown-username">{user.minecraft}</div>
            <div className="dropdown-telegram">@{user.username.replace('@', '')}</div>
          </div>
          <div className="dropdown-divider"></div>
          <Link to="/account" className="dropdown-item" onClick={onClose}>
            <span className="dropdown-icon">🎮</span>
            Мой кабинет
          </Link>
          <button className="dropdown-item dropdown-logout" onClick={onLogout}>
            <span className="dropdown-icon">🚪</span>
            Выйти
          </button>
        </div>
      ) : (
        // Not logged in
        <div className="dropdown-content">
          <div className="dropdown-avatar">
            <div
              className="skin-face-avatar"
              style={{
                backgroundImage: `url(https://kopatel-skin-proxy.andrey-mishin2008.workers.dev/skin/Steve)`,
              }}
            />
          </div>
          <div className="dropdown-info">
            <div className="dropdown-title">Войти в аккаунт</div>
            <div className="dropdown-subtitle">Доступ к данным профиля</div>
          </div>
          <button className="btn btn-login-full" onClick={onOpenLogin}>
            Войти
          </button>
        </div>
      )}
    </div>
  );
}
