import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [svedenOpen, setSvedenOpen] = useState(false);
  const { pathname } = useLocation();
  const svedenActive = pathname.startsWith('/sveden');

  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    setSvedenOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSvedenOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/logo-tempus1.png" alt="УМЦ Темпус" className="brand-logo" />
          <span>УМЦ ТЕМПУС</span>
        </Link>

        <button
          ref={burgerRef}
          type="button"
          className="burger"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
          aria-label="Открыть меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <Link to="/search" className="header-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          Поиск по сайту
        </Link>
      </div>

      <div className="header-nav-row">
        <div className="container">
          <nav className="nav desktop-nav">
            <NavLink to="/" end>Главная</NavLink>

            <div className="nav-dropdown">
              <Link to="/sveden/osnovnye-svedeniya" className={svedenActive ? 'active' : undefined} aria-current={svedenActive ? 'page' : undefined}>
                Сведения об образовательной организации
              </Link>

              <div className="dropdown-menu">
                <Link to="/sveden/osnovnye-svedeniya">Основные сведения</Link>
                <Link to="/sveden/struktura-i-organy-upravleniya">Структура и органы управления</Link>
                <Link to="/sveden/dokumenty">Документы</Link>
                <Link to="/sveden/obrazovanie">Образование</Link>
                <Link to="/sveden/rukovodstvo">Руководство</Link>
                <Link to="/sveden/pedagogicheskij-sostav">Педагогический состав</Link>
                <Link to="/sveden/materialno-tehnicheskoe-obespechenie-i-dostupnaya-sreda">Материально-техническое обеспечение</Link>
                <Link to="/sveden/platnye-obrazovatelnye-uslugi">Платные образовательные услуги</Link>
                <Link to="/sveden/finansovo-hozyajstvennaya-deyatelnost">Финансово-хозяйственная деятельность</Link>
                <Link to="/sveden/vakantnye-mesta-dlya-priema-perevoda">Вакантные места для приема</Link>
                <Link to="/sveden/stipendiya-i-mery-podderzhki-obuchayushhihsya">Стипендии и меры поддержки</Link>
                <Link to="/sveden/obrazovatelnyj-standarty-i-trebovaniya">Образовательные стандарты и требования</Link>
                <Link to="/sveden/education-section">Международное сотрудничество</Link>
                <Link to="/sveden/organizacziya-pitaniya">Организация питания</Link>
              </div>
            </div>

            <NavLink to="/news">Новости</NavLink>
            <NavLink to="/schedule">Расписание</NavLink>
            <NavLink to="/library">Учебная литература</NavLink>
            <NavLink to="/gallery">Фотогалерея</NavLink>
            <NavLink to="/contacts">Контакты</NavLink>
          </nav>
        </div>
      </div>

      <div className={menuOpen ? 'mobile-overlay active' : 'mobile-overlay'} onClick={closeMenu}></div>

      <aside
        id="mobile-menu"
        aria-label="Меню"
        inert={!menuOpen}
        className={menuOpen ? 'mobile-menu active' : 'mobile-menu'}
      >
        <button
          ref={closeRef}
          type="button"
          className="mobile-close"
          aria-label="Закрыть меню"
          onClick={() => {
            closeMenu();
            burgerRef.current?.focus();
          }}
        >×</button>

        <NavLink to="/" end onClick={closeMenu}>Главная</NavLink>

        <button
          type="button"
          aria-expanded={svedenOpen}
          className={svedenActive ? 'mobile-submenu-button active' : 'mobile-submenu-button'}
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
            <Link to="/sveden/pedagogicheskij-sostav" onClick={closeMenu}>Педагогический состав</Link>
            <Link to="/sveden/materialno-tehnicheskoe-obespechenie-i-dostupnaya-sreda" onClick={closeMenu}>Материально-техническое обеспечение</Link>
            <Link to="/sveden/platnye-obrazovatelnye-uslugi" onClick={closeMenu}>Платные образовательные услуги</Link>
            <Link to="/sveden/finansovo-hozyajstvennaya-deyatelnost" onClick={closeMenu}>Финансово-хозяйственная деятельность</Link>
            <Link to="/sveden/vakantnye-mesta-dlya-priema-perevoda" onClick={closeMenu}>Вакантные места для приема</Link>
            <Link to="/sveden/stipendiya-i-mery-podderzhki-obuchayushhihsya" onClick={closeMenu}>Стипендии и меры поддержки</Link>
            <Link to="/sveden/obrazovatelnyj-standarty-i-trebovaniya" onClick={closeMenu}>Образовательные стандарты</Link>
            <Link to="/sveden/education-section" onClick={closeMenu}>Международное сотрудничество</Link>
            <Link to="/sveden/organizacziya-pitaniya" onClick={closeMenu}>Организация питания</Link>
            
          </div>
        )}

        <NavLink to="/news" onClick={closeMenu}>Новости</NavLink>
        <NavLink to="/schedule" onClick={closeMenu}>Расписание</NavLink>
        <NavLink to="/library" onClick={closeMenu}>Учебная литература</NavLink>
        <NavLink to="/gallery" onClick={closeMenu}>Фотогалерея</NavLink>
        <NavLink to="/contacts" onClick={closeMenu}>Контакты</NavLink>
        <NavLink to="/search" onClick={closeMenu}>Поиск по сайту</NavLink>
      </aside>
    </header>
  );
}