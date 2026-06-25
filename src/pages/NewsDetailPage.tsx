import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
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
    name: string;
  };
};

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    fetch(
      `http://185.239.50.50:1337/api/articles?filters[slug][$eq]=${slug}&populate=image`,
    )
      .then((res) => res.json())
      .then((data) => setNewsItem(data.data?.[0] || null))
      .catch((error) => console.error('Ошибка загрузки новости:', error));
  }, [slug]);

  return (
    <>
      <Header />

      <main className="container page">
        {newsItem ? (
          <article className="news-detail">
            <Link to="/news" className="back-link">
              ← Все новости
            </Link>

            {newsItem.image?.url && (
              <img
                className="news-detail-image"
                src={`http://185.239.50.50:1337${newsItem.image.url}`}
                alt={newsItem.title}
              />
            )}

            {newsItem.date && <span className="news-date">{newsItem.date}</span>}

            <h1>{newsItem.title}</h1>

            {newsItem.content && (
              <div className="rich-content">
                <ReactMarkdown>{newsItem.content}</ReactMarkdown>
              </div>
            )}
          </article>
        ) : (
          <p>Новость не найдена</p>
        )}
      </main>

      <Footer />
    </>
  );
}