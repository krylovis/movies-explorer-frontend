import React from 'react';
import { useForm } from '../../hooks/useForm';
import SectionContainer from '../../components/SectionContainer/SectionContainer';

export default function SearchForm() {
  const { values, handleChange } = useForm({ query: "" });
  const [isShortFilm, setIsShortFilm] = React.useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    console.log('values', values);
  };

  function checkboxChange(event) {
    setIsShortFilm(event.target.checked);
    console.log('checked', event.target.checked);
  };

  return (
    <SectionContainer type="type_search-form">

      <div className="search-form__container">
        <form
          action="queryAction"
          onSubmit={handleSubmit}
          name="profile"
          className="search-form__form"
        >
          <label className="search-form__label" htmlFor="inputTypeQuery">
            <input
              className="input search-form__input"
              id="inputTypeQuery"
              type="text"
              name="query"
              value={values.query}
              onChange={handleChange}
              placeholder="Фильм"
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

        <span className="search-form__line"></span>

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
      </div>

    </SectionContainer>
    // <section className="search-form"></section>
  )
}