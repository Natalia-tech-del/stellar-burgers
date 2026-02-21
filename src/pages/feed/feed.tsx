import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectFeed } from '../../services/selectors/index';
import { getFeeds } from '../../services/slices/feed-slice';
import commonStyles from '../../components/ui/pages/common.module.css';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders, loading, error } = useSelector(selectFeed);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
    const interval = setInterval(() => {
      dispatch(getFeeds());
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

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
