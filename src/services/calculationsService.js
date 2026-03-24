import api from './api';

export const calculationsService = {
  saveCalculation: async (calculation) => {
    try {
      const response = await api.post('/calculations', calculation);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getHistory: async () => {
    try {
      const response = await api.get('/calculations');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteCalculation: async (id) => {
    try {
      const response = await api.delete(`/calculations/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};