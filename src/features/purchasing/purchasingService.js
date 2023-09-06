import axios from "axios";
import API_BASE_URL from "../../config";
//const API_URL = 'http://localhost:8080/auth'
const API_URL = `${API_BASE_URL}/purchase`;

//create a new purchasing
const createPurchasing = async (purchasingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "/Addrequest",
    purchasingData,
    config
  );

  return response.data;
};

//get user purchasings
const getPurchasings = async (filters, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "/Getrequests", filters, config);
  console.log(response.data);

  return response.data.data;
};

//get user purchasings
const getPurchasing = async (purchasingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    API_URL + "/GetrequestById/" + purchasingId,
    config
  );

  return response.data.data;
};

//get user purchasing count all
const GetrequestsCountPending = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    API_URL + "/GetrequestsCountPending",
    config
  );

  return response.data.data.count;
};

//get user purchasing count revision
const GetrequestsCountOdered = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "/GetrequestsCountOdered", config);

  return response.data.data.count;
};

const UpdaterequestStatus = async (purchasingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "/UpdaterequestStatus",
    purchasingData,
    config
  );

  return response.data;
};

//get user purchasings
const Deleterequest = async (purchasingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + "/Deleterequest/" + purchasingId,
    config
  );
  return response.data.data;
};

const purchasingService = {
  createPurchasing,
  getPurchasings,
  getPurchasing,
  UpdaterequestStatus,
  Deleterequest,
  GetrequestsCountOdered,
  GetrequestsCountPending,
};

export default purchasingService;
