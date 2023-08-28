import { useLocation } from 'react-router-dom';
import { MOVIES_BASE_URL } from '../../utils/constants';

import { mainApi } from '../../utils/MainApi';

export default function MoviesCard({ card }) {
  const { image, nameRU, duration, like } = card;
  const { pathname } = useLocation();
  const isMovies = pathname === '/movies';

  const moviePosterUrl = `${MOVIES_BASE_URL}${image.url}`;

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const movieTime = `${hours ? `${hours}ч ` : ''}${minutes}м`;

  const likeBtnClass = `button movies-card__button movies-card__button_type_like ${like ? 'active' : ''}`;
  const deleteBtnClass = `button  movies-card__button movies-button_type_delete`;
  const btnLikeText = 'Поставить/убрать лайк';
  const btnLDeleteText = 'Удалить фильм из списка';
  const btnTitle = `${isMovies ? btnLikeText : btnLDeleteText}`;

  const toggleCardLike = () => {
    const cardForSave = {
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: `${MOVIES_BASE_URL}${card.image.url}`,
      trailerLink: card.trailerLink,
      thumbnail: `${MOVIES_BASE_URL}${card.image.formats.thumbnail.url}`,
      movieId: card.id,
      nameRU: card.nameRU,
      nameEN: card.nameEN,
    };

    mainApi.saveMovie(cardForSave)
      .then((data) => console.log(data))
      .catch(console.error);
  };

  return (
    <li className="movies-card">
      <img className="movies-card__poster" src={moviePosterUrl} alt={`Кадр из фильма: ${nameRU}`} />
      <div className="movies-card__container">
        <h3 className="movies-card__title">{nameRU}</h3>
        <button
          className={isMovies ? likeBtnClass : deleteBtnClass}
          type="button"
          aria-label={btnTitle}
          title={btnTitle}
          onClick={toggleCardLike}
        />
      </div>
      <span className="movies-card__duration">{movieTime}</span>
    </li>
  )
}