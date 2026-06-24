import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';

type Section = {
  id: number;
  title: string;
  slug: string;
  content?: string;
  file?: {
    url: string;
    name: string;
  };
};

export default function EducationSectionPage() {
  const { slug } = useParams();
  const [section, setSection] = useState<Section | null>(null);

  useEffect(() => {
    fetch(`http://localhost:1337/api/education-sections?filters[slug][$eq]=${slug}&populate=file`)
      .then((res) => res.json())
      .then((data) => setSection(data.data?.[0] || null))
      .catch((error) => console.error('Ошибка загрузки раздела:', error));
  }, [slug]);

  return (
    <>
      <Header />

      <main className="container page">
        <Link to="/sveden" className="document-link">← Назад</Link>

        {section ? (
          <section className="education-section">
            <h1>{section.title}</h1>

            {section.content && <p>{section.content}</p>}

            {section.file?.url && (
              <a
                className="document-link"
                href={`http://localhost:1337${section.file.url}`}
                target="_blank"
                rel="noreferrer"
              >
                Скачать документ
              </a>
            )}
          </section>
        ) : (
          <p>Раздел не найден</p>
        )}
      </main>
    </>
  );
}