import AboutContainer from '../AboutContainer/AboutContainer';

export default function AboutProject() {
  const title = 'О проекте';

  return (
    <AboutContainer title={title}>
      <div className="about-project"></div >
    </AboutContainer>
  )
}