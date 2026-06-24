import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container page">
        <h1>О проекте</h1>
        <p>
          Здесь будет размещена информация о проекте, целях, задачах,
          участниках и направлениях работы.
        </p>
      </main>
      <Footer />
    </>
  );
}