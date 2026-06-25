import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

  useEffect(() => {
    fetch('http://185.239.50.50:1337/api/contacts')
      .then((res) => res.json())
      .then((data) => setContact(data.data?.[0] || null))
      .catch((error) => console.error('Ошибка загрузки контактов:', error));
  }, []);

  return (
    <>
      <Header />

      <main className="container page reveal">
        <h1>Контакты</h1>

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