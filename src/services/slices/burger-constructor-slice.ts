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

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push({
          ...(action.payload as TIngredient & {
            type: 'sauce' | 'main';
          }),
          id: nanoid()
        });
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
