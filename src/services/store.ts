import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../services/slices/ingredients-slice';
import { burgerConstructorSlice } from '../services/slices/burger-constructor-slice';
import { orderSlice } from '../services/slices/order-slice';
import { userSlice } from './slices/user-slice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  orderSlice,
  userSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
