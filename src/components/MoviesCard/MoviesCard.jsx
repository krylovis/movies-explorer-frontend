import { useLocation } from 'react-router-dom';

export default function MoviesCard({ card, onBtnClick }) {
  const { image, name, duration, like } = card;
  const { pathname } = useLocation();
  const isMovies = pathname === '/movies';

  const btnLikeText = 'Поставить/убрать лайк';
  const btnLDeleteText = 'Удалить фильм из списка';
  const btnTitle = `${isMovies ? btnLikeText : btnLDeleteText}`;

  return (
    <div className="movies-card">
      <img src={image} alt={`Кадр из фильма: ${name}`} />
      <div className="movies-card__title-container">
        <h3 className="movies-card__title">{name}</h3>
        <button
          className={`movies-card__button ${like ? 'active' : ''}`}
          type="button"
          aria-label={btnTitle}
          title={btnTitle}
          onClick={onBtnClick}
        />
      </div>
      <span className="movies-card__duration">{duration}</span>
    </div>
  )
}