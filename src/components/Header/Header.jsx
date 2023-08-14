import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import LinkToProfile from '../../components/LinkToProfile/LinkToProfile';
import logo from '../../images/logo.svg';

export default function Header(props) {
  const { loggedIn = true, handleOpenMenu, handleCloseMenu } = props;

  const [isMobile, setIsMobile] = React.useState(false);

  const { pathname } = useLocation();
  const isResultLanding = pathname === '/';

  const headerClassName = `header ${isResultLanding ? 'header_type_main-page' : ''}`;
  const linksContainerClassName = `header__links-container ${loggedIn ? 'header__links-container_type_logged' : ''}`;

  React.useEffect(() => {
    const resize = () => {
      const mobileWidth = document.body.clientWidth <= 768;
      if (mobileWidth) {
        setIsMobile(true);
      } else {
        handleCloseMenu();
        setIsMobile(false);
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener("resize", resize);
  }, [setIsMobile, handleCloseMenu]);

  const navLinks = () => {
    if (loggedIn) {
      return (
        <>
          <div className="header__movies-container">
            <NavLink className="link header__movies-item" to="/movies">Фильмы</NavLink>
            <NavLink className="link header__movies-item" to="/saved-movies">Сохранённые фильмы</NavLink>
          </div>
          <LinkToProfile />
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

  const menuButton = () => {
    return (
      <button
        className="button header__menu-button"
        type="button"
        title="Открыть меню"
        aria-label="Кнопка меню"
        onClick={handleOpenMenu}
      />
    )
  };

  return (
    <header className={headerClassName}>
      <div className="header__container">
        <NavLink className="header__link-logo" to="/">
          <img src={logo} alt="Логотип: Movies Explorer" title="Главная страница" className="header__logo" />
        </NavLink>

        {(isMobile && (!isResultLanding || loggedIn)) && menuButton()}

        {(!isMobile && !isResultLanding) &&
          <nav className={linksContainerClassName}>
            {navLinks()}
          </nav >}

        {(isResultLanding) &&
          <nav className={linksContainerClassName}>
            {navLinks()}
          </nav >}
      </div>
    </header>
  )
}