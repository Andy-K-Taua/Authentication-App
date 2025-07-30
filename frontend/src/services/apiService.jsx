// frontend/src/services/apiService.jsx

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? '/api' 
    : 'http://localhost:3000/api',
});

const registerUser = async (username, password, phoneNumber) => {
  try {
    console.log('Sending request to register user...');
    const response = await api.post('/auth/register', {
      username,
      password,
      phoneNumber,
    });
    console.log('Response received:', response);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const verifyUser = async (token, verificationCode) => {
  try {
    const response = await api.post('/auth/verify', {
      token,
      verificationCode,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loginUser = async (username, password) => {
  try {
    const response = await api.post('/auth/login', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const logoutUser = async () => {
  try {
    const response = await api.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { registerUser, verifyUser, loginUser, logoutUser };