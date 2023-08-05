// import { useNavigate } from 'react-router-dom';

import AuthContainer from '../AuthContainer/AuthContainer';
import InputTypeEmail from '../../inputs/InputTypeEmail';
import InputTypePassword from '../../inputs/InputTypePassword';
import InputTypeName from '../../inputs/InputTypeName';

import { useForm } from '../../../hooks/useForm';

// регистрация
export default function SignupPage() {
  const { values, handleChange } = useForm({ name: '', email: '', password: '' });
  // const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log('values', values);
  };

  return (
    <AuthContainer
      onSubmit={handleSubmit}
      authTitle="Добро пожаловать!"
      formName="signup"
      buttonText="Зарегистрироваться"
    >
      <InputTypeName values={values} handleChange={handleChange} />
      <InputTypeEmail values={values} handleChange={handleChange} />
      <InputTypePassword values={values} handleChange={handleChange} />

    </AuthContainer>
  )
}