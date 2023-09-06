import axios from "axios";
import API_BASE_URL from "../../config";
const API_URL = `${API_BASE_URL}/qc`;

//create a new qc
const createQC = async (qcData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //const response = await axios.post(API_URL, qcData, config);
  const response = await axios.post(API_URL + '/addQC', qcData, config);

  return response.data;
};

//get user qcs
const getQCs = async (curser, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //const response = await axios.get(API_URL, config);
  const response = await axios.get(API_URL + '/getQC/' + curser, config);

  return response.data.data;
};

//get user qcs
const getQC = async (qcId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + qcId, config);

  return response.data;
};


const qcService = {
  createQC,
  getQCs,
  getQC,
};

export default qcService;
