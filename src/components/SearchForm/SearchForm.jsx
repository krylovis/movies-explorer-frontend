import { useForm } from '../../hooks/useForm';

export default function SearchForm() {
  const { values, handleChange } = useForm({ query: "" });

  function handleSubmit(e) {
    e.preventDefault();
    console.log('values', values);
  };

  return (
    <section className="search-form">
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
            <span className="input__error-message inputTypeQuery-error" />
          </label>

          <button
            className="button search-form__button"
            aria-label="Найти фильм"
            type="submit"
          >Найти
          </button>
          <label class="search-form__switch">
            <input className="search-form__checkbox" type="checkbox" role="switch" />
            <span class="search-form__slider"></span>
          </label>
        </form>
      </div>
    </section>
  )
}