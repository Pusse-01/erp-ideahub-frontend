import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import purchasingService from '../purchasing/purchasingService';

const initialState = {
  purchasings: [],
  purchasing: {},
  requestsCountOrdered: '',
  requestsCountPending: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  createPurchasingIsSuccess: false,
  createPurchasingIsError: false,
  updatePurchasingIsError: false,
  updatePurchasingIsSuccess: false,
  deletePurchasingIsSuccess: false,
  deletePurchasingIsError: false,
};

export const createPurchasing = createAsyncThunk('purchasings/create', async (purchasingData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await purchasingService.createPurchasing(purchasingData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const UpdaterequestStatus = createAsyncThunk(
  'purchasings/UpdaterequestStatus',
  async (purchasingData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await purchasingService.UpdaterequestStatus(purchasingData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPurchasings = createAsyncThunk('purchasings/getAll', async (filters, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await purchasingService.getPurchasings(filters, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getPurchasing = createAsyncThunk('purchasings/get', async (purchasingId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await purchasingService.getPurchasing(purchasingId, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const GetrequestsCountOdered = createAsyncThunk('purchasings/GetrequestsCountOdered', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await purchasingService.GetrequestsCountOdered(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const GetrequestsCountPending = createAsyncThunk('purchasings/GetrequestsCountPending', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await purchasingService.GetrequestsCountPending(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deletePurchasing = createAsyncThunk('purchasings/delete', async (purchasingId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await purchasingService.Deleterequest(purchasingId, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const purchasingSlice = createSlice({
  name: 'purchasing',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPurchasing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPurchasing.fulfilled, (state) => {
        console.log(state.purchasing);
        state.isLoading = false;
        state.isSuccess = true;
        state.createPurchasingIsSuccess = true;
      })
      .addCase(createPurchasing.rejected, (state, action) => {
        console.log(state.purchasing);
        state.isLoading = false;
        state.isError = true;
        state.createPurchasingIsError = true;
        state.message = action.payload;
      })
      .addCase(UpdaterequestStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdaterequestStatus.fulfilled, (state) => {
        console.log(state.purchasing);
        state.updatePurchasingIsSuccess = true;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(UpdaterequestStatus.rejected, (state, action) => {
        console.log(state.purchasing);
        state.isLoading = false;
        state.isError = true;
        state.updatePurchasingIsError = true;
        state.message = action.payload;
      })
      .addCase(getPurchasings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPurchasings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.purchasings = action.payload;
      })
      .addCase(getPurchasings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPurchasing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPurchasing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.purchasing = action.payload;
      })
      .addCase(getPurchasing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(GetrequestsCountOdered.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetrequestsCountOdered.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.requestsCountOrdered = action.payload;
      })
      .addCase(GetrequestsCountOdered.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(GetrequestsCountPending.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetrequestsCountPending.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.requestsCountPending = action.payload;
      })
      .addCase(GetrequestsCountPending.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePurchasing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePurchasing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletePurchasingIsSuccess = true;
      })
      .addCase(deletePurchasing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.deletePurchasingIsError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = purchasingSlice.actions;

export default purchasingSlice.reducer;
