// This file now acts as a wrapper for mock API services
// All actual API calls are handled by mockApi.js

import { 
  mockLogin, 
  mockRegister,
  mockGuides,
  mockSuppliers,
  mockCalculators
} from './mockApi';

// Re-export mock functions
export {
  mockLogin as login,
  mockRegister as register,
  mockGuides as guides,
  mockSuppliers as suppliers,
  mockCalculators as calculators
};

// For backward compatibility, maintain the same interface
const api = {
  get: async (url) => {
    // Simulate API get requests
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (url.includes('/guides')) {
      return { data: mockGuides };
    }
    if (url.includes('/suppliers')) {
      return { data: mockSuppliers };
    }
    if (url.includes('/calculators')) {
      return { data: mockCalculators };
    }
    
    return { data: null };
  },
  
  post: async (url, data) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (url.includes('/auth/login')) {
      return mockLogin(data.email, data.password);
    }
    if (url.includes('/auth/register')) {
      return mockRegister(data);
    }
    
    return { data: null };
  }
};

export default api;