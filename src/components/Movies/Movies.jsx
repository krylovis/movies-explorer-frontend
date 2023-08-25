import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies(props) {
  const { getAndSetMovies } = props;

  return (
    <main className="main">
      <SearchForm getAndSetMovies={getAndSetMovies} />
      <MoviesCardList />
    </main>
  )
}