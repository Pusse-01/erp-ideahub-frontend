import axios from "axios";
import API_BASE_URL from "../../config";
//const API_URL = 'http://localhost:8080/auth'
const API_URL = `${API_BASE_URL}/notification`;

const getNotifications = async (role, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetNotifications/' + role, config);
  console.log(response.data)

  return response.data.data;
};

const setViewedNotifications = async (notificationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/setViewedNotifications', notificationData, config);

  return response.data;
};

const notificationService = {
  getNotifications,
  setViewedNotifications,
};

export default notificationService;
