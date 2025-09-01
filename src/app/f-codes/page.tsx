'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import Link from 'next/link';

type FCodeNote = {
  id: string;
  fKod: string;
  projeAdı: string;
  eklemeTarihi: string;
};

type SortKey = 'fKod' | 'projeAdı' | 'eklemeTarihi';

export default function FCodePage() {
  const [notes, setNotes] = useState<FCodeNote[]>([]);
  const [newNote, setNewNote] = useState({
    fKod: '',
    projeAdı: '',
  });
  const [sortBy, setSortBy] = useState<SortKey>('eklemeTarihi');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await fetch('/api/f-codes');
    const data = await res.json();
    if (res.ok) {
      setNotes(data);
    } else {
      console.error('Notlar yüklenirken bir hata oluştu');
    }
  };

  const handleDelete = async (noteId: string) => {
    const res = await fetch('/api/f-codes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: noteId }),
    });

    if (res.ok) {
      alert('Proje başarıyla silindi!');
      fetchNotes();
    } else {
      alert('Silme hatası!');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const noteData = {
        projeAdı: newNote.projeAdı,
        fKod: newNote.fKod,
    };

    const res = await fetch('/api/f-codes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData),
    });

    if (res.ok) {
      alert('Proje başarıyla kaydedildi!');
      setNewNote({ fKod: '', projeAdı: '' });
      fetchNotes();
    } else {
      alert('Kaydetme hatası!');
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setNewNote(prev => ({ ...prev, [field]: value }));
  };
  
  const sortedNotes = [...notes].sort((a, b) => {
    if (sortBy === 'fKod') {
      return a.fKod.localeCompare(b.fKod);
    }
    if (sortBy === 'projeAdı') {
      return a.projeAdı.localeCompare(b.projeAdı);
    }
    if (sortBy === 'eklemeTarihi') {
      return new Date(a.eklemeTarihi).getTime() - new Date(b.eklemeTarihi).getTime();
    }
    return 0;
  });

  return (
    <div className="container">
      <Link href="/">Anasayfa</Link>
      <h1>F-kod Arşivi</h1>

      {/* Proje Ekleme Formu */}
      <form onSubmit={handleSubmit}>
        
        <h2>Proje Bilgilerini Girin</h2>
        <input type="text" placeholder="Proje Adı" value={newNote.projeAdı} onChange={e => handleFieldChange('projeAdı', e.target.value)} />
        <input type="text" placeholder="F-kod (Boş bırakırsanız otomatik atanır)" value={newNote.fKod} onChange={e => handleFieldChange('fKod', e.target.value)} />
        
        <button type="submit">Projeyi Kaydet</button>
      </form>

      <hr />

      {/* F-kod Listeleme ve Sıralama */}
      <div>
        <h2>Kayıtlı F-kodlar</h2>
        <div>
          <label>Sırala:</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as SortKey)}>
            <option value="fKod">F-koda Göre</option>
            <option value="projeAdı">Proje Adına Göre</option>
            <option value="eklemeTarihi">Ekleme Tarihine Göre</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>F-Kod</th>
              <th>Proje Adı</th>
              <th>Ekleme Tarihi</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {sortedNotes.map((note) => (
              <tr key={note.id}>
                <td>{note.fKod}</td>
                <td>{note.projeAdı}</td>
                <td>{note.eklemeTarihi}</td>
                <td>
                  <button onClick={() => handleDelete(note.id)}>Sil</button>
                  <button>Aç</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}