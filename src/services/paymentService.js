import api from './api';

export const paymentService = {
  // Create Razorpay order
  createOrder: async (amount) => {
    const response = await api.post('/payment/create-order', { amount });
    return response.data;
  },

  // Verify payment
  verifyPayment: async (paymentData) => {
    const response = await api.post('/payment/verify', paymentData);
    return response.data;
  },

  // Complete order after payment
  completeOrder: async (orderData) => {
    const response = await api.post('/payment/complete', orderData);
    return response.data;
  },

  // Record failed payment
  recordFailedPayment: async (failureData) => {
    const response = await api.post('/payment/failed', failureData);
    return response.data;
  },
};
