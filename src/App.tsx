import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import DocumentsPage from './pages/DocumentsPage';
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
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/partners" element={<SimplePage title="Партнёры" />} />
        <Route path="/contacts" element={<SimplePage title="Контакты" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;