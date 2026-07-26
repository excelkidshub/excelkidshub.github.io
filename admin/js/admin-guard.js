/**
 * Admin Guard
 * Decodes the JWT locally (no API call) and checks role === ADMIN.
 * If not ADMIN, redirects to the home page immediately.
 *
 * The backend is the real security gate — this is a fast client-side check
 * that prevents non-admins from even seeing a 403 error page.
 *
 * Usage: import at the top of every admin page script block.
 *
 *   import { requireAdmin, getAdminUser } from './js/admin-guard.js';
 *   requireAdmin();
 */

const HOME  = '/';
const LOGIN = '/login';

/**
 * Decode the JWT payload without verifying signature (client-side only).
 * Verification happens on the backend for every API call.
 */
function decodeJwt(token) {
    try {
        const payload = token.split('.')[1];
        const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(decoded);
    } catch {
        return null;
    }
}

/**
 * Call at the top of every admin page.
 * Redirects synchronously if the user is not authenticated or not ADMIN.
 */
export function requireAdmin() {
    const token = localStorage.getItem('jwt_token');

    if (!token) {
        window.location.replace(LOGIN + '?redirect=' + encodeURIComponent(window.location.pathname));
        throw new Error('Not authenticated');
    }

    const payload = decodeJwt(token);

    if (!payload) {
        localStorage.removeItem('jwt_token');
        window.location.replace(LOGIN);
        throw new Error('Invalid token');
    }

    // Check expiry
    if (payload.exp && Date.now() / 1000 > payload.exp) {
        localStorage.removeItem('jwt_token');
        window.location.replace(LOGIN + '?expired=1');
        throw new Error('Token expired');
    }

    // Check role
    if (payload.role !== 'ADMIN') {
        window.location.replace(HOME);
        throw new Error('Access denied');
    }
}

/**
 * Returns the decoded user info from the JWT for display purposes.
 */
export function getAdminUser() {
    const token = localStorage.getItem('jwt_token');
    if (!token) return null;
    return decodeJwt(token);
}

/**
 * Logout: clear token and redirect to login.
 */
export function adminLogout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('subscription_data');
    localStorage.removeItem('courses_data');
    window.location.replace(LOGIN);
}

