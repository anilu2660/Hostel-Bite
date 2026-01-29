import api from './api';

export const statsService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    const response = await api.get('/stats/dashboard');
    return response.data;
  },

  // Get revenue analytics
  getRevenue: async (period = 'week') => {
    const response = await api.get(`/stats/revenue?period=${period}`);
    return response.data;
  },

  // Get popular items
  getPopularItems: async () => {
    const response = await api.get('/stats/popular-items');
    return response.data;
  },
};
