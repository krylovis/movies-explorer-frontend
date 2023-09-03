import { useNavigate } from 'react-router-dom';

import FormContainer from '../FormContainer/FormContainer';
import InputTypeEmail from '../../inputs/InputTypeEmail';
import InputTypePassword from '../../inputs/InputTypePassword';
import { useFormWithValidator } from '../../../hooks/useForm';
import { authorize } from '../../../utils/Auth';

export default function SigninPage(props) {
  const { handleSetLoggedIn, setCurrentUser } = props;
  const { values, isValid, handleChange } = useFormWithValidator({ email: '', password: '' });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    authorize(values)
      .then((data) => {
        setCurrentUser(data);
        handleSetLoggedIn();
        navigate('/movies');
      })
      .catch(err => {
        console.log(err)
      });
  };

  return (
    <FormContainer
      onSubmit={handleSubmit}
      formTitle="Рады видеть!"
      formName="signin"
      buttonText="Войти"
      isValid={isValid}
    >

      <InputTypeEmail values={values} handleChange={handleChange} />
      <InputTypePassword values={values} handleChange={handleChange} />

    </FormContainer>
  )
}