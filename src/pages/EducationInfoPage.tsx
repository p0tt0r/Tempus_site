import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function EducationInfoPage() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://185.239.50.50:1337/api/education-sections?sort=order:asc')
      .then((res) => res.json())
      .then((data) => {
        const firstSection = data.data?.[0];

        if (firstSection?.slug) {
          navigate(`/sveden/${firstSection.slug}`, { replace: true });
        }
      })
      .catch((error) => console.error('Ошибка загрузки сведений:', error));
  }, [navigate]);

  return (
    <>
      <Header />
      <main className="container page">
        <p>Загрузка раздела...</p>
      </main>
      <Footer />
    </>
  );
}