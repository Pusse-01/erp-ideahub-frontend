import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import azureService from './azureService';
import { toast } from 'react-toastify';

const initialState = {
  urls: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  deleteFileIsError: false,
  deleteFileIsSuccess: false,
};

export const getURLs = createAsyncThunk('azure/getURLs', async (filters, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await azureService.getURLs(filters, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteFile = createAsyncThunk('azure/delete', async (filters, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await azureService.deleteFile(filters, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const azureSlice = createSlice({
  name: 'azure',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getURLs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getURLs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.urls = action.payload;
      })
      .addCase(getURLs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteFileIsSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.deleteFileIsError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = azureSlice.actions;

export default azureSlice.reducer;
