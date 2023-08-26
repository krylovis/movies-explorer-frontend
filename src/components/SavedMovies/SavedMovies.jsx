import React from 'react';

import SectionContainer from '../../components/SectionContainer/SectionContainer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import { MoviesListContext } from '../../contexts/MoviesListContext';

export default function SavedMovies() {

  const moviesList = React.useContext(MoviesListContext);
  const deleteCard = () => console.log('deleteCard');

  return (
    <main className="main">
      <SearchForm />
      {/* <SectionContainer type="type_movies-list">
        <ul className="list movies-list">
          {moviesList.map((card) => (
            <MoviesCard key={card._id}
              card={card}
              onBtnClick={deleteCard}
            />
          ))}
        </ul>
      </SectionContainer> */}
    </main>
  )
}