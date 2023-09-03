import React from 'react';
import debounce from 'lodash.debounce';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useFormWithValidator } from '../../hooks/useForm';
import { getMoviesApi } from '../../utils/MoviesApi';

export default function Movies(props) {
  const { isSavedMovies, toggleCardLike } = props;
  const localStorageItem = 'last-movies-data';

  const [moviesList, setMoviesList] = React.useState([]);
  const { values, isValid, setValues, handleChange } = useFormWithValidator({ query: '' });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isShortFilm, setIsShortFilm] = React.useState(false);
  const [howMuchToAdd, setHowMuchToAdd] = React.useState(0);
  const [filterMoviesList, setFilterMoviesList] = React.useState([]);
  const [partOfMoviesList, setPartOfMoviesList] = React.useState([]);
  const [defaultMoviesCounter, setDefaultMoviesCounter] = React.useState(0);

  const getMoviesAsync = () => {
    setIsLoading(true);
    getMoviesApi()
      .then(movies => {
        setMoviesList(movies);
        filterList(movies);
      })
      .catch(setErrors)
      .finally(() => { setTimeout(() => { setIsLoading(false); }, 1000); });
  };

  const getMoviesFromStorage = (localStorageItem) => {
    if (localStorageItem) {
      const { query, isShort, list } = localStorageItem;
      if (query) setValues({ query });
      if (isShort) setIsShortFilm(isShort);
      if (list && list.length) setMovies(list);
    }
  }

  const setErrors = (error) => {
    console.error(error);
    setIsError(true);
  };

  const setMovies = (movies) => {
    setMoviesList(movies);
    filterList(movies);
  };

  const filterList = (movies) => {
    const filterData = filteringMoviesList(movies, values.query, isShortFilm);
    setFilterMoviesList(filterData);
    setPartOfMoviesList(filterData.slice(0, defaultMoviesCounter));
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
    const debouncedResize = debounce(resize, 500);
    debouncedResize();
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  const getAndSetMovies = () => {
    const lastMoviesData = JSON.parse(localStorage.getItem(localStorageItem));
    if (!lastMoviesData && !moviesList.length) {
      getMoviesAsync();
    } else {
      getMoviesFromStorage(lastMoviesData);
    }
  }

  React.useEffect(() => {
    getAndSetMovies();
  }, [defaultMoviesCounter, isShortFilm]);

  const saveDataToStorage = (isShortFilm) => {
    const data = {
      query: values.query,
      isShort: isShortFilm,
      list: moviesList,
    };
    localStorage.setItem(localStorageItem, JSON.stringify(data));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    filterList(moviesList);
    saveDataToStorage(isShortFilm);
  }

  const checkboxChange = (event) => {
    setIsShortFilm(event.target.checked);
    filterList(moviesList);
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
        toggleCardLike={toggleCardLike}
        showMoreMovies={showMoreMovies}
      />
    </main>
  )
}