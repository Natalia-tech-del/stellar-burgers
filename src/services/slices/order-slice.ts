import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export type TOrderState = {
  orderModalData: TOrder | null;
  orderRequest: boolean;
  error: string | null;
  orderByNumber: TOrder | null;
};

export const initialState: TOrderState = {
  orderModalData: null,
  orderRequest: false,
  error: null,
  orderByNumber: null
};

export const postOrder = createAsyncThunk(
  'order/postOrder',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response.order;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.orderModalData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message ?? null;
      })
      .addCase(postOrder.fulfilled, (state, action: PayloadAction<TOrder>) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message ?? null;
      })
      .addCase(
        getOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.orderRequest = false;
          state.orderByNumber = action.payload;
        }
      );
  }
});

export const { closeModal } = orderSlice.actions;
export default orderSlice.reducer;
