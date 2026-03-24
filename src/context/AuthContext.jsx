import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set axios defaults
  useEffect(() => {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Verify token on mount
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const { data } = await axios.get('/auth/verify');
        setUser(data.user);
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  // Function to update user data (useful for profile updates)
  const updateUser = (updatedData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedData
    }));
  };

  const login = async (email, password) => {
    try {
      setError(null);
      toast.loading('Logging in...', { id: 'login' });
      
      const { data } = await axios.post('/auth/login', { email, password });
      
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data.user);
      
      toast.success('Login successful!', { id: 'login' });
      return { success: true, data };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      setError(message);
      toast.error(message, { id: 'login' });
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      toast.loading('Creating account...', { id: 'register' });
      
      const { data } = await axios.post('/auth/register', userData);
      
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data.user);
      
      toast.success('Registration successful!', { id: 'register' });
      return { success: true, data };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      setError(message);
      toast.error(message, { id: 'register' });
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser, // Add this function to the context
    loading,
    error,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};