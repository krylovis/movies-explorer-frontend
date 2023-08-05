import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import { useNavigate } from 'react-router-dom';

import InputTypeName from '../../components/inputs/InputTypeName';
import InputTypeEmail from '../../components/inputs/InputTypeEmail';
import { useForm } from '../../hooks/useForm';

export default function ProfilePage() {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange } = useForm({ email: '', password: '' });
  // const navigate = useNavigate();

  const { name, email } = currentUser;

  function handleSubmit(e) {
    e.preventDefault();
    console.log('values', values);
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
        <InputTypeName values={values} handleChange={handleChange} />
        <InputTypeEmail values={values} handleChange={handleChange} />

        <button className="button profile__submit-button" type="submit" aria-label="Редактировать">Редактировать</button>
      </form>

      <button className="button profile__logout-button" type="button" aria-label="Выйти из аккаунта">Выйти из аккаунта</button>
    </section >
  )
}