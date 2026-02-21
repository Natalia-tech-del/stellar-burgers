import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useSelector, useDispatch } from '../../services/store';
import { selectUser } from '../../services/selectors/index';
import { registerUser } from '../../services/slices/user-slice';
import { Navigate } from 'react-router-dom';
import { Preloader } from '../../components/ui';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, loading, error: errorText } = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, name: userName }));
  };

  if (user) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <RegisterUI
          errorText={errorText || undefined}
          email={email}
          userName={userName}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          setUserName={setUserName}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};
