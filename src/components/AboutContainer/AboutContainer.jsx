export default function AboutContainer(props) {
  const { title, type, children } = props;
  const aboutContainerClass = `about-container ${type ? `about-container_type_${type}` : ''}`;
  const contentClass = `about-container__content ${type ? `about-container__content_type_${type}` : ''}`;
  const titleClass = `about-project__title ${type ? `about-project__title_type_${type}` : ''}`;

  return (
    <section className={aboutContainerClass}>

      <div className={contentClass}>
        <h2 className={titleClass}>{title}</h2>

        {children}
      </div>

    </section>
  )
}