// Копирование IP сервера
function copyIP() {
    const serverIP = document.getElementById('server-ip').textContent;
    navigator.clipboard.writeText(serverIP).then(() => {
        const originalText = document.getElementById('server-ip').textContent;
        document.getElementById('server-ip').textContent = '✓ Скопировано!';
        setTimeout(() => {
            document.getElementById('server-ip').textContent = originalText;
        }, 2000);
    }).catch(err => {
        alert('Ошибка при копировании IP');
    });
}

// Онлайн-счётчик
async function updateOnlineCount() {
    const el = document.getElementById('online-count');
    if (!el) return;
    try {
        const response = await fetch('https://api.mcsrvstat.us/2/game11.gamely.pro:24001');
        const data = await response.json();
        el.textContent = data.players ? data.players.online : 0;
    } catch (error) {
        el.textContent = '—';
    }
}

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Переключение вкладок
function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    document.querySelectorAll('.tab-button').forEach(b => {
        if ((b.getAttribute('onclick') || '').includes("'" + tabName + "'")) {
            b.classList.add('active');
        }
    });
}

// Бургер-меню
function toggleMenu() {
    const burger  = document.getElementById('burger');
    const nav     = document.querySelector('nav');
    const overlay = document.getElementById('nav-overlay');
    if (!burger || !nav || !overlay) return;
    const isOpen = burger.classList.toggle('open');
    nav.classList.toggle('open', isOpen);
    overlay.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

// Закрыть меню при клике на ссылку
function closeMenu() {
    const burger  = document.getElementById('burger');
    const nav     = document.querySelector('nav');
    const overlay = document.getElementById('nav-overlay');
    if (!burger) return;
    burger.classList.remove('open');
    nav.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

// Инициализация
document.addEventListener('DOMContentLoaded', function () {
    updateOnlineCount();
    setInterval(updateOnlineCount, 5000);
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});

// Покупка товара
function purchaseItem(itemName, price) {
    try {
        const message = `Хочу купить: ${itemName}\nЦена: ${price} ⭐`;
        window.open(`https://t.me/kopatel_platform_bot?text=${encodeURIComponent(message)}`, '_blank');
    } catch (error) {
        window.open('https://t.me/kopatel_platform_bot', '_blank');
    }
}

// Переключение проектов
function switchProject(project) {
    document.querySelectorAll('.selector-btn').forEach(btn => btn.classList.remove('active'));
    const btn = document.querySelector(`[onclick="switchProject('${project}')"]`);
    if (btn) btn.classList.add('active');
    const kopatelContent = document.getElementById('kopatel-content');
    const comingContent  = document.getElementById('coming-content');
    if (project === 'reboot') {
        kopatelContent.style.display = 'block';
        comingContent.style.display  = 'none';
    } else if (project === 'coming') {
        kopatelContent.style.display = 'none';
        comingContent.style.display  = 'block';
    }
}
