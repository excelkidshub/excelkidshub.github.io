/**
 * Admin API client.
 * Thin wrapper around fetch that:
 *  - Always sends Authorization: Bearer <token>
 *  - Always targets the correct API base URL
 *  - Throws on non-2xx with the server error message
 *  - Redirects to login on 401
 */

const API_BASE = (() => {
    const h = window.location.hostname;
    return (h.includes('localhost') || h.includes('127.0.0.1'))
        ? 'http://localhost:8080/api'
        : 'https://api.excelkidshub.in/api';
})();

function getToken() {
    return localStorage.getItem('jwt_token') || '';
}

function authHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
    };
}

async function handleResponse(res) {
    if (res.status === 401) {
        localStorage.removeItem('jwt_token');
        window.location.replace('/login');
        throw new Error('Session expired');
    }
    if (res.status === 403) {
        throw new Error('Access denied. Admin role required.');
    }
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(json.message || json.error || `Error ${res.status}`);
    }
    return json;
}

export const adminApi = {

    async get(path) {
        const res = await fetch(`${API_BASE}${path}`, { headers: authHeaders() });
        return handleResponse(res);
    },

    async post(path, body) {
        const res = await fetch(`${API_BASE}${path}`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(body),
        });
        return handleResponse(res);
    },

    async put(path, body = {}) {
        const res = await fetch(`${API_BASE}${path}`, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify(body),
        });
        return handleResponse(res);
    },

    async delete(path) {
        const res = await fetch(`${API_BASE}${path}`, {
            method: 'DELETE',
            headers: authHeaders(),
        });
        return handleResponse(res);
    },
};

// ── Convenience helpers ───────────────────────────────────────────────────────

export const adminStats        = ()             => adminApi.get('/admin/stats');
export const adminGetUsers     = (search, page) => adminApi.get(`/admin/users?search=${search || ''}&page=${page || 0}&size=20`);
export const adminGetUser      = (id)           => adminApi.get(`/admin/users/${id}`);
export const adminSetUserStatus= (id, active)   => adminApi.put(`/admin/users/${id}/status?active=${active}`);

export const adminGetSubs      = (status, page) => adminApi.get(`/admin/subscriptions?status=${status || ''}&page=${page || 0}&size=20`);
export const adminSetSubStatus = (id, status)   => adminApi.put(`/admin/subscriptions/${id}/status?status=${status}`);

export const adminGetPayments  = (status, page) => adminApi.get(`/admin/payments?status=${status || ''}&page=${page || 0}&size=20`);

export const adminGetPlans     = ()             => adminApi.get('/admin/plans?size=50');
export const adminCreatePlan   = (dto)          => adminApi.post('/admin/plans', dto);
export const adminUpdatePlan   = (id, dto)      => adminApi.put(`/admin/plans/${id}`, dto);

export const adminGetCourses   = ()             => adminApi.get('/admin/courses?size=50');
export const adminCreateCourse = (dto)          => adminApi.post('/admin/courses', dto);
export const adminUpdateCourse = (id, dto)      => adminApi.put(`/admin/courses/${id}`, dto);
export const adminSetCourseStatus = (id, active)=> adminApi.put(`/admin/courses/${id}/status?active=${active}`);
