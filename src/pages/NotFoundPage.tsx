import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Страница не найдена — УМЦ «Темпус»';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <>
      <Header />
      <main className="container page not-found-page">
        <h1>Страница не найдена</h1>
        <p>Возможно, страница была перемещена или адрес введён с ошибкой.</p>
        <div className="not-found-actions">
          <Link to="/" className="btn primary">
            На главную
          </Link>
          <Link to="/sveden" className="btn secondary">
            Сведения об организации
          </Link>
          <Link to="/search" className="btn secondary">
            Поиск по сайту
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
