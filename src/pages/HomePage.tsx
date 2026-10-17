import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatusMessage from '../components/StatusMessage';
import { formatDate } from '../utils/formatDate';
import { getPreview } from '../utils/newsPreview';




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

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(false);
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
    fetch('/api/articles?sort=date:desc&pagination[pageSize]=3&populate=image')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error.message || 'API error');
        setNews(data.data || []);
      })
      .catch((error) => {
        console.error('Ошибка загрузки новостей:', error);
        setNewsError(true);
      })
      .finally(() => setNewsLoading(false));
  }, []);

  return (
    <>
      <Header />

      <main id="main">
        <section className="hero">
          <div className="container hero-inner">
            <div>
              <p className="eyebrow">Частное образовательное учреждение дополнительного профессионального образования</p>
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
                <li><Link to="/sveden/osnovnye-svedeniya">Основные сведения</Link></li>
                <li><Link to="/sveden/dokumenty">Документы</Link></li>
                <li><Link to="/sveden/obrazovanie">Образование</Link></li>
                <li><Link to="/schedule">Расписание</Link></li>
                <li><Link to="/library">Учебная литература</Link></li>
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

        <section className="container home-section">
          <div className="section-heading">
            <h2>Последние новости</h2>
            <Link to="/news">Все новости →</Link>
          </div>

          {newsLoading && <StatusMessage>Загрузка…</StatusMessage>}
          {!newsLoading && newsError && (
            <StatusMessage variant="error">
              Не удалось загрузить данные. Попробуйте обновить страницу позже.
            </StatusMessage>
          )}
          {!newsLoading && !newsError && news.length === 0 && (
            <StatusMessage>Новостей пока нет.</StatusMessage>
          )}

          <div className="news-grid">
            {news.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.slug}`}
                className="news-card home-news-card reveal"
              >
                {item.image?.url ? (
                  <img
                    className="news-image"
                    src={`${item.image.url}`}
                    alt={item.title}
                  />
                ) : (
                  <div className="news-image news-image--placeholder" aria-hidden="true">
                    <img src="/logo-tempus1.png" alt="" />
                  </div>
                )}

                {item.date && <time className="news-date" dateTime={item.date}>{formatDate(item.date)}</time>}

                <h3>{item.title}</h3>

                {item.content && <p>{getPreview(item.content, item.title)}</p>}

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