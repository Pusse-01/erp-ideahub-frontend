import axios from 'axios';
import API_BASE_URL from '../../config';

//const API_URL = 'http://localhost:5000/api/users'
const API_URL = `${API_BASE_URL}/auth`;

const register = async (userData) => {
  const response = await axios.post(API_URL + '/Register', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + '/Login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
