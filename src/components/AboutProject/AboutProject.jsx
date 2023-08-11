import AboutContainer from '../AboutContainer/AboutContainer';

export default function AboutProject() {
  const headerText = 'О проекте';

  return (
    <AboutContainer headerText={headerText}>
      <div className="about-project"></div >
    </AboutContainer>
  )
}