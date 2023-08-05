import AuthContainer from '../AuthContainer/AuthContainer';
import InputTypeEmail from '../../inputs/InputTypeEmail';
import InputTypePassword from '../../inputs/InputTypePassword';

import { useForm } from '../../../hooks/useForm';

// авторизация
export default function SigninPage() {
  const { values, handleChange } = useForm({ email: '', password: '' });
  return (
    <AuthContainer
      authTitle="Рады видеть!"
      formName="signin"
      buttonText="Войти"
    >
      <InputTypeEmail values={values} handleChange={handleChange} />
      <InputTypePassword values={values} handleChange={handleChange} />

    </AuthContainer>
  )
}