import React from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';

import logo from '../../images/logo.svg';

export default function Header(props) {
  const { loggedIn = true } = props;
  // const [isMobile, setIsMobile] = React.useState(false);

  const { pathname } = useLocation();
  const isResultLanding = pathname === '/';

  const headerClassName = `header ${isResultLanding ? 'header_type_main-page' : ''}`;
  const linksContainerClassName = `header__links-container ${loggedIn ? 'header__links-container_type_logged' : ''}`;

  const navLinks = () => {
    if (loggedIn) {
      return (
        <>
          <div className="header__movies-container">
            <NavLink className="link header__link header__movies-item" to="/movies">Фильмы</NavLink>
            <NavLink className="link header__link header__movies-item" to="/saved-movies">Сохранённые фильмы</NavLink>
          </div>
          <NavLink className="link header__link header__link_type_profile" to="/profile">
            Аккаунт
            <span className="header__profile-icon" />
          </NavLink>
        </>
      )
    } else {
      return (
        <>
          <NavLink className="link header__link" to="/signup">Регистрация</NavLink>
          <NavLink className="link header__link" to="/signin">
            <button className="button header__button" type="button" aria-label="Войти в систему">Войти</button>
          </NavLink>
        </>
      )
    }
  };

  return (
    <header className={headerClassName}>
      <div className="header__container">
        <NavLink to="/">
          <img src={logo} alt="Логотип: Movies Explorer" title="Главная страница" className="header__logo" />
        </NavLink>

        <nav className={linksContainerClassName}>
          {navLinks()}
        </nav >
      </div>
    </header>
  )
}