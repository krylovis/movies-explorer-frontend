import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useFormWithValidator } from '../../hooks/useForm';
import { getMoviesApi } from '../../utils/MoviesApi';

export default function Movies(props) {
  // const { } = props;

  const [moviesList, setMoviesList] = React.useState([]);
  const { values, isValid, setValues, handleChange } = useFormWithValidator({ query: '' });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isShortFilm, setIsShortFilm] = React.useState(false);
  const [howMuchToAdd, setHowMuchToAdd] = React.useState(0);
  const [partOfMoviesList, setPartOfMoviesList] = React.useState([]);
  const [defaultMoviesCounter, setDefaultMoviesCounter] = React.useState(0);

  const { clientWidth } = document.body;
  const isLargeScreen = clientWidth > 990;
  const isMediumScreen = clientWidth <= 990 && clientWidth > 768;
  const isSmallScreen = clientWidth <= 768 && clientWidth > 500;
  const issMobileScreen = clientWidth <= 500;

  React.useEffect(() => {
    if (isLargeScreen) {
      setDefaultMoviesCounter(16);
      setHowMuchToAdd(4);
    } else if (isMediumScreen) {
      setDefaultMoviesCounter(12);
      setHowMuchToAdd(3);
    } else if (isSmallScreen) {
      setDefaultMoviesCounter(8);
      setHowMuchToAdd(2);
    } else if (issMobileScreen) {
      setDefaultMoviesCounter(5);
      setHowMuchToAdd(2);
    }
  }, [setDefaultMoviesCounter, setHowMuchToAdd, isLargeScreen, isMediumScreen, isSmallScreen, issMobileScreen]);

  const getAndSetMovies = () => {
    if (!moviesList.length) {
      setIsLoading(true);
      setIsError(false);
      getMoviesApi()
        .then((data) => {
          setMoviesList(data);
          const filterData = filteringMoviesList(data, values.query, isShortFilm);
          setPartOfMoviesList(filterData.slice(0, defaultMoviesCounter));
        })
        .catch((error) => {
          console.error(error);
          setIsError(true);
        })
        .finally(setIsLoading(false));
    } else {
      const filterData = filteringMoviesList(moviesList, values.query, isShortFilm);
      setPartOfMoviesList(filterData.slice(0, defaultMoviesCounter));
    }
  };

  React.useEffect(() => {
    const lastMoviesData = JSON.parse(localStorage.getItem('last-movies-data'));
    if (lastMoviesData) {
      const { query, isShort, list } = lastMoviesData;

      if (query) setValues({ query });
      if (isShort) setIsShortFilm(isShort);
      if (list && list.length) {
        setMoviesList(list);
        const filterData = filteringMoviesList(list, query, isShort);
        setPartOfMoviesList(filterData.slice(0, defaultMoviesCounter));
      };
    }
  }, [setValues, defaultMoviesCounter]);

  React.useEffect(() => {
    if (values.query) getAndSetMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.query, defaultMoviesCounter, isShortFilm]);


  const handleSubmit = (event) => {
    event.preventDefault();
    getAndSetMovies();
    const data = {
      query: values.query,
      isShort: isShortFilm,
      list: moviesList,
    };
    localStorage.setItem('last-movies-data', JSON.stringify(data));
  }

  const checkboxChange = (event) => {
    setIsShortFilm(event.target.checked);

    getAndSetMovies();
    const data = {
      query: values.query,
      isShort: event.target.checked,
      list: moviesList,
    };
    localStorage.setItem('last-movies-data', JSON.stringify(data));
  }

  const showMoreMovies = () => {
    setDefaultMoviesCounter(defaultMoviesCounter + howMuchToAdd);
  };

  const filteringMoviesList = (list, query, isShort) => {
    if (isShort) return list.filter(item => item.nameRU.includes(query) && item.duration <= 40);
    return list.filter((item) => {
      return item.nameRU.toLowerCase().includes(query.toLowerCase());
    });
  };

  const toggleCardLike = () => console.log('toggleCardLike');


  return (
    <main className="main">
      <SearchForm
        values={values}
        isValid={isValid}
        isShortFilm={isShortFilm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        checkboxChange={checkboxChange}
      />
      <MoviesCardList
        partOfMoviesList={partOfMoviesList}
        isLoading={isLoading}
        isError={isError}
        showMoreMovies={showMoreMovies}
        toggleCardLike={toggleCardLike}
      />
    </main>
  )
}