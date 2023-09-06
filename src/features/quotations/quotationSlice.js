import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quotationService from "../quotations/quotationService";

const initialState = {
  quotations: [],
  quotation: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  createQuotationIsError: false,
  createQuotationIsSuccess: false,
  deleteQuotationIsError: false,
  deleteQuotationIsSuccess: false,
};

export const createQuotation = createAsyncThunk(
  "quotations/create",
  async (quotationData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotationService.createQuotation(quotationData, token);
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

export const updateQuotationStatus = createAsyncThunk(
  "quotations/update",
  async (quotationData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotationService.updateQuotationStatus(quotationData, token);
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

export const getQuotations = createAsyncThunk(
  "quotations/getAll",
  async (filters, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotationService.getQuotations(filters, token);
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

export const getQuotation = createAsyncThunk(
  "quotations/get",
  async (quotationId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotationService.getQuotation(quotationId, token);
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

export const deleteQuotation = createAsyncThunk(
  "quotations/delete",
  async (quotationId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quotationService.deleteQuotation(quotationId, token);
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

export const quotationSlice = createSlice({
  name: "quotation",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuotation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuotation.fulfilled, (state) => {
        console.log(state.quotation);
        state.isLoading = false;
        state.isSuccess = true;
        state.createQuotationIsSuccess = true;
      })
      .addCase(createQuotation.rejected, (state, action) => {
        console.log(state.quotation);
        state.isLoading = false;
        state.isError = true;
        state.createQuotationIsError = true;
        state.message = action.payload;
      })
      .addCase(updateQuotationStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuotationStatus.fulfilled, (state) => {
        console.log(state.quotation);
        state.isLoading = false;
        state.isSuccess = true;
        state.createQuotationIsSuccess = true;
      })
      .addCase(updateQuotationStatus.rejected, (state, action) => {
        console.log(state.quotation);
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.createQuotationIsError = true;
      })
      .addCase(getQuotations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuotations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.quotations = action.payload;
        //console.log(state.quotations)
      })
      .addCase(getQuotations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQuotation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuotation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.quotation = action.payload;
      })
      .addCase(getQuotation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteQuotation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuotation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteQuotationIsSuccess = true;
      })
      .addCase(deleteQuotation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.deleteQuotationIsError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = quotationSlice.actions;

export default quotationSlice.reducer;
