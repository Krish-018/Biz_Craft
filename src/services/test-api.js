// Test API connection
const testAPI = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/health');
    const data = await response.json();
    console.log('✅ API Connection Successful:', data);
  } catch (error) {
    console.error('❌ API Connection Failed:', error.message);
    console.log('Make sure your backend server is running on port 5000');
  }
};

testAPI();
