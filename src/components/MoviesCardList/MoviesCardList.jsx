import React from 'react';

import SectionContainer from '../../components/SectionContainer/SectionContainer';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
  const { partOfMoviesList, toggleCardLike, showMoreMovies } = props;

  return (
    <SectionContainer type="type_movies-list">
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
    </SectionContainer>
  )
}