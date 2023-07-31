import logo from '../../images/logo.svg';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();
  const isResultLanding = pathname === '/';
  const headerClassName = `header ${isResultLanding ? 'header_type_main-page' : ''}`;

  return (
    <header className={headerClassName}>
      <div className='header__container'>
        <NavLink to="/">
          <img src={logo} alt="Логотип: Movies Explorer" className="header__logo" />
        </NavLink>

        <nav className="header__links-container">
          <NavLink className="link header__link" to="/signup">Регистрация</NavLink>
          <NavLink className="link header__link" to="/signin">
            <button className="button header__button" type="button" aria-label="Войти в систему">Войти</button>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}