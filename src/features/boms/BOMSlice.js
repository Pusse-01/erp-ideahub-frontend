import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BOMService from "../boms/BOMService";

const initialState = {
  BOMs: [],
  BOM: {},
  BOMCountCompleted: "",
  BOMCountPending:'',
  BOMCountNotArrived:'',
  isError: false,
  isSuccess: false,
  isLoading: false,
  createBOMIsSuccess:false,
  createBOMIsError: false,
  message: "",
};

export const createBOM = createAsyncThunk(
  "BOMs/create",
  async (BOMData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await BOMService.createBOM(BOMData, token);
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

export const getBOMs = createAsyncThunk(
  "BOMs/getAll",
  async (filters, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await BOMService.getBOMs(filters, token);
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


export const getBOM = createAsyncThunk(
  "BOMs/get",
  async (BOMId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await BOMService.getBOM(BOMId, token);
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


// export const closeBOM = createAsyncThunk(
//   "BOMs/close",
//   async (BOMId, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await BOMService.closeBOM(BOMId, token);
//     } catch (error) {
//       const message =
//         (error.response && 
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const getBOMCountCompleted = createAsyncThunk(
  "BOMs/getBOMCountCompleted",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await BOMService.getBOMCountCompleted(token);
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

export const getBOMCountPending = createAsyncThunk(
  "BOMs/getBOMCountPending",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await BOMService.getBOMCountPending(token);
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

export const getBOMCountNotArrived = createAsyncThunk(
  "BOMs/getBOMCountNotArrived",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await BOMService.getBOMCountNotArrived(token);
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

export const BOMSlice = createSlice({
  name: "BOM",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBOM.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBOM.fulfilled, (state) => {
        console.log(state.BOM)
        state.isLoading = false;
        //state.isSuccess = true;
        state.createBOMIsSuccess = true;
      })
      .addCase(createBOM.rejected, (state, action) => {
        console.log(state.BOM)
        state.isLoading = false;
        // state.isError = true;
        state.createBOMIsError = true;
        state.message = action.payload;
      })
      .addCase(getBOMs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBOMs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.BOMs = action.payload;
        //console.log(state.BOMs)
      })
      .addCase(getBOMs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBOM.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBOM.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.BOM = action.payload;
      })
      .addCase(getBOM.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBOMCountCompleted.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBOMCountCompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.BOMCountCompleted = action.payload;
      })
      .addCase(getBOMCountCompleted.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBOMCountPending.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBOMCountPending.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.BOMCountPending = action.payload;
      })
      .addCase(getBOMCountPending.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBOMCountNotArrived.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBOMCountNotArrived.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.BOMCountNotArrived = action.payload;
      })
      .addCase(getBOMCountNotArrived.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    //   .addCase(closeBOM.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.BOMs.map((BOM)=> BOM._id === action.payload._id ?
    //     (BOM.status = 'closed') : BOM )
    //   })
  },
});

export const { reset } = BOMSlice.actions;

export default BOMSlice.reducer;
