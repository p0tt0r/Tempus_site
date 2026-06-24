import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    fetch(
      `http://localhost:1337/api/education-sections?filters[slug][$eq]=${slug}&populate=file`,
    )
      .then((res) => res.json())
      .then((data) => setSection(data.data?.[0] || null))
      .catch((error) =>
        console.error('Ошибка загрузки раздела:', error),
      );

    fetch(
      'http://localhost:1337/api/education-sections?sort=order:asc',
    )
      .then((res) => res.json())
      .then((data) => setSections(data.data || []))
      .catch((error) =>
        console.error('Ошибка загрузки меню:', error),
      );
  }, [slug]);

  return (
    <>
      <Header />

      <main className="container page">
        <div className="sveden-layout">
          <aside className="sveden-sidebar">
            {sections.map((item) => (
              <Link
                key={item.id}
                to={`/sveden/${item.slug}`}
                className={
                  item.slug === slug
                    ? 'active-link'
                    : ''
                }
              >
                {item.title}
              </Link>
            ))}
          </aside>

          <section className="sveden-content">
            {section ? (
              <>
                <h1>{section.title}</h1>

                {section.content && (
                  <div>{section.content}</div>
                )}

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
              </>
            ) : (
              <p>Раздел не найден</p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}