import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectUserFeed } from '../../services/selectors/index';
import { getUserFeed } from '../../services/slices/user-feed-slice';
import commonStyles from '../../components/ui/pages/common.module.css';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders, loading, error } = useSelector(selectUserFeed);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFeed());
    const interval = setInterval(() => {
      dispatch(getUserFeed());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <p className={commonStyles.error}>Запрос завершился с ошибкой: {error}</p>
    );
  }

  return <ProfileOrdersUI orders={orders} />;
};
