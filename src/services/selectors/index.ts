import { RootState } from '../store';

export const selectIngredients = (state: RootState) => state.ingredients;
export const selectBurgerConstructor = (state: RootState) =>
  state.burgerConstructor;
export const selectOrder = (state: RootState) => state.order;
export const selectUser = (state: RootState) => state.user;
export const selectFeed = (state: RootState) => state.feed;
