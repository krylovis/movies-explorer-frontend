import iconLink from '../../images/interface/arrow-up.svg';
export default function Portfolio() {
  const portfolioLinks = [
    {
      name: 'Статичный сайт',
      link: 'https://github.com/krylovis/how-to-learn',
    },
    {
      name: 'Адаптивный сайт',
      link: 'https://github.com/krylovis/russian-travel',
    },
    {
      name: 'Одностраничное приложение',
      link: 'https://github.com/krylovis/react-mesto-api-full-gha',
    }
  ];

  const linkItem = portfolioLinks.map((item, index) =>
    <li key={index} className="portfolio__item">
      <a href={item.link} target="_blank" className="link portfolio__link" rel="noreferrer">
        {item.name}
        <img className="portfolio__link-icon" src={iconLink} alt="link icon" />
      </a>
    </li>);

  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h3 className="portfolio__title">Портфолио</h3>

        <ul className="list portfolio__list">
          {linkItem}
        </ul>
      </div>
    </section>
  )
}