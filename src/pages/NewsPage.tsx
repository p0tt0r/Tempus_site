import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch(
      'http://185.239.50.50:1337/api/articles?sort=date:desc&populate=*'
    )
      .then((res) => res.json())
      .then((data) => {
        setNews(data.data || []);
      })
      .catch((error) => {
        console.error('Ошибка загрузки новостей:', error);
      });
  }, []);

  return (
    <>
      <Header />

      <main className="container page">
        <h1>Новости</h1>

        <div className="news-grid">
          {news.map((item) => (
            <Link
              key={item.id}
              to={`/news/${item.slug}`}
              className="news-card"
            >
              {item.image?.url && (
                <img
                  className="news-image"
                  src={`http://185.239.50.50:1337${item.image.url}`}
                  alt={item.title}
                />
              )}

              {item.date && (
                <span className="news-date">
                  {item.date}
                </span>
              )}

              <h3>{item.title}</h3>

              {item.content && (
                <p>
                  {item.content.slice(0, 150)}...
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