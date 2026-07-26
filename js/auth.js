import { API_BASE_URL, REDIRECT_AFTER_LOGIN } from '../config.js';
import { storage } from './storage.js';
import { api } from './api.js';

export const auth = {
  /**
   * Login user with email and password
   */
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Server wraps the payload in ApiResponse<AuthResponse>,
      // so the actual data lives under response.data
      const payload = response.data || response;

      if (payload.token) {
        storage.setToken(payload.token);
      }
      
      if (payload.user) {
        storage.setUser(payload.user);
      }
      
      return payload;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Register new user
   */
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      
      // Server wraps the payload in ApiResponse<AuthResponse>
      const payload = response.data || response;

      // Auto-login after successful registration
      if (payload.token) {
        storage.setToken(payload.token);
      }
      
      if (payload.user) {
        storage.setUser(payload.user);
      }
      
      return payload;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Logout user and clear storage
   */
  logout() {
    storage.clearToken();
    storage.clearUser();
    storage.clearSubscription();
    storage.clearCourses();
    window.location.href = '/';
  },

  /**
   * Check if user is logged in
   */
  isLoggedIn() {
    return !!storage.getToken();
  },

  /**
   * Get current user
   */
  getCurrentUser() {
    return storage.getUser();
  },

  /**
   * Redirect to login if not authenticated
   */
  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = '/login.html';
      return false;
    }
    return true;
  },

  /**
   * Auto-login detection on page load
   */
  async checkAuthStatus() {
    const token = storage.getToken();
    if (!token) {
      return false;
    }

    try {
      // Verify token validity by calling a protected endpoint
      const response = await api.get('/auth/me');
      // Unwrap ApiResponse wrapper
      const payload = response.data || response;
      if (payload.user) {
        storage.setUser(payload.user);
        return true;
      }
      return false;
    } catch (error) {
      // Token is invalid, clear it
      this.logout();
      return false;
    }
  },

  /**
   * Redirect to dashboard if already logged in
   */
  redirectIfAuthenticated() {
    if (this.isLoggedIn()) {
      window.location.href = REDIRECT_AFTER_LOGIN;
      return true;
    }
    return false;
  }
};
