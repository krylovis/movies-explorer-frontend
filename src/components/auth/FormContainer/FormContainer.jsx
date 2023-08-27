import { NavLink, useLocation } from 'react-router-dom';

import logo from '../../../images/logo.svg';

export default function FormContainer(props) {
  const { formTitle, formName, onSubmit, inactiveButton, buttonText, isValid, children } = props;
  const btnClassName = `button form-container__submit-button ${inactiveButton ? "form-container__submit-button_inactive" : ''}`

  const location = useLocation();
  const { pathname } = location;

  const getFooter = () => {
    const isSignin = pathname === "/signin";
    const footerText = isSignin ? "Ещё не зарегистрированы?" : "Уже зарегистрированы?";
    const footerLink = isSignin ? "Регистрация" : "Войти";
    const linkTo = isSignin ? "/signup" : "/signin";

    return (
      <>
        <span className="form-container__text">{footerText}</span>
        <NavLink className="link form-container__link" to={linkTo}>{footerLink}</NavLink>
      </>
    )
  }

  return (
    <section className="form-container">
      <div className="form-container__header">
        <img src={logo} alt="Логотип: Movies Explorer" className="form-container__logo" />
        <h2 className="form-container__title">{formTitle}</h2>
      </div>
      <form
        action={`${formName}Action`}
        onSubmit={onSubmit}
        name={formName}
        className="form-container__content"
      >
        {children}
        <button
          className={btnClassName}
          type="submit"
          aria-label={buttonText}
          disabled={!isValid}
        >
          {buttonText}
        </button>
      </form>
      <div className="form-container__footer">
        {getFooter()}
      </div>
    </section >
  )
}