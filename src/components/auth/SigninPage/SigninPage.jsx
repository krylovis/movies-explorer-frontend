// import { useNavigate } from 'react-router-dom';

import FormContainer from '../FormContainer/FormContainer';
import InputTypeEmail from '../../inputs/InputTypeEmail';
import InputTypePassword from '../../inputs/InputTypePassword';
import { useForm } from '../../../hooks/useForm';

export default function SigninPage() {
  const { values, handleChange } = useForm({ email: '', password: '' });
  // const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log('values', values);
  };

  return (
    <FormContainer
      onSubmit={handleSubmit}
      formTitle="Рады видеть!"
      formName="signin"
      buttonText="Войти"
    >

      <InputTypeEmail values={values} handleChange={handleChange} />
      <InputTypePassword values={values} handleChange={handleChange} />

    </FormContainer>
  )
}