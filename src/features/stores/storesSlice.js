import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storeService from './storesService';

const initialState = {
	storeItems: [],
	storeItemCategories: [],
	storeItem: {},
	allStoreItemCount: 0,
	lowStockItemCount: 0,
	itemCategoryCount: 0,
	isLoading: false,
	message: '',
	addStoreItemIsSuccess: false,
	addStoreItemIsError: false,
	addPurchaseRequestIsSuccess: false,
	addPurchaseRequestIsError: false,
	deleteStoreItemIsSuccess: false,
	deleteStoreItemIsError: false,
	getAllStoreItemsIsSuccess: false,
	getAllStoreItemsIsError: false,
	getAllInventoryItemCategoriesIsSuccess: false,
	getAllInventoryItemCategoriesIsError: false,
	getStoreItemIsSuccess: false,
	getStoreItemIsError: false,
	getAllStoreItemCountIsSuccess: false,
	getAllStoreItemCountIsError: false,
	getLowStockItemCountIsSuccess: false,
	getLowStockItemCountIsError: false,
	getItemCategoryCountIsSuccess: false,
	getItemCategoryCountIsError: false,
	updateStoreItemIsSuccess: false,
	updateStoreItemIsError: false,
	getLowStockItemsIsSuccess: false,
	getLowStockItemsIsError: false,
	getNoStockItemsIsSuccess: false,
	getNoStockItemsIsError: false,
	getStockItemsByCategoryIsSuccess: false,
	getStockItemsByCategoryIsError: false,
};

