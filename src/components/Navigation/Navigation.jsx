import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import LinkToProfile from '../../components/LinkToProfile/LinkToProfile';
import usePopupClose from '../../hooks/useMenuClose';

export default function Navigation(props) {
  const { menuIsOpen, handleCloseMenu } = props;
  usePopupClose(menuIsOpen, handleCloseMenu);

  const location = useLocation();

  React.useEffect(() => {
    handleCloseMenu();
  }, [location]);

  return (
    <section className={`navigation ${menuIsOpen ? "navigation_opened" : ""}`}>
      <div className="navigation__container">
        <div className="navigation__header">
          <button
            className="button navigation__close-menu"
            type="button"
            title="Закрыть меню"
            aria-label="Закрыть меню"
            onClick={handleCloseMenu}
          />
        </div>

        <nav className="navigation__links-container">
          <NavLink className="link navigation__link-item" to="/">Главная</NavLink>
          <NavLink className="link navigation__link-item" to="/movies">Фильмы</NavLink>
          <NavLink className="link navigation__link-item" to="/saved-movies">Сохранённые фильмы</NavLink>
        </nav >

        <nav className="navigation__footer">
          <LinkToProfile />
        </nav>
      </div>
    </section>
  )
}