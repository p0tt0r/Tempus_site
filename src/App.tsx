import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import EducationSectionPage from './pages/EducationSectionPage';
import LibraryPage from './pages/LibraryPage';
import EducationInfoPage from './pages/EducationInfoPage';
import SchedulePage from './pages/SchedulePage';
import ContactsPage from './pages/ContactsPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/sveden/:slug" element={<EducationSectionPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/sveden" element={<EducationInfoPage />} />
        <Route path="/contacts" element={<ContactsPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;