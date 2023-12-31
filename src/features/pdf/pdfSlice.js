import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import pdfService from './pdfService';

const initialState = {
  blob: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  downloadPDFIsError: false,
  downloadPDFIsSuccess: false,
};

export const downloadQuotation = createAsyncThunk('pdf/downloadQuotation', async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await pdfService.DownloadQuotationPDF(data, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const downloadBom = createAsyncThunk('pdf/downloadBom', async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await pdfService.CreateBOMPDF(data, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const downloadQSCosting = createAsyncThunk('pdf/downloadQSCosting', async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await pdfService.CreateQSCostingPDF(data, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const pdfSlice = createSlice({
  name: 'pdf',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(downloadQuotation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(downloadQuotation.fulfilled, (state, action) => {
        state.blob = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.downloadPDFIsSuccess = true;
      })
      .addCase(downloadQuotation.rejected, (state, action) => {
        console.log(state.pdf);
        state.isLoading = false;
        state.isError = true;
        state.downloadPDFIsError = true;
        state.message = action.payload;
      })
      .addCase(downloadBom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(downloadBom.fulfilled, (state, action) => {
        state.blob = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.downloadPDFIsSuccess = true;
      })
      .addCase(downloadBom.rejected, (state, action) => {
        console.log(state.pdf);
        state.isLoading = false;
        state.isError = true;
        state.downloadPDFIsError = true;
        state.message = action.payload;
      })
      .addCase(downloadQSCosting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(downloadQSCosting.fulfilled, (state, action) => {
        state.blob = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.downloadPDFIsSuccess = true;
      })
      .addCase(downloadQSCosting.rejected, (state, action) => {
        console.log(state.pdf);
        state.isLoading = false;
        state.isError = true;
        state.downloadPDFIsError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = pdfSlice.actions;

export default pdfSlice.reducer;
