import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useFormWithValidator } from '../../hooks/useForm';
import { getMoviesApi } from '../../utils/MoviesApi';

export default function Movies(props) {
  // const { } = props;

  const [moviesList, setMoviesList] = React.useState([]);
  const { values, setValues, handleChange } = useFormWithValidator({ query: '' });
  const [isShortFilm, setIsShortFilm] = React.useState(false);
  const [howMuchToAdd, setHowMuchToAdd] = React.useState(0);
  const [partOfMoviesList, setPartOfMoviesList] = React.useState([]);
  const [filterMoviesList, setFilterMoviesList] = React.useState([]);
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

  const getAndSetMovies = () => {
    if (!moviesList.length) {
      getMoviesApi()
        .then((data) => {
          setMoviesList(data);
          const filterData = filteringMoviesList(data, values.query, isShortFilm);
          setFilterMoviesList(filterData);
          setPartOfMoviesList(filterData.slice(0, defaultMoviesCounter));
        })
        .catch(console.error);
    } else {
      const filterData = filteringMoviesList(moviesList, values.query, isShortFilm);
      setFilterMoviesList(filterData);
      setPartOfMoviesList(filterData.slice(0, defaultMoviesCounter));
    }
  };

  React.useEffect(() => {
    const lastQuery = JSON.parse(localStorage.getItem('last-query'));
    const lastIsShortFilm = JSON.parse(localStorage.getItem('is-short-film'));
    if (lastQuery) setValues(lastQuery);
    if (lastIsShortFilm) setIsShortFilm(lastIsShortFilm);
  }, [setValues]);

  React.useEffect(() => {
    setPartOfMoviesList(filterMoviesList.slice(0, defaultMoviesCounter));
  }, [moviesList, defaultMoviesCounter, filterMoviesList]);


  const handleSubmit = (event) => {
    event.preventDefault();
    getAndSetMovies();
    localStorage.setItem('last-query', JSON.stringify(values));
    localStorage.setItem('is-short-film', JSON.stringify(isShortFilm));
  }

  const checkboxChange = (event) => {
    setIsShortFilm(event.target.checked);
  }

  const showMoreMovies = () => {
    setdefaultMoviesCounter(defaultMoviesCounter + howMuchToAdd);
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
        isShortFilm={isShortFilm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        checkboxChange={checkboxChange}
      />
      <MoviesCardList
        partOfMoviesList={partOfMoviesList}
        showMoreMovies={showMoreMovies}
        toggleCardLike={toggleCardLike}
      />
    </main>
  )
}