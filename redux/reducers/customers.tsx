import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  avatar: string | null;
  birth_date: string;
  phone_number: string;
  gender: string;
  is_minor: boolean;
  parent_1: string | null;
  parent_2: string | null;
  country_id: number;
  city: string;
  address: string;
  state: string | null;
  postal_code: string;
  doc_type: string | null;
  issued_by: string | null;
  doc_no: string | null;
  ssn: string | null;
  referral: string | null;
  accepts_newsletter: boolean;
  expiry_date: string | null;
}

interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

interface CustomersState {
  customers: Customer[] | null;
  links: Links | null;
  meta: Meta | null;
  loading: boolean;
  error: string | null;
}

const initialState: CustomersState = {
  customers: null,
  links: null,
  meta: null,
  loading: false,
  error: null,
};

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    fetch: (state) => {
      state.loading = true;
      state.error = null;
    },
    success: (
      state,
      action: PayloadAction<{ data: Customer[]; links: Links; meta: Meta }>,
    ) => {
      state.loading = false;
      state.error = null;
      state.customers = action.payload.data;
      state.links = action.payload.links;
      state.meta = action.payload.meta;
    },
    error: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetch, success, error } = customersSlice.actions;

export default customersSlice.reducer;

export const fetchCustomers = createAsyncThunk<
  { data: Customer[]; links: Links; meta: Meta },
  string, // The query parameter to be passed
  { rejectValue: string }
>('customers/fetchCustomers', async (query, thunkAPI) => {
  thunkAPI.dispatch(customersSlice.actions.fetch());
  try {
    const response = await global.api.get(`/customers?query=${query}`);
    const { data, links, meta } = response.data;
    thunkAPI.dispatch(customersSlice.actions.success({ data, links, meta }));
    return { data, links, meta };
  } catch (error) {
    console.log(error);
    thunkAPI.dispatch(customersSlice.actions.error('Error fetching customers'));
    return thunkAPI.rejectWithValue('Error fetching customers');
  }
});
