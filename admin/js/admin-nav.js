/**
 * Injects the admin top navigation bar and highlights the active page.
 */
import { getAdminUser, adminLogout } from './admin-guard.js';

export function renderAdminNav() {
    const user    = getAdminUser();
    const current = window.location.pathname;

    const links = [
        { href: '/admin/',                label: 'Dashboard'     },
        { href: '/admin/users',           label: 'Users'         },
        { href: '/admin/subscriptions',   label: 'Subscriptions' },
        { href: '/admin/payments',        label: 'Payments'      },
        { href: '/admin/refunds',         label: 'Refunds'       },
        { href: '/admin/plans',           label: 'Plans'         },
        { href: '/admin/courses',         label: 'Courses'       },
        { href: '/admin/coupons',         label: 'Coupons'       },
    ];

    const navHtml = links.map(l => {
        // Normalize both sides: strip trailing slash for comparison
        const norm = (s) => s.replace(/\/$/, '');
        const isActive = norm(current) === norm(l.href);
        return `<a href="${l.href}" class="${isActive ? 'active' : ''}">${l.label}</a>`;
    }).join('');

    document.getElementById('admin-nav-placeholder').innerHTML = `
      <div class="admin-topbar">
        <a class="admin-topbar__brand" href="/admin/">⚙ ExcelKidsHub Admin</a>
        <button class="mobile-menu-btn" id="mobile-menu-btn">☰</button>
        <nav class="admin-topbar__nav" id="admin-nav">${navHtml}</nav>
        <div class="admin-topbar__right">
          <span class="admin-topbar__user">${user ? user.email : ''}</span>
          <button class="btn-logout" id="admin-logout-btn">Logout</button>
        </div>
      </div>`;

    document.getElementById('admin-logout-btn').addEventListener('click', adminLogout);

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const adminNav = document.getElementById('admin-nav');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            adminNav.classList.toggle('open');
        });
    }

    // Close mobile menu when clicking a link
    adminNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            adminNav.classList.remove('open');
        });
    });
}
