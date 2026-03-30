import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [showSecret, setShowSecret] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Обратный отсчёт
  useEffect(() => {
    if (showSecret) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate, showSecret]);

  // Canvas помехи
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Случайные пиксельные помехи
      for (let i = 0; i < 120; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const w = Math.random() * 60 + 5;
        const h = Math.random() * 3 + 1;
        const r = Math.floor(Math.random() * 3);
        // 0=зелёный, 1=красный, 2=белый
        if (r === 0) ctx.fillStyle = `rgba(46,204,113,${Math.random() * 0.15})`;
        else if (r === 1) ctx.fillStyle = `rgba(231,76,60,${Math.random() * 0.12})`;
        else ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`;
        ctx.fillRect(x, y, w, h);
      }

      // Горизонтальные полосы-помехи (редко)
      if (Math.random() < 0.15) {
        const y = Math.random() * canvas.height;
        const h = Math.random() * 8 + 2;
        ctx.fillStyle = `rgba(46,204,113,${Math.random() * 0.08})`;
        ctx.fillRect(0, y, canvas.width, h);
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="not-found-page">
      {/* Фоновый паттерн */}
      <div className="not-found-bg" />
      {/* Canvas помехи */}
      <canvas ref={canvasRef} className="not-found-canvas" />
      {/* Сканлайны */}
      <div className="scanlines" />

      <div className="not-found-content">
        <div className="not-found-status">
          <span className="dot red-dot"></span>
          <span>DATA_CORRUPTION</span>
        </div>

        <div className="glitch-wrapper" onClick={() => setShowSecret(true)} style={{ cursor: 'pointer' }}>
          <h1 className="glitch" data-text="404">404</h1>
        </div>

        <h2 className="not-found-title">ОШИБКА КОДА РЕАЛЬНОСТИ</h2>
        <p className="not-found-subtitle">Похоже, этот сегмент данных провалился сквозь текстуры веба. Мы отправили поисковый отряд, но они нашли только этот глитч.</p>

        <div className="not-found-actions">
          <button className="not-found-btn" onClick={() => navigate('/')}>
            ТЕЛЕПОРТ В ЛОББИ
          </button>
          <button className="not-found-btn secondary" onClick={() => navigate(-1)}>
            ВЕРНУТЬСЯ В ТОЧКУ СМЕРТИ
          </button>
        </div>

        <div className="not-found-countdown">
          <span className="dot"></span>
          Автоматический респаун в лобби через <strong>{countdown}</strong> сек...
        </div>
      </div>

      {showSecret && (
        <div className="modal-backdrop" onClick={() => setShowSecret(false)} style={{ zIndex: 50 }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowSecret(false)}>✕</button>

            <h2 className="modal-title">ПОЗДРАВЛЯЕМ! ВЫ НАШЛИ СЕКРЕТКУ!</h2>

            <p className="modal-description">
              Вы пробили код реальности и нашли то, что скрыто. Ваша награда находится за этим QR-кодом:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
              <a
                href="https://kopatel-skin-proxy.andrey-mishin2008.workers.dev/rickroll"
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: '260px', 
                  height: '260px', 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  textDecoration: 'none'
                }}
              >
                <QRCodeSVG
                  value="https://kopatel-skin-proxy.andrey-mishin2008.workers.dev/rickroll"
                  size={220}
                  level="H"
                  includeMargin={false}
                />
              </a>
              <p style={{ 
                textAlign: 'center', 
                fontSize: '0.875rem', 
                color: '#6b7280', 
                marginTop: '1rem',
                fontFamily: 'sans-serif' 
              }}>
                или нажмите на qr-код чтобы перейти по ссылке
              </p>
            </div>

            <div className="modal-actions">
              <button className="btn btn-login" onClick={() => setShowSecret(false)}>
                ЗАКРЫТЬ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
