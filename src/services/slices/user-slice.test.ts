import userReducer, {
  registerUser,
  loginUser,
  getUserWithToken,
  updateUser,
  logoutUser,
  TUserState
} from './user-slice';

describe('Проверяем редьюсер слайса userSlice', () => {
  const initialState: TUserState = {
    user: null,
    isAuthChecked: false,
    loading: false,
    error: null
  };

  const statePending = {
    ...initialState,
    loading: true,
    error: null
  };

  const testUser = {
    email: 'test1234567@yandex.ru',
    name: 'Test User'
  };

  const testRegisterUser = {
    ...testUser,
    password: '123456'
  };

  const loginData = {
    email: 'test1234567@yandex.ru',
    password: '123456'
  };

  const stateFulfilled = {
    user: testUser,
    isAuthChecked: true,
    loading: false,
    error: null
  };

  const stateLogoutFulfilled = {
    user: null,
    isAuthChecked: true,
    loading: false,
    error: null
  };

  const stateRejected = {
    ...initialState,
    isAuthChecked: true,
    loading: false,
    error: 'Error'
  };

  const stateUserWithTokenRejected = {
    ...initialState,
    isAuthChecked: true,
    loading: false,
    error: null
  };

  test('Обработка registerUser.pending', () => {
    const newState = userReducer(
      { ...initialState, error: 'error' },
      registerUser.pending('', {
        email: '',
        name: '',
        password: ''
      })
    );
    expect(newState).toEqual(statePending);
  });

  test('Обработка loginUser.pending', () => {
    const newState = userReducer(
      { ...initialState, error: 'error' },
      loginUser.pending('', {
        email: '',
        password: ''
      })
    );
    expect(newState).toEqual(statePending);
  });

  test('Обработка getUserWithToken.pending', () => {
    const newState = userReducer(
      { ...initialState, error: 'error' },
      getUserWithToken.pending('')
    );
    expect(newState).toEqual(statePending);
  });

  test('Обработка updateUser.pending', () => {
    const newState = userReducer(
      { ...initialState, error: 'error' },
      updateUser.pending('', {
        email: '',
        password: ''
      })
    );
    expect(newState).toEqual(statePending);
  });

  test('Обработка logoutUser.pending', () => {
    const newState = userReducer(
      { ...initialState, error: 'error' },
      logoutUser.pending('')
    );
    expect(newState).toEqual(statePending);
  });

  test('Обработка registerUser.fulfilled', () => {
    const newState = userReducer(
      { ...initialState, loading: true },
      registerUser.fulfilled(testUser, '', testRegisterUser)
    );
    expect(newState).toEqual(stateFulfilled);
  });

  test('Обработка loginUser.fulfilled', () => {
    const newState = userReducer(
      { ...initialState, loading: true },
      loginUser.fulfilled(testUser, '', loginData)
    );
    expect(newState).toEqual(stateFulfilled);
  });

  test('Обработка getUserWithToken.fulfilled', () => {
    const newState = userReducer(
      { ...initialState, loading: true },
      getUserWithToken.fulfilled(testUser, '')
    );
    expect(newState).toEqual(stateFulfilled);
  });

  test('Обработка updateUser.fulfilled', () => {
    const newState = userReducer(
      { ...initialState, loading: true },
      updateUser.fulfilled(testUser, '', testRegisterUser)
    );
    expect(newState).toEqual(stateFulfilled);
  });

  test('Обработка logoutUser.fulfilled', () => {
    const newState = userReducer(
      { ...initialState, loading: true },
      logoutUser.fulfilled(undefined, '')
    );
    expect(newState).toEqual(stateLogoutFulfilled);
  });

  test('Обработка registerUser.rejected', () => {
    const testError = new Error('Error');
    const newState = userReducer(
      { ...initialState, loading: true },
      registerUser.rejected(testError, '', testRegisterUser)
    );
    expect(newState).toEqual(stateRejected);
  });

  test('Обработка loginUser.rejected', () => {
    const testError = new Error('Error');
    const newState = userReducer(
      { ...initialState, loading: true },
      loginUser.rejected(testError, '', loginData)
    );
    expect(newState).toEqual(stateRejected);
  });

  test('Обработка getUserWithToken.rejected', () => {
    const testError = new Error('Error');
    const newState = userReducer(
      { ...initialState, loading: true },
      getUserWithToken.rejected(testError, '')
    );
    expect(newState).toEqual(stateUserWithTokenRejected);
  });

  test('Обработка updateUser.rejected', () => {
    const testError = new Error('Error');
    const newState = userReducer(
      { ...initialState, loading: true },
      updateUser.rejected(testError, '', testRegisterUser)
    );
    expect(newState).toEqual(stateRejected);
  });

  test('Обработка logoutUser.rejected', () => {
    const testError = new Error('Error');
    const newState = userReducer(
      { ...initialState, loading: true },
      logoutUser.rejected(testError, '')
    );
    expect(newState).toEqual(stateRejected);
  });
});
