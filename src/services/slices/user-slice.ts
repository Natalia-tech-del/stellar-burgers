import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  registerUserApi,
  TRegisterData,
  loginUserApi,
  TLoginData,
  getUserApi
} from '../../utils/burger-api';
import { TUser } from '@utils-types';
import { getCookie, setCookie } from '../../../src/utils/cookie';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null
};

//при регистрации пользователя  - вводит данные - запрос на сервер - получаем юзера
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

//Логин пользователя  - вводит данные - запрос на сервер - получаем юзера
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

//запрос на сервер с токеном - получаем юзера или ошибку, если оба токена истекли
export const getUserWithToken = createAsyncThunk(
  'user/getUserWithToken',
  async (_, { dispatch }) => {
    const token = getCookie('accessToken');

    if (!token) {
      dispatch(authChecked());
      return null;
    }
    try {
      const response = await getUserApi();
      return response.user;
    } catch (error) {
      dispatch(authChecked());
      throw error;
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      //registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.user = action.payload;
          state.isAuthChecked = true;
          state.loading = false;
        }
      )
      //loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.loading = false;
      })
      //getUserWithToken
      .addCase(getUserWithToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserWithToken.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.loading = false;
      })
      .addCase(
        getUserWithToken.fulfilled,
        (state, action: PayloadAction<TUser | null>) => {
          state.user = action.payload;
          state.isAuthChecked = true;
          state.loading = false;
        }
      );
  }
});

export const { authChecked } = userSlice.actions;
