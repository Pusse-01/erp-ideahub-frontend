import axios from 'axios';
import API_BASE_URL from '../../config';

const API_URL = `${API_BASE_URL}/store`;

const createInventoryItem = async (inventoryItemData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/AddItem', inventoryItemData, config);

  return response.data;
};

const getAllInventoryItems = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/getAllItems', config);

  return response.data.data;
};

const getInventoryItemById = async (itemId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetitemByID/' + itemId, config);

  return response.data.data;
};

const getItemCountAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetAllItemCount', config);

  return response.data.data.count;
};

const getLowStockItemCount = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetLowStocksItemCount', config);

  return response.data.data.count;
};

const getLowStockItems = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetLowStocksItems', config);

  return response.data.data;
};

const getNoStockItems = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetNoStocksItems', config);

  return response.data.data;
};

const getInventoryItemsByCategory = async (category, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/getitemsbycategory/' + category, config);

  return response.data.data;
};

const getItemCategoryCount = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetCategorycount', config);

  return response.data.data.count;
};

const getStoreIDs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetStoreIDs', config);

  return response.data.data;
};

const updateInventoryItem = async (inventoryItem, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + '/updateItem', inventoryItem, config);

  return response.data;
};

const deleteInventoryItem = async (inventoryItemId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + '/deleteItem/' + inventoryItemId, config);

  return response.data.data;
};

const getAllInventoryItemCategories = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + '/GetAllCategories', config);

  return response.data.data;
};

const createPurchaseRequest = async (purchaseDetails, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + '/AddPurchaseRequest', purchaseDetails, config);

  return response.data;
};

const storeService = {
  createInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  getItemCountAll,
  getStoreIDs,
  updateInventoryItem,
  deleteInventoryItem,
  getAllInventoryItemCategories,
  createPurchaseRequest,
  getLowStockItemCount,
  getItemCategoryCount,
  getLowStockItems,
  getNoStockItems,
  getInventoryItemsByCategory,
};

export default storeService;
