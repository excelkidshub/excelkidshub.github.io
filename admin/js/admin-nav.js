/**
 * Injects the admin sidebar navigation and highlights the active page.
 */
import { getAdminUser, adminLogout } from './admin-guard.js';

export function renderAdminNav() {
    const user    = getAdminUser();
    const current = window.location.pathname;

    const links = [
        { href: '/admin/',                label: 'Dashboard',     icon: '📊' },
        { href: '/admin/users',           label: 'Users',         icon: '👥' },
        { href: '/admin/subscriptions',   label: 'Subscriptions', icon: '⭐' },
        { href: '/admin/payments',        label: 'Payments',      icon: '💳' },
        { href: '/admin/refunds',         label: 'Refunds',       icon: '💸' },
        { href: '/admin/plans',           label: 'Plans',         icon: '📋' },
        { href: '/admin/courses',         label: 'Courses',       icon: '📚' },
        { href: '/admin/coupons',         label: 'Coupons',       icon: '🎟️' },
    ];

    const navHtml = links.map(l => {
        // Normalize both sides: strip trailing slash for comparison
        const norm = (s) => s.replace(/\/$/, '');
        const isActive = norm(current) === norm(l.href);
        return `<a href="${l.href}" class="${isActive ? 'active' : ''}" style="--nav-icon: '${l.icon}'">${l.label}</a>`;
    }).join('');

    document.getElementById('admin-nav-placeholder').innerHTML = `
      <div class="admin-layout">
        <aside class="admin-sidebar" id="admin-sidebar">
          <div class="admin-sidebar__header">
            <a href="/admin/" class="admin-sidebar__brand">
              ⚙ ExcelKidsHub Admin
            </a>
          </div>
          <nav class="admin-sidebar__nav">
            ${navHtml}
          </nav>
          <div class="admin-sidebar__footer">
            <div class="admin-sidebar__user">${user ? user.email : ''}</div>
            <button class="btn-logout" id="admin-logout-btn">Logout</button>
          </div>
        </aside>
        <button class="mobile-menu-btn" id="mobile-menu-btn">☰</button>
      </div>`;

    document.getElementById('admin-logout-btn').addEventListener('click', adminLogout);

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const adminSidebar = document.getElementById('admin-sidebar');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            adminSidebar.classList.toggle('open');
        });
    }

    // Close mobile sidebar when clicking a link
    adminSidebar.querySelectorAll('.admin-sidebar__nav a').forEach(link => {
        link.addEventListener('click', () => {
            adminSidebar.classList.remove('open');
        });
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            if (!adminSidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                adminSidebar.classList.remove('open');
            }
        }
    });
}
