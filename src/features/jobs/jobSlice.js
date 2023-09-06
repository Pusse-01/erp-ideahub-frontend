import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jobService from "../jobs/jobService";

const initialState = {
  jobs: [],
  job: {},
  jobIDs:[],
  jobCount: "",
  jobCountRevision:'',
  jobCountProduction:'',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  createJobIsSuccess:false,
  createJobIsError:false,
  deleteJobIsSuccess:false,
  deleteJobIsError:false
};

export const createJob = createAsyncThunk(
  "jobs/create",
  async (jobData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.createJob(jobData, token);
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

export const updateJob = createAsyncThunk(
  "jobs/update",
  async (jobData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.updateJob(jobData, token);
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

export const getJobs = createAsyncThunk(
  "jobs/getAll",
  async (filters, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.getJobs(filters, token);
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


export const getJob = createAsyncThunk(
  "jobs/get",
  async (jobId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.getJob(jobId, token);
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


export const closeJob = createAsyncThunk(
  "jobs/close",
  async (jobId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.closeJob(jobId, token);
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

export const getJobCountAll = createAsyncThunk(
  "jobs/getCountAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.getJobCountAll(token);
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

export const getJobCountRevision = createAsyncThunk(
  "jobs/getCountRevision",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.getJobCountRevision(token);
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

export const getJobCountProduction = createAsyncThunk(
  "jobs/getCountProduction",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.getJobCountProduction(token);
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

export const getJobIDs = createAsyncThunk(
  "jobs/getAllIDs",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.getJobIDs(token);
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


export const GetJobIdsProductionExists = createAsyncThunk(
  "jobs/GetJobIdsProductionExists",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.GetJobIdsProductionExists(token);
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

export const createSubTask = createAsyncThunk(
  "jobs/createSubTask",
  async (jobData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.createSubTask(jobData, token);
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

export const deleteJob = createAsyncThunk(
  "jobs/delete",
  async (jobId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await jobService.deleteJob(jobId, token);
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

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        console.log(state.job)
        state.isLoading = false;
        state.isSuccess = true;
        state.createJobIsSuccess = true;
      })
      .addCase(createJob.rejected, (state, action) => {
        console.log(state.job)
        state.isLoading = false;
        state.isError = true;
        state.createJobIsError = true;
        state.message = action.payload;
      })
      .addCase(updateJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateJob.fulfilled, (state) => {
        console.log(state.job)
        state.createJobIsSuccess = true;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateJob.rejected, (state, action) => {
        console.log(state.job)
        state.isLoading = false;
        state.isError = true;
        state.createJobIsError = true;
        state.message = action.payload;
      })
      .addCase(getJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobs = action.payload;
        //console.log(state.jobs)
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.job = action.payload;
      })
      .addCase(getJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getJobCountAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobCountAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobCount = action.payload;
      })
      .addCase(getJobCountAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getJobCountRevision.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobCountRevision.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobCountRevision = action.payload;
      })
      .addCase(getJobCountRevision.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getJobCountProduction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobCountProduction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobCountProduction = action.payload;
      })
      .addCase(getJobCountProduction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(closeJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs.map((job)=> job._id === action.payload._id ?
        (job.status = 'closed') : job )
      })
      .addCase(getJobIDs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobIDs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobIDs = action.payload;
      })
      .addCase(getJobIDs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(GetJobIdsProductionExists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetJobIdsProductionExists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobIDs = action.payload;
      })
      .addCase(GetJobIdsProductionExists.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createSubTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSubTask.fulfilled, (state) => {
        console.log(state.job)
        state.isLoading = false;
        state.isSuccess = true;
        state.createJobIsSuccess = true;
      })
      .addCase(createSubTask.rejected, (state, action) => {
        console.log(state.job)
        state.isLoading = false;
        state.isError = true;
        state.createJobIsError = true;
        state.message = action.payload;
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteJobIsSuccess= true;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.deleteJobIsError= true;
        state.message = action.payload;
      })
  },
});

export const { reset } = jobSlice.actions;

export default jobSlice.reducer;
