export default function PausedNotice({ shop = false }: { shop?: boolean }) {
  return (
    <section className="paused-banner-section">
      <div className="container">
        <div className="paused-banner">
          <span className="dot paused"></span>
          <div>
            <strong>Сервер временно на паузе.</strong>{' '}
            {shop
              ? 'The Lost Beyond: Reboot сейчас не работает, поэтому покупки вступят в силу после возобновления проекта.'
              : 'The Lost Beyond: Reboot сейчас не работает — проект приостановлен, но не заброшен.'}{' '}
            Следите за новостями о возвращении в{' '}
            <a href="https://t.me/copalpal" target="_blank" rel="noreferrer">
              Telegram-канале
            </a>
            .
          </div>
        </div>
      </div>
    </section>
  );
}
