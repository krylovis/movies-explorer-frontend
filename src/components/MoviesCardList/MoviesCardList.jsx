import SectionContainer from '../../components/SectionContainer/SectionContainer';
import MoviesCard from '../MoviesCard/MoviesCard';
import { cardList } from '../../utils/cardList';

export default function MoviesCardList() {

  const toggleCardLike = () => console.log('toggleCardLike');
  const showMoreMovies = () => console.log('moreFilms');

  return (
    <SectionContainer type="type_movies-list">
      <ul className="list movies-list">
        {cardList.map((card) => (
          <MoviesCard key={card._id}
            card={card}
            onBtnClick={toggleCardLike}
          />
        ))}
      </ul>

      <button
        className="button section-container__button"
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