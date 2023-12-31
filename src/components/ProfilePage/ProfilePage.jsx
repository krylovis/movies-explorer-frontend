import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useNavigate } from 'react-router-dom';

import InputTypeName from '../../components/inputs/InputTypeName';
import InputTypeEmail from '../../components/inputs/InputTypeEmail';
import { useForm } from '../../hooks/useForm';

export default function ProfilePage() {
  const currentUser = React.useContext(CurrentUserContext);
  const { name, email } = currentUser;
  const { values, handleChange } = useForm(currentUser);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log('values', values);
  };

  function handleLogout(e) {
    e.preventDefault();
    navigate('/signin');
    console.log('handleLogout');
  };

  return (
    <section className="profile">
      <h2 className="profile__title">{`Привет, ${name}!`}</h2>

      <form
        action="profileAction"
        onSubmit={handleSubmit}
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
        >Редактировать
        </button>
      </form>

      <button
        className="button profile__button profile__button_type_logout"
        aria-label="Выйти из аккаунта"
        type="button"
        onClick={handleLogout}>
        Выйти из аккаунта
      </button>
    </section >
  )
}