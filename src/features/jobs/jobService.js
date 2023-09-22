import axios from 'axios';
import API_BASE_URL from '../../config';
//const API_URL = 'http://localhost:8080/auth'
const API_URL = `${API_BASE_URL}/job`;

//create a new job
const createJob = async (jobData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/CreateJob', jobData, config);

  return response.data;
};

//get user jobs
const getJobs = async (filters, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/GetJobs', filters, config);
  console.log(response.data);

  return response.data.data;
};

//get user jobs
const getJob = async (jobId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/getJobByID/' + jobId, config);

  return response.data.data;
};

//get user jobs
const closeJob = async (jobId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + jobId, { status: 'closed' }, config);

  return response.data;
};

//get user job count all
const getJobCountAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetJobCountAll', config);
  //console.log(response.data)

  return response.data.data.count;
};

//get user job count revision
const getJobCountRevision = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetJobCountRevision', config);
  //console.log(response.data)

  return response.data.data.count;
};

//get user job count production
const getJobCountProduction = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetJoCountProduction', config);
  //console.log(response.data)

  return response.data.data.count;
};

//get enqury ids
const getJobIDs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetJobIDs', config);

  return response.data.data;
};

const GetJobIdsQCExists = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetJobIdsQCExists', config);

  return response.data.data;
};

const GetJobIdsBOMExists = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetJobIdsBOMExists', config);

  return response.data.data;
};

//Get Job Ids Production Exists
const GetJobIdsProductionExists = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetJobIdsProductionExists', config);
  console.log(response);

  return response.data.data;
};

//create a new sub task
const createSubTask = async (jobData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/CreateSubtask', jobData, config);

  return response.data;
};

const updateJob = async (jobData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + '/UpdateJob', jobData, config);

  return response.data;
};

//get user jobs
const deleteJob = async (jobId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + '/DeleteJob/' + jobId, config);
  console.log(response.data);
  return response.data.data;
};

const jobService = {
  createJob,
  getJobs,
  getJob,
  closeJob,
  getJobCountAll,
  getJobCountRevision,
  getJobCountProduction,
  getJobIDs,
  createSubTask,
  updateJob,
  deleteJob,
  GetJobIdsProductionExists,
  GetJobIdsQCExists,
  GetJobIdsBOMExists,
};

export default jobService;
