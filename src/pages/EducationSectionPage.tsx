import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatusMessage from '../components/StatusMessage';

const API_URL = '';

type MediaFile = {
    url: string;
    name: string;
};

type PageDocument = {
    id: number;
    title: string;
    description?: string;
    order?: number;
    file?: MediaFile | MediaFile[] | null;
};

type Section = {
    id: number;
    title: string;
    slug: string;
    order?: number;
    content?: string;
    documents?: PageDocument[];
};

type OldDocumentItem = {
    id: number;
    title: string;
    description?: string;
    category?: string;
    date?: string;
    order?: number;
    file?: MediaFile | null;
};

function getFileUrl(file?: MediaFile | MediaFile[] | null) {
    if (!file) return null;

    if (Array.isArray(file)) {
        return file[0]?.url ? `${API_URL}${file[0].url}` : null;
    }

    return file.url ? `${API_URL}${file.url}` : null;
}

export default function EducationSectionPage() {
    const { slug } = useParams();

    const [section, setSection] = useState<Section | null>(null);
    const [sections, setSections] = useState<Section[]>([]);
    const [documents, setDocuments] = useState<OldDocumentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);

        fetch(
            `${API_URL}/api/education-sections?sort=order:asc&pagination[pageSize]=50&populate=*`,
        )
            .then((res) => res.json())
            .then((data) => {
                setSections(data.data || []);
            })
            .catch((error) => console.error('Ошибка загрузки меню:', error));

        fetch(
            `${API_URL}/api/education-sections?filters[slug][$eq]=${slug}&populate[documents][populate]=file`,
        )
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                if (data.error) throw new Error(data.error.message || 'API error');
                setSection(data.data?.[0] || null);
            })
            .catch((error) => {
                console.error('Ошибка загрузки раздела:', error);
                setSection(null);
                setError(true);
            })
            .finally(() => setLoading(false));

        if (slug === 'dokumenty') {
            fetch(`${API_URL}/api/documents?sort=order:asc&populate=file`)
                .then((res) => res.json())
                .then((data) => setDocuments(data.data || []))
                .catch((error) => console.error('Ошибка загрузки документов:', error));
        } else {
            setDocuments([]);
        }
    }, [slug]);

    const sectionDocuments = [...(section?.documents || [])].sort(
        (a, b) => (a.order ?? 9999) - (b.order ?? 9999),
    );

    return (
        <>
            <Header />

            <main className="container page">

                <button
                    className="sidebar-toggle"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? "✕ Закрыть разделы" : "☰ Разделы сведений"}
                </button>

                <div className="education-layout">
                    <aside
                        className={`education-sidebar ${sidebarOpen ? "open" : ""
                            }`}
                    >
                        {sections.map((item) => (
                            <Link
                                key={item.id}
                                to={`/sveden/${item.slug}`}
                                className={item.slug === slug ? "active-link" : ""}
                                onClick={() => setSidebarOpen(false)}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </aside>

                    <section className="education-content">
                        {loading && <StatusMessage>Загрузка…</StatusMessage>}

                        {!loading && section ? (
                            <>
                                <h1>{section.title}</h1>

                                {section.content?.trim() && (
                                    <div className="section-content rich-content">
                                        <ReactMarkdown>{section.content}</ReactMarkdown>
                                    </div>
                                )}

                                {slug === 'dokumenty' && documents.length > 0 && (
                                    <div className="sveden-documents">
                                        {documents.map((doc) => {
                                            const fileUrl = getFileUrl(doc.file);

                                            return (
                                                <a
                                                    key={doc.id}
                                                    className="sveden-document-card"
                                                    href={fileUrl || '#'}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <div>
                                                        <h3>{doc.title}</h3>

                                                        {doc.description?.trim() && (
                                                            <p>{doc.description}</p>
                                                        )}

                                                        {doc.category?.trim() && (
                                                            <span>{doc.category}</span>
                                                        )}
                                                    </div>

                                                    {fileUrl && <strong>Скачать</strong>}
                                                </a>
                                            );
                                        })}
                                    </div>
                                )}

                                {slug !== 'dokumenty' && sectionDocuments.length > 0 && (
                                    <div className="sveden-documents ">
                                        {sectionDocuments.map((doc) => {
                                            const fileUrl = getFileUrl(doc.file);

                                            return (
                                                <div key={doc.id} className="sveden-document-card">
                                                    <div>
                                                        <h3>{doc.title}</h3>

                                                        {doc.description?.trim() && (
                                                            <div className="document-description rich-content">
                                                                <ReactMarkdown>{doc.description}</ReactMarkdown>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {fileUrl && (
                                                        <a href={fileUrl} target="_blank" rel="noreferrer">
                                                            Скачать
                                                        </a>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        ) : (
                            !loading &&
                            (error ? (
                                <StatusMessage variant="error">
                                    Не удалось загрузить данные. Попробуйте обновить страницу позже.
                                </StatusMessage>
                            ) : (
                                <StatusMessage>Раздел не найден</StatusMessage>
                            ))
                        )}
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}