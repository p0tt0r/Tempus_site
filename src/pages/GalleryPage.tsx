import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    const [activeGallery, setActiveGallery] = useState<GalleryItem | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        fetch('http://185.239.50.50:1337/api/galleries?sort=date:desc&populate=images')
            .then((res) => res.json())
            .then((data) => setGalleries(data.data || []))
            .catch((error) => console.error('Ошибка загрузки галереи:', error));
    }, []);

    const activeImage = activeGallery?.images?.[activeImageIndex];

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

            <main className="container page">
                <h1>Фотогалерея</h1>

                <div className="album-grid reveal">
                    {galleries.map((gallery) => {
                        const cover = gallery.images?.[0];

                        return (
                            <button
                                key={gallery.id}
                                className="album-card"
                                onClick={() => openGallery(gallery)}
                            >
                                {cover && (
                                    <img
                                        src={`http://185.239.50.50:1337${cover.url}`}
                                        alt={gallery.title}
                                    />
                                )}

                                <div className="album-info">
                                    <h2>{gallery.title}</h2>

                                    <p>
                                        {gallery.images?.length || 0} фото
                                        {gallery.date ? ` · ${gallery.date}` : ''}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </main>

            {activeGallery && activeImage && (
                <div className="lightbox" onClick={closeGallery}>
                    <button className="lightbox-close" onClick={closeGallery}>
                        ×
                    </button>

                    <button className="lightbox-arrow left" onClick={showPrev}>
                        ‹
                    </button>

                    <img
                        src={`http://185.239.50.50:1337${activeImage.url}`}
                        alt={activeImage.name}
                        className="lightbox-image"
                        onClick={(event) => event.stopPropagation()}
                    />

                    <button className="lightbox-arrow right" onClick={showNext}>
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