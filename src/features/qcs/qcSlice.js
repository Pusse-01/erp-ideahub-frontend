import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import qcService from "../qcs/qcService";

const initialState = {
  qcs: [],
  qc: {},
  createQCIsError: false,
  createQCIsSuccess: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createQC = createAsyncThunk(
  "qcs/create",
  async (qcData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await qcService.createQC(qcData, token);
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

export const getQCs = createAsyncThunk(
  "qcs/getAll",
  async (curser, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await qcService.getQCs(curser, token);
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


export const getQC = createAsyncThunk(
  "qcs/get",
  async (qcId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await qcService.getQC(qcId, token);
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


export const qcSlice = createSlice({
  name: "qc",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQC.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQC.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createQCIsSuccess = true;
      })
      .addCase(createQC.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.createQCIsError = true;
        state.message = action.payload;
      })
      .addCase(getQCs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQCs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.qcs = action.payload;
      })
      .addCase(getQCs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQC.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQC.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.qc = action.payload;
      })
      .addCase(getQC.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = qcSlice.actions;

export default qcSlice.reducer;
