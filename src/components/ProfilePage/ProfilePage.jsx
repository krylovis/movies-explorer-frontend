import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useNavigate } from 'react-router-dom';

import InputTypeName from '../../components/inputs/InputTypeName';
import InputTypeEmail from '../../components/inputs/InputTypeEmail';
import { useFormWithValidator } from '../../hooks/useForm';

import { mainApi } from '../../utils/MainApi';
import { logout } from '../../utils/Auth';

export default function ProfilePage(props) {
  const { setCurrentUser, handleSetLoggedOut } = props;

  const currentUser = React.useContext(CurrentUserContext);
  const { name, email } = currentUser;
  const { values, isValid, setIsValid, handleChange } = useFormWithValidator(currentUser);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (values.name === name) setIsValid(false);
  }, [setIsValid, values.name, name]);

  React.useEffect(() => {
    if (values.email === email) setIsValid(false);
  }, [setIsValid, values.email, email]);

  React.useEffect(() => { }, [setRequestMessage]);

  function onUpdateUser(event) {
    event.preventDefault();
    mainApi
      .editUserInfo(values)
      .then((data) => {
        setCurrentUser(data);
        setRequestMessage('Профиль успешно обновлён');
      })
      .catch((error) => {
        console.error('error', error);
        setRequestMessage(error);
      });
  };

  function handleLogout(event) {
    event.preventDefault();
    logout()
      .then((user) => {
        setCurrentUser(user);
        handleSetLoggedOut();
        navigate('/');
        localStorage.removeItem('last-movies-data');
      })
      .catch(err => console.log(err));
  };

  return (
    <section className="profile">
      <h2 className="profile__title">{`Привет, ${name}!`}</h2>

      <form
        action="profileAction"
        name="profile"
        className="profile__content"
      >
        <div className="profile__input-container">
          <InputTypeName values={values} handleChange={handleChange} isProfile={true} />
          <InputTypeEmail values={values} handleChange={handleChange} isProfile={true} />
        </div>

        <button
          className="button profile__button profile__button_type_submit"
          aria-label="Редактировать"
          type="submit"
          disabled={!isValid}
          onClick={handleOnUpdateUser}
        >
          Редактировать
        </button>
      </form>

      <button
        className="button profile__button profile__button_type_logout"
        aria-label="Выйти из аккаунта"
        type="button"
        onClick={handleLogout}
      >
        Выйти из аккаунта
      </button>
    </section >
  )
}