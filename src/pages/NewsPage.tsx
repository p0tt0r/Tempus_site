import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      '/api/articles?sort=date:desc&populate=*'
    )
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
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />

      <main className="container page">
        <h1>Новости</h1>

        {loading && <StatusMessage>Загрузка…</StatusMessage>}
        {!loading && error && (
          <StatusMessage variant="error">
            Не удалось загрузить данные. Попробуйте обновить страницу позже.
          </StatusMessage>
        )}
        {!loading && !error && news.length === 0 && (
          <StatusMessage>Новостей пока нет.</StatusMessage>
        )}

        <div className="news-grid">
          {news.map((item) => (
            <Link
              key={item.id}
              to={`/news/${item.slug}`}
              className="news-card"
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

              {item.date && (
                <time className="news-date" dateTime={item.date}>
                  {formatDate(item.date)}
                </time>
              )}

              <h3>{item.title}</h3>

              {item.content && (
                <p>
                  {getPreview(item.content, item.title)}
                </p>
              )}
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}