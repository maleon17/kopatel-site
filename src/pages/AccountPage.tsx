import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData, getSession, setSession } from '../utils/auth';
import { SkinViewer, WalkingAnimation } from 'skinview3d';

const serviceNames: Record<string, string> = {
  unban: 'Разбан',
  faction_change: 'Смена фракции',
  kit_change: 'Смена кита',
  ender_chest_both: 'Эндер-сундук (оба слота)',
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<SkinViewer | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Initialize 3D skin viewer
  useEffect(() => {
    if (!canvasRef.current || !user) return;

    // Clean up previous viewer
    if (viewerRef.current) {
      viewerRef.current.dispose();
      viewerRef.current = null;
    }

    const skinUrl = `https://kopatel-skin-proxy.andrey-mishin2008.workers.dev/skin/${skinSystem === 'tlauncher' ? 'tlauncher' : 'elyby'}/${user.minecraft}`;

    const isMobile = window.innerWidth <= 480;
    const viewerWidth = isMobile ? 200 : 300;
    const viewerHeight = isMobile ? 280 : 400;

    viewerRef.current = new SkinViewer({
      canvas: canvasRef.current,
      width: viewerWidth,
      height: viewerHeight,
      skin: skinUrl,
    });

    viewerRef.current.animation = new WalkingAnimation();
    viewerRef.current.animation.speed = 0.8;
    viewerRef.current.autoRotate = false;
    
    // Zoom out on mobile to fit the skin
    if (isMobile) {
      viewerRef.current.camera.position.z = 80;
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!viewerRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      viewerRef.current.playerObject.rotation.y = x * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle resize
    const handleResize = () => {
      if (!viewerRef.current || !canvasRef.current) return;
      const newIsMobile = window.innerWidth <= 480;
      const newWidth = newIsMobile ? 200 : 300;
      const newHeight = newIsMobile ? 280 : 400;
      viewerRef.current.width = newWidth;
      viewerRef.current.height = newHeight;
      if (newIsMobile) {
        viewerRef.current.camera.position.z = 80;
      } else {
        viewerRef.current.camera.position.z = 100;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      viewerRef.current?.dispose();
      viewerRef.current = null;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [user?.minecraft, skinSystem]);

  // Update skin system
  const handleSkinSystemChange = (system: 'elyby' | 'tlauncher') => {
    setSkinSystem(system);
    if (user) {
      const updatedUser = { ...user, skin_system: system };
      setUser(updatedUser);
      setSession(updatedUser);
    }
  };

  // Get status
  const isBanned = user?.banned || false;
  const statusText = isBanned ? 'Забанен' : 'Активен';
  const statusColor = isBanned ? '#e74c3c' : '#2ecc71';

  // Get faction info
  const factionRaw = user?.faction || '';
  const factionParts = factionRaw.split(' ');
  const factionEmoji = factionParts[0] || '';
  const factionName = factionParts.slice(1).join(' ');
  const factionColor = factionColors[factionRaw] || 'default';

  // Get kit info
  const kitRaw = user?.kit || '';
  const kitParts = kitRaw.split(' ');
  const kitEmoji = kitParts[0] || '🎮';
  const kitName = kitParts.slice(1).join(' ');

  // Ender chest slots
  const enderChestSlots = user?.ender_chest_slots ?? 1;
  const totalSlots = 3;
  const openSlots = Math.min(enderChestSlots, totalSlots);

  // Skin URL based on system
  const skinLink = skinSystem === 'elyby'
    ? 'https://ely.by/skins'
    : 'https://tl-skins.ru/';

  // Get payments from user
  const payments = user?.payments || [];

  // Format date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

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
              <canvas ref={canvasRef} className="skin-canvas" />
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
                {payments.map((payment) => (
                  <div key={payment.payment_id} className="payment-item">
                    <div className="payment-info">
                      <span className="payment-date">{formatDate(payment.created_at)}</span>
                      <span className="payment-type">
                        {serviceNames[payment.service_type] || payment.service_type}
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
