import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const login = async (email, password) => {
  try {
    console.log('Attempting login with:', { email }); // Debug log
    const response = await axios.post(`${API_URL}/auth/signin`, { email, password });
    console.log('Login response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response || error); // Debug log
    throw error;
  }
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
  return response.data;
};

export const resetPassword = async (email, otp, newPassword) => {
  const response = await axios.post(`${API_URL}/auth/reset-password`, {
    email,
    otp,
    newPassword
  });
  return response.data;
};

export const createResume = async (resumeData, token) => {
  const response = await axios.post(`${API_URL}/client`, resumeData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Admin functions
export const getAllResumes = async (token) => {
  try {
    if (!token) {
      throw new Error('No authentication token provided');
    }
    
    console.log('Sending request with token:', token); // Debug log
    const response = await axios.get(`${API_URL}/admin/resumes`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('API Service Response:', response); // Debug log
    return response;
  } catch (error) {
    console.error('API Service Error:', error.response || error); // Log full error response
    throw error;
  }
};

export const deleteResume = async (id, token) => {
  const response = await axios.delete(`${API_URL}/admin/resume/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const viewResume = async (id, token) => {
  try {
    console.log('Fetching resume details for ID:', id);
    const response = await axios.get(`${API_URL}/admin/resume/${id}`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Resume details response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching resume details:', error);
    throw error;
  }
};