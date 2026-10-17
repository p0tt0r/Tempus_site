import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

type LibraryItem = {
  id: number;
  title: string;
  author?: string;
  year?: number;
  file?: {
    url: string;
    name: string;
  };
};

export default function LibraryPage() {
  const [items, setItems] = useState<LibraryItem[]>([]);

  useEffect(() => {
    fetch('/api/library-items?sort=title:asc&populate=file')
      .then((res) => res.json())
      .then((data) => setItems(data.data || []))
      .catch((error) => console.error('Ошибка загрузки литературы:', error));
  }, []);

  return (
    <>
      <Header />

      <main className="container page">
        <h1>Учебная литература по программам</h1>

        <div className="documents-list reveal">
          {items.map((item) => (
            <a
              key={item.id}
              className="document-item reveal"
              href={item.file?.url ? `${item.file.url}` : '#'}
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <h3>{item.title}</h3>
                {item.author && <p>{item.author}</p>}
                {item.year && <span>{item.year}</span>}
              </div>
              <strong>Скачать</strong>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}