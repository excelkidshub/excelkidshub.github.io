export const APP_CONFIG = {
  API_BASE_URL: (() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname || '';
      // Use local proxy for localhost development to avoid CORS
      if (host.includes('localhost') || host.includes('127.0.0.1')) {
        return 'http://localhost:3000';
      }
    }
    // Production: use remote API directly
    return 'https://api.excelkidshub.in/api';
  })(),
  READ_BASE_URL: 'https://read.excelkidshub.in',
  REDIRECT_AFTER_LOGIN: 'dashboard/index.html',
};

export const API_BASE_URL = APP_CONFIG.API_BASE_URL;
export const READ_BASE_URL = APP_CONFIG.READ_BASE_URL;
export const REDIRECT_AFTER_LOGIN = APP_CONFIG.REDIRECT_AFTER_LOGIN;
