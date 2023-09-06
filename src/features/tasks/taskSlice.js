import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "../tasks/taskService";

const initialState = {
  tasks: [],
  task: {},
  availableEmployees:[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  createTaskIsSuccess:false,
  createTaskIsError:false,
  updateTaskIsError:false,
  updateTaskIsSuccess:false,
  deleteTaskIsSuccess:false,
  deleteTaskIsError:false,
  deletePlanIsSuccess:false,
  deletePlanIsError:false
};

export const createTasks = createAsyncThunk(
  "tasks/create",
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.createTasks(taskData, token);
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

export const updateTasks = createAsyncThunk(
  "tasks/update",
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.updateTasks(taskData, token);
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

export const getTasks = createAsyncThunk(
  "tasks/getAll",
  async (filters, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.getTasks(filters, token);
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

export const getTasksByJobNo = createAsyncThunk(
  "tasks/getTasksByJobNo",
  async (jobNo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.getTasksByJobNo(jobNo, token);
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


export const getTask = createAsyncThunk(
  "tasks/get",
  async (taskId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.getTask(taskId, token);
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


export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (taskId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.deleteTask(taskId, token);
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

export const deletePlan = createAsyncThunk(
    "tasks/deletePlan",
    async (taskId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await taskService.deletePlan(taskId, token);
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

  export const updateStatus = createAsyncThunk(
    "tasks/updateStatus",
    async (data, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await taskService.updateStatus(data, token);
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

  export const checkEmployeeAvailiblity = createAsyncThunk(
    "tasks/checkEmployeeAvailiblity",
    async (filter, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await taskService.checkEmployeeAvailiblity(filter, token);
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

  export const getEmployeeWithAvailibilityCheck = createAsyncThunk(
    "tasks/getEmployeeWithAvailibilityCheck",
    async (filter, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await taskService.getEmployeeWithAvailibilityCheck(filter, token);
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
  export const UpdateTasksQCcompleted = createAsyncThunk(
    "tasks/UpdateTasksQCcompleted",
    async (data, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await taskService.UpdateTasksQCcompleted(data, token);
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

  

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTasks.fulfilled, (state) => {
        console.log(state.task)
        state.isLoading = false;
        state.isSuccess = true;
        state.createTaskIsSuccess = true;
      })
      .addCase(createTasks.rejected, (state, action) => {
        console.log(state.task)
        state.isLoading = false;
        state.isError = true;
        state.createTaskIsError = true;
        state.message = action.payload;
      })
      .addCase(updateTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTasks.fulfilled, (state) => {
        console.log(state.task)
        state.updateTaskIsSuccess = true;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateTasks.rejected, (state, action) => {
        console.log(state.task)
        state.isLoading = false;
        state.isError = true;
        state.updateTaskIsError = true;
        state.message = action.payload;
      })
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
        //console.log(state.tasks)
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTasksByJobNo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasksByJobNo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
        //console.log(state.tasks)
      })
      .addCase(getTasksByJobNo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.task = action.payload;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteTaskIsSuccess= true;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.deleteTaskIsError= true;
        state.message = action.payload;
      })
      .addCase(deletePlan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletePlanIsSuccess= true;
      })
      .addCase(deletePlan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.deletePlanIsError= true;
        state.message = action.payload;
      })
      .addCase(updateStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //state.availableEmployees = action.payload;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }).addCase(UpdateTasksQCcompleted.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateTasksQCcompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //state.availableEmployees = action.payload;
      })
      .addCase(UpdateTasksQCcompleted.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(checkEmployeeAvailiblity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkEmployeeAvailiblity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //state.availableEmployees = action.payload;
      })
      .addCase(checkEmployeeAvailiblity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEmployeeWithAvailibilityCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployeeWithAvailibilityCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.availableEmployees = action.payload;
      })
      .addCase(getEmployeeWithAvailibilityCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = taskSlice.actions;

export default taskSlice.reducer;
