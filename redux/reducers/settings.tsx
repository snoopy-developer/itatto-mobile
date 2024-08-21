import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  settings: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  settings: null,
  loading: false,
  error: null,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    fetch: (state) => {
      state.loading = true;
      state.error = null;
    },
    success: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = null;
      state.settings = action.payload;
    },
    error: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetch, success, error } = settingsSlice.actions;

export default settingsSlice.reducer;

export const fetchSettings = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>('settings/fetchSettings', async (_, thunkAPI) => {
  thunkAPI.dispatch(settingsSlice.actions.fetch());
  try {
    const response = await global.api.get('/settings');
    thunkAPI.dispatch(settingsSlice.actions.success(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(settingsSlice.actions.error('Error getting settings '));
    return thunkAPI.rejectWithValue('Error getting settings');
  }
});
