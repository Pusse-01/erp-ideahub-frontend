import axios from 'axios';
import API_BASE_URL from '../../config';
//const API_URL = 'http://localhost:8080/auth'
const API_URL = `${API_BASE_URL}/task`;

//create a new task
const createTasks = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/createTasks', taskData, config);

  return response.data;
};

//get user tasks
const getTasks = async (jobId, filters, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/getTasks' + jobId, filters, config);
  console.log(response.data);

  return response.data.data;
};

//get all tasks
const getAllTasks = async (curser, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/getAllTasks/' + (curser || ''), config);
  console.log(response.data);

  return response.data.data;
};

//get user tasks
const getTasksByJobNo = async (jobId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/getTasks/' + jobId, config);
  console.log(response.data);

  return response.data.data;
};

//get user tasks
const getTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/getTask/' + taskId, config);

  return response.data.data;
};

//update user tasks
const updateTasks = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + '/updateTasks', taskData, config);

  return response.data;
};

//get user tasks
const deleteTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + '/deleteTask/' + taskId, config);
  console.log(response.data);
  return response.data.data;
};

//get user tasks
const deletePlan = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + '/deletePlan', config);
  console.log(response.data);
  return response.data.data;
};

//update user tasks
const updateStatus = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + '/updateStatus', taskData, config);

  return response.data;
};

//create a new task
const checkEmployeeAvailiblity = async (filter, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/createTasks', filter, config);

  return response.data;
};

//create a new task
const getEmployeeWithAvailibilityCheck = async (filter, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/getEmployeeWithAvailibilityCheck', filter, config);

  return response.data.data;
};

//update user tasks
const UpdateTasksQCcompleted = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + '/UpdateTasksQCcompleted', taskData, config);

  return response.data;
};

const taskService = {
  createTasks,
  getTasks,
  getTasksByJobNo,
  getTask,
  updateTasks,
  deleteTask,
  deletePlan,
  updateStatus,
  checkEmployeeAvailiblity,
  getEmployeeWithAvailibilityCheck,
  UpdateTasksQCcompleted,
  getAllTasks,
};

export default taskService;
