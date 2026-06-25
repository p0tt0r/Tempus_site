import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

type ScheduleItem = {
  id: number;
  title: string;
  date?: string;
  description?: string;
  file?: {
    url: string;
    name: string;
  };
};

export default function SchedulePage() {
  const [items, setItems] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    fetch('http://185.239.50.50:1337/api/schedules?sort=date:desc&populate=file')
      .then((res) => res.json())
      .then((data) => setItems(data.data || []))
      .catch((error) => console.error('Ошибка загрузки расписания:', error));
  }, []);

  return (
    <>
      <Header />

      <main className="container page">
        <h1>Расписание</h1>

        <div className="documents-list">
          {items.map((item) => (
            <a
              key={item.id}
              className="document-item"
              href={item.file?.url ? `http://185.239.50.50:1337${item.file.url}` : '#'}
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
                {item.date && <span>{item.date}</span>}
              </div>
              <strong>Открыть</strong>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}