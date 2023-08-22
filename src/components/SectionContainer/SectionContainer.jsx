export default function SectionContainer(props) {
  const { children, type } = props;

  const containerClass = `section-container ${type ? `section-container_${type}` : ''}`;
  const wrapperClass = `section-container__wrapper ${type ? `section-container__wrapper_${type}` : ''}`;

  return (
    <section className={containerClass}>

      <div className={wrapperClass}>
        {children}
      </div>

    </section>
  )
}