import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div>
              <p className="eyebrow">Образовательный проект</p>
              <h1>UMC TEMPUS</h1>
              <p className="hero-text">
                Информационный сайт центра: новости, документы, материалы,
                фотогалерея и контакты.
              </p>

              <div className="hero-actions">
                <Link to="/documents" className="btn primary">Документы</Link>
                <Link to="/contacts" className="btn secondary">Контакты</Link>
              </div>
            </div>

            <div className="hero-card">
              <h3>Разделы сайта</h3>
              <ul>
                <li>Новости и объявления</li>
                <li>Документы для скачивания</li>
                <li>Фотографии и материалы</li>
                <li>Информация о проекте</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}