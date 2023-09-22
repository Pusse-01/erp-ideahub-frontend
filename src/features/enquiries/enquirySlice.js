import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import enquiryService from '../enquiries/enquiryService';

const initialState = {
  enquiries: [],
  enquiry: {},
  enquiryIDs: [],
  enquiryCount: '',
  enquiryCountAll: '',
  enquiryCountRevision: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  createEnquiryIsSuccess: false,
  createEnquiryIsError: false,
  deleteEnquiryIsSuccess: false,
  deleteEnquiryIsError: false,
  updateEnquiryIsSuccess: false,
  updateEnquiryIsError: false,
};

export const createEnquiry = createAsyncThunk('enquiries/create', async (enquiryData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await enquiryService.createEnquiry(enquiryData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateEnquiry = createAsyncThunk('enquiries/update', async (enquiryData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await enquiryService.updateEnquiry(enquiryData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getEnquiries = createAsyncThunk('enquiries/getAll', async (filters, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await enquiryService.getEnquiries(filters, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getEnquiry = createAsyncThunk('enquiries/get', async (enquiryId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await enquiryService.getEnquiry(enquiryId, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const closeEnquiry = createAsyncThunk('enquiries/close', async (enquiryId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await enquiryService.closeEnquiry(enquiryId, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getEnquiryIDs = createAsyncThunk('enquiries/getAllIDs', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await enquiryService.getEnquiryIDs(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getEnquiryByID = createAsyncThunk('enquiries/getByEnquiryID', async (enquiryId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await enquiryService.getEnquiryByID(enquiryId, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getEnquiryCountAll = createAsyncThunk('enquiries/getCountAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await enquiryService.getEnquiryCountAll(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getEnquiryCountRevision = createAsyncThunk('enquiries/getCountRevision', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await enquiryService.getEnquiryCountRevision(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getEnquiryCount = createAsyncThunk('enquiries/getCount', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await enquiryService.getEnquiryCount(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteEnquiry = createAsyncThunk('enquiries/delete', async (enquiryId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await enquiryService.deleteEnquiry(enquiryId, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const enquirySlice = createSlice({
  name: 'enquiry',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEnquiry.fulfilled, (state) => {
        console.log(state.enquiry);
        state.isLoading = false;
        state.isSuccess = true;
        state.createEnquiryIsSuccess = true;
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        console.log(state.enquiry);
        state.isLoading = false;
        state.isError = true;
        state.createEnquiryIsError = true;
        state.message = action.payload;
      })
      .addCase(updateEnquiry.pending, (state) => {
        state.isLoading = true;
        state.updateEnquiryIsError = false;
        state.updateEnquiryIsSuccess = false;
      })
      .addCase(updateEnquiry.fulfilled, (state) => {
        console.log(state.enquiry);
        state.isLoading = false;
        state.isSuccess = true;
        state.updateEnquiryIsError = false;
        state.updateEnquiryIsSuccess = true;
      })
      .addCase(updateEnquiry.rejected, (state, action) => {
        console.log(state.enquiry);
        state.isLoading = false;
        state.isError = true;
        state.updateEnquiryIsError = true;
        state.updateEnquiryIsSuccess = false;
        state.message = action.payload;
      })
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquiry = action.payload;
      })
      .addCase(getEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(closeEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enquiries.map((enquiry) => (enquiry._id === action.payload._id ? (enquiry.status = 'closed') : enquiry));
      })
      .addCase(getEnquiryIDs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiryIDs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquiryIDs = action.payload;
      })
      .addCase(getEnquiryIDs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEnquiryByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiryByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquiry = action.payload;
      })
      .addCase(getEnquiryCountAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiryCountAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquiryCountAll = action.payload;
      })
      .addCase(getEnquiryCountAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEnquiryCountRevision.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiryCountRevision.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquiryCountRevision = action.payload;
      })
      .addCase(getEnquiryCountRevision.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEnquiryCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiryCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquiryCount = action.payload;
      })
      .addCase(getEnquiryCount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEnquiryByID.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteEnquiryIsSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.deleteEnquiryIsError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = enquirySlice.actions;

export default enquirySlice.reducer;
