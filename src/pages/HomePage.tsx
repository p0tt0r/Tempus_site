import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatusMessage from '../components/StatusMessage';
import Steps from '../components/Steps';
import { formatDate } from '../utils/formatDate';
import { parsePrograms, type Program } from '../utils/programs';

type NewsItem = {
  id: number;
  title: string;
  slug: string;
  date?: string;
  content?: string;
  image?: {
    url: string;
  };
};

const PROGRAMS_URL =
  '/api/education-sections?filters[slug][$eq]=obrazovanie&populate[documents][populate]=file';

const TASKS = [
  { to: '/schedule', title: 'Расписание', text: 'занятия и экзамены' },
  { to: '/sveden/dokumenty', title: 'Документы', text: 'устав, лицензия, положения' },
  { to: '/sveden', title: 'Сведения об организации', text: '14 обязательных разделов' },
];

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [programsLoading, setProgramsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles?sort=date:desc&pagination[pageSize]=3&populate=image')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error.message || 'API error');
        setNews(data.data || []);
      })
      .catch((error) => {
        console.error('Ошибка загрузки новостей:', error);
        setNewsError(true);
      })
      .finally(() => setNewsLoading(false));
  }, []);

  useEffect(() => {
    fetch(PROGRAMS_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error.message || 'API error');
        setPrograms(parsePrograms(data.data?.[0]?.content));
      })
      .catch((error) => {
        console.error('Ошибка загрузки программ:', error);
        setPrograms([]);
      })
      .finally(() => setProgramsLoading(false));
  }, []);

  return (
    <>
      <Header />

      <main id="main">
        <section className="home-hero">
          <div className="home-hero-text">
            <h1>Новая профессия — ступень за&nbsp;ступенью</h1>
            <p>
              ЧОУ ДПО УМЦ «Темпус», Ростов-на-Дону. Профессиональная переподготовка с дипломом
              для тех, у кого есть или будет высшее образование.
            </p>
            <div className="home-hero-actions">
              <Link to="/sveden/obrazovanie" className="btn">
                Программы обучения
              </Link>
              <Link to="/sveden" className="link-arrow">
                Сведения об организации
              </Link>
            </div>
          </div>

          <div className="home-hero-photo">
            <img src="/images/hero.jpg" alt="Занятие в учебном центре «Темпус»" />
            <Steps />
          </div>
        </section>

        {programsLoading && (
          <div className="container home-status">
            <StatusMessage>Загрузка…</StatusMessage>
          </div>
        )}

        {!programsLoading && programs.length === 0 && (
          <section className="home-program">
            <div className="container home-program-fallback">
              <h2>Программы обучения</h2>
              <Link to="/sveden/obrazovanie" className="link-arrow">
                Сведения → Образование
              </Link>
            </div>
          </section>
        )}

        {programs.map((program, index) => (
          <section
            key={program.anchor}
            className={index % 2 === 1 ? 'home-program home-program--alt' : 'home-program'}
          >
            <div className="container home-program-inner">
              <div>
                <p className="home-program-kicker">Программа профессиональной переподготовки</p> {/* taste-skill-ignore: строка согласована заказчиком в макете и спецификации */}
                <h2>{program.title}</h2>
                {program.summary && <p className="home-program-summary">{program.summary}</p>}
                <Link to={`/sveden/obrazovanie#${program.anchor}`} className="link-arrow">
                  Описание и рабочая программа
                </Link>
              </div>

              {program.facts.length > 0 && (
                <div className="home-facts">
                  {program.facts.map((fact) => (
                    <div key={fact.label}>
                      <strong>{fact.value}</strong>
                      {fact.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        <nav className="home-tasks" aria-label="Частые задачи">
          {TASKS.map((task) => (
            <Link key={task.to} to={task.to}>
              <span className="home-task-title">{task.title}</span>
              <span className="home-task-text">{task.text}</span>
            </Link>
          ))}
        </nav>

        <section className="container home-news">
          <div className="home-news-head">
            <h2>Новости</h2>
            <Link to="/news" className="link-arrow">
              Все новости
            </Link>
          </div>

          {newsLoading && <StatusMessage>Загрузка…</StatusMessage>}
          {!newsLoading && newsError && (
            <StatusMessage variant="error">
              Не удалось загрузить данные. Попробуйте обновить страницу позже.
            </StatusMessage>
          )}
          {!newsLoading && !newsError && news.length === 0 && (
            <StatusMessage>Новостей пока нет.</StatusMessage>
          )}

          <div className="news-grid">
            {news.map((item) => (
              <Link key={item.id} to={`/news/${item.slug}`} className="news-card">
                {item.image?.url ? (
                  <img src={item.image.url} alt={item.title} />
                ) : (
                  <div className="news-image--placeholder" aria-hidden="true">
                    <img src="/logo-tempus1.png" alt="" />
                  </div>
                )}
                {item.date && <time dateTime={item.date}>{formatDate(item.date)}</time>}
                <h3>{item.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
