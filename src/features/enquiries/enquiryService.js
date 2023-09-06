import axios from "axios";
import API_BASE_URL from "../../config";
//const API_URL = 'http://localhost:8080/auth'
const API_URL = `${API_BASE_URL}/inquiry`;

//create a new enquiry
const createEnquiry = async (enquiryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/CreateInquiry', enquiryData, config);

  return response.data;
};

//get user enquirys
const getEnquirys = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

//get user enquirys
const getEnquiry = async (enquiryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + enquiryId, config);

  return response.data;
};


//get user enquirys
const closeEnquiry = async (enquiryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + enquiryId, { status: 'closed' }, config);

  return response.data;
};

//get enqury ids
const getEnquiryIDs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetInquiryIDs', config);
  //console.log(response)

  return response.data.data;
};

//get enqury ids
const getEnquiryByID = async (enquiryID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetInquirybyID/' + enquiryID, config);
  console.log(response)

  return response.data.data[0];
};

//get user enquiry count all
const getEnquiryCountAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetInquiryAllt', config);
  //console.log(response.data)

  return response.data.data.count;
};

//get user enquiry count revision
const getEnquiryCountRevision = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetInquiryRevisionCount', config);
  //console.log(response.data)

  return response.data.data.count;
};

//get user enquiry count production
// const getEnquiryCountProduction = async ( token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.get(API_URL+ '/GetInquiryCount', config);
//   //console.log(response.data)

//   return response.data.data.count;
// };

//get user jobs
const getEnquiries = async (filters, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/GetInquiry', filters, config);
  console.log(response.data)

  return response.data.data;
};

const getEnquiryCount = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetInquiryCount', config);
  //console.log(response.data)

  return response.data.data.count;
};

const updateEnquiry = async (enquiryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + '/UpdateInquiry', enquiryData, config);

  return response.data;
};

const deleteEnquiry = async (enquiryID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + '/DeleteInquiry/' + enquiryID, config);
  console.log(response.data)

  return response.data;
};

const enquiryService = {
  createEnquiry,
  getEnquiries,
  getEnquiry,
  closeEnquiry,
  getEnquiryIDs,
  getEnquiryByID,
  getEnquiryCountAll,
  getEnquiryCount,
  getEnquiryCountRevision,
  updateEnquiry,
  deleteEnquiry
};

export default enquiryService;
