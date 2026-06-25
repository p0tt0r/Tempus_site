import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
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

type DocumentItem = {
  id: number;
  title: string;
  description?: string;
  category?: string;
  date?: string;
  order?: number;
  file?: {
    url: string;
    name: string;
  };
};

export default function EducationSectionPage() {
  const { slug } = useParams();

  const [section, setSection] = useState<Section | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  useEffect(() => {
    fetch(
      `http://185.239.50.50:1337/api/education-sections?filters[slug][$eq]=${slug}&populate=file`,
    )
      .then((res) => res.json())
      .then((data) => setSection(data.data?.[0] || null))
      .catch((error) => console.error('Ошибка загрузки раздела:', error));

    fetch('http://185.239.50.50:1337/api/education-sections?sort=order:asc')
      .then((res) => res.json())
      .then((data) => setSections(data.data || []))
      .catch((error) => console.error('Ошибка загрузки меню:', error));

    fetch('http://185.239.50.50:1337/api/documents?sort=order:asc&populate=file')
      .then((res) => res.json())
      .then((data) => setDocuments(data.data || []))
      .catch((error) => console.error('Ошибка загрузки документов:', error));
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
                className={item.slug === slug ? 'active-link' : ''}
              >
                {item.title}
              </Link>
            ))}
          </aside>

          <section className="sveden-content">
            {section ? (
              <>

                {section.content && (
                  <div className="section-content rich-content">
                    <ReactMarkdown>{section.content}</ReactMarkdown>
                  </div>
                )}

                {section.slug === 'dokumenty' && (
                  <div className="sveden-documents">
                    {documents.map((doc) => (
                      <a
                        key={doc.id}
                        className="sveden-document-card"
                        href={
                          doc.file?.url
                            ? `http://185.239.50.50:1337${doc.file.url}`
                            : '#'
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div>
                          <h3>{doc.title}</h3>
                          {doc.description && <p>{doc.description}</p>}
                          {doc.category && <span>{doc.category}</span>}
                        </div>

                        <strong>Скачать</strong>
                      </a>
                    ))}
                  </div>
                )}

                {section.file?.url && (
                  <a
                    className="document-link"
                    href={`http://185.239.50.50:1337${section.file.url}`}
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