import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardDataState {
  dashboardData: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardDataState = {
  dashboardData: null,
  loading: false,
  error: null,
};

export const DashboardDataSlice = createSlice({
  name: 'dashboardData',
  initialState,
  reducers: {
    fetch: (state) => {
      state.loading = true;
      state.error = null;
    },
    success: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = null;
      state.dashboardData = action.payload;
    },
    error: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetch, success, error } = DashboardDataSlice.actions;

export default DashboardDataSlice.reducer;

export const fetchDashboardData = createAsyncThunk<
  any,
  { year: string; month?: number; service?: number },
  { rejectValue: string }
>(
  'dashboardData/fetchdashboardData',
  async ({ year, month, service }, thunkAPI) => {
    thunkAPI.dispatch(DashboardDataSlice.actions.fetch());
    try {
      const params = new URLSearchParams({ year });

      if (service !== undefined) {
        params.append('service_id', service.toString());
      }

      if (month !== undefined) {
        params.append('month', month.toString());
      }

      const response = await global.api.get(`/dashboard?${params.toString()}`);
      thunkAPI.dispatch(DashboardDataSlice.actions.success(response.data.data));
      return response.data.data;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        DashboardDataSlice.actions.error('Error getting dashboard data '),
      );
      return thunkAPI.rejectWithValue('Error getting dashboard data');
    }
  },
);
