import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Обратный отсчёт
  useEffect(() => {
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
  }, [navigate]);

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
          <span>ЗОНА НЕ НАЙДЕНА</span>
        </div>

        <div className="glitch-wrapper">
          <h1 className="glitch" data-text="404">404</h1>
        </div>

        <p className="not-found-subtitle">Эта территория не существует</p>
        <p className="not-found-desc">
          Вы зашли в заброшенную зону. Здесь нет ничего, кроме пыли и обломков.
        </p>

        <div className="not-found-actions">
          <button className="not-found-btn" onClick={() => navigate('/')}>
            ⚔️ Вернуться на базу
          </button>
          <button className="not-found-btn secondary" onClick={() => navigate(-1)}>
            ← Назад
          </button>
        </div>

        <div className="not-found-countdown">
          <span className="dot"></span>
          Автоматическое возвращение через <strong>{countdown}</strong> сек...
        </div>
      </div>
    </div>
  );
}
