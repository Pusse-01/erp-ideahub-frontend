
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pdfService from "./pdfService";

const initialState = {
    blob:null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  downloadPDFIsError: false,
  downloadPDFIsSuccess: false,
};

export const downloadQuotation = createAsyncThunk(
  "pdf/downloadQuotation",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await pdfService.DownloadQuotationPDF(data, token);
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


export const pdfSlice = createSlice({
  name: "pdf",
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
        state.blob = action.payload
        state.isLoading = false;
        state.isSuccess = true;
        state.downloadPDFIsSuccess = true;
      })
      .addCase(downloadQuotation.rejected, (state, action) => {
        console.log(state.pdf)
        state.isLoading = false;
        state.isError = true;
        state.downloadPDFIsError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = pdfSlice.actions;

export default pdfSlice.reducer;
