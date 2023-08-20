import { useLocation } from 'react-router-dom';

export default function MoviesCard({ card, onBtnClick }) {
  const { poster, name, duration, like } = card;
  const { pathname } = useLocation();
  const isMovies = pathname === '/movies';

  const likeBtnClass = `button movies-card__button movies-card__button_type_like ${like ? 'active' : ''}`;
  const deleteBtnClass = `button  movies-card__button movies-button_type_delete`;
  const btnLikeText = 'Поставить/убрать лайк';
  const btnLDeleteText = 'Удалить фильм из списка';
  const btnTitle = `${isMovies ? btnLikeText : btnLDeleteText}`;

  return (
    <li className="movies-card">
      <img className="movies-card__poster" src={poster} alt={`Кадр из фильма: ${name}`} />
      <div className="movies-card__container">
        <h3 className="movies-card__title">{name}</h3>
        <button
          className={isMovies ? likeBtnClass : deleteBtnClass}
          type="button"
          aria-label={btnTitle}
          title={btnTitle}
          onClick={onBtnClick}
        />
      </div>
      <span className="movies-card__duration">{duration}</span>
    </li>
  )
}