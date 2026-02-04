import api from './api';

export const feedbackService = {
  // Submit feedback
  submitFeedback: async (feedbackData) => {
    const response = await api.post('/feedback', feedbackData);
    return response.data;
  },

  // Get user's own feedback
  getMyFeedback: async () => {
    const response = await api.get('/feedback/my-feedback');
    return response.data;
  },

  // Get all feedback (admin)
  getAllFeedback: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/feedback/admin/all?${params}`);
    return response.data;
  },

  // Update feedback status (admin)
  updateFeedbackStatus: async (id, statusData) => {
    const response = await api.patch(`/feedback/${id}/status`, statusData);
    return response.data;
  },

  // Get feedback statistics (admin)
  getFeedbackStats: async () => {
    const response = await api.get('/feedback/stats');
    return response.data;
  },
};
