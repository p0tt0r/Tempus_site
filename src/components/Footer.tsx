import { Link } from 'react-router-dom';
import Steps from './Steps';

export default function Footer() {
  return (
    <footer className="footer">
      <Steps className="footer-steps" />

      <div className="container footer-inner">
        <p className="footer-title">УМЦ «Темпус»</p>

        <div className="footer-columns">
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
            <Link to="/contacts" className="footer-more">Перейти к контактам →</Link>
          </div>

          <div className="footer-column">
            <Link to="/sveden/osnovnye-svedeniya" className="footer-sveden">
              Сведения об образовательной организации →
            </Link>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 ЧОУ ДПО УМЦ «Темпус». Все права защищены.</span>
      </div>
    </footer>
  );
}
