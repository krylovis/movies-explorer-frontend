import SectionContainer from '../../components/SectionContainer/SectionContainer';
import MoviesCard from '../MoviesCard/MoviesCard';
import { cardList } from '../../utils/cardList';

export default function MoviesCardList() {

  const toggleCardLike = () => console.log('toggleCardLike');
  const showMoreMovies = () => console.log('moreFilms');

  return (
    <SectionContainer type="type_movies-list">
      <ul className="list type_movies-list__list">
        {cardList.map((card) => (
          <MoviesCard key={card._id}
            card={card}
            onBtnClick={toggleCardLike}
          />
        ))}
      </ul>

      <button
        className="button type_movies-list__button"
        type="button"
        aria-label="Показать больше фильмов"
        title="Показать больше фильмов"
        onClick={showMoreMovies}
      >
        Ещё
      </button>
    </SectionContainer>
  )
}