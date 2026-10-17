import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatusMessage from '../components/StatusMessage';
import { formatDate } from '../utils/formatDate';

type NewsItem = {
  id: number;
  title: string;
  slug: string;
  date?: string;
  content?: string;
  image?: {
    url: string;
    name: string;
  };
};

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(
      `/api/articles?filters[slug][$eq]=${slug}&populate=image`,
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error.message || 'API error');
        setNewsItem(data.data?.[0] || null);
      })
      .catch((error) => {
        console.error('Ошибка загрузки новости:', error);
        setNewsItem(null);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <>
      <Header />

      <main className="container page">
        {loading ? (
          <StatusMessage>Загрузка…</StatusMessage>
        ) : error ? (
          <>
            <Link to="/news" className="back-link">
              ← Все новости
            </Link>
            <StatusMessage variant="error">
              Не удалось загрузить данные. Попробуйте обновить страницу позже.
            </StatusMessage>
          </>
        ) : newsItem ? (
          <article className="news-detail">
            <Link to="/news" className="back-link">
              ← Все новости
            </Link>

            {newsItem.image?.url && (
              <img
                className="news-detail-image"
                src={`${newsItem.image.url}`}
                alt={newsItem.title}
              />
            )}

            {newsItem.date && <time className="news-date" dateTime={newsItem.date}>{formatDate(newsItem.date)}</time>}

            <h1>{newsItem.title}</h1>

            {newsItem.content && (
              <div className="news-detail-content rich-content">
                <ReactMarkdown>{newsItem.content}</ReactMarkdown>
              </div>
            )}
          </article>
        ) : (
          <>
            <Link to="/news" className="back-link">
              ← Все новости
            </Link>
            <StatusMessage>Новость не найдена</StatusMessage>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
