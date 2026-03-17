import feedReducer, { TFeedState, getFeeds, initialState } from './feed-slice';

describe('Проверяем редьюсер слайса feedSlice', () => {
  
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
    total: 3,
    totalToday: 1,
    loading: false,
    error: null
  };

  const stateRejected = {
    ...initialState,
    loading: false,
    error: 'Error'
  };

  test('Обработка getFeeds.pending', () => {
    const newState = feedReducer(
      { ...initialState, error: 'error' },
      getFeeds.pending('')
    );
    expect(newState).toEqual(statePending);
  });

  test('Обработка getFeeds.fulfilled', () => {
    const newState = feedReducer(
      { ...initialState, loading: true },
      getFeeds.fulfilled(
        {
          success: true,
          orders: [testOrders],
          total: 3,
          totalToday: 1
        },
        ''
      )
    );

    expect(newState).toEqual(stateFulfilled);
  });

  test('Обработка getFeeds.rejected', () => {
    const testError = new Error('Error');
    const newState = feedReducer(
      { ...initialState, loading: true },
      getFeeds.rejected(testError, '')
    );
    expect(newState).toEqual(stateRejected);
  });
});
