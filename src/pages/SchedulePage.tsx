import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatusMessage from '../components/StatusMessage';
import { formatDate } from '../utils/formatDate';
import { formatFileInfo } from '../utils/fileInfo';

type ScheduleItem = {
  id: number;
  title: string;
  date?: string;
  description?: string;
  file?: {
    url: string;
    name: string;
    ext?: string;
    size?: number;
  };
};

export default function SchedulePage() {
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/schedules?sort=date:desc&populate=file')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error.message || 'API error');
        setItems(data.data || []);
      })
      .catch((error) => {
        console.error('Ошибка загрузки расписания:', error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />

      <main id="main" className="container list-page">
        <h1>Расписание</h1>

        {loading && <StatusMessage>Загрузка…</StatusMessage>}
        {!loading && error && (
          <StatusMessage variant="error">
            Не удалось загрузить данные. Попробуйте обновить страницу позже.
          </StatusMessage>
        )}
        {!loading && !error && items.length === 0 && (
          <StatusMessage>Расписание пока не опубликовано.</StatusMessage>
        )}

        <div className="file-list">
          {items.map((item) => {
            const meta = formatFileInfo(item.file);
            const content = (
              <>
                <div>
                  <h3>{item.title}</h3>
                  {item.description && <p>{item.description}</p>}
                  {item.date && <time dateTime={item.date}>{formatDate(item.date)}</time>}
                </div>

                {item.file?.url && (
                  <div className="file-action">
                    <strong>Открыть</strong>
                    {meta && <small className="file-meta">{meta}</small>}
                  </div>
                )}
              </>
            );
            return item.file?.url ? (
              <a
                key={item.id}
                className="file-row"
                href={item.file.url}
                target="_blank"
                rel="noreferrer"
              >
                {content}
              </a>
            ) : (
              <div key={item.id} className="file-row">
                {content}
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}