import axios from "axios";
import API_BASE_URL from "../../config";
const API_URL = `${API_BASE_URL}/quotation`;

//create a new quotation
const createQuotation = async (quotationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "/CreateQuotation",
    quotationData,
    config
  );

  return response.data;
};

//update a new quotation
const updateQuotationStatus = async (quotationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "/UpdateQuotation",
    quotationData,
    config
  );

  return response.data;
};

//get user quotations
const getQuotations = async (filters, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "/GetQuotationsAll",
    filters,
    config
  );
  console.log(response.data);

  return response.data.data;
};

//get user quotation
const getQuotation = async (quotationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    API_URL + "/GetQuotation/" + quotationId,
    config
  );

  return response.data.data;
};

//delete user quotation
const deleteQuotation = async (quotationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + "/DeleteQuotation/" + quotationId,
    config
  );

  return response.data;
};

const quotationService = {
  createQuotation,
  getQuotations,
  getQuotation,
  updateQuotationStatus,
  deleteQuotation,
};

export default quotationService;
