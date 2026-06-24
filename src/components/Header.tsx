import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          UMC TEMPUS
        </Link>

        <nav className="nav">
          <Link to="/">Главная</Link>
          <Link to="/sveden">Сведения об образовательной организации</Link>
          <Link to="/news">Новости</Link>
          <Link to="/schedule">Расписание</Link>
          <Link to="/library">Учебная литература</Link>
          <Link to="/contacts">Контакты</Link>
        </nav>
      </div>
    </header>
  );
}