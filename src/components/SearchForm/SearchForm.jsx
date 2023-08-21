import React from 'react';
import { useForm } from '../../hooks/useForm';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import iconSearch from '../../images/interface/icon-search.svg';

export default function SearchForm() {
  const { values, handleChange } = useForm({ query: '' });
  const [isShortFilm, setIsShortFilm] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    console.log('values', values);
  };

  function checkboxChange(event) {
    setIsShortFilm(event.target.checked);
    console.log('checked', event.target.checked);
  };

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

  const switchContainer = () => (
    <div className="search-form__switch-container">
      <label className="search-form__switch">
        <input
          className="search-form__checkbox"
          type="checkbox"
          checked={isShortFilm}
          onChange={checkboxChange}
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
          name="profile"
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
          </label>

          <button
            className="button search-form__button"
            aria-label="Найти фильм"
            type="submit"
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