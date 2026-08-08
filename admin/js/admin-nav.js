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
        <nav class="admin-topbar__nav">${navHtml}</nav>
        <div class="admin-topbar__right">
          <span class="admin-topbar__user">${user ? user.email : ''}</span>
          <button class="btn-logout" id="admin-logout-btn">Logout</button>
        </div>
      </div>`;

    document.getElementById('admin-logout-btn').addEventListener('click', adminLogout);
}
