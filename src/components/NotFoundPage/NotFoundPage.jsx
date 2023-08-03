import { NavLink } from 'react-router-dom';

export default function NotFoundPage() {

  return (
    <section className="not-found-page">
      <div className="not-found-page__container">
        <span className="not-found-page__error">404</span>
        <span className="not-found-page__text">Страница не найдена</span>
      </div>
      <NavLink className="link not-found-page__link" to="/">Назад</NavLink>
    </section>
  )
}