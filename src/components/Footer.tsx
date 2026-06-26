import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo-row">
            <img src="/logo-tempus1.png" alt="УМЦ Темпус" />
            <div>
              <strong>УМЦ TEMPUS</strong>
              <span>Учебно-методический центр</span>
            </div>
          </div>

          <p>
            Информационный сайт образовательного центра: сведения об организации,
            документы, расписание, учебная литература, новости и фотогалерея.
          </p>
        </div>

        <div className="footer-column">
          <h3>Разделы</h3>
          <Link to="/sveden/osnovnye-svedeniya">Сведения об организации</Link>
          <Link to="/sveden/dokumenty">Документы</Link>
          <Link to="/news">Новости</Link>
          <Link to="/schedule">Расписание</Link>
          <Link to="/library">Учебная литература</Link>
          <Link to="/gallery">Фотогалерея</Link>
        </div>

        <div className="footer-column">
          <h3>Контакты</h3>
          <p>Ростов-на-Дону</p>
          <p>ЧОУ ДПО УМЦ «Темпус»</p>
          <a href="tel:+79198706727">+7 (919) 870-67-27</a>
          <a href="mailto:umc.tempus@gmail.com">umc.tempus@gmail.com</a>
          <Link to="/contacts" className="footer-contact-link">
            Перейти к контактам →
          </Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 УМЦ TEMPUS. Все права защищены.</span>
        <Link to="/search">Поиск по сайту</Link>
      </div>
    </footer>
  );
}