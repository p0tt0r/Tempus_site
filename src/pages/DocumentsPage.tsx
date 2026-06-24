import { useEffect, useState } from 'react';
import Header from '../components/Header';

type DocumentItem = {
  id: number;
  title: string;
  category?: string;
  date?: string;
  file?: {
    url: string;
    name: string;
  };
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  useEffect(() => {
    fetch('http://localhost:1337/api/documents?sort=date:desc&populate=file')
      .then((res) => res.json())
      .then((data) => setDocuments(data.data || []))
      .catch((error) => console.error('Ошибка загрузки документов:', error));
  }, []);

  return (
    <>
      <Header />

      <main className="container page">
        <h1>Документы</h1>

        <div className="documents-list">
          {documents.map((doc) => (
            <a
              key={doc.id}
              className="document-item"
              href={doc.file?.url ? `http://localhost:1337${doc.file.url}` : '#'}
              target="_blank"
              rel="noreferrer"
            >
              <div>
                <h3>{doc.title}</h3>
                {doc.category && <p>{doc.category}</p>}
                {doc.date && <span>{doc.date}</span>}
              </div>
              <strong>Скачать</strong>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}