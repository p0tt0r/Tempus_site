import Header from '../components/Header';

export default function DocumentsPage() {
  return (
    <>
      <Header />

      <main className="container page">
        <h1>Документы</h1>

        <div className="documents-list">
          <a href="#" className="document-item">
            📄 Положение о проекте
          </a>

          <a href="#" className="document-item">
            📄 Отчет о деятельности
          </a>

          <a href="#" className="document-item">
            📄 Методические материалы
          </a>
        </div>
      </main>
    </>
  );
}