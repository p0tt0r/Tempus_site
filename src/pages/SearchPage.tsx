import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSearchParams } from "react-router-dom";



const API_URL = 'http://185.239.50.50:1337';

type SearchItem = {
  id: number;
  title: string;
  text?: string;
  slug?: string;
  type: 'Новость' | 'Раздел' | 'Документ';
  url: string;
};

function cleanText(text?: string) {
  if (!text) return '';

  return text
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*/g, '')
    .replace(/[*_>`]/g, '')
    .replace(/-\s/g, '')
    .replace(/\n/g, ' ')
    .trim();
}

export default function SearchPage() {
  const [params] = useSearchParams();

  const [query, setQuery] = useState(params.get("q") ?? "");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/articles?pagination[pageSize]=100`).then((res) => res.json()),
      fetch(`${API_URL}/api/education-sections?pagination[pageSize]=100`).then((res) => res.json()),
      fetch(`${API_URL}/api/documents?pagination[pageSize]=100`).then((res) => res.json()),
    ])
      .then(([articles, sections, documents]) => {
        const articleItems: SearchItem[] = (articles.data || []).map((item: any) => ({
          id: item.id,
          title: item.title,
          text: cleanText(item.content),
          slug: item.slug,
          type: 'Новость',
          url: `/news/${item.slug}`,
        }));

        const sectionItems: SearchItem[] = (sections.data || []).map((item: any) => ({
          id: item.id,
          title: item.title,
          text: cleanText(item.content || item.main_content),
          slug: item.slug,
          type: 'Раздел',
          url: `/sveden/${item.slug}`,
        }));

        const documentItems: SearchItem[] = (documents.data || []).map((item: any) => ({
          id: item.id,
          title: item.title,
          text: cleanText(item.description),
          type: 'Документ',
          url: `/sveden/dokumenty`,
        }));

        setItems([...articleItems, ...sectionItems, ...documentItems]);
      })
      .catch((error) => console.error('Ошибка поиска:', error))
      .finally(() => setLoading(false));
  }, []);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();

    if (!q) return items;

    return items.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.text?.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
      );
    });
  }, [query, items]);

  return (
    <>
      <Header />

      <main className="container page">
        <section className="search-page">
          <h1>Поиск по сайту</h1>

          <input
            className="search-input"
            type="text"
            placeholder="Введите запрос..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {loading ? (
            <p>Загрузка...</p>
          ) : (
            <div className="search-results">
              {results.length > 0 ? (
                results.map((item) => (
                  <Link key={`${item.type}-${item.id}`} to={item.url} className="search-result-card">
                    <span>{item.type}</span>
                    <h3>{item.title}</h3>
                    {item.text && <p>{item.text.slice(0, 180)}...</p>}
                  </Link>
                ))
              ) : (
                <p>Ничего не найдено.</p>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}