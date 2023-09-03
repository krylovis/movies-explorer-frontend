import React from 'react';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import { useFormWithValidator } from '../../hooks/useForm';

export default function SavedMovies(props) {
  const { savedMoviesList, toggleCardLike } = props;
  const { values, isValid, setValues, handleChange } = useFormWithValidator({ query: '' });

  const [savedFilterList, setSavedFilterList] = React.useState([]);
  const [isShortFilm, setIsShortFilm] = React.useState(false);

  const filteringMoviesList = (list, query, isShort) => {
    return list.filter((item) => {
      const { nameRU, nameEN, duration } = item;

      if (isShort) return (nameRU.toLowerCase().includes(query.toLowerCase()) || nameEN.toLowerCase().includes(query.toLowerCase())) && duration <= 40;
      return nameRU.toLowerCase().includes(query.toLowerCase()) || nameEN.toLowerCase().includes(query.toLowerCase());
    });
  };

  const filterList = (movies) => {
    const filterData = filteringMoviesList(movies, values.query, isShortFilm);
    setSavedFilterList(filterData);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    filterList(savedMoviesList);
  }

  const checkboxChange = (event) => {
    setIsShortFilm(event.target.checked);
    filterList(savedMoviesList);
  }

  const list = (savedFilterList.length ? savedFilterList : savedMoviesList);

  return (
    <main className="main">
      <SearchForm
        values={values}
        isValid={isValid}
        isRequired={true}
        isShortFilm={isShortFilm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        checkboxChange={checkboxChange}
      />

      <MoviesCardList
        list={list}
        isSavedMovies={true}
        savedMoviesList={savedMoviesList}
        toggleCardLike={toggleCardLike}
      />

    </main>
  )
}