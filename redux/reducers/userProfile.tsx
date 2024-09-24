import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfileState {
  userProfile: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserProfileState = {
  userProfile: null,
  loading: false,
  error: null,
};

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    fetch: (state) => {
      state.loading = true;
      state.error = null;
    },
    success: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = null;
      state.userProfile = action.payload;
    },
    error: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<any>) => {
      state.userProfile = action.payload;
    },
  },
});

export const { fetch, success, error, setUserProfile } =
  userProfileSlice.actions;

export default userProfileSlice.reducer;

export const fetchUserProfile = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>('userProfile/fetchUserProfile', async (_, thunkAPI) => {
  thunkAPI.dispatch(userProfileSlice.actions.fetch());

  try {
    const response = await global.api.get('/me');
    thunkAPI.dispatch(userProfileSlice.actions.success(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(
      userProfileSlice.actions.error('Error getting user profile'),
    );
    return thunkAPI.rejectWithValue('Error getting user profile');
  }
});
