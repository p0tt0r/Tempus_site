import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

type Section = {
  id: number;
  title: string;
  slug: string;
  content?: string;
  order?: number;
};

export default function EducationInfoPage() {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    fetch('http://localhost:1337/api/education-sections?sort=order:asc')
      .then((res) => res.json())
      .then((data) => setSections(data.data || []))
      .catch((error) => console.error('Ошибка загрузки сведений:', error));
  }, []);

  return (
    <>
      <Header />

      <main className="container page">
        <h1>Сведения об образовательной организации</h1>

        <div className="sveden-grid">
          {sections.map((section) => (
            <Link
              key={section.id}
              className="sveden-card"
              to={`/sveden/${section.slug}`}
            >
              {section.title}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}