import orderReducer, {
  postOrder,
  getOrderByNumber,
  TOrderState,
  initialState
} from './order-slice';

describe('Проверяем редьюсер слайса orderSlice', () => {
  const statePending = {
    ...initialState,
    orderRequest: true,
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

  const statePostOrderFulfilled = {
    orderModalData: testOrders,
    orderRequest: false,
    error: null,
    orderByNumber: null
  };

  const stateGetOrderByNumberFulfilled = {
    orderModalData: null,
    orderRequest: false,
    error: null,
    orderByNumber: testOrders
  };

  const stateRejected = {
    ...initialState,
    orderRequest: false,
    error: 'Error'
  };

  test('Обработка postOrder.pending', () => {
    const newState = orderReducer(
      { ...initialState, error: 'error' },
      postOrder.pending('', [])
    );
    expect(newState).toEqual(statePending);
  });

  test('Обработка getOrderByNumber.pending', () => {
    const newState = orderReducer(
      { ...initialState, error: 'error' },
      getOrderByNumber.pending('', 0)
    );
    expect(newState).toEqual(statePending);
  });

  test('Обработка postOrder.fulfilled', () => {
    const newState = orderReducer(
      { ...initialState, orderRequest: true },
      postOrder.fulfilled(testOrders, '', testOrders.ingredients)
    );
    expect(newState).toEqual(statePostOrderFulfilled);
  });

  test('Обработка getOrderByNumber.fulfilled', () => {
    const newState = orderReducer(
      { ...initialState, orderRequest: true },
      getOrderByNumber.fulfilled(testOrders, '', 1)
    );
    expect(newState).toEqual(stateGetOrderByNumberFulfilled);
  });

  test('Обработка postOrder.rejected', () => {
    const testError = new Error('Error');
    const newState = orderReducer(
      { ...initialState, orderRequest: true },
      postOrder.rejected(testError, '', [])
    );
    expect(newState).toEqual(stateRejected);
  });

  test('Обработка getOrderByNumber.rejected', () => {
    const testError = new Error('Error');
    const newState = orderReducer(
      { ...initialState, orderRequest: true },
      getOrderByNumber.rejected(testError, '', 0)
    );
    expect(newState).toEqual(stateRejected);
  });
});
