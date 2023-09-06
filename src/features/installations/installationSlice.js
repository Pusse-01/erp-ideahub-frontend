
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import installationService from "../installations/installationService";

const initialState = {
  installations: [],
  installation: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  createInstallationIsError: false,
  createInstallationIsSuccess: false,
  deleteInstallationIsError: false,
  deleteInstallationIsSuccess: false
};

export const createInstallation = createAsyncThunk(
  "installations/create",
  async ({installationData, selectedFiles}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await installationService.createInstallation(installationData, selectedFiles, token);
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

export const updateInstallation = createAsyncThunk(
  "installations/update",
  async (installationData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await installationService.updateInstallation(installationData, token);
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

export const getInstallations = createAsyncThunk(
  "installations/getAll",
  async (filters, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await installationService.getInstallations(filters, token);
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


export const getInstallation = createAsyncThunk(
  "installations/get",
  async (installationId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await installationService.getInstallation(installationId, token);
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

export const deleteInstallation = createAsyncThunk(
  "installations/delete",
  async (installationId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await installationService.deleteInstallation(installationId, token);
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


export const installationSlice = createSlice({
  name: "installation",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInstallation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInstallation.fulfilled, (state) => {
        console.log(state.installation)
        state.isLoading = false;
        state.isSuccess = true;
        state.createInstallationIsSuccess = true;
      })
      .addCase(createInstallation.rejected, (state, action) => {
        console.log(state.installation)
        state.isLoading = false;
        state.isError = true;
        state.createInstallationIsError = true;
        state.message = action.payload;
      })
      .addCase(updateInstallation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateInstallation.fulfilled, (state) => {
        console.log(state.installation)
        state.isLoading = false;
        state.isSuccess = true;
        state.createInstallationIsSuccess = true;
      })
      .addCase(updateInstallation.rejected, (state, action) => {
        console.log(state.installation)
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.createInstallationIsError = true;
      })
      .addCase(getInstallations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInstallations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.installations = action.payload;
        //console.log(state.installations)
      })
      .addCase(getInstallations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getInstallation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInstallation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.installation = action.payload;
      })
      .addCase(getInstallation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteInstallation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteInstallation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteInstallationIsSuccess = true;
      })
      .addCase(deleteInstallation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.deleteInstallationIsError = true;
        state.message = action.payload;
      })
      
  },
});

export const { reset } = installationSlice.actions;

export default installationSlice.reducer;
