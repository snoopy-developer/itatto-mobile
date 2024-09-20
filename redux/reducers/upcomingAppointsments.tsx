import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface AppointmentsState {
  appointments: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentsState = {
  appointments: null,
  loading: false,
  error: null,
};

interface FetchUpcomingAppointmentsParams {
  customer_name?: string;
  from: string;
  to?: string;
  location_id?: string;
  status?: string;
  duration?: string;
  duration_operator?: string;
  staff_ids?: number[];
}

export const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    fetch: (state) => {
      state.loading = true;
      state.error = null;
    },
    success: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = null;
      state.appointments = action.payload;
    },
    error: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetch, success, error } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;

export const fetchUpcomingAppointments = createAsyncThunk<
  any,
  FetchUpcomingAppointmentsParams,
  { rejectValue: string }
>('appointments/fetchUpcomingAppointments', async (params, thunkAPI) => {
  thunkAPI.dispatch(appointmentsSlice.actions.fetch());

  try {
    const queryParams = new URLSearchParams(params as any).toString();
    const response = await axios.get(`/appointments/upcoming?${queryParams}`);
    thunkAPI.dispatch(appointmentsSlice.actions.success(response.data.data));
    return response.data.data;
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(
      appointmentsSlice.actions.error('Error getting upcoming appointments'),
    );
    return thunkAPI.rejectWithValue('Error getting upcoming appointments');
  }
});
