import React from 'react';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import iconSearch from '../../images/interface/icon-search.svg';

export default function SearchForm(props) {
  const { values, isValid, isShortFilm, handleSubmit, handleChange, checkboxChange } = props;
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const resize = () => {
      const mobileWidth = document.body.clientWidth <= 585;
      if (mobileWidth) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener("resize", resize);
  }, [setIsMobile]);

  React.useEffect(() => { }, [values]);

  const switchContainer = () => (
    <div className="search-form__switch-container">
      <label className="search-form__switch">
        <input
          className="search-form__checkbox"
          type="checkbox"
          checked={isShortFilm}
          onChange={checkboxChange}
          disabled={!isValid}
        />
        <span className="search-form__slider" />
      </label>

      <span className="search-form__text">Короткометражки</span>
    </div>
  );

  return (
    <SectionContainer type="type_search-form">

      <div className="search-form">
        <form
          action="queryAction"
          onSubmit={handleSubmit}
          name="query"
          className="search-form__form"
        >
          <label className="search-form__label" htmlFor="inputTypeQuery">
            {!isMobile && <img className="search-form__input-icon" src={iconSearch} alt="Иконка поиска" />}
            <input
              className="input search-form__input"
              id="inputTypeQuery"
              type="text"
              name="query"
              value={values.query}
              onChange={handleChange}
              placeholder="Фильм"
              required
            />
            <span className="input__error-message inputTypeName-error" />
          </label>

          <button
            className="button search-form__button"
            aria-label="Найти фильм"
            type="submit"
            disabled={!isValid}
          >
            Найти
          </button>
        </form>

        {!isMobile && <span className="search-form__line" />}
        {!isMobile && switchContainer()}
      </div>

      {isMobile && switchContainer()}
    </SectionContainer>
  )
}