import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import EducationSectionPage from './pages/EducationSectionPage';
import EducationInfoPage from './pages/EducationInfoPage';
import './App.css';

function SimplePage({ title }: { title: string }) {
  return (
    <main className="container page">
      <h1>{title}</h1>
      <p>Раздел находится в разработке.</p>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/sveden/:slug" element={<EducationSectionPage />} />
        <Route path="/sveden" element={<EducationInfoPage />} />
        <Route path="/partners" element={<SimplePage title="Партнёры" />} />
        <Route path="/contacts" element={<SimplePage title="Контакты" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;