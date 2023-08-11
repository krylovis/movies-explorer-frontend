export default function AboutContainer(props) {
  const { title, children } = props;

  return (
    <section className="about-container">

      <div className="about-container__content">
        <h2 className="about-project__title">{title}</h2>

        {children}
      </div>

    </section>
  )
}