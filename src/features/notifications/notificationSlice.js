import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notificationService from '../notifications/notificationService';

const initialState = {
  notifications: [],
  notification: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  updateNotificationIsSuccess: false,
  updateNotificationIsError: false,
};

export const setViewedNotifications = createAsyncThunk(
  'notifications/setViewedNotifications',
  async (notificationData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await notificationService.setViewedNotifications(notificationData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getNotifications = createAsyncThunk('notifications/getNotifications', async (role, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await notificationService.getNotifications(role, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setViewedNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setViewedNotifications.fulfilled, (state) => {
        console.log(state.notification);
        state.updateNotificationIsSuccess = true;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(setViewedNotifications.rejected, (state, action) => {
        console.log(state.notification);
        state.isLoading = false;
        state.isError = true;
        state.updateNotificationIsError = true;
        state.message = action.payload;
      })
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = notificationSlice.actions;

export default notificationSlice.reducer;
