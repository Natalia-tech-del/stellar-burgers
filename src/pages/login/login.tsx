import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useSelector, useDispatch } from '../../services/store';
import { selectUser } from '../../services/selectors/index';
import { loginUser } from '../../services/slices/user-slice';
import { Navigate } from 'react-router-dom';
import { Preloader } from '../../components/ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, loading, error: errorText } = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (user) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <LoginUI
          errorText={errorText || undefined}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};
