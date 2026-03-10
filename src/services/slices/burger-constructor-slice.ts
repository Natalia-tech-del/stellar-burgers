import { TIngredient } from '../../utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: (TIngredient & {
    type: 'sauce' | 'main';
    id: string;
  })[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

type TIngredientWithKey = TIngredient & { id?: string };

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TIngredientWithKey>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else if (action.payload.id) {
          state.ingredients.push({
            ...action.payload,
            type: action.payload.type as 'sauce' | 'main',
            id: action.payload.id
          });
        }
      },
      prepare: (ingredient: TIngredient) => {
        if (ingredient.type === 'bun') {
          return { payload: ingredient };
        } else {
          const id = nanoid();
          return { payload: { ...ingredient, id } };
        }
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const { addIngredient, removeIngredient, clearConstructor } =
  burgerConstructorSlice.actions;
