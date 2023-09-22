import axios from 'axios';
import API_BASE_URL from '../../config';
//const API_URL = 'http://localhost:8080/auth'
const API_URL = `${API_BASE_URL}/production`;

//create a new production
const createProduction = async (productionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/createProduction', productionData, config);

  return response.data;
};

const updateProduction = async (productionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + '/UpdateProduction', productionData, config);

  return response.data;
};

const updateProductionStatus = async (productionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + '/UpdateStatus', productionData, config);

  return response.data;
};

//get user productions
const getProductions = async (filters, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/getProductions', filters, config);
  console.log(response.data);

  return response.data.data;
};

//get user productions
const getProduction = async (productionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/getProductionByID/' + productionId, config);

  return response.data.data;
};

//get user productions
const getProductionByJobNo = async (JobNo, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/getProductionByJobNo/' + JobNo, config);

  return response.data.data;
};

//get user productions
const deleteProduction = async (productionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + '/DeleteProduction/' + productionId, config);
  console.log(response.data);
  return response.data.data;
};

const productionService = {
  createProduction,
  getProductions,
  getProduction,
  updateProductionStatus,
  updateProduction,
  deleteProduction,
  getProductionByJobNo,
};

export default productionService;
