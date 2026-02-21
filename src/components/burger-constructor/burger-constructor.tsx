import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import {
  selectBurgerConstructor,
  selectOrder
} from '../../services/selectors/index';
import { useDispatch } from '../../services/store';
import { postOrder, closeModal } from '../../services/slices/order-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { bun, ingredients } = useSelector(selectBurgerConstructor);
  const constructorItems = {
    bun: bun
      ? {
          name: bun.name,
          price: bun.price,
          image: bun.image
        }
      : null,
    ingredients: ingredients
  };

  const dispatch = useDispatch();

  const { orderModalData, orderRequest, error } = useSelector(selectOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const data = [
      bun!._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun!._id
    ];

    dispatch(postOrder(data));
  };

  const closeOrderModal = () => {
    dispatch(closeModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      error={error}
    />
  );
};
