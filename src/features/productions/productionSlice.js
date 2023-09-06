import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productionService from "./productionService";

const initialState = {
  productions: [],
  production: {},
  tasksByJobNo:[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  createProductionIsSuccess:false,
  createProductionIsError:false,
  deleteProductionIsSuccess:false,
  deleteProductionIsError:false
};

export const createProduction = createAsyncThunk(
  "productions/create",
  async (productionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await productionService.createProduction(productionData, token);
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

export const updateProduction = createAsyncThunk(
  "productions/update",
  async (productionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await productionService.updateProduction(productionData, token);
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

export const getProductions = createAsyncThunk(
  "productions/getAll",
  async (filters, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await productionService.getProductions(filters, token);
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


export const getProduction = createAsyncThunk(
  "productions/get",
  async (productionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await productionService.getProduction(productionId, token);
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

export const getProductionByJobNo = createAsyncThunk(
  "productions/getByJobNo",
  async (jobNo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await productionService.getProductionByJobNo(jobNo, token);
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

export const deleteProduction = createAsyncThunk(
  "productions/delete",
  async (productionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await productionService.deleteProduction(productionId, token);
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

export const productionSlice = createSlice({
  name: "production",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduction.fulfilled, (state) => {
        console.log(state.production)
        state.isLoading = false;
        state.isSuccess = true;
        state.createProductionIsSuccess = true;
      })
      .addCase(createProduction.rejected, (state, action) => {
        console.log(state.production)
        state.isLoading = false;
        state.isError = true;
        state.createProductionIsError = true;
        state.message = action.payload;
      })
      .addCase(updateProduction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduction.fulfilled, (state) => {
        console.log(state.production)
        state.createProductionIsSuccess = true;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateProduction.rejected, (state, action) => {
        console.log(state.production)
        state.isLoading = false;
        state.isError = true;
        state.createProductionIsError = true;
        state.message = action.payload;
      })
      .addCase(getProductions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productions = action.payload;
        //console.log(state.productions)
      })
      .addCase(getProductions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProduction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.production = action.payload;
      })
      .addCase(getProduction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProductionByJobNo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductionByJobNo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasksByJobNo = action.payload;
      })
      .addCase(getProductionByJobNo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProduction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteProductionIsSuccess= true;
      })
      .addCase(deleteProduction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.deleteProductionIsError= true;
        state.message = action.payload;
      })
  },
});

export const { reset } = productionSlice.actions;

export default productionSlice.reducer;