export const createInventoryItem = createAsyncThunk(
	'stores/create',
	async (inventoryItemData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await storeService.createInventoryItem(
				inventoryItemData,
				token
			);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const updateStoreItem = createAsyncThunk(
	'stores/update',
	async (storeItem, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await storeService.updateInventoryItem(storeItem, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getAllStoreItems = createAsyncThunk(
	'stores/getAllInventoryItems',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await storeService.getAllInventoryItems(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getStoreItem = createAsyncThunk(
	'stores/getItem',
	async (storeId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await storeService.getInventoryItemById(storeId, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getItemCountAll = createAsyncThunk(
	'stores/getStoreCountAll',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await storeService.getItemCountAll(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getLowStockItemCount = createAsyncThunk(
	'stores/getLowStockItemCount',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await storeService.getLowStockItemCount(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getLowStockItems = createAsyncThunk(
	'stores/getLowStockItems',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await storeService.getLowStockItems(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getNoStockItems = createAsyncThunk(
	'stores/getNoStockItems',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await storeService.getNoStockItems(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getStoreItemsByCategory = createAsyncThunk(
	'stores/getItemsByCategory',
	async (category, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await storeService.getInventoryItemsByCategory(
				category,
				token
			);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getItemCategoryCount = createAsyncThunk(
	'stores/getItemCategoryCount',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await storeService.getItemCategoryCount(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const deleteInventoryItem = createAsyncThunk(
	'stores/delete',
	async (inventoryItemId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await storeService.deleteInventoryItem(
				inventoryItemId,
				token
			);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getAllInventoryItemCategories = createAsyncThunk(
	'stores/getAllStoreItemCategories',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await storeService.getAllInventoryItemCategories(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const addPurchaseRequest = createAsyncThunk(
	'stores/purchaseRequest',
	async (purchaseRequest, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await storeService.createPurchaseRequest(
				purchaseRequest,
				token
			);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const storesSlice = createSlice({
	name: 'store',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createInventoryItem.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createInventoryItem.fulfilled, (state) => {
				state.isLoading = false;
				state.addStoreItemIsSuccess = true;
			})
			.addCase(createInventoryItem.rejected, (state, action) => {
				state.isLoading = false;
				state.addStoreItemIsError = true;
				state.message = action.payload;
			})
			.addCase(addPurchaseRequest.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addPurchaseRequest.fulfilled, (state) => {
				state.isLoading = false;
				state.addPurchaseRequestIsSuccess = true;
			})
			.addCase(addPurchaseRequest.rejected, (state, action) => {
				state.isLoading = false;
				state.addPurchaseRequestIsSuccess = false;
				state.addPurchaseRequestIsError = true;
				state.message = action.payload;
			})
			.addCase(updateStoreItem.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateStoreItem.fulfilled, (state) => {
				state.isLoading = false;
				state.updateStoreItemIsSuccess = true;
				state.updateStoreItemIsError = false;
			})
			.addCase(updateStoreItem.rejected, (state, action) => {
				state.isLoading = false;
				state.updateStoreItemIsSuccess = false;
				state.updateStoreItemIsError = true;
				state.message = action.payload;
			})
			.addCase(getAllInventoryItemCategories.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				getAllInventoryItemCategories.fulfilled,
				(state, action) => {
					state.isLoading = false;
					state.getAllInventoryItemCategoriesIsSuccess = true;
					state.getAllInventoryItemCategoriesIsError = false;
					state.storeItemCategories = action.payload;
				}
			)
			.addCase(
				getAllInventoryItemCategories.rejected,
				(state, action) => {
					state.isLoading = false;
					state.getAllInventoryItemCategoriesIsSuccess = false;
					state.getAllInventoryItemCategoriesIsError = true;
					state.message = action.payload;
				}
			)
			.addCase(getStoreItem.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getStoreItem.fulfilled, (state, action) => {
				state.isLoading = false;
				state.getStoreItemIsSuccess = true;
				state.getStoreItemIsError = false;
				state.storeItem = action.payload;
			})
			.addCase(getStoreItem.rejected, (state, action) => {
				state.isLoading = false;
				state.getStoreItemIsSuccess = false;
				state.getStoreItemIsError = true;
				state.message = action.payload;
			})
			.addCase(getItemCountAll.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getItemCountAll.fulfilled, (state, action) => {
				state.isLoading = false;
				state.getAllStoreItemCountIsSuccess = true;
				state.getAllStoreItemCountIsError = false;
				state.allStoreItemCount = action.payload;
			})
			.addCase(getItemCountAll.rejected, (state, action) => {
				state.isLoading = false;
				state.getAllStoreItemCountIsSuccess = false;
				state.getAllStoreItemCountIsError = true;
				state.message = action.payload;
			})
			.addCase(getLowStockItemCount.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getLowStockItemCount.fulfilled, (state, action) => {
				state.isLoading = false;
				state.getLowStockItemCountIsSuccess = true;
				state.getLowStockItemCountIsError = false;
				state.lowStockItemCount = action.payload;
			})
			.addCase(getLowStockItemCount.rejected, (state, action) => {
				state.isLoading = false;
				state.getLowStockItemCountIsSuccess = false;
				state.getLowStockItemCountIsError = true;
				state.message = action.payload;
			})
			.addCase(getAllStoreItems.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllStoreItems.fulfilled, (state, action) => {
				state.isLoading = false;
				state.getAllStoreItemsIsSuccess = true;
				state.getNoStockItemsIsSuccess = false;
				state.getLowStockItemsIsSuccess = false;
				state.getStockItemsByCategoryIsSuccess = false;
				state.getAllStoreItemsIsError = false;
				state.storeItems = action.payload;
			})
			.addCase(getAllStoreItems.rejected, (state, action) => {
				state.isLoading = false;
				state.getAllStoreItemsIsError = true;
				state.getAllStoreItemsIsSuccess = false;
				state.getNoStockItemsIsSuccess = false;
				state.getLowStockItemsIsSuccess = false;
				state.getStockItemsByCategoryIsSuccess = false;
				state.message = action.payload;
			})
			.addCase(getLowStockItems.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getLowStockItems.fulfilled, (state, action) => {
				state.isLoading = false;
				state.getLowStockItemsIsSuccess = true;
				state.getLowStockItemsIsError = false;
				state.getAllStoreItemsIsSuccess = false;
				state.getNoStockItemsIsSuccess = false;
				state.getStockItemsByCategoryIsSuccess = false;
				state.storeItems = action.payload;
			})
			.addCase(getLowStockItems.rejected, (state, action) => {
				state.isLoading = false;
				state.getLowStockItemsIsSuccess = false;
				state.getAllStoreItemsIsSuccess = false;
				state.getNoStockItemsIsSuccess = false;
				state.getStockItemsByCategoryIsSuccess = false;
				state.getLowStockItemsIsError = true;
				state.message = action.payload;
			})
			.addCase(getNoStockItems.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getNoStockItems.fulfilled, (state, action) => {
				state.isLoading = false;
				state.getNoStockItemsIsSuccess = true;
				state.getAllStoreItemsIsSuccess = false;
				state.getLowStockItemsIsSuccess = false;
				state.getStockItemsByCategoryIsSuccess = false;
				state.getNoStockItemsIsError = false;
				state.storeItems = action.payload;
			})
			.addCase(getNoStockItems.rejected, (state, action) => {
				state.isLoading = false;
				state.getNoStockItemsIsSuccess = false;
				state.getAllStoreItemsIsSuccess = false;
				state.getLowStockItemsIsSuccess = false;
				state.getStockItemsByCategoryIsSuccess = false;
				state.getNoStockItemsIsError = true;
				state.message = action.payload;
			})
			.addCase(getStoreItemsByCategory.pending, (state) => {
				state.isLoading = true;
				state.getStockItemsByCategoryIsSuccess = false;
			})
			.addCase(getStoreItemsByCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.getStockItemsByCategoryIsSuccess = true;
				state.getStockItemsByCategoryIsError = false;
				state.getLowStockItemsIsSuccess = false;
				state.getAllStoreItemsIsSuccess = false;
				state.getNoStockItemsIsSuccess = false;
				state.storeItems = action.payload;
			})
			.addCase(getStoreItemsByCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.getStockItemsByCategoryIsSuccess = false;
				state.getStockItemsByCategoryIsError = true;
				state.getLowStockItemsIsSuccess = false;
				state.getAllStoreItemsIsSuccess = false;
				state.getNoStockItemsIsSuccess = false;
				state.getLowStockItemsIsError = false;
				state.message = action.payload;
			})
			.addCase(getItemCategoryCount.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getItemCategoryCount.fulfilled, (state, action) => {
				state.isLoading = false;
				state.getItemCategoryCountIsSuccess = true;
				state.getItemCategoryCountIsError = false;
				state.itemCategoryCount = action.payload;
			})
			.addCase(getItemCategoryCount.rejected, (state, action) => {
				state.isLoading = false;
				state.getItemCategoryCountIsSuccess = false;
				state.getItemCategoryCountIsError = true;
				state.message = action.payload;
			})
			.addCase(deleteInventoryItem.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteInventoryItem.fulfilled, (state, action) => {
				state.isLoading = false;
				state.deleteStoreItemIsSuccess = true;
			})
			.addCase(deleteInventoryItem.rejected, (state, action) => {
				state.isLoading = false;
				state.deleteStoreItemIsError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = storesSlice.actions;

export default storesSlice.reducer;
