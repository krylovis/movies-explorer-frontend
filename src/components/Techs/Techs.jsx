import AboutContainer from '../AboutContainer/AboutContainer';

export default function Techs() {
  const title = 'Технологии';
  const type = 'techs';

  return (
    <AboutContainer title={title} type={type}>
      <div className="techs"></div>
    </AboutContainer>
  )
}