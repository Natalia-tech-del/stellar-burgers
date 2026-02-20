import { RootState } from '../store';

export const selectIngredients = (state: RootState) => state.ingredients;
export const selectBurgerConstructor = (state: RootState) =>
  state.burgerConstructor;
