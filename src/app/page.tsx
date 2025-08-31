'use client';

import { useState, useEffect } from 'react';
import React from 'react';

type Note = {
  id: string;
  type: string;
  rKod: string;
  cKod: string;
  fKod: string;
  kaynakAdı: string;
  yazar: string;
  metin: string;
  sayfa: string;
  anahtarKelimeler: string[];
};

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [sourceType, setSourceType] = useState('Kitap');
  const [newNote, setNewNote] = useState({
    rKod: '', cKod: '', fKod: '', metin: '', sayfa: '', anahtarKelimeler: '',
    kitap: { eserAdı: '', yazar: '', basımYılı: '', yayınevi: '', basıldığıYer: '', isbn: '' },
    kitapBölümü: { eserAdı: '', editör: '', basımYılı: '', yayınevi: '', basıldığıYer: '', isbn: '', bölümAdı: '', bölümYazarı: '', sayfaAralığı: '' },
    makale: { makaleAdı: '', yazar: '', yayınlandığıDergi: '', yayınYılı: '', sayfaAralığı: '', doi: '' }
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const noteData = {
        type: sourceType,
        rKod: newNote.rKod,
        cKod: newNote.cKod,
        fKod: newNote.fKod,
        metin: newNote.metin,
        sayfa: newNote.sayfa,
        anahtarKelimeler: newNote.anahtarKelimeler.split(',').map(kw => kw.trim()),
        ...newNote[sourceType.replace(/\s+/g, '')]
    };

    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData),
    });

    if (res.ok) {
      alert('Not başarıyla kaydedildi!');
      setNewNote({
        rKod: '', cKod: '', fKod: '', metin: '', sayfa: '', anahtarKelimeler: '',
        kitap: { eserAdı: '', yazar: '', basımYılı: '', yayınevi: '', basıldığıYer: '', isbn: '' },
        kitapBölümü: { eserAdı: '', editör: '', basımYılı: '', yayınevi: '', basıldığıYer: '', isbn: '', bölümAdı: '', bölümYazarı: '', sayfaAralığı: '' },
        makale: { makaleAdı: '', yazar: '', yayınlandığıDergi: '', yayınYılı: '', sayfaAralığı: '', doi: '' }
      });
      fetchNotes();
    } else {
      alert('Kaydetme hatası!');
    }
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSourceType(e.target.value);
  };

  const handleFieldChange = (source: string, field: string, value: string) => {
    if (source === 'genel') {
      setNewNote(prev => ({ ...prev, [field]: value }));
    } else {
      setNewNote(prev => ({
        ...prev,
        [source]: {
          ...prev[source as keyof typeof prev],
          [field]: value
        }
      }));
    }
  };

  return (
    <div>
      <h1>Zettelkasten Dashboard</h1>

      {/* Kaynak Tipi Seçimi */}
      <div>
        <label>Kaynak Tipi:</label>
        <select value={sourceType} onChange={handleSourceChange}>
          <option value="Kitap">Kitap</option>
          <option value="KitapBölümü">Kitap Bölümü</option>
          <option value="Makale">Bilimsel Makale</option>
        </select>
      </div>

      {/* Not Ekleme Formu */}
      <form onSubmit={handleSubmit}>
        
        {/* Ortak Alanlar */}
        <h2>Genel Bilgiler</h2>
        <input type="text" placeholder="R-kod (Boş bırakırsanız otomatik atanır)" value={newNote.rKod} onChange={e => handleFieldChange('genel', 'rKod', e.target.value)} />
        <input type="text" placeholder="C-kod" value={newNote.cKod} onChange={e => handleFieldChange('genel', 'cKod', e.target.value)} />
        <input type="text" placeholder="F-kod" value={newNote.fKod} onChange={e => handleFieldChange('genel', 'fKod', e.target.value)} />
        <textarea placeholder="Alıntı Metni" value={newNote.metin} onChange={e => handleFieldChange('genel', 'metin', e.target.value)} />
        <input type="text" placeholder="Sayfa Aralığı" value={newNote.sayfa} onChange={e => handleFieldChange('genel', 'sayfa', e.target.value)} />
        <input type="text" placeholder="Anahtar Kelimeler (virgülle ayırın)" value={newNote.anahtarKelimeler} onChange={e => handleFieldChange('genel', 'anahtarKelimeler', e.target.value)} />
        
        {/* Kaynak Tipine Göre Alanlar */}
        {sourceType === 'Kitap' && (
          <div>
            <h2>Kitap Bilgileri</h2>
            <input type="text" placeholder="Eser Adı" value={newNote.kitap.eserAdı} onChange={e => handleFieldChange('kitap', 'eserAdı', e.target.value)} />
            <input type="text" placeholder="Yazar Ad-Soyad" value={newNote.kitap.yazar} onChange={e => handleFieldChange('kitap', 'yazar', e.target.value)} />
            <input type="text" placeholder="Basım Yılı" value={newNote.kitap.basımYılı} onChange={e => handleFieldChange('kitap', 'basımYılı', e.target.value)} />
            <input type="text" placeholder="Yayınevi" value={newNote.kitap.yayınevi} onChange={e => handleFieldChange('kitap', 'yayınevi', e.target.value)} />
            <input type="text" placeholder="Basıldığı Yer" value={newNote.kitap.basıldığıYer} onChange={e => handleFieldChange('kitap', 'basıldığıYer', e.target.value)} />
            <input type="text" placeholder="ISBN" value={newNote.kitap.isbn} onChange={e => handleFieldChange('kitap', 'isbn', e.target.value)} />
          </div>
        )}

        {sourceType === 'KitapBölümü' && (
          <div>
            <h2>Kitap Bölümü Bilgileri</h2>
            <input type="text" placeholder="Eser Adı" value={newNote.kitapBölümü.eserAdı} onChange={e => handleFieldChange('kitapBölümü', 'eserAdı', e.target.value)} />
            <input type="text" placeholder="Editör(ler) Ad Soyad" value={newNote.kitapBölümü.editör} onChange={e => handleFieldChange('kitapBölümü', 'editör', e.target.value)} />
            <input type="text" placeholder="Basım Yılı" value={newNote.kitapBölümü.basımYılı} onChange={e => handleFieldChange('kitapBölümü', 'basımYılı', e.target.value)} />
            <input type="text" placeholder="Yayınevi" value={newNote.kitapBölümü.yayınevi} onChange={e => handleFieldChange('kitapBölümü', 'yayınevi', e.target.value)} />
            <input type="text" placeholder="Basıldığı Yer" value={newNote.kitapBölümü.basıldığıYer} onChange={e => handleFieldChange('kitapBölümü', 'basıldığıYer', e.target.value)} />
            <input type="text" placeholder="ISBN" value={newNote.kitapBölümü.isbn} onChange={e => handleFieldChange('kitapBölümü', 'isbn', e.target.value)} />
            <input type="text" placeholder="Bölüm Adı" value={newNote.kitapBölümü.bölümAdı} onChange={e => handleFieldChange('kitapBölümü', 'bölümAdı', e.target.value)} />
            <input type="text" placeholder="Bölüm Yazarı Ad- Soyad" value={newNote.kitapBölümü.bölümYazarı} onChange={e => handleFieldChange('kitapBölümü', 'bölümYazarı', e.target.value)} />
            <input type="text" placeholder="Sayfa Aralığı" value={newNote.kitapBölümü.sayfaAralığı} onChange={e => handleFieldChange('kitapBölümü', 'sayfaAralığı', e.target.value)} />
          </div>
        )}

        {sourceType === 'Makale' && (
          <div>
            <h2>Bilimsel Makale Bilgileri</h2>
            <input type="text" placeholder="Makale Adı" value={newNote.makale.makaleAdı} onChange={e => handleFieldChange('makale', 'makaleAdı', e.target.value)} />
            <input type="text" placeholder="Yazar Ad-Soyad" value={newNote.makale.yazar} onChange={e => handleFieldChange('makale', 'yazar', e.target.value)} />
            <input type="text" placeholder="Yayınlandığı Dergi" value={newNote.makale.yayınlandığıDergi} onChange={e => handleFieldChange('makale', 'yayınlandığıDergi', e.target.value)} />
            <input type="text" placeholder="Yayın Yılı" value={newNote.makale.yayınYılı} onChange={e => handleFieldChange('makale', 'yayınYılı', e.target.value)} />
            <input type="text" placeholder="Sayfa Aralığı" value={newNote.makale.sayfaAralığı} onChange={e => handleFieldChange('makale', 'sayfaAralığı', e.target.value)} />
            <input type="text" placeholder="DOI" value={newNote.makale.doi} onChange={e => handleFieldChange('makale', 'doi', e.target.value)} />
          </div>
        )}

        <button type="submit">Notu Kaydet</button>
      </form>

      <hr />

      {/* Kayıtlı Notları Gösteren Bölüm */}
      <div>
        <h2>Kayıtlı Notlar</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <strong>Kaynak Tipi:</strong> {note.type} <br />
              <strong>R-Kod:</strong> {note.rKod} <br />
              <strong>C-Kod:</strong> {note.cKod} <br />
              <strong>F-Kod:</strong> {note.fKod} <br />
              <strong>Alıntı:</strong> {note.metin} <br />
              <strong>Anahtar Kelimeler:</strong> {note.anahtarKelimeler.join(', ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}