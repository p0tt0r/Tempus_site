import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

type NewsItem = {
  id: number;
  title: string;
  date: string;
  content: string;
  image?: {
    url: string;
  };
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:1337/api/articles?sort=date:desc&populate=image')
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
            <article key={item.id} className="news-card">
                {item.image?.url && (
  <img
    className="news-image"
    src={`http://localhost:1337${item.image.url}`}
    alt={item.title}
  />
)}
              <span className="news-date">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}