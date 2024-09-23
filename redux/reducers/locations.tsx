import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Country {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  country_id: number;
  name: string;
  phone_number: string;
  address: string;
  city: string;
  email: string;
  state: string;
  post_code: string;
  vat_number: string;
  from_time: string;
  to_time: string;
  website: string;
  country: Country;
  default_for_auth_user: boolean;
}

interface LocationsState {
  locations: Location[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: LocationsState = {
  locations: null,
  loading: false,
  error: null,
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    fetch: (state) => {
      state.loading = true;
      state.error = null;
    },
    success: (state, action: PayloadAction<Location[]>) => {
      state.loading = false;
      state.error = null;
      state.locations = action.payload;
    },
    error: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetch, success, error } = locationsSlice.actions;

export default locationsSlice.reducer;

export const fetchLocations = createAsyncThunk<
  Location[],
  void,
  { rejectValue: string }
>('locations/fetchLocations', async (_, thunkAPI) => {
  thunkAPI.dispatch(locationsSlice.actions.fetch());
  try {
    const response = await global.api.get('/locations');
    thunkAPI.dispatch(locationsSlice.actions.success(response.data.data));
    return response.data.data;
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(locationsSlice.actions.error('Error fetching locations'));
    return thunkAPI.rejectWithValue('Error fetching locations');
  }
});
