'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Quote tipi, zorunlu alanları ve isteğe bağlı olanları belirtir
type Quote = {
  id: string;
  rKodId: string;
  sayfa: string;
  metin: string;
  anahtarKelimeler: string[];
};

type Keyword = {
    name: string;
    relatedQuotes: string[];
};

export default function QuotesPage({ params }: { params: { rKodId: string } }) {
  const { rKodId } = params;
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [newQuote, setNewQuote] = useState({ sayfa: '', metin: '' });
  const [selectedText, setSelectedText] = useState('');
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; quoteId: string; } | null>(null);

  const fetchQuotes = async () => {
    const res = await fetch(`/api/quotes?rKodId=${rKodId}`);
    const data = await res.json();
    if (res.ok) {
      setQuotes(data);
    } else {
      console.error('Alıntılar yüklenirken bir hata oluştu');
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [rKodId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const quoteData = {
      rKodId,
      sayfa: newQuote.sayfa,
      metin: newQuote.metin,
    };

    const res = await fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quoteData),
    });

    if (res.ok) {
      alert('Alıntı başarıyla kaydedildi!');
      setNewQuote({ sayfa: '', metin: '' });
      fetchQuotes();
    } else {
      alert('Kaydetme hatası!');
    }
  };

  const handleDelete = async (quoteId: string) => {
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

  const handleSelection = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, quoteId: string) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      setSelectedText(selection.toString());
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        quoteId
      });
    } else {
      setSelectedText('');
      setContextMenu(null);
    }
  };

  const handleAssignKeyword = async () => {
    if (!selectedText || !contextMenu) return;

    const res = await fetch('/api/keywords', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword: selectedText.toLowerCase(), quoteId: contextMenu.quoteId }),
    });

    if (res.ok) {
      alert(`'${selectedText}' anahtar kelimesi atandı!`);
      fetchQuotes();
    } else {
      alert('Anahtar kelime atama hatası!');
    }
    setContextMenu(null);
    setSelectedText('');
  };

  return (
    <div className="container">
      <Link href="/r-codes">R-kod Arşivi</Link>
      <h1>"{rKodId}" için Alıntılar</h1>

      {/* Yeni Alıntı Ekleme Formu */}
      <form onSubmit={handleSubmit}>
        <h2>Yeni Alıntı Ekle</h2>
        <input type="text" placeholder="Sayfa" value={newQuote.sayfa} onChange={e => setNewQuote(prev => ({ ...prev, sayfa: e.target.value }))} />
        <textarea placeholder="Alıntı Metni" value={newQuote.metin} onChange={e => setNewQuote(prev => ({ ...prev, metin: e.target.value }))} />
        <button type="submit">Alıntıyı Kaydet</button>
      </form>

      <hr />

      {/* Alıntı Listesi */}
      <div>
        <h2>Kayıtlı Alıntılar</h2>
        <ul>
          {quotes.map(quote => (
            <li key={quote.id}>
              <p><strong>Sayfa:</strong> {quote.sayfa}</p>
              <div
                onMouseUp={(e) => handleSelection(e, quote.id)}
                className="quote-text"
              >
                {quote.metin}
              </div>
              <div>
                {quote.anahtarKelimeler && quote.anahtarKelimeler.map(keyword => (
                    <Link key={keyword} href={`/keywords/${keyword}`}>
                      <span className="keyword-tag">{keyword}</span>
                    </Link>
                ))}
              </div>
              <button onClick={() => handleDelete(quote.id)}>Sil</button>
            </li>
          ))}
        </ul>
      </div>
      {contextMenu && (
        <div
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={handleAssignKeyword}
        >
          Anahtar Kelime Ata: "{selectedText}"
        </div>
      )}
    </div>
  );
}