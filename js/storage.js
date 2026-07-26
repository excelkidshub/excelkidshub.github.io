/**
 * Storage module for managing local storage data
 * Handles JWT, user profile, subscription, and course data
 */
export const storage = {
  // Token management
  setToken(token) {
    localStorage.setItem('jwt_token', token);
  },

  getToken() {
    return localStorage.getItem('jwt_token');
  },

  clearToken() {
    localStorage.removeItem('jwt_token');
  },

  // User management
  setUser(user) {
    localStorage.setItem('user_data', JSON.stringify(user));
  },

  getUser() {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  },

  clearUser() {
    localStorage.removeItem('user_data');
  },

  // Subscription management
  setSubscription(subscription) {
    localStorage.setItem('subscription_data', JSON.stringify(subscription));
  },

  getSubscription() {
    const subscriptionData = localStorage.getItem('subscription_data');
    return subscriptionData ? JSON.parse(subscriptionData) : null;
  },

  clearSubscription() {
    localStorage.removeItem('subscription_data');
  },

  // Courses management
  setCourses(courses) {
    localStorage.setItem('courses_data', JSON.stringify(courses));
  },

  getCourses() {
    const coursesData = localStorage.getItem('courses_data');
    return coursesData ? JSON.parse(coursesData) : [];
  },

  clearCourses() {
    localStorage.removeItem('courses_data');
  },

  // Clear all data
  clearAll() {
    this.clearToken();
    this.clearUser();
    this.clearSubscription();
    this.clearCourses();
  }
};
