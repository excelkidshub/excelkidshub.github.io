import { API_BASE_URL } from '../config.js';
import { storage } from './storage.js';

export const api = {
  /**
   * Get authorization header with JWT token
   */
  getAuthHeaders() {
    const token = storage.getToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  },

  /**
   * Handle HTTP errors
   */
  async handleResponse(response) {
    if (response.status === 401) {
      // Unauthorized - clear token and redirect to login
      storage.clearToken();
      window.location.href = '/login.html';
      throw new Error('Session expired. Please login again.');
    }
    
    if (response.status === 403) {
      // Forbidden - subscription required
      throw new Error('Subscription required to access this content.');
    }
    
    if (response.status === 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // Use errorData.error for the detailed reason, fall back to message
      const detail = errorData.error || errorData.message || `HTTP error! status: ${response.status}`;
      throw new Error(detail);
    }
    
    return response.json();
  },

  /**
   * Generic GET request
   */
  async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('GET request error:', error);
      throw error;
    }
  },

  /**
   * Generic POST request
   */
  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('POST request error:', error);
      throw error;
    }
  },

  /**
   * Generic PUT request
   */
  async put(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('PUT request error:', error);
      throw error;
    }
  },

  /**
   * Generic DELETE request
   */
  async delete(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      
      return await this.handleResponse(response);
    } catch (error) {
      console.error('DELETE request error:', error);
      throw error;
    }
  },

  /**
   * Refund API methods
   */
  async checkRefundEligibility(paymentId) {
    return await this.get(`/refunds/eligibility/${paymentId}`);
  },

  async requestRefund(paymentId, reason) {
    return await this.post('/refunds/request', { paymentId, reason });
  },

  async getRefundStatus(paymentId) {
    return await this.get(`/refunds/status/${paymentId}`);
  }
};
