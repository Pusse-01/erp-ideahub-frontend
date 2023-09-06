import axios from "axios";
import API_BASE_URL from "../../config";
const API_URL = `${API_BASE_URL}/azure`;

//get urls
const getURLs = async (filters, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "/getURLs", filters, config);

  return response.data.urls;
};

//delete file
const deleteFile = async (filters, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + "/deletefile/",
    filters,
    config
  );

  return response.data;
};

const azureService = {
  getURLs,
  deleteFile
};

export default azureService;
