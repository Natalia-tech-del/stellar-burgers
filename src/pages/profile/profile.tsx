import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectUser } from '../../services/selectors/index';
import { updateUser } from '../../services/slices/user-slice';
import { Preloader } from '../../components/ui';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const { user, loading, error } = useSelector(selectUser);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isFormChanged) {
      return;
    }
    const updatedData: { name?: string; email?: string; password?: string } =
      {};
    if (formValue.name !== user?.name) {
      updatedData.name = formValue.name;
    }
    if (formValue.email !== user?.email) {
      updatedData.email = formValue.email;
    }
    if (formValue.password) {
      updatedData.password = formValue.password;
    }
    dispatch(updateUser(updatedData));
    setFormValue((prev) => ({ ...prev, password: '' }));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <ProfileUI
          formValue={formValue}
          isFormChanged={isFormChanged}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          updateUserError={error || undefined}
        />
      )}
    </>
  );
};
