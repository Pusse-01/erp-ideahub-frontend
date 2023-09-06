
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "../employees/employeeService";

const initialState = {
  employees: [],
  employee: {},
  employeeCount: "",
  departmentmangersCount:"",
  departments:[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  createEmployeeIsError: false,
  createEmployeeIsSuccess: false,
  deleteEmployeeIsError: false,
  deleteEmployeeIsSuccess: false
};

export const createEmployee = createAsyncThunk(
  "employees/create",
  async (employeeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeeService.createEmployee(employeeData, token);
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

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async (employeeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeeService.updateEmployee(employeeData, token);
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

export const getEmployees = createAsyncThunk(
  "employees/getAll",
  async (filters, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeeService.getEmployees(filters, token);
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


export const getEmployee = createAsyncThunk(
  "employees/get",
  async (employeeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeeService.getEmployee(employeeId, token);
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

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (employeeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeeService.deleteEmployee(employeeId, token);
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

export const getEmployeeCount = createAsyncThunk(
  "employees/getCountAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeeService.getEmployeeCount(token);
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

export const getDepartmentmangersCount = createAsyncThunk(
  "employees/getDepartmentmangersCount",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeeService.getDepartmentmangersCount(token);
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


export const getDepartments = createAsyncThunk(
  "employees/getDepartments",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeeService.getDepartments(token);
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


export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEmployee.fulfilled, (state) => {
        console.log(state.employee)
        state.isLoading = false;
        state.isSuccess = true;
        state.createEmployeeIsSuccess = true;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        console.log(state.employee)
        state.isLoading = false;
        state.isError = true;
        state.createEmployeeIsError = true;
        state.message = action.payload;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEmployee.fulfilled, (state) => {
        console.log(state.employee)
        state.isLoading = false;
        state.isSuccess = true;
        state.createEmployeeIsSuccess = true;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        console.log(state.employee)
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.createEmployeeIsError = true;
      })
      .addCase(getEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employees = action.payload;
        //console.log(state.employees)
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employee = action.payload;
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deleteEmployeeIsSuccess = true;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.deleteEmployeeIsError = true;
        state.message = action.payload;
      })
      .addCase(getEmployeeCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployeeCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employeeCount = action.payload;
      })
      .addCase(getEmployeeCount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDepartmentmangersCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDepartmentmangersCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.departmentmangersCount = action.payload;
      })
      .addCase(getDepartmentmangersCount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDepartments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.departments = action.payload;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = employeeSlice.actions;

export default employeeSlice.reducer;
