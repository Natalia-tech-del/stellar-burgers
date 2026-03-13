import ingredientReducer, {getIngredients, TIngredientsState} from './ingredients-slice';

describe('Проверяем редьюсер слайса ingredientsSlice', () => {
  const initialState: TIngredientsState = {
    ingredients: [],
    loading: false,
    error: null
  };

  const statePending = {
   ...initialState,
    loading: true,
    error: null
  };

  const testIngredients = [{
            _id: "643d69a5c3f7b9001cfa093c",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        },
        {
            _id: "643d69a5c3f7b9001cfa0941",
            name: "Биокотлета из марсианской Магнолии",
            type: "main",
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: "https://code.s3.yandex.net/react/code/meat-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
        }];

  const stateFulfilled = {
    ingredients: testIngredients,
    loading: false,
    error: null
  };  

  const stateRejected = {
   ...initialState,
    loading: false,
    error: 'Error'
  };

  test('Обработка getIngredients.pending', () => {
    const newState = ingredientReducer({...initialState, error: 'error'}, getIngredients.pending(''));
    expect(newState).toEqual(statePending);
  });

   test('Обработка getIngredients.fulfilled', () => {
    const newState = ingredientReducer({...initialState, loading: true}, getIngredients.fulfilled(testIngredients, ''));
    expect(newState).toEqual(stateFulfilled);
  });

  test('Обработка getIngredients.rejected', () => {
    const testError = new Error('Error')
    const newState = ingredientReducer({...initialState, loading: true}, getIngredients.rejected(testError, ''));
    expect(newState).toEqual(stateRejected);
  });
});
