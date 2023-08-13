export default function Footer() {
  const fullYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
        <div className="footer__nav-container">
          <span className="footer__date">© {fullYear}</span>
          <nav className="footer__links">
            <a href="https://practicum.yandex.ru/" target="_blank" className="link footer__link" rel="noreferrer">Яндекс.Практикум</a>
            <a href="https://github.com/" target="_blank" className="link footer__link" rel="noreferrer">Github</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}