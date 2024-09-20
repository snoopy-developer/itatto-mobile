import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServicesState {
  services: any | null;
  servicesMap: {};
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: null,
  servicesMap: {},
  loading: false,
  error: null,
};

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    fetch: (state) => {
      state.loading = true;
      state.error = null;
    },
    success: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = null;
      state.services = action.payload;
    },
    error: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetch, success, error } = servicesSlice.actions;

export default servicesSlice.reducer;

export const fetchServices = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>('services/fetchServices', async (_, thunkAPI) => {
  thunkAPI.dispatch(servicesSlice.actions.fetch());
  try {
    const response = await global.api.get('/services');
    thunkAPI.dispatch(servicesSlice.actions.success(response.data.data));
    return response.data.data;
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(servicesSlice.actions.error('Error getting services '));
    return thunkAPI.rejectWithValue('Error getting services');
  }
});
