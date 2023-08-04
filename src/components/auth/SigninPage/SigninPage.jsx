import AuthContainer from '../AuthContainer/AuthContainer';

// авторизация
export default function SigninPage() {
  return (
    <AuthContainer
      authTitle="Рады видеть!"
      formName="signin"
      buttonText="Войти"
    >
      {/* SigninPage */}
    </AuthContainer>
  )
}