import SectionContainer from '../../components/SectionContainer/SectionContainer';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList() {

  const cardList = [
    {
      _id: 1,
      poster: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/d7e3dbd6-e4a9-4485-b751-d02f49825166/300x450',
      name: 'Пираты Карибского моря: Проклятие Чёрной жемчужины',
      duration: '2 часа 23 минуты',
      like: false,
    }
  ];

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