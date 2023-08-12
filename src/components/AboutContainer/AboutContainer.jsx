export default function AboutContainer(props) {
  const { title, type, children } = props;
  const aboutContainerClass = `about-container ${type ? `about-container_type_${type}` : ''}`;
  const contentClass = `about-container__content ${type ? `about-container__content_type_${type}` : ''}`;

  return (
    <section className={aboutContainerClass}>

      <div className={contentClass}>
        <h2 className="about-project__title">{title}</h2>

        {children}
      </div>

    </section>
  )
}