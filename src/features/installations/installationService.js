import axios from 'axios';
import API_BASE_URL from '../../config';
const API_URL = `${API_BASE_URL}/installation`;

//create a new installation
const createInstallation = async (installationData, files, token) => {
  const formData = new FormData();

  //Append files to the FormData object
  files.forEach((file, index) => {
    formData.append(index, file); // Change the key if needed
  });
  formData.append('index_no', installationData.index_no || 1);
  formData.append('installation_date', installationData.installation_date);
  formData.append('job_no', installationData.job_no);
  formData.append('description', installationData.description);
  formData.append('feedback', installationData.feedback);
  formData.append('client_name', installationData.client_name);
  formData.append('files', JSON.stringify(installationData.files));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
    },
  };

  const response = await axios.post(`${API_BASE_URL}/azure` + '/createInstallations', formData, config);
  return response.data;
};

//create a new installation
const updateInstallation = async (installationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + '/updateEmplyee', installationData, config);

  return response.data;
};

//get user installations
const getInstallations = async (filters, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/GetInstallations', filters, config);
  console.log(response.data);

  return response.data.data;
};

//get user installation
const getInstallation = async (installationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/getInstallation/' + installationId, config);

  return response.data.data;
};

//delete user installation
const deleteInstallation = async (installationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + '/deleteInstallation/' + installationId, config);

  return response.data;
};

const installationService = {
  createInstallation,
  getInstallations,
  getInstallation,
  updateInstallation,
  deleteInstallation,
};

export default installationService;
