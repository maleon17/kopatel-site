import { useState, useEffect, useCallback } from 'react';
import { UserData } from '../utils/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserData) => void;
}

interface BaseUser {
  minecraft: string;
  username: string;
  telegram_id: number;
  faction: string;
  kit: string;
  banned: boolean;
  ender_chest_slots?: number;
  payments?: Array<{
    telegram_id: number;
    date: string;
    type: string;
    amount: number;
    status: 'pending' | 'completed' | 'rejected';
  }>;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [identifier, setIdentifier] = useState('');
  const [code, setCode] = useState('');
  const [foundUser, setFoundUser] = useState<BaseUser | null>(null);
  const [accountStatus, setAccountStatus] = useState<'idle' | 'found' | 'not_found'>('idle');
  const [codeSent, setCodeSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  // Close modal on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Debounced search
  const searchUser = useCallback(async (value: string) => {
    if (!value.trim()) {
      setFoundUser(null);
      setAccountStatus('idle');
      return;
    }

    try {
      const flaskUrl = import.meta.env.VITE_FLASK_URL;
      const response = await fetch(`${flaskUrl}/get_user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: value.trim() }),
      });

      if (!response.ok) {
        setFoundUser(null);
        setAccountStatus('not_found');
        return;
      }

      const data = await response.json();
      if (data.success && data.user) {
        setFoundUser(data.user);
        setAccountStatus('found');
      } else {
        setFoundUser(null);
        setAccountStatus('not_found');
      }
    } catch (error) {
      console.error('Search error:', error);
      setFoundUser(null);
      setAccountStatus('not_found');
    }
  }, []);

  // Debounce effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchUser(identifier);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [identifier, searchUser]);

  const handleSendCode = async () => {
    if (!foundUser) return;

    try {
      const flaskUrl = import.meta.env.VITE_FLASK_URL;
      const response = await fetch(`${flaskUrl}/send_code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegram_id: foundUser.telegram_id }),
      });

      if (response.ok) {
        setCodeSent(true);
        setTimer(90);
      }
    } catch (error) {
      console.error('Send code error:', error);
    }
  };

  const handleVerify = async () => {
    if (!foundUser || !code) return;

    setIsVerifying(true);
    try {
      const flaskUrl = import.meta.env.VITE_FLASK_URL;
      const response = await fetch(`${flaskUrl}/verify_code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegram_id: foundUser.telegram_id,
          code: code.trim(),
        }),
      });

      const result = await response.json();
      if (result.success) {
        const userData: UserData = {
          telegram_id: foundUser.telegram_id,
          username: foundUser.username,
          minecraft: foundUser.minecraft,
          faction: foundUser.faction,
          kit: foundUser.kit,
          banned: foundUser.banned,
          ender_chest_slots: foundUser.ender_chest_slots,
          skin_system: 'elyby',
        };
        onLoginSuccess(userData);
        handleClose();
      }
    } catch (error) {
      console.error('Verify error:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    setIdentifier('');
    setCode('');
    setFoundUser(null);
    setAccountStatus('idle');
    setCodeSent(false);
    setTimer(0);
    onClose();
  };

  if (!isOpen) return null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>✕</button>
        
        <h2 className="modal-title">Вход в аккаунт</h2>

        <div className="modal-form">
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Minecraft ник, Telegram username или ID"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              disabled={codeSent}
            />
            <div className="form-hint">
              {accountStatus === 'found' && (
                <span className="hint-success">✓ Аккаунт найден</span>
              )}
              {accountStatus === 'not_found' && (
                <span className="hint-error">✗ Аккаунт не найден</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Код подтверждения"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={!codeSent}
            />
          </div>

          <div className="modal-actions">
            <button
              className="btn btn-send-code"
              onClick={handleSendCode}
              disabled={accountStatus !== 'found' || timer > 0}
            >
              {timer > 0 ? formatTimer(timer) : 'Отправить код'}
            </button>

            <button
              className="btn btn-login"
              onClick={handleVerify}
              disabled={!codeSent || !code.trim() || isVerifying}
            >
              {isVerifying ? 'Проверка...' : 'Войти'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

