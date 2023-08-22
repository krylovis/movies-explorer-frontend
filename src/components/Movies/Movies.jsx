import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies() {
  return (
    <main className="main">
      <SearchForm />
      <MoviesCardList />
    </main>
  )
}