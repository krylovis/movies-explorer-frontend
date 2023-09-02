import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useFormWithValidator } from '../../hooks/useForm';
import { getMoviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';

export default function Movies({ isSavedMovies }) {
  const localStorageItem = 'last-movies-data';

  const [moviesList, setMoviesList] = React.useState([]);
  const [savedMoviesList, setSavedMoviesList] = React.useState([]);
  const { values, isValid, setValues, handleChange } = useFormWithValidator({ query: '' });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isShortFilm, setIsShortFilm] = React.useState(false);
  const [howMuchToAdd, setHowMuchToAdd] = React.useState(0);
  const [filterMoviesList, setFilterMoviesList] = React.useState([]);
  const [partOfMoviesList, setPartOfMoviesList] = React.useState([]);
  const [defaultMoviesCounter, setDefaultMoviesCounter] = React.useState(0);

  const getDataAsync = (api) => {
    console.log('getDataAsync');
    setIsLoading(true);
    api.then(setMovies)
      .catch(setErrors)
      .finally(() => { setTimeout(() => { setIsLoading(false); }, 1000); });
  };

  const getSavedMoviesAsync = () => getDataAsync(mainApi.getMovies());
  const getMoviesApiAsync = () => getDataAsync(getMoviesApi());

  const getMoviesFromStorage = ({ query, isShort, list }) => {
    console.log('getMoviesFromStorage');
    if (query) setValues({ query });
    if (isShort) setIsShortFilm(isShort);
    if (list && list.length) setMovies(list);
  }

  const setErrors = (error) => {
    console.error(error);
    setIsError(true);
  };

  const setMovies = (movies) => {
    isSavedMovies ? setSavedMoviesList(movies) : setMoviesList(movies);
    filterList(movies);
  };

  const filterList = (movies) => {
    const filterData = filteringMoviesList(movies, values.query, isShortFilm);
    setFilterMoviesList(filterData);
    setPartOfMoviesList(filterData.slice(0, defaultMoviesCounter));
  }

  const getAndSetMovies = () => {
    console.log('getAndSetMovies');

    if (!isSavedMovies) {
      const lastMoviesData = JSON.parse(localStorage.getItem(localStorageItem));
      if (lastMoviesData) getMoviesFromStorage(lastMoviesData);
      else getMoviesApiAsync();
    } else {
      getSavedMoviesAsync();
    }
  }

  React.useEffect(() => {
    const resize = () => {
      const { clientWidth } = document.body;
      const isLargeScreen = clientWidth > 990;
      const isMediumScreen = clientWidth <= 990 && clientWidth > 768;
      const isSmallScreen = clientWidth <= 768 && clientWidth > 500;
      const issMobileScreen = clientWidth <= 500;

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
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  React.useEffect(() => {
    getAndSetMovies();
  }, [defaultMoviesCounter, isShortFilm]);

  const saveDataToStorage = (isShort = isShortFilm) => {
    if (!isSavedMovies) {
      const data = {
        query: values.query,
        isShort,
        list: moviesList,
      };
      localStorage.setItem(localStorageItem, JSON.stringify(data));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    moviesList ? filterList(moviesList) : getAndSetMovies();
    saveDataToStorage(isShortFilm);
  }

  const checkboxChange = (event) => {
    setIsShortFilm(event.target.checked);
    moviesList ? filterList(moviesList) : getAndSetMovies();
    saveDataToStorage(event.target.checked);
  }

  const showMoreMovies = () => {
    setDefaultMoviesCounter(defaultMoviesCounter + howMuchToAdd);
  };

  const filteringMoviesList = (list, query, isShort) => {
    return list.filter((item) => {
      const { nameRU, nameEN, duration } = item;

      if (isShort) return (nameRU.toLowerCase().includes(query.toLowerCase()) || nameEN.toLowerCase().includes(query.toLowerCase())) && duration <= 40;
      return nameRU.toLowerCase().includes(query.toLowerCase()) || nameEN.toLowerCase().includes(query.toLowerCase());
    });
  };

  const updateSavedMoviesList = () => getSavedMoviesAsync();
  const isShowMoreMoviesBtn = filterMoviesList.length > partOfMoviesList.length;
  const isNotFound = moviesList.length && !partOfMoviesList.length;

  return (
    <main className="main">
      <SearchForm
        values={values}
        isValid={isValid}
        isRequired={isSavedMovies}
        isShortFilm={isShortFilm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        checkboxChange={checkboxChange}
      />
      <MoviesCardList
        partOfMoviesList={partOfMoviesList}
        isSavedMovies={isSavedMovies}
        isNotFound={isNotFound}
        isLoading={isLoading}
        isError={isError}
        isShowMoreMoviesBtn={isShowMoreMoviesBtn}
        savedMoviesList={savedMoviesList}
        showMoreMovies={showMoreMovies}
        updateSavedMoviesList={updateSavedMoviesList}
      />
    </main>
  )
}