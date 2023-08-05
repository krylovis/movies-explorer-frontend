// import { useNavigate } from 'react-router-dom';

import FormContainer from '../FormContainer/FormContainer';
import InputTypeName from '../../inputs/InputTypeName';
import InputTypeEmail from '../../inputs/InputTypeEmail';
import InputTypePassword from '../../inputs/InputTypePassword';
import { useForm } from '../../../hooks/useForm';

export default function SignupPage() {
  const { values, handleChange } = useForm({ name: '', email: '', password: '' });
  // const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log('values', values);
  };

  return (
    <FormContainer
      onSubmit={handleSubmit}
      formTitle="Добро пожаловать!"
      formName="signup"
      buttonText="Зарегистрироваться"
    >

      <InputTypeName values={values} handleChange={handleChange} />
      <InputTypeEmail values={values} handleChange={handleChange} />
      <InputTypePassword values={values} handleChange={handleChange} />

    </FormContainer>
  )
}