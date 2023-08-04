import AuthContainer from '../AuthContainer/AuthContainer';

// регистрация
export default function SignupPage() {
  return (
    <AuthContainer
      authTitle="Добро пожаловать!"
      formName="signup"
      buttonText="Зарегистрироваться"
    >
      {/* SignupPage */}
    </AuthContainer>
  )
}