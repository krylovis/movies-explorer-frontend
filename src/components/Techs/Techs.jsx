import AboutContainer from '../AboutContainer/AboutContainer';

export default function Techs() {
  const title = 'Технологии';
  const type = 'techs';
  const techsList = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];
  const techsTitle = `${techsList.length} технологий`;

  const techsItems = techsList.map((techsItem, index) =>
    <li key={index} className="techs__item">{techsItem}</li>);

  return (
    <AboutContainer title={title} type={type}>
      <div className="techs">

        <div className="techs__info">
          <h3 className="techs__title">{techsTitle}</h3>
          <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        </div>

        <ul className="list techs__list">
          {techsItems}
        </ul>

      </div>
    </AboutContainer>
  )
}