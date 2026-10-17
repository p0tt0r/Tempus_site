import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatusMessage from '../components/StatusMessage';

type Contact = {
  id: number;
  title: string;
  address?: string;
  phone?: string;
  email?: string;
  workingHours?: string;
  mapUrl?: string;
};

export default function ContactsPage() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/contacts')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error.message || 'API error');
        setContact(data.data?.[0] || null);
      })
      .catch((error) => {
        console.error('Ошибка загрузки контактов:', error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />

      <main className="container page reveal">
        <h1>Контакты</h1>

        {loading && <StatusMessage>Загрузка…</StatusMessage>}
        {!loading && error && (
          <StatusMessage variant="error">
            Не удалось загрузить данные. Попробуйте обновить страницу позже.
          </StatusMessage>
        )}
        {!loading && !error && !contact && (
          <StatusMessage>Контактная информация пока не добавлена.</StatusMessage>
        )}

        {contact && (
          <div className="contact-card reveal">
            {contact.address && <p><strong>Адрес:</strong> {contact.address}</p>}
            {contact.phone && <p><strong>Телефон:</strong> {contact.phone}</p>}
            {contact.email && <p><strong>Email:</strong> {contact.email}</p>}
            {contact.workingHours && <p><strong>Режим работы:</strong> {contact.workingHours}</p>}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}