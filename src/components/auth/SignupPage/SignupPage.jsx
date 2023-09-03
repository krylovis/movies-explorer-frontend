import { register } from '../../../utils/Auth';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../FormContainer/FormContainer';
import InputTypeName from '../../inputs/InputTypeName';
import InputTypeEmail from '../../inputs/InputTypeEmail';
import InputTypePassword from '../../inputs/InputTypePassword';
import { useFormWithValidator } from '../../../hooks/useForm';

export default function SignupPage(props) {
  const { handleSetLoggedIn, setCurrentUser } = props;

  const { values, isValid, handleChange } = useFormWithValidator({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    register(values)
      .then((data) => {
        setCurrentUser(data);
        handleSetLoggedIn();
        navigate('/movies');
      })
      .catch(console.error);
  };

  return (
    <FormContainer
      onSubmit={handleSubmit}
      formTitle="Добро пожаловать!"
      formName="signup"
      buttonText="Зарегистрироваться"
      isValid={isValid}
    >

      <InputTypeName values={values} handleChange={handleChange} />
      <InputTypeEmail values={values} handleChange={handleChange} />
      <InputTypePassword values={values} handleChange={handleChange} />

    </FormContainer>
  )
}