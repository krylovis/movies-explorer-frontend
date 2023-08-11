import AboutContainer from '../AboutContainer/AboutContainer';

export default function AboutProject() {
  const title = 'О проекте';
  const aboutProjectList = [
    {
      title: 'Дипломный проект включал 5 этапов',
      text: 'Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.',
    },
    {
      title: 'На выполнение диплома ушло 5 недель',
      text: 'У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.',
    }
  ];

  const listItems = aboutProjectList.map((item, index) =>
    <li key={index} className='about-project__item'>
      <h3 className='about-project__item-title'>{item.title}</h3>
      <p className='about-project__item-text'>{item.text}</p>
    </li>
  );

  return (
    <AboutContainer title={title}>
      <div className="about-project">
        <ul className='about-project__list'>
          {listItems}
        </ul>
      </div >
    </AboutContainer>
  )
}