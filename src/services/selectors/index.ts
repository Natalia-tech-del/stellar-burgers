import { RootState } from '../store';

export const selectIngredients = (state: RootState) => state.ingredients;
export const selectBurgerConstructor = (state: RootState) =>
  state.burgerConstructor;
export const selectOrder = (state: RootState) => state.order;
export const selectUser = (state: RootState) => state.user;
export const selectFeed = (state: RootState) => state.feed;
export const selectUserFeed = (state: RootState) => state.userFeed;

export const selectOrdersInfoData = (number: string) => (state: RootState) => {
  if (state.userFeed?.orders?.length) {
    const data = state.userFeed.orders.find((item) => item.number === +number);
    if (data) return data;
  }

  if (state.feed?.orders?.length) {
    const data = state.feed.orders.find((item) => item.number === +number);
    if (data) return data;
  }

  if (state.order.orderByNumber?.number === +number) {
    return state.order.orderByNumber;
  }

  return null;
};
