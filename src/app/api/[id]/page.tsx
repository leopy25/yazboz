'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

type Quote = {
  id: string;
  rKodId: string;
  sayfa: string;
  metin: string;
  anahtarKelimeler: string[];
};

export default function QuotePage() {
  const { id: rKodId } = useParams();
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [newQuote, setNewQuote] = useState({ sayfa: '', metin: '' });
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  useEffect(() => {
    if (rKodId) {
      fetchQuotes();
    }
  }, [rKodId]);

  const fetchQuotes = async () => {
    const res = await fetch(`/api/quotes?rKodId=${rKodId}`);
    const data = await res.json();
    if (res.ok) {
      setQuotes(data.sort((a: Quote, b: Quote) => a.sayfa.localeCompare(b.sayfa)));
    } else {
      console.error('Alıntılar yüklenirken bir hata oluştu');
    }
  };

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newQuote, rKodId }),
    });

    if (res.ok) {
      alert('Alıntı başarıyla kaydedildi!');
      setNewQuote({ sayfa: '', metin: '' });
      fetchQuotes();
    } else {
      alert('Kaydetme hatası!');
    }
  };

  const handleQuoteDelete = async (quoteId: string) => {
    const res = await fetch('/api/quotes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: quoteId, rKodId }),
    });

    if (res.ok) {
      alert('Alıntı başarıyla silindi!');
      fetchQuotes();
    } else {
      alert('Silme hatası!');
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const text = selection.toString().trim();
      setSelectedText(text);
      setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
    } else {
      setContextMenu({ visible: false, x: 0, y: 0 });
    }
  };

  const handleKeywordAssign = async () => {
    if (selectedText) {
      // API'ye anahtar kelime atama isteği gönder
      // Bu kısım için `quotes` API'sindeki `anahtarKelimeler` alanını güncellememiz gerekecek.
      alert(`'${selectedText}' anahtar kelime olarak atandı!`);
      setContextMenu({ visible: false, x: 0, y: 0 });
    }
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  return (
    <div className="container" onClick={handleCloseContextMenu}>
      <Link href="/r-codes">R-kod Arşivi'ne Geri Dön</Link>
      <h1>Alıntılar - {rKodId}</h1>

      {/* Yeni Alıntı Ekleme Formu */}
      <form onSubmit={handleQuoteSubmit}>
        <h2>Yeni Alıntı Ekle</h2>
        <input
          type="text"
          placeholder="Sayfa"
          value={newQuote.sayfa}
          onChange={e => setNewQuote({ ...newQuote, sayfa: e.target.value })}
        />
        <textarea
          placeholder="Alıntı Metni"
          value={newQuote.metin}
          onChange={e => setNewQuote({ ...newQuote, metin: e.target.value })}
        />
        <button type="submit">Alıntıyı Kaydet</button>
      </form>

      <hr />

      {/* Alıntı Listesi */}
      <div>
        <h2>Kayıtlı Alıntılar</h2>
        <ul>
          {quotes.map(quote => (
            <li key={quote.id}>
              <div onContextMenu={handleContextMenu}>
                <strong>Sayfa:</strong> {quote.sayfa} <br />
                <strong>Alıntı:</strong> {quote.metin}
                <div style={{ marginTop: '0.5rem' }}>
                  <button onClick={() => handleQuoteDelete(quote.id)}>Sil</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {contextMenu.visible && (
        <div
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            background: 'white',
            border: '1px solid gray',
            padding: '0.5rem',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
          }}
        >
          <div className="hover:bg-gray-100 cursor-pointer p-1" onClick={handleKeywordAssign}>
            Anahtar Kelime Ata
          </div>
        </div>
      )}
    </div>
  );
}