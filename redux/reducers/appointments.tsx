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

interface FetchAppointmentsParams {
  from?: string;
  to?: string;
  duration?: string;
  status?: string;
  staff_ids?: number[];
  customer_id?: string;
  service_id?: string;
  location_id?: string;
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

export const fetchAppointments = createAsyncThunk<
  any,
  FetchAppointmentsParams,
  { rejectValue: string }
>('appointments/fetchAppointments', async (params, thunkAPI) => {
  thunkAPI.dispatch(appointmentsSlice.actions.fetch());

  try {
    const queryParams = new URLSearchParams(params as any).toString();
    const editedQueryParams = queryParams.replace(
      'staff_ids',
      'staff_ids%5B%5D',
    );
    const response = await global.api.get(`/appointments?${editedQueryParams}`);
    // const response = await global.api.get(
    //   `/appointments?from&to&duration&status=&staff_ids%5B%5D=25&customer_id=&service_id&location_id`,
    // );

    thunkAPI.dispatch(appointmentsSlice.actions.success(response.data.data));
    return response.data.data;
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(
      appointmentsSlice.actions.error('Error getting appointments'),
    );
    return thunkAPI.rejectWithValue('Error getting appointments');
  }
});
