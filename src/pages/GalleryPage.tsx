import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatusMessage from '../components/StatusMessage';
import { formatDate } from '../utils/formatDate';

type GalleryImage = {
    id: number;
    url: string;
    name: string;
};

type GalleryItem = {
    id: number;
    title: string;
    date?: string;
    images?: GalleryImage[];
};

export default function GalleryPage() {
    const [galleries, setGalleries] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeGallery, setActiveGallery] = useState<GalleryItem | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        fetch('/api/galleries?sort=date:desc&populate=images')
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                if (data.error) throw new Error(data.error.message || 'API error');
                setGalleries(data.data || []);
            })
            .catch((error) => {
                console.error('Ошибка загрузки галереи:', error);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, []);

    const activeImage = activeGallery?.images?.[activeImageIndex];
    const imageCount = activeGallery?.images?.length ?? 0;

    useEffect(() => {
        if (!activeGallery || imageCount === 0) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActiveGallery(null);
                setActiveImageIndex(0);
            } else if (event.key === 'ArrowLeft') {
                setActiveImageIndex((current) => (current === 0 ? imageCount - 1 : current - 1));
            } else if (event.key === 'ArrowRight') {
                setActiveImageIndex((current) => (current === imageCount - 1 ? 0 : current + 1));
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [activeGallery, imageCount]);

    const openGallery = (gallery: GalleryItem) => {
        setActiveGallery(gallery);
        setActiveImageIndex(0);
    };

    const closeGallery = () => {
        setActiveGallery(null);
        setActiveImageIndex(0);
    };

    const showPrev = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        if (!activeGallery?.images?.length) return;

        setActiveImageIndex((current) =>
            current === 0 ? activeGallery.images!.length - 1 : current - 1,
        );
    };

    const showNext = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        if (!activeGallery?.images?.length) return;

        setActiveImageIndex((current) =>
            current === activeGallery.images!.length - 1 ? 0 : current + 1,
        );
    };

    return (
        <>
            <Header />

            <main id="main" className="container gallery-page">
                <h1>Фотогалерея</h1>

                {loading && <StatusMessage>Загрузка…</StatusMessage>}
                {!loading && error && (
                    <StatusMessage variant="error">
                        Не удалось загрузить данные. Попробуйте обновить страницу позже.
                    </StatusMessage>
                )}
                {!loading && !error && galleries.length === 0 && (
                    <StatusMessage>Фотоальбомы пока не добавлены.</StatusMessage>
                )}

                <div className="album-grid">
                    {galleries.map((gallery) => {
                        const cover = gallery.images?.[0];

                        return (
                            <button
                                key={gallery.id}
                                type="button"
                                className="album-card"
                                onClick={() => openGallery(gallery)}
                            >
                                {cover && (
                                    <img
                                        src={`${cover.url}`}
                                        alt={gallery.title}
                                    />
                                )}

                                <div className="album-info">
                                    <h2>{gallery.title}</h2>

                                    <p>
                                        {gallery.images?.length || 0} фото
                                        {gallery.date ? <> · <time dateTime={gallery.date}>{formatDate(gallery.date)}</time></> : ''}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </main>

            {activeGallery && activeImage && (
                <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeGallery.title} onClick={closeGallery}>
                    <button type="button" className="lightbox-close" aria-label="Закрыть" onClick={closeGallery}>
                        ×
                    </button>

                    <button type="button" className="lightbox-arrow left" aria-label="Предыдущее фото" onClick={showPrev}>
                        ‹
                    </button>

                    <img
                        src={`${activeImage.url}`}
                        alt={activeImage.name}
                        className="lightbox-image"
                        onClick={(event) => event.stopPropagation()}
                    />

                    <button type="button" className="lightbox-arrow right" aria-label="Следующее фото" onClick={showNext}>
                        ›
                    </button>

                    <div className="lightbox-caption">
                        <h3>{activeGallery.title}</h3>
                        <p>
                            {activeImageIndex + 1} / {activeGallery.images?.length}
                        </p>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}