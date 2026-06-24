import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div>
          <h3>УМЦ TEMPUS</h3>
          <p>Информационный сайт образовательного центра.</p>
          <p>ЧОУ ДПО УМЦ «Темпус»</p>
        </div>

        <div>
          <h4>Разделы</h4>
          <ul>
            <li><Link to="/sveden">Сведения об образовательной организации</Link></li>
            <li><Link to="/news">Новости</Link></li>
            <li><Link to="/schedule">Расписание</Link></li>
            <li><Link to="/library">Учебная литература</Link></li>
            <li><Link to="/gallery">Фотогалерея</Link></li>
          </ul>
        </div>

        <div>
          <h4>Контакты</h4>
          <p>Ростов-на-Дону</p>
          <p>ЧОУ ДПО УМЦ «Темпус»</p>
          <Link to="/contacts">Перейти к контактам</Link>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 УМЦ TEMPUS. Все права защищены.
      </div>
    </footer>
  );
}