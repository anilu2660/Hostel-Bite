import api from './api';

export const menuService = {
  // Get all menu items
  getMenuItems: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.available !== undefined) params.append('available', filters.available);
    if (filters.search) params.append('search', filters.search);

    const response = await api.get(`/menu?${params.toString()}`);
    return response.data;
  },

  // Get single menu item
  getMenuItem: async (id) => {
    const response = await api.get(`/menu/${id}`);
    return response.data;
  },

  // Create menu item (admin)
  createMenuItem: async (itemData) => {
    const response = await api.post('/menu', itemData);
    return response.data;
  },

  // Update menu item (admin)
  updateMenuItem: async (id, itemData) => {
    const response = await api.put(`/menu/${id}`, itemData);
    return response.data;
  },

  // Delete menu item (admin)
  deleteMenuItem: async (id) => {
    const response = await api.delete(`/menu/${id}`);
    return response.data;
  },

  // Toggle availability (admin)
  toggleAvailability: async (id) => {
    const response = await api.patch(`/menu/${id}/availability`);
    return response.data;
  },
};
