export default function SectionContainer(props) {
  const { children } = props;

  return (
    <div className="section-container">
      <div className="section-container__wrapper"></div>
      {children}
    </div>
  )
}