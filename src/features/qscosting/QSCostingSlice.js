import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import QSCostingService from './QSCostingService';

const initialState = {
    QSCostings: [],
    message: '',
    createQSCostingIsSuccess: false,
    createQSCostingIsError: false,
};

export const createQSCosting = createAsyncThunk('QSCosting/create', async (QSCostingData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await QSCostingService.createQSCosting(QSCostingData, token);
    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const QSCostingSlice = createSlice({
name: 'qscosting',
initialState,
reducers: {
    reset: (state) => initialState,
},
extraReducers: (builder) => {
    builder
    .addCase(createQSCosting.pending, (state) => {
    })
    .addCase(createQSCosting.fulfilled, (state) => {
        state.createQSCostingIsSuccess = true;
    })
    .addCase(createQSCosting.rejected, (state, action) => {
        state.createQSCostingIsError = true;
        state.message = action.payload;
    })
},
});

export const { reset } = QSCostingSlice.actions;

export default QSCostingSlice.reducer;