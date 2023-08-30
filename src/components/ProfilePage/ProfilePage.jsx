import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useNavigate } from 'react-router-dom';

import InputTypeName from '../../components/inputs/InputTypeName';
import InputTypeEmail from '../../components/inputs/InputTypeEmail';
import { useFormWithValidator } from '../../hooks/useForm';

import { logout } from '../../utils/Auth';

export default function ProfilePage(props) {
  const { setCurrentUser, onUpdateUser, handleSetLoggedOut } = props;

  const currentUser = React.useContext(CurrentUserContext);
  const { name } = currentUser;
  const { values, isValid, handleChange } = useFormWithValidator(currentUser);
  const navigate = useNavigate();

  function handleOnUpdateUser(e) {
    e.preventDefault();
    onUpdateUser(values);
  };

  function handleLogout(e) {
    e.preventDefault();
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