import axios from 'axios';
import API_BASE_URL from '../../config';
const API_URL = `${API_BASE_URL}/employee`;

//create a new employee
const createEmployee = async (employeeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/CreateEmployee', employeeData, config);

  return response.data;
};

//create a new employee
const updateEmployee = async (employeeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + '/updateEmplyee', employeeData, config);

  return response.data;
};

//get user employees
const getEmployees = async (filters, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/GetEmployees', filters, config);
  console.log(response.data);

  return response.data.data;
};

//get user employee
const getEmployee = async (employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/getEmployee/' + employeeId, config);

  return response.data.data;
};

//get user employee count all
const getEmployeeCount = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetEmployeeCount', config);
  //console.log(response.data)

  return response.data.data.count;
};

//get department managers count
const getDepartmentmangersCount = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/getDepartmentmangersCount', config);
  //console.log(response.data)

  return response.data.data.count;
};

//get department managers count
const getDepartments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //const response = await axios.get(API_URL+ '/getDepartments', config);
  //console.log(response.data)

  //return response.data.data;
  return [
    { dep_id: 1, name: 'Design' },
    { dep_id: 2, name: 'Quotation' },
    { dep_id: 3, name: 'BOM' },
    { dep_id: 4, name: 'Purchasing' },
    { dep_id: 5, name: 'Manufacturing' },
    { dep_id: 6, name: 'QC' },
    { dep_id: 7, name: 'Installation' },
  ];
};

//get user employee
const deleteEmployee = async (employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + '/deleteEmployee/' + employeeId, config);

  return response.data;
};

const employeeService = {
  createEmployee,
  getEmployees,
  getEmployee,
  getEmployeeCount,
  getDepartmentmangersCount,
  getDepartments,
  updateEmployee,
  deleteEmployee,
};

export default employeeService;
