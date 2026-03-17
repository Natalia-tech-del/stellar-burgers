import { rootReducer } from './store';
import { initialState as initialStateBurger } from './slices/burger-constructor-slice';
import { initialState as initialStateFeed } from './slices/feed-slice';
import { initialState as initialStateIngredients } from './slices/ingredients-slice';
import { initialState as initialStateOrder } from './slices/order-slice';
import { initialState as initialStateUserFeed } from './slices/user-feed-slice';
import { initialState as initialStateUser } from './slices/user-slice';

const expectedResult = {
  ingredients: initialStateIngredients,
  burgerConstructor: initialStateBurger,
  order: initialStateOrder,
  user: initialStateUser,
  feed: initialStateFeed,
  userFeed: initialStateUserFeed
};

describe('Проверка правильной инициализации rootReducer', () => {
  it('Тест, проверяющий правильную настройку и работу rootReducer', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(expectedResult);
  });
});
