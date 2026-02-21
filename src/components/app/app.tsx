import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { useSelector, useDispatch } from '../../services/store';
import { selectUser } from '../../services/selectors/index';
import { getUserWithToken } from '../../services/slices/user-slice';
import { Preloader } from '../../components/ui';
import { getIngredients } from '../../services/slices/ingredients-slice';

import {
  AppHeader,
  ProtectedRoute,
  OrderInfo,
  Modal,
  IngredientDetails
} from '@components';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(selectUser);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUserWithToken());
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='' onClose={() => {}}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path='/feed/:number'
          element={
            <Modal title='' onClose={() => {}}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='' onClose={() => {}}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
