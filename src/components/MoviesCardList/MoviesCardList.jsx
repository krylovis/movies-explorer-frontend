import React from 'react';

import SectionContainer from '../../components/SectionContainer/SectionContainer';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
  const { partOfMoviesList, toggleCardLike, showMoreMovies, isLoading, isError } = props;

  const moviesListInfo = () => {
    const isErrorText = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
    const isLoadingText = 'Идёт загрузка...';
    return (
      <>
        <p className='movies-list__info'>{isError ? isErrorText : isLoadingText}</p>
      </>
    )
  };

  const moviesList = () => (
    <>
      <ul className="list movies-list">
        {partOfMoviesList.map((card) => (
          <MoviesCard
            key={card.id}
            card={card}
            onBtnClick={toggleCardLike}
          />
        ))}
      </ul>

      <button
        className="button section-container__button"
        type="button"
        aria-label="Показать больше фильмов"
        title="Показать больше фильмов"
        onClick={showMoreMovies}
      >
        Ещё
      </button>
    </>
  );

  return (
    <SectionContainer type="type_movies-list">
      {(isLoading || isError) && moviesListInfo()}
      {((partOfMoviesList.length > 0) && (!isLoading && !isError)) && moviesList()}
    </SectionContainer>
  )
}