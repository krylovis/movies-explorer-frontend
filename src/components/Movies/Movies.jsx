import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useFormWithValidator } from '../../hooks/useForm';
import { MoviesListContext } from '../../contexts/MoviesListContext';

export default function Movies(props) {
  const { getAndSetMovies } = props;

  const moviesList = React.useContext(MoviesListContext);
  const { values, handleChange } = useFormWithValidator({ query: '' });
  const [isShortFilm, setIsShortFilm] = React.useState(false);
  const [howMuchToAdd, setHowMuchToAdd] = React.useState(0);
  const [partOfMoviesList, setPartOfMoviesList] = React.useState([]);
  const [defaultMoviesCounter, setdefaultMoviesCounter] = React.useState(0);

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


  const handleSubmit = (event) => {
    event.preventDefault();
    getAndSetMovies();
  }

  const checkboxChange = (event) => {
    setIsShortFilm(event.target.checked);
    console.log(event.target.checked);
  }

  const showMoreMovies = () => {
    setdefaultMoviesCounter(defaultMoviesCounter + howMuchToAdd);
  };

  const filterMoviesList = (list) => { };

  const toggleCardLike = () => console.log('toggleCardLike');


  return (
    <main className="main">
      <SearchForm
        values={values}
        isShortFilm={isShortFilm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        checkboxChange={checkboxChange}
      />
      <MoviesCardList
        queryValue={queryValue}
        isShortFilm={isShortFilm}
        partOfMoviesList={partOfMoviesList}
        showMoreMovies={showMoreMovies}
        toggleCardLike={toggleCardLike}
      />
    </main>
  )
}