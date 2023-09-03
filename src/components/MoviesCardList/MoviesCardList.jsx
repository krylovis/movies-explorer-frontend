import React from 'react';

import SectionContainer from '../../components/SectionContainer/SectionContainer';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
  const { isNotFound, partOfMoviesList, savedMoviesList, updateSavedMoviesList, showMoreMovies, isShowMoreMoviesBtn, isLoading, isError } = props;

  const moviesListInfo = () => {
    let infoText = '';
    if (isLoading) {
      infoText = 'Идёт загрузка...';
    } else if (isError) {
      infoText = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
    } else {
      infoText = 'Ничего не найдено';
    }

    return (
      <>
        <p className='movies-list__info'>{infoText}</p>
        {isLoading && <div className="loader-dual-ring" />}
      </>
    )
  };

  const moviesList = () => (
    <>
      <ul className="list movies-list">
        {partOfMoviesList.map((card) => {
          const isLike = savedMoviesList.find(movie => movie.movieId === card.id);
          return (
            <MoviesCard
              key={card.id || card._id}
              card={card}
              updateSavedMoviesList={updateSavedMoviesList}
              isLike={isLike}
            />
          )
        })}
      </ul>

      {isShowMoreMoviesBtn &&
        <button className="button section-container__button"
          type="button"
          aria-label="Показать больше фильмов"
          title="Показать больше фильмов"
          onClick={showMoreMovies}
        >
          Ещё
        </button>
      }
    </>
  );

  return (
    <SectionContainer type="type_movies-list">
      {(isLoading || isError || isNotFound) ? moviesListInfo() : moviesList()}
    </SectionContainer>
  )
}