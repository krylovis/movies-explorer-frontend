import React from 'react';
import usePopupClose from '../../hooks/useMenuClose';

export default function Navigation(props) {
  const { menuIsOpen, handleCloseMenu } = props;
  usePopupClose(menuIsOpen, handleCloseMenu);

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
      </div>
    </section>
  )
}