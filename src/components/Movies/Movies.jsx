
import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useFormWithValidator } from '../../hooks/useForm';
import { getMoviesApi } from '../../utils/MoviesApi';

export default function Movies(props) {
  const { toggleCardLike, savedMoviesList } = props;

  function getItem(item) {
    const savedItem = JSON.parse(localStorage.getItem(item));
    console.log('savedItem', savedItem);
    return savedItem || [];
  }
  const lastMoviesQuery = 'last-movies-query';
  const lastMoviesList = 'last-movies-list';

  const [moviesList, setMoviesList] = React.useState(getItem(lastMoviesList));

  const lastQuery = JSON.parse(localStorage.getItem(lastMoviesQuery));
  const { values, isValid, setValues, handleChange } = useFormWithValidator(
    lastQuery ? { query: lastQuery.query } : { query: '' });
  const [isShortFilm, setIsShortFilm] = React.useState(
    lastQuery ? lastQuery.isShort : false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const filteringMoviesList = (list, query, isShort) => {
    return list.filter((item) => {
      const { nameRU, nameEN, duration } = item;

      if (isShort) return (nameRU.toLowerCase().includes(query.toLowerCase()) || nameEN.toLowerCase().includes(query.toLowerCase())) && duration <= 40;
      return nameRU.toLowerCase().includes(query.toLowerCase()) || nameEN.toLowerCase().includes(query.toLowerCase());
    });
  };

  const [filterMoviesList, setFilterMoviesList] = React.useState([]);

  const getMoviesAsync = () => {
    setIsLoading(true);
    getMoviesApi()
      .then((movies) => {
        setMoviesList(movies);
        localStorage.setItem(lastMoviesList, JSON.stringify(movies));
      })
      .catch(setErrors)
      .finally(() => { setTimeout(() => { setIsLoading(false); }, 1000); });
  };

  const setErrors = (error) => {
    console.error(error);
    setIsError(true);
  };

  // const filterList = (movies) => {
  //   console.log('filterList');
  //   const filterData = filteringMoviesList(movies, values.query, isShortFilm);
  //   setFilterMoviesList((list) => [...filterData]);
  // }

  const getAndSetMovies = () => {
    if (!moviesList.length) getMoviesAsync();
    // else filterList(moviesList);
  }

  React.useEffect(() => {
    if (values.query) getAndSetMovies();
  }, []);

  const saveDataToStorage = (isShort = isShortFilm) => {
    const data = {
      query: values.query,
      isShort: isShort,
    };
    localStorage.setItem(lastMoviesQuery, JSON.stringify(data));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getAndSetMovies();
    saveDataToStorage(isShortFilm);
  }

  const checkboxChange = (event) => {
    setIsShortFilm(event.target.checked);
    getAndSetMovies();
    saveDataToStorage(event.target.checked);
  }

  const isNotFound = (moviesList && moviesList.length) && !filterMoviesList.length;

  return (
    < main className="main" >
      <SearchForm
        values={values}
        isValid={isValid}
        isRequired={false}
        isShortFilm={isShortFilm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        checkboxChange={checkboxChange}
      />
      <MoviesCardList
        list={filterMoviesList}
        savedMoviesList={savedMoviesList}
        isNotFound={isNotFound}
        isLoading={isLoading}
        isError={isError}
        toggleCardLike={toggleCardLike}
      />
    </main >
  )
}