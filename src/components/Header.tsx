import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [svedenOpen, setSvedenOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setSvedenOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/logo-tempus.png" alt="УМЦ Темпус" className="brand-logo" />
          <span>УМЦ ТЕМПУС</span>
        </Link>

        <button
          className="burger"
          onClick={() => setMenuOpen(true)}
          aria-label="Открыть меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className="nav desktop-nav">
          <Link to="/">Главная</Link>

          <div className="nav-dropdown">
            <Link to="/sveden/osnovnye-svedeniya">
              Сведения об образовательной организации
            </Link>

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
          <Link to="/search">Поиск по сайту</Link>
        </nav>
      </div>

      <div className={menuOpen ? 'mobile-overlay active' : 'mobile-overlay'} onClick={closeMenu}></div>

      <aside className={menuOpen ? 'mobile-menu active' : 'mobile-menu'}>
        <button className="mobile-close" onClick={closeMenu}>×</button>

        <Link to="/" onClick={closeMenu}>Главная</Link>

        <button
          className="mobile-submenu-button"
          onClick={() => setSvedenOpen(!svedenOpen)}
        >
          Сведения об образовательной организации
          <span>{svedenOpen ? '−' : '+'}</span>
        </button>

        {svedenOpen && (
          <div className="mobile-submenu">
            <Link to="/sveden/osnovnye-svedeniya" onClick={closeMenu}>Основные сведения</Link>
            <Link to="/sveden/struktura-i-organy-upravleniya" onClick={closeMenu}>Структура и органы управления</Link>
            <Link to="/sveden/dokumenty" onClick={closeMenu}>Документы</Link>
            <Link to="/sveden/obrazovanie" onClick={closeMenu}>Образование</Link>
            <Link to="/sveden/rukovodstvo" onClick={closeMenu}>Руководство</Link>
            <Link to="/sveden/pedagogicheskiy-sostav" onClick={closeMenu}>Педагогический состав</Link>
            <Link to="/sveden/materialno-tehnicheskoe-obespechenie" onClick={closeMenu}>Материально-техническое обеспечение</Link>
            <Link to="/sveden/platnye-obrazovatelnye-uslugi" onClick={closeMenu}>Платные образовательные услуги</Link>
            <Link to="/sveden/finansovo-hozyaystvennaya-deyatelnost" onClick={closeMenu}>Финансово-хозяйственная деятельность</Link>
            <Link to="/sveden/vakantnye-mesta-dlya-priema" onClick={closeMenu}>Вакантные места для приема</Link>
            <Link to="/sveden/stipendii-i-mery-podderzhki" onClick={closeMenu}>Стипендии и меры поддержки</Link>
            <Link to="/sveden/obrazovatelnye-standarty-i-trebovaniya" onClick={closeMenu}>Образовательные стандарты</Link>
            <Link to="/sveden/mezhdunarodnoe-sotrudnichestvo" onClick={closeMenu}>Международное сотрудничество</Link>
            <Link to="/sveden/organizatsiya-pitaniya" onClick={closeMenu}>Организация питания</Link>
            
          </div>
        )}

        <Link to="/news" onClick={closeMenu}>Новости</Link>
        <Link to="/schedule" onClick={closeMenu}>Расписание</Link>
        <Link to="/library" onClick={closeMenu}>Учебная литература</Link>
        <Link to="/gallery" onClick={closeMenu}>Фотогалерея</Link>
        <Link to="/contacts" onClick={closeMenu}>Контакты</Link>
        <Link to="/search" onClick={closeMenu}>Поиск по сайту</Link>
      </aside>
    </header>
  );
}