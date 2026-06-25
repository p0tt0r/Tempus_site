import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <img src="/logo-tempus.png" alt="УМЦ Темпус" className="brand-logo" />
          <span>УМЦ ТЕМПУС</span>
        </Link>

        <nav className="nav">
          <Link to="/">Главная</Link>

          <div className="nav-dropdown">
            <Link to="/sveden/osnovnye-svedeniya">Сведения об образовательной организации</Link>

            <div className="dropdown-menu">
              
                <Link to="/sveden/osnovnye-svedeniya">Основные сведения</Link>
                <Link to="/sveden/struktura-i-organy-upravleniya">Структура и органы управления</Link>
                <Link to="/sveden/dokumenty">Документы</Link>
                <Link to="/sveden/obrazovanie">Образование</Link>
                <Link to="/sveden/rukovodstvo">Руководство</Link>
                <Link to="/sveden/pedagogicheskiy-sostav">Педагогический состав</Link>
                <Link to="/sveden/materialno-tehnicheskoe-obespechenie">Материально-техническое обеспечение</Link>
                <Link to="/sveden/platnye-obrazovatelnye-uslugi">Платные образовательные услуги</Link>
                <Link to="/sveden/finansovo-hozyaystvennaya-deyatelnost">Финансово-хозяйственная деятельность</Link>
                <Link to="/sveden/vakantnye-mesta-dlya-priema">Вакантные места для приема</Link>
                <Link to="/sveden/stipendii-i-mery-podderzhki">Стипендии и меры поддержки</Link>
                <Link to="/sveden/obrazovatelnye-standarty-i-trebovaniya">Образовательные стандарты и требования</Link>
                <Link to="/sveden/mezhdunarodnoe-sotrudnichestvo">Международное сотрудничество</Link>
                <Link to="/sveden/organizatsiya-pitaniya">Организация питания</Link>
  
            </div>
          </div>

          <Link to="/news">Новости</Link>
          <Link to="/schedule">Расписание</Link>
          <Link to="/library">Учебная литература</Link>
          <Link to="/gallery">Фотогалерея</Link>
          <Link to="/contacts">Контакты</Link>
        </nav>
      </div>
    </header>
  );
}
