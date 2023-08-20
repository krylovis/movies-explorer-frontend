import SectionContainer from '../../components/SectionContainer/SectionContainer';
import MoviesCard from '../MoviesCard/MoviesCard';
import { cardList } from '../../utils/cardList';

export default function MoviesCardList() {

  const toggleCardLike = () => console.log('toggleCardLike');

  return (
    <SectionContainer type="type_movies-list">
      {cardList.map((card) => (
        <MoviesCard key={card._id}
          card={card}
          onBtnClick={toggleCardLike}
        />
      ))}
    </SectionContainer>
  )
}