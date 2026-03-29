import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData, getSession, setSession } from '../utils/auth';
import { SkinViewer, WalkingAnimation } from 'skinview3d';

interface BaseUser {
  telegram_id: number;
  username: string;
  minecraft: string;
  faction: string;
  kit: string;
  banned: boolean;
  ender_chest_slots?: number;
  skin_system?: 'elyby' | 'tlauncher';
  payments?: Array<{
    telegram_id: number;
    date: string;
    type: string;
    amount: number;
    status: 'pending' | 'completed' | 'rejected';
  }>;
}

interface Payment {
  date: string;
  type: string;
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
}

const paymentTypeLabels: Record<string, string> = {
  unban: 'Разбан',
  faction_change: 'Смена фракции',
  kit_change: 'Смена кита',
  ender_chest_both: 'Эндер-сундук (оба)',
  ender_chest_1: 'Эндер-сундук (2й слот)',
  ender_chest_2: 'Эндер-сундук (3й слот)',
};

const factionColors: Record<string, string> = {
  '🔵 Синие': 'blue',
  '🔴 Красные': 'red',
};

export default function AccountPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(getSession());
  const [skinSystem, setSkinSystem] = useState<'elyby' | 'tlauncher'>(
    user?.skin_system || 'elyby'
  );
  const [skinUrl, setSkinUrl] = useState('');
  const [skinError, setSkinError] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [baseUser, setBaseUser] = useState<BaseUser | null>(null);
  const viewerRef = useRef<SkinViewer | null>(null);
  const skinContainerRef = useRef<HTMLDivElement>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Load base.jsonc for payments
  useEffect(() => {
    if (!user) return;

    const loadBaseData = async () => {
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const response = await fetch(
          'https://api.github.com/repos/maleon17/kopatel_bot/contents/base.jsonc',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        if (!response.ok) return;

        const data = await response.json();
        const content = atob(data.content);
        const jsonContent = content.replace(/\/\/.*$/gm, '');
        const baseData = JSON.parse(jsonContent) as { users: BaseUser[] };

        const foundUser = baseData.users.find(
          (u) => u.telegram_id === user.telegram_id
        );

        if (foundUser) {
          setBaseUser(foundUser);
          if (foundUser.payments) {
            const userPayments = foundUser.payments.filter(
              (p) => p.telegram_id === user.telegram_id
            );
            setPayments(userPayments);
          }
        }
      } catch (error) {
        console.error('Load base data error:', error);
      }
    };

    loadBaseData();
  }, [user]);

  // Update skin URL when skinSystem or user changes
  useEffect(() => {
    if (!user) return;

    setSkinError(false);
    const url =
      skinSystem === 'elyby'
        ? `https://skinsystem.ely.by/skins/${user.minecraft}.png`
        : `https://tlskins.net/skins/${user.minecraft}.png`;
    setSkinUrl(url);
  }, [user, skinSystem]);

  // Initialize 3D skin viewer
  useEffect(() => {
    if (!skinContainerRef.current || skinError) return;

    // Clean up previous viewer
    if (viewerRef.current) {
      viewerRef.current.dispose();
      viewerRef.current = null;
    }

    const skinUrlToUse = skinError
      ? undefined
      : skinUrl;

    viewerRef.current = new SkinViewer({
      canvas: skinContainerRef.current,
      width: 300,
      height: 400,
      skin: skinUrlToUse,
      animation: new WalkingAnimation(),
    });

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!viewerRef.current) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      viewerRef.current.rotation.y = x * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (viewerRef.current) {
        viewerRef.current.dispose();
        viewerRef.current = null;
      }
    };
  }, [skinUrl, skinError]);

  // Handle skin load error
  const handleSkinError = () => {
    setSkinError(true);
    // Load default Steve skin
    if (viewerRef.current) {
      viewerRef.current.skin = undefined;
    }
  };

  // Update skin system
  const handleSkinSystemChange = (system: 'elyby' | 'tlauncher') => {
    setSkinSystem(system);
    if (user) {
      const updatedUser = { ...user, skin_system: system };
      setUser(updatedUser);
      setSession(updatedUser);
    }
  };

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Get status
  const isBanned = user?.banned || false;
  const statusText = isBanned ? 'Забанен' : 'Активен';
  const statusColor = isBanned ? '#e74c3c' : '#2ecc71';

  // Get faction info
  const factionRaw = user?.faction || '';
  const factionEmoji = factionRaw.match(/^[🔵🔴]/)?.[0] || '';
  const factionName = factionRaw.replace(/^[🔵🔴]\s*/, '');
  const factionColor = factionColors[factionRaw] || 'default';

  // Get kit info
  const kitRaw = user?.kit || '';
  const kitEmoji = kitRaw.match(/^[🛡️⚔️🏹🪄]/)?.[0] || '🎮';
  const kitName = kitRaw.replace(/^[🛡️⚔️🏹🪄]\s*/, '');

  // Ender chest slots
  const enderChestSlots = user?.ender_chest_slots ?? 1;
  const totalSlots = 3;
  const openSlots = Math.min(enderChestSlots, totalSlots);

  // Skin URL based on system
  const skinLink = skinSystem === 'elyby'
    ? 'https://ely.by/skins'
    : 'https://tl-skins.ru/';

  if (!user) return null;

  return (
    <div className="account-page">
      <div className="container">
        {/* Top block */}
        <div className="account-top">
          <div className="account-left">
            {/* Skin system switcher */}
            <div className="skin-system-switcher">
              <button
                className={`skin-system-btn${skinSystem === 'elyby' ? ' active' : ''}`}
                onClick={() => handleSkinSystemChange('elyby')}
              >
                Ely.by
              </button>
              <button
                className={`skin-system-btn${skinSystem === 'tlauncher' ? ' active' : ''}`}
                onClick={() => handleSkinSystemChange('tlauncher')}
              >
                TLauncher
              </button>
            </div>

            {/* 3D Skin Viewer */}
            <div className="skin-viewer-wrapper">
              <canvas ref={skinContainerRef} className="skin-canvas" />
              {skinError && (
                <div className="skin-error-fallback">
                  <img
                    src="https://minotar.net/body/steve/150"
                    alt="Steve"
                  />
                </div>
              )}
            </div>

            {/* Change skin button */}
            <a
              href={skinLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-change-skin"
            >
              Сменить скин
            </a>
          </div>

          <div className="account-right">
            <div className="account-info-card">
              <h1 className="account-minecraft">{user.minecraft}</h1>
              <p className="account-telegram">@{user.username.replace('@', '')}</p>
              <div className="account-status" style={{ color: statusColor }}>
                <span className="status-dot" style={{ background: statusColor }}></span>
                {statusText}
              </div>
            </div>
          </div>
        </div>

        {/* Middle block - three cards */}
        <div className="account-middle">
          {/* Faction card */}
          <div className={`account-card faction-card faction-${factionColor}`}>
            <div className="card-icon">{factionEmoji}</div>
            <div className="card-label">Фракция</div>
            <div className="card-value">{factionName}</div>
          </div>

          {/* Kit card */}
          <div className="account-card kit-card">
            <div className="card-icon">{kitEmoji}</div>
            <div className="card-label">Класс</div>
            <div className="card-value">{kitName}</div>
          </div>

          {/* Ender chest card */}
          <div className="account-card ender-card">
            <div className="card-icon">📦</div>
            <div className="card-label">Эндер-сундук</div>
            <div className="ender-slots">
              {Array.from({ length: totalSlots }).map((_, i) => (
                <div
                  key={i}
                  className={`ender-slot${i < openSlots ? ' open' : ' closed'}`}
                >
                  {i < openSlots ? '🟢' : '⬜'}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom block */}
        <div className="account-bottom">
          {/* Payment history */}
          <div className="account-section">
            <h2 className="section-title-small">История платежей</h2>
            {payments.length === 0 ? (
              <p className="empty-text">История платежей пуста</p>
            ) : (
              <div className="payments-list">
                {payments.map((payment, index) => (
                  <div key={index} className="payment-item">
                    <div className="payment-info">
                      <span className="payment-date">{formatDate(payment.date)}</span>
                      <span className="payment-type">
                        {paymentTypeLabels[payment.type] || payment.type}
                      </span>
                    </div>
                    <div className="payment-meta">
                      <span className="payment-amount">{payment.amount} ⭐</span>
                      <span
                        className={`payment-status payment-status-${payment.status}`}
                      >
                        {payment.status === 'pending' && 'Ожидает'}
                        {payment.status === 'completed' && 'Выполнен'}
                        {payment.status === 'rejected' && 'Отклонён'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="account-section">
            <h2 className="section-title-small">Быстрые действия</h2>
            <div className="quick-actions">
              <a
                href="https://t.me/kopatel_platform_bot"
                target="_blank"
                rel="noreferrer"
                className="btn btn-quick-action"
              >
                Сменить фракцию
              </a>
              <a
                href="https://t.me/kopatel_platform_bot"
                target="_blank"
                rel="noreferrer"
                className="btn btn-quick-action"
              >
                Сменить кит
              </a>
              {isBanned && (
                <a
                  href="https://t.me/kopatel_platform_bot"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-quick-action btn-unban"
                >
                  Разбан
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
