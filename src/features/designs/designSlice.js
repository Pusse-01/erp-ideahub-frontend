import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import designService from '../designs/designService';
import { toast } from 'react-toastify';

const initialState = {
  designs: [],
  design: {},
  enquiryDesigns: [],
  enquiryDesignItems: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  createDesignIsError: false,
  createDesignIsSuccess: false,
  deleteDesignIsError: false,
  deleteDesignIsSuccess: false,
  getDesignIsError: false,
  getDesignIsSuccess: false,
};

export const createDesign = createAsyncThunk('designs/create', async ({ fileData, files }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    console.log(token);
    return await designService.createDesign(fileData, files, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message);
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateDesign = createAsyncThunk('designs/update', async (designData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await designService.updateDesign(designData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getDesigns = createAsyncThunk('designs/getAll', async (filters, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await designService.getDesigns(filters, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getDesign = createAsyncThunk('designs/get', async (enquiryId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await designService.getDesign(enquiryId, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getItemsFromDesign = createAsyncThunk('designs/getItemsFromDesign', async (enquiryId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await designService.getItemsFromDesign(enquiryId, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteDesign = createAsyncThunk('designs/delete', async (designId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await designService.deleteDesign(designId, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const designSlice = createSlice({
  name: 'design',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDesign.pending, (state) => {
        state.isLoading = true;
        state.createDesignIsSuccess = false;
        state.createDesignIsError = false;
      })
      .addCase(createDesign.fulfilled, (state) => {
        console.log(state.design);
        state.isLoading = false;
        state.createDesignIsSuccess = true;
        state.createDesignIsError = false;
      })
      .addCase(createDesign.rejected, (state, action) => {
        //console.log(state.design)
        state.isLoading = false;
        state.createDesignIsSuccess = false;
        state.createDesignIsError = true;
        state.message = action.payload;
      })
      .addCase(updateDesign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDesign.fulfilled, (state) => {
        console.log(state.design);
        state.isLoading = false;
        state.isSuccess = true;
        state.createDesignIsSuccess = true;
      })
      .addCase(updateDesign.rejected, (state, action) => {
        console.log(state.design);
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.createDesignIsError = true;
      })
      .addCase(getDesigns.pending, (state) => {
        state.isLoading = true;
        state.getDesignIsSuccess = false;
        state.getDesignIsError = false;
      })
      .addCase(getDesigns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.getDesignIsSuccess = true;
        state.designs = action.payload;
        console.log(state.designs);
      })
      .addCase(getDesigns.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.getDesignIsError = true;
      })
      .addCase(getDesign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDesign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquiryDesigns = action.payload;
        //state.design = action.payload;
      })
      .addCase(getDesign.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getItemsFromDesign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItemsFromDesign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquiryDesignItems = action.payload;
        //state.design = action.payload;
      })
      .addCase(getItemsFromDesign.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDesign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDesign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteDesignIsSuccess = true;
      })
      .addCase(deleteDesign.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.deleteDesignIsError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = designSlice.actions;

export default designSlice.reducer;
