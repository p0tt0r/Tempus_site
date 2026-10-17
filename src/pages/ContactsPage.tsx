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
  Employee?: string;
};

function formatPhone(phone: string) {
  const d = phone.replace(/\D/g, '');
  if (d.length === 11 && (d[0] === '7' || d[0] === '8')) {
    return `+7 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9)}`;
  }
  return phone;
}

function getRole(c: Contact) {
  const e = (c.Employee || '').trim();
  const role = c.title && e.startsWith(c.title) ? e.slice(c.title.length) : e;
  return role.trim();
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
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
        setContacts(data.data || []);
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

      <main id="main" className="container contacts-page">
        <h1>Контакты</h1>

        {loading && <StatusMessage>Загрузка…</StatusMessage>}
        {!loading && error && (
          <StatusMessage variant="error">
            Не удалось загрузить данные. Попробуйте обновить страницу позже.
          </StatusMessage>
        )}
        {!loading && !error && contacts.length === 0 && (
          <StatusMessage>Контактная информация пока не добавлена.</StatusMessage>
        )}

        {contacts.length > 0 && (
          <div className="contacts-grid">
            {contacts.map((c) => (
              <div className="contact-card" key={c.id}>
                <h2>{c.title}</h2>
                {getRole(c) && <p className="contact-role">{getRole(c)}</p>}
                {c.address && <p><strong>Адрес:</strong> {c.address}</p>}
                {c.phone && (
                  <p>
                    <strong>Телефон:</strong>{' '}
                    <a href={'tel:' + c.phone.replace(/\s/g, '')}>{formatPhone(c.phone)}</a>
                  </p>
                )}
                {c.email && (
                  <p><strong>Email:</strong> <a href={'mailto:' + c.email}>{c.email}</a></p>
                )}
                {c.workingHours && <p><strong>Режим работы:</strong> {c.workingHours}</p>}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}