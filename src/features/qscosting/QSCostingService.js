import axios from 'axios';
import API_BASE_URL from '../../config';
//const API_URL = 'http://localhost:8080/auth'
const API_URL = `${API_BASE_URL}/qscosting`;

//create a new BOM
const createQSCosting = async (QSCostingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/CreateQSCosting', QSCostingData, config);

  return response.data;
};

const QSCostingService = {
  createQSCosting,
};

export default QSCostingService;
