import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';




type NewsItem = {
  id: number;
  title: string;
  slug: string;
  date?: string;
  content?: string;
  image?: {
    url: string;
  };
};

function getPreview(text?: string, length = 160) {
  if (!text) return '';

  return text
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*/g, '')
    .replace(/[*_>`]/g, '')
    .replace(/-\s/g, '')
    .replace(/\n/g, ' ')
    .trim()
    .slice(0, length);
}

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const value = searchText.trim();

    if (value) {
      navigate(`/search?q=${encodeURIComponent(value)}`);
    } else {
      navigate('/search');
    }
  };

  useEffect(() => {
    fetch('http://185.239.50.50:1337/api/articles?sort=date:desc&pagination[pageSize]=3&populate=image')
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

        <section className="container home-about reveal">
          <h2>О центре</h2>
          <p>
            ЧОУ ДПО УМЦ «Темпус» осуществляет образовательную деятельность
            по программам дополнительного профессионального образования,
            повышения квалификации и профессиональной переподготовки.
          </p>
        </section>

        <section className="container home-sectionr eveal">
          <div className="section-heading">
            <h2>Последние новости</h2>
            <Link to="/news">Все новости →</Link>
          </div>

          <div className="news-grid">
            {news.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.slug}`}
                className="news-card home-news-card reveal"
              >
                {item.image?.url && (
                  <img
                    className="news-image"
                    src={`http://185.239.50.50:1337${item.image.url}`}
                    alt={item.title}
                  />
                )}

                {item.date && <span className="news-date">{item.date}</span>}

                <h3>{item.title}</h3>

                {item.content && <p>{getPreview(item.content)}...</p>}

                <strong className="read-more">Читать далее →</strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="container quick-links reveal">
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
        <section className="container search-preview reveal">
          <div className="search-preview-card">
            <h2>Поиск по сайту</h2>
            <p>Быстро найдите нужный документ, новость или раздел сайта.</p>

            <div className="search-preview-form">
              <input
                type="text"
                placeholder="Введите запрос..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />

              <button type="button" onClick={handleSearch}>
                Найти
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}