import { useState, useEffect, useCallback } from 'react';

export const useApi = (apiFunction, initialData = null, dependencies = []) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunction();
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  return { data, loading, error, refetch: fetchData };
};

export const useMutation = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mutate = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunction(payload);
      setData(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || 'An error occurred';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error, data };
};