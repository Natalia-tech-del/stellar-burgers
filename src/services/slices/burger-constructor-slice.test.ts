import { TIngredient } from '@utils-types';
import burgerConstructorReducer, { addIngredient, removeIngredient, clearConstructor, TConstructorState, moveDownIngredient, moveUpIngredient } from './burger-constructor-slice';
import { nanoid } from 'nanoid';
jest.mock('nanoid');

describe('Проверяем редьюсер слайса burgerConstructor', () => {
  beforeEach(() => {
    (nanoid as jest.Mock).mockImplementation(() => "1");
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
  
  const initialState = {
    bun: {
      _id:"643d69a5c3f7b9001cfa093c",
      name:"Краторная булка N-200i",
      type:"bun",
      price:1255
    },
    ingredients: [{
      _id:"643d69a5c3f7b9001cfa0941",
      name:"Биокотлета из марсианской Магнолии",
      type:"main",
      price:424,
      id:"j6TPo4vYCVfstjqmofe_E"
    }]
  } as TConstructorState;

  const addedBun = {
    _id: "643d69a5c3f7b9001cfa093d",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    price: 988
  } as TIngredient;

  const stateWithAddedBun = {
    bun: {
    _id: "643d69a5c3f7b9001cfa093d",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    price: 988
    },
    ingredients: [{
      _id:"643d69a5c3f7b9001cfa0941",
      name:"Биокотлета из марсианской Магнолии",
      type:"main",
      price:424,
      id:"j6TPo4vYCVfstjqmofe_E"
    }]
  } as TConstructorState;

  const addedSauсe = {
            _id: "643d69a5c3f7b9001cfa0944",
            name: "Соус традиционный галактический",
            type: "sauce",
            price: 15
  } as TIngredient;

  const stateWithAddedSauсe = {
    bun: {
      _id:"643d69a5c3f7b9001cfa093c",
      name:"Краторная булка N-200i",
      type:"bun",
      price:1255
    },
    ingredients: [{
      _id:"643d69a5c3f7b9001cfa0941",
      name:"Биокотлета из марсианской Магнолии",
      type:"main",
      price:424,
      id:"j6TPo4vYCVfstjqmofe_E"
    }, {
      _id: "643d69a5c3f7b9001cfa0944",
      name: "Соус традиционный галактический",
      type: "sauce",
      price: 15,
      id:"1"
  }]
  } as TConstructorState;

  const stateForMove = {
    bun: {
      _id:"643d69a5c3f7b9001cfa093c",
      name:"Краторная булка N-200i",
      type:"bun",
      price:1255
    },
    ingredients: [{
      _id:"643d69a5c3f7b9001cfa0941",
      name:"Биокотлета из марсианской Магнолии",
      type:"main",
      price:424,
      id:"j6TPo4vYCVfstjqmofe_E"
    }, {
      _id: "643d69a5c3f7b9001cfa0944",
      name: "Соус традиционный галактический",
      type: "sauce",
      price: 15,
      id:"1"
  }, {
      _id: "643d69a5c3f7b9001cfa0946",
      name: "Хрустящие минеральные кольца",
      type: "main",
      price: 300,
      id: "2"
    }]
  } as TConstructorState;

  const stateMovedDown = {
    bun: {
      _id:"643d69a5c3f7b9001cfa093c",
      name:"Краторная булка N-200i",
      type:"bun",
      price:1255
    },
   ingredients: [{
      _id: "643d69a5c3f7b9001cfa0944",
      name: "Соус традиционный галактический",
      type: "sauce",
      price: 15,
      id:"1"
  }, {
      _id:"643d69a5c3f7b9001cfa0941",
      name:"Биокотлета из марсианской Магнолии",
      type:"main",
      price:424,
      id:"j6TPo4vYCVfstjqmofe_E"
    }, 
  {
      _id: "643d69a5c3f7b9001cfa0946",
      name: "Хрустящие минеральные кольца",
      type: "main",
      price: 300,
      id: "2"
    }]
  } as TConstructorState;

  const stateMovedUp = {
    bun: {
      _id:"643d69a5c3f7b9001cfa093c",
      name:"Краторная булка N-200i",
      type:"bun",
      price:1255
    },
    ingredients: [{
      _id:"643d69a5c3f7b9001cfa0941",
      name:"Биокотлета из марсианской Магнолии",
      type:"main",
      price:424,
      id:"j6TPo4vYCVfstjqmofe_E"
    }, {
      _id: "643d69a5c3f7b9001cfa0946",
      name: "Хрустящие минеральные кольца",
      type: "main",
      price: 300,
      id: "2"
    },
    {
      _id: "643d69a5c3f7b9001cfa0944",
      name: "Соус традиционный галактический",
      type: "sauce",
      price: 15,
      id:"1"
    }]
  } as TConstructorState;

  const stateAfterDelete = {
    bun: initialState.bun,
    ingredients: []
  } as TConstructorState;

  const stateAfterClear = {
    bun: null,
    ingredients: []
  };

  test('Добавить ингредиент - булку', () => {
    const newState = burgerConstructorReducer(initialState, addIngredient(addedBun));
    expect(newState).toEqual(stateWithAddedBun);
  });

  test('Добавить ингредиент - соус', () => {
    const newState = burgerConstructorReducer(initialState, addIngredient(addedSauсe));
    expect(nanoid).toHaveBeenCalledTimes(1);
    expect(newState).toEqual(stateWithAddedSauсe);
  });
  
  test('Удалить ингредиент', () => {
    const newState = burgerConstructorReducer(initialState, removeIngredient(0));
    expect(newState).toEqual(stateAfterDelete);
  });

  test('Очистка конструктора', () => {
    const newState = burgerConstructorReducer(initialState, clearConstructor());
    expect(newState).toEqual(stateAfterClear);
  });

  test('Перемещение вниз ингредиента', () => {
    const newState = burgerConstructorReducer(stateForMove, moveDownIngredient(0));
    expect(newState).toEqual(stateMovedDown);
  });

  test('Перемещение вверх ингредиента', () => {
    const newState = burgerConstructorReducer(stateForMove, moveUpIngredient(2));
    expect(newState).toEqual(stateMovedUp);
  });

});
