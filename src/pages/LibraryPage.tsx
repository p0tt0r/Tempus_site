import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatusMessage from '../components/StatusMessage';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/library-items?sort=title:asc&populate=file')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error.message || 'API error');
        setItems(data.data || []);
      })
      .catch((error) => {
        console.error('Ошибка загрузки литературы:', error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />

      <main className="container page">
        <h1>Учебная литература по программам</h1>

        {loading && <StatusMessage>Загрузка…</StatusMessage>}
        {!loading && error && (
          <StatusMessage variant="error">
            Не удалось загрузить данные. Попробуйте обновить страницу позже.
          </StatusMessage>
        )}
        {!loading && !error && items.length === 0 && (
          <StatusMessage>Учебная литература пока не добавлена.</StatusMessage>
        )}

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