import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

type NewsItem = {
  id: number;
  title: string;
  date?: string;
  content?: string;
  image?: {
    url: string;
  };
};

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:1337/api/articles?sort=date:desc&pagination[pageSize]=3&populate=image')
      .then((res) => res.json())
      .then((data) => setNews(data.data || []))
      .catch((error) => console.error('Ошибка загрузки новостей:', error));
  }, []);

  return (
    <>
      <Header />

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div>
              <p className="eyebrow">Образовательный центр</p>
              <h1>УМЦ Темпус</h1>
              <p className="hero-text">
                Информационный сайт центра: сведения об образовательной организации,
                новости, документы, расписание, учебная литература и фотогалерея.
              </p>

              <div className="hero-actions">
                <Link to="/sveden" className="btn primary">
                  Сведения об организации
                </Link>
                <Link to="/contacts" className="btn secondary">
                  Контакты
                </Link>
              </div>
            </div>

            <div className="hero-card">
              <h3>Разделы сайта</h3>
              <ul>
                <li>Основные сведения</li>
                <li>Документы</li>
                <li>Образование</li>
                <li>Расписание</li>
                <li>Учебная литература</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="container home-about">
          <h2>О центре</h2>
          <p>
            ЧОУ ДПО УМЦ «Темпус» осуществляет образовательную деятельность
            по программам дополнительного профессионального образования,
            повышения квалификации и профессиональной переподготовки.
          </p>
        </section>

        <section className="container home-section">
          <div className="section-heading">
            <h2>Последние новости</h2>
            <Link to="/news">Все новости →</Link>
          </div>

          <div className="news-grid">
            {news.map((item) => (
              <article key={item.id} className="news-card">
                {item.image?.url && (
                  <img
                    className="news-image"
                    src={`http://localhost:1337${item.image.url}`}
                    alt={item.title}
                  />
                )}

                {item.date && <span className="news-date">{item.date}</span>}
                <h3>{item.title}</h3>
                {item.content && <p>{item.content}</p>}
              </article>
            ))}
          </div>
        </section>

        <section className="container quick-links">
          <h2>Популярные разделы</h2>

          <div className="quick-links-grid">
            <Link to="/sveden">Сведения об образовательной организации</Link>
            <Link to="/sveden/dokumenty">Документы</Link>
            <Link to="/schedule">Расписание</Link>
            <Link to="/library">Учебная литература</Link>
            <Link to="/gallery">Фотогалерея</Link>
            <Link to="/contacts">Контакты</Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}