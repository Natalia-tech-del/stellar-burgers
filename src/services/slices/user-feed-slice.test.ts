import userFeedReducer, {
  getUserFeed,
  TUserFeedState
} from './user-feed-slice';

describe('Проверяем редьюсер слайса userFeedSlice', () => {
  const initialState: TUserFeedState = {
    orders: [],
    loading: false,
    error: null
  };

  const statePending = {
    ...initialState,
    loading: true,
    error: null
  };

  const testOrders = {
    _id: '1',
    status: 'done',
    name: 'Био-марсианский spicy краторный бургер',
    createdAt: '2026-02-20T12:43:46.733Z',
    updatedAt: '2026-02-20T12:43:47.001Z',
    number: 111,
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0941'
    ]
  };

  const stateFulfilled = {
    orders: [testOrders],
    loading: false,
    error: null
  };

  const stateRejected = {
    ...initialState,
    loading: false,
    error: 'Error'
  };

  test('Обработка getUserFeed.pending', () => {
    const newState = userFeedReducer(
      { ...initialState, error: 'error' },
      getUserFeed.pending('')
    );
    expect(newState).toEqual(statePending);
  });

  test('Обработка getUserFeed.fulfilled', () => {
    const newState = userFeedReducer(
      { ...initialState, loading: true },
      getUserFeed.fulfilled([testOrders], '')
    );

    expect(newState).toEqual(stateFulfilled);
  });

  test('Обработка getUserFeed.rejected', () => {
    const testError = new Error('Error');
    const newState = userFeedReducer(
      { ...initialState, loading: true },
      getUserFeed.rejected(testError, '')
    );
    expect(newState).toEqual(stateRejected);
  });
});
