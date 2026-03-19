// Копирование IP
function copyIP() {
    const serverIP = document.getElementById('server-ip').textContent;
    navigator.clipboard.writeText(serverIP).then(() => {
        const orig = serverIP;
        document.getElementById('server-ip').textContent = '✓ Скопировано!';
        setTimeout(() => { document.getElementById('server-ip').textContent = orig; }, 2000);
    }).catch(() => alert('Ошибка при копировании IP'));
}

// Онлайн-счётчик
async function updateOnlineCount() {
    const el = document.getElementById('online-count');
    if (!el) return;
    try {
        const r = await fetch('https://api.mcsrvstat.us/2/game11.gamely.pro:24001');
        const d = await r.json();
        el.textContent = d.players ? d.players.online : 0;
    } catch { el.textContent = '—'; }
}

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Вкладки
function openTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    document.querySelectorAll('.tab-button').forEach(b => {
        if ((b.getAttribute('onclick') || '').includes("'" + tabName + "'")) b.classList.add('active');
    });
}

// ── Единый бургер — на десктопе открывает сайдбар слева, на мобильных меню справа ──
function toggleMenu(e) {
    if (e) e.stopPropagation();
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        _toggleMobileNav();
    } else {
        _toggleSidebar();
    }
}

function _toggleMobileNav() {
    const burger    = document.getElementById('burger');
    const mobileNav = document.getElementById('mobile-nav');
    const overlay   = document.getElementById('nav-overlay');
    if (!mobileNav) return;
    const isOpen = mobileNav.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    if (overlay) overlay.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

function _toggleSidebar() {
    const burger  = document.getElementById('burger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('nav-overlay');
    if (!sidebar) return;
    const isOpen = sidebar.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    if (overlay) overlay.classList.toggle('open', isOpen);
}

function closeAll() {
    const burger    = document.getElementById('burger');
    const mobileNav = document.getElementById('mobile-nav');
    const sidebar   = document.getElementById('sidebar');
    const overlay   = document.getElementById('nav-overlay');
    if (burger)    burger.classList.remove('open');
    if (mobileNav) mobileNav.classList.remove('open');
    if (sidebar)   sidebar.classList.remove('open');
    if (overlay)   overlay.classList.remove('open');
    document.body.style.overflow = '';
}

// Закрытие по клику вне
document.addEventListener('click', function(e) {
    const burger    = document.getElementById('burger');
    const mobileNav = document.getElementById('mobile-nav');
    const sidebar   = document.getElementById('sidebar');
    const isMenuOpen = (mobileNav && mobileNav.classList.contains('open')) ||
                       (sidebar   && sidebar.classList.contains('open'));
    if (!isMenuOpen) return;
    if (burger && burger.contains(e.target)) return;
    if (mobileNav && mobileNav.contains(e.target)) return;
    if (sidebar   && sidebar.contains(e.target)) return;
    closeAll();
});

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    updateOnlineCount();
    setInterval(updateOnlineCount, 5000);
    document.querySelectorAll('#mobile-nav a, #sidebar a').forEach(a => {
        a.addEventListener('click', closeAll);
    });
});

// Покупка
function purchaseItem(itemName, price) {
    try {
        window.open(`https://t.me/kopatel_platform_bot?text=${encodeURIComponent(`Хочу купить: ${itemName}\nЦена: ${price} ⭐`)}`, '_blank');
    } catch { window.open('https://t.me/kopatel_platform_bot', '_blank'); }
}

// Переключение проектов
function switchProject(project) {
    document.querySelectorAll('.selector-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`[onclick="switchProject('${project}')"]`);
    if (btn) btn.classList.add('active');
    const k = document.getElementById('kopatel-content');
    const c = document.getElementById('coming-content');
    if (project === 'reboot') { k.style.display='block'; c.style.display='none'; }
    else if (project === 'coming') { k.style.display='none'; c.style.display='block'; }
}
