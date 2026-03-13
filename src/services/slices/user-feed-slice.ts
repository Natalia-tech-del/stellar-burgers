import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export type TUserFeedState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialState: TUserFeedState = {
  orders: [],
  loading: false,
  error: null
};

export const getUserFeed = createAsyncThunk(
  'userFeed/getUserFeed',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);

export const userFeedSlice = createSlice({
  name: 'userFeed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(
        getUserFeed.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      );
  }
});

export default userFeedSlice.reducer;
