import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatusMessage from '../components/StatusMessage';
import { formatFileInfo } from '../utils/fileInfo';
import { programAnchor } from '../utils/programs';

const API_URL = '';

type MediaFile = {
    url: string;
    name: string;
    ext?: string;
    size?: number;
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

function getFirstFile(file?: MediaFile | MediaFile[] | null) {
    return Array.isArray(file) ? file[0] : file;
}

function getFileUrl(file?: MediaFile | MediaFile[] | null) {
    if (!file) return null;

    if (Array.isArray(file)) {
        return file[0]?.url ? `${API_URL}${file[0].url}` : null;
    }

    return file.url ? `${API_URL}${file.url}` : null;
}

function chevron(open: boolean) {
    return open ? (
        <path d="M6 6l12 12M18 6L6 18" />
    ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
    );
}

export default function EducationSectionPage() {
    const { slug } = useParams();
    const { hash } = useLocation();

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

    // Якоря программ: i-й заголовок «# » получает id program-{i+1}, как на главной.
    const h1Offsets: number[] =
        slug === 'obrazovanie' && section?.content
            ? Array.from(section.content.matchAll(/^# /gm), (m) => m.index ?? -1)
            : [];
    const markdownComponents: Components = {
        h1({ node, children }) {
            const index = h1Offsets.indexOf(node?.position?.start.offset ?? -2);
            return <h1 id={index >= 0 ? programAnchor(index) : undefined}>{children}</h1>;
        },
    };

    useEffect(() => {
        if (loading || !section || !hash) return;
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    }, [hash, section, loading]);

    const sectionDocuments = [...(section?.documents || [])].sort(
        (a, b) => (a.order ?? 9999) - (b.order ?? 9999),
    );

    return (
        <>
            <Header />

            <main id="main" className="container sveden">

                <div className="sveden-layout">
                    <button
                        type="button"
                        className="sveden-toggle"
                        aria-expanded={sidebarOpen}
                        aria-controls="sveden-nav"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
                            {chevron(sidebarOpen)}
                        </svg>
                        {sidebarOpen ? 'Закрыть разделы' : 'Разделы сведений'}
                    </button>

                    <nav
                        id="sveden-nav"
                        aria-label="Разделы сведений"
                        className={`sveden-nav${sidebarOpen ? ' open' : ''}`}
                    >
                        {sections.map((item) => (
                            <Link
                                key={item.id}
                                to={`/sveden/${item.slug}`}
                                aria-current={item.slug === slug ? 'page' : undefined}
                                onClick={() => setSidebarOpen(false)}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>

                    <section className="sveden-content">
                        {loading && <StatusMessage>Загрузка…</StatusMessage>}

                        {!loading && section ? (
                            <>
                                <h1>{section.title}</h1>

                                {section.content?.trim() && (
                                    <div className="sveden-text">
                                        <ReactMarkdown components={markdownComponents}>{section.content}</ReactMarkdown>
                                    </div>
                                )}

                                {slug === 'dokumenty' && documents.length > 0 && (
                                    <div className="sveden-documents">
                                        {documents.map((doc) => {
                                            const fileUrl = getFileUrl(doc.file);
                                            const meta = formatFileInfo(getFirstFile(doc.file));

                                            const content = (
                                                <>
                                                    <div>
                                                        <h3>{doc.title}</h3>

                                                        {doc.description?.trim() && (
                                                            <p>{doc.description}</p>
                                                        )}

                                                        {doc.category?.trim() && (
                                                            <span>{doc.category}</span>
                                                        )}
                                                    </div>

                                                    {fileUrl && (
                                                        <div className="file-action">
                                                            <strong>Скачать</strong>
                                                            {meta && <small className="file-meta">{meta}</small>}
                                                        </div>
                                                    )}
                                                </>
                                            );

                                            return fileUrl ? (
                                                <a
                                                    key={doc.id}
                                                    className="sveden-doc"
                                                    href={fileUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {content}
                                                </a>
                                            ) : (
                                                <div key={doc.id} className="sveden-doc">
                                                    {content}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {slug !== 'dokumenty' && sectionDocuments.length > 0 && (
                                    <div className="sveden-documents">
                                        {sectionDocuments.map((doc) => {
                                            const fileUrl = getFileUrl(doc.file);
                                            const meta = formatFileInfo(getFirstFile(doc.file));

                                            return (
                                                <div key={doc.id} className="sveden-doc">
                                                    <div>
                                                        <h3>{doc.title}</h3>

                                                        {doc.description?.trim() && (
                                                            <div className="sveden-text sveden-doc-desc">
                                                                <ReactMarkdown>{doc.description}</ReactMarkdown>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {fileUrl && (
                                                        <div className="file-action">
                                                            <a href={fileUrl} target="_blank" rel="noreferrer">
                                                                Скачать
                                                            </a>
                                                            {meta && <small className="file-meta">{meta}</small>}
                                                        </div>
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