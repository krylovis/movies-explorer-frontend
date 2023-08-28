import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useFormWithValidator } from '../../hooks/useForm';
import { getMoviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';

export default function Movies({ isSavedMovies }) {
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
    if (!moviesList.length && !partOfMoviesList.length) {
      setIsLoading(true);
      setIsError(false);
      getMoviesApi()
        .then((data) => {
          setMoviesList(data);
          const filterData = filteringMoviesList(data, values.query, isShortFilm);
          setFilterMoviesList(filterData);
          setPartOfMoviesList(filterData.slice(0, defaultMoviesCounter));
        })
        .catch((error) => {
          console.error(error);
          setIsError(true);
        })
        .finally(setIsLoading(false));
    } else {
      const filterData = filteringMoviesList(moviesList, values.query, isShortFilm);
      setFilterMoviesList(filterData);
      setPartOfMoviesList(filterData.slice(0, defaultMoviesCounter));
    }
  };

  const getAndSetSavedMovies = () => {
    setIsLoading(true);
    setIsError(false);
    mainApi.getMovies()
      .then((data) => {
        setMoviesList(data);
        const filterData = filteringMoviesList(data, values.query, isShortFilm);
        setFilterMoviesList(filterData);
        setPartOfMoviesList(filterData.slice(0, defaultMoviesCounter));
      })
      .catch((error) => {
        console.error(error);
        setIsError(true);
      })
      .finally(setIsLoading(false));
  };


  const moviesApi = () => {
    if (isSavedMovies) return getAndSetSavedMovies();
    return getAndSetMovies();
  }

  React.useEffect(() => {
    const lastMoviesData = JSON.parse(localStorage.getItem(localStorageItem));
    if (lastMoviesData && !isSavedMovies) {
      const { query, isShort, list } = lastMoviesData;
      if (query) setValues({ query });
      if (isShort) setIsShortFilm(isShort);
      if (list && list.length) {
        setMoviesList(list);
        const filterData = filteringMoviesList(list, query, isShort);
        setFilterMoviesList(filterData);
        setPartOfMoviesList(filterData.slice(0, defaultMoviesCounter));
      };
    }
  }, [setValues, defaultMoviesCounter, localStorageItem]);

  React.useEffect(() => {
    if (values.query || isSavedMovies) moviesApi();
  }, [defaultMoviesCounter, isShortFilm, isSavedMovies]);


  const handleSubmit = (event) => {
    event.preventDefault();
    moviesApi();
    if (!isSavedMovies) {
      const data = {
        query: values.query,
        isShort: isShortFilm,
        list: moviesList,
      };
      localStorage.setItem(localStorageItem, JSON.stringify(data));
    }
  }

  const checkboxChange = (event) => {
    setIsShortFilm(event.target.checked);

    moviesApi();
    const data = {
      query: values.query,
      isShort: event.target.checked,
      list: moviesList,
    };
    localStorage.setItem(localStorageItem, JSON.stringify(data));
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

  const isShowMoreMoviesBtn = filterMoviesList.length > partOfMoviesList.length;

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
        isLoading={isLoading}
        isError={isError}
        isShowMoreMoviesBtn={isShowMoreMoviesBtn}
        showMoreMovies={showMoreMovies}
      />
    </main>
  )
}