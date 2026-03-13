import { rootReducer } from "./store";

const expectedResult = {
  ingredients: {
    ingredients: [],
    loading: false,
    error: null
  },
  burgerConstructor: {
    bun: null,
    ingredients: []
  },
  order: {
    orderModalData: null,
    orderRequest: false,
    error: null,
    orderByNumber: null
  },
  user: {
    user: null,
    isAuthChecked: false,
    loading: false,
    error: null
  },
  feed: {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  },
  userFeed: {
    orders: [],
    loading: false,
    error: null
  }
};

describe('Проверка правильной инициализации rootReducer', () => {
  it('Тест, проверяющий правильную настройку и работу rootReducer', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(expectedResult);
  });
});
