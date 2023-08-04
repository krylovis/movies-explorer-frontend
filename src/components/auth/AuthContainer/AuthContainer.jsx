import logo from '../../../images/logo.svg';

export default function AuthContainer(props) {
  const { authTitle, formName, onSubmit, inactiveButton, buttonText, children } = props;
  const btnClassName = `button auth__submit-button ${inactiveButton ? "auth__submit-button_inactive" : ''}`

  return (
    <section className="auth">
      <div className="auth__header">
        <img src={logo} alt="Логотип: Movies Explorer" className="auth__logo" />
        <h2 className="auth__title">{authTitle}</h2>
      </div>
      <div className="auth__content">
        <form action={`${formName}Action`} onSubmit={onSubmit} name={formName} className="auth__form">
          {children}
          <button className={btnClassName} type="submit" aria-label={buttonText}>{buttonText}</button>
        </form>
      </div>
      <div className="auth__footer">
      </div>
    </section>
  )
}