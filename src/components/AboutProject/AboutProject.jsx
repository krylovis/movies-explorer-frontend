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

  const timelineList = [
    {
      title: '1 неделя',
      text: 'Back-end',
    },
    {
      title: '4 недели',
      text: 'Front-end',
    }
  ];

  const listItems = aboutProjectList.map((item, index) =>
    <li key={index} className='about-project__item'>
      <h3 className='about-project__item-title'>{item.title}</h3>
      <p className='about-project__item-text'>{item.text}</p>
    </li>
  );

  const timelineItems = timelineList.map((timelineItem, index) =>
    <li key={index} className='about-project__timeline-item'>
      <h3 className='about-project__timeline-item-title'>{timelineItem.title}</h3>
      <p className='about-project__timeline-item-text'>{timelineItem.text}</p>
    </li>
  );

  return (
    <AboutContainer title={title}>
      <div className="about-project">

        <ul className='about-project__list'>
          {listItems}
        </ul>

        <ul className="about-project__timeline">
          {timelineItems}
        </ul>

      </div >
    </AboutContainer>
  )
}