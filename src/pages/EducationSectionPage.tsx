import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_URL = 'http://185.239.50.50:1337';

type PageDocument = {
  id: number;
  title: string;
  description?: string;
  order?: number;
  file?: {
    url: string;
    name: string;
  } | null;
};

type Section = {
  id: number;
  title: string;
  slug: string;
  main_content?: string;
  documents?: PageDocument[];
};

export default function EducationSectionPage() {
  const { slug } = useParams();

  const [section, setSection] = useState<Section | null>(null);
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    fetch(
      `${API_URL}/api/education-sections?filters[slug][$eq]=${slug}&populate[documents][populate]=file`,
    )
      .then((res) => res.json())
      .then((data) => setSection(data.data?.[0] || null))
      .catch((error) => console.error('Ошибка загрузки раздела:', error));

    fetch(`${API_URL}/api/education-sections?sort=order:asc`)
      .then((res) => res.json())
      .then((data) => setSections(data.data || []))
      .catch((error) => console.error('Ошибка загрузки меню:', error));
  }, [slug]);

  const sortedDocuments = [...(section?.documents || [])].sort(
    (a, b) => (a.order ?? 9999) - (b.order ?? 9999),
  );

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
                className={item.slug === slug ? 'active-link' : ''}
              >
                {item.title}
              </Link>
            ))}
          </aside>

          <section className="sveden-content">
            {section ? (
              <>
                <h1>{section.title}</h1>

                {section.main_content && (
                  <div className="section-content rich-content">
                    <ReactMarkdown>{section.main_content}</ReactMarkdown>
                  </div>
                )}

                {sortedDocuments.length > 0 && (
                  <div className="sveden-documents">
                    {sortedDocuments.map((doc) => (
                      <div key={doc.id} className="sveden-document-card">
                        <div>
                          <h3>{doc.title}</h3>

                          {doc.description && (
                            <div className="document-description rich-content">
                              <ReactMarkdown>{doc.description}</ReactMarkdown>
                            </div>
                          )}
                        </div>

                        {doc.file?.url && (
                          <a
                            href={`${API_URL}${doc.file.url}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Скачать
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
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