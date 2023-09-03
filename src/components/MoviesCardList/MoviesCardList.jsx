import React from 'react';

import useResizeWindow from '../../hooks/useResizeWindow';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
  const { isSavedMovies, isNotFound, list, savedMoviesList, toggleCardLike, isLoading, isError } = props;
  // const { howMuchToAdd, defaultMoviesCounter, setDefaultMoviesCounter } = useResizeWindow();

  // console.log('defaultMoviesCounter', defaultMoviesCounter);
  // const [partOfMoviesList, setPartOfMoviesList] = React.useState([]);

  // setSavedMoviesList((list) => [newCard, ...list]);
  // const isShowMoreMoviesBtn = list.length > partOfMoviesList.length;
  const isShowMoreMoviesBtn = list.length > [];

  const showMoreMovies = (e) => {
    e.preventDefault();
    // setDefaultMoviesCounter(defaultMoviesCounter + howMuchToAdd);
  };

  // React.useEffect(() => {
  //   setPartOfMoviesList([...list.slice(0, defaultMoviesCounter)]);
  // }, []);

  // console.log('partOfMoviesList', partOfMoviesList)

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
        {(list).map((card) => {
          const isLike = savedMoviesList.find(movie => movie.movieId === card.id);
          return (
            <MoviesCard
              key={card.id || card._id}
              card={card}
              toggleCardLike={toggleCardLike}
              isLike={isLike}
            />
          )
        })}
      </ul>

      {(isShowMoreMoviesBtn && !isSavedMovies) &&
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