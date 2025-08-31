'use client';

import { useState, useEffect } from 'react';
import React from 'react';

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ type: '', metin: '', rKod: '', cKod: '', fKod: '', kaynakAdı: '', yazar: '', sayfa: '', anahtarKelimeler: '' });

  // Notları Redis'ten çek
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await fetch('/api/notes');
    const data = await res.json();
    if (res.ok) {
      setNotes(data);
    } else {
      console.error('Notlar yüklenirken bir hata oluştu');
    }
  };

  // Yeni notu kaydetme
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          ...newNote,
          anahtarKelimeler: newNote.anahtarKelimeler.split(',').map(kw => kw.trim())
      }),
    });
    if (res.ok) {
      alert('Not başarıyla kaydedildi!');
      setNewNote({ type: '', metin: '', rKod: '', cKod: '', fKod: '', kaynakAdı: '', yazar: '', sayfa: '', anahtarKelimeler: '' });
      fetchNotes(); // Yeni notu ekledikten sonra listeyi güncelle
    } else {
      alert('Kaydetme hatası!');
    }
  };

  return (
    <div>
      <h1>Zettelkasten Dashboard</h1>

      {/* Not Ekleme Formu */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Kaynak Tipi" value={newNote.type} onChange={e => setNewNote({...newNote, type: e.target.value})} />
        <textarea placeholder="Alıntı Metni" value={newNote.metin} onChange={e => setNewNote({...newNote, metin: e.target.value})} />
        <input type="text" placeholder="R-Kod" value={newNote.rKod} onChange={e => setNewNote({...newNote, rKod: e.target.value})} />
        {/* Diğer alanları buraya ekle */}
        <button type="submit">Notu Kaydet</button>
      </form>

      <hr />

      {/* Kayıtlı Notları Gösteren Bölüm */}
      <div>
        <h2>Kayıtlı Notlar</h2>
        <ul>
          {notes.map(note => (
            <li key={note.id}>
              <strong>{note.kaynakAdı}</strong> ({note.type}) - Kod: {note.rKod}
              <p>{note.metin}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}