import React from 'react';

export default function Navigation(props) {
  const { handleCloseMenu } = props;

  return (
    <section className="navigation">
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