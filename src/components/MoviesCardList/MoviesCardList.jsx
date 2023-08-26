import React from 'react';

import SectionContainer from '../../components/SectionContainer/SectionContainer';
import MoviesCard from '../MoviesCard/MoviesCard';
import { MoviesListContext } from '../../contexts/MoviesListContext';

export default function MoviesCardList() {

  const moviesList = React.useContext(MoviesListContext);
  const [partOfMoviesList, setPartOfMoviesList] = React.useState([]);
  const [howMuchToAdd, setHowMuchToAdd] = React.useState(0);
  const [defaultMoviesCounter, setdefaultMoviesCounter] = React.useState(0);

  const toggleCardLike = () => console.log('toggleCardLike');
  const showMoreMovies = () => {
    setdefaultMoviesCounter(defaultMoviesCounter + howMuchToAdd);
  };

  const { clientWidth } = document.body;
  const isLargeScreen = clientWidth > 990;
  const isMediumScreen = clientWidth <= 990 && clientWidth > 768;
  const isSmallScreen = clientWidth <= 768 && clientWidth > 500;
  const issMobileScreen = clientWidth <= 500;

  React.useEffect(() => {
    if (isLargeScreen) {
      setdefaultMoviesCounter(16);
      setHowMuchToAdd(4);
    } else if (isMediumScreen) {
      setdefaultMoviesCounter(12);
      setHowMuchToAdd(3);
    } else if (isSmallScreen) {
      setdefaultMoviesCounter(8);
      setHowMuchToAdd(2);
    } else if (issMobileScreen) {
      setdefaultMoviesCounter(5);
      setHowMuchToAdd(2);
    }
  }, [setdefaultMoviesCounter, setHowMuchToAdd, isLargeScreen, isMediumScreen, isSmallScreen, issMobileScreen]);

  React.useEffect(() => {
    setPartOfMoviesList(moviesList.slice(0, defaultMoviesCounter));
  }, [moviesList, defaultMoviesCounter]);

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