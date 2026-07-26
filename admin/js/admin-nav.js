/**
 * Injects the admin top navigation bar and highlights the active page.
 */
import { getAdminUser, adminLogout } from './admin-guard.js';

export function renderAdminNav() {
    const user    = getAdminUser();
    const current = window.location.pathname;

    const links = [
        { href: '/admin/',                label: 'Dashboard'     },
        { href: '/admin/users.html',      label: 'Users'         },
        { href: '/admin/subscriptions.html', label: 'Subscriptions' },
        { href: '/admin/payments.html',   label: 'Payments'      },
        { href: '/admin/plans.html',      label: 'Plans'         },
        { href: '/admin/courses.html',    label: 'Courses'       },
    ];

    const navHtml = links.map(l =>
        `<a href="${l.href}" class="${current.endsWith(l.href) || current === l.href ? 'active' : ''}">${l.label}</a>`
    ).join('');

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
