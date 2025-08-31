'use client';

import { useState, useEffect } from 'react';
import React from 'react';

// C-kod listesi
const C_CODES = [
  'C1000000', 'C1100000', 'C1200000', 'C1300000', 'C1301000', 'C1302000', 'C1303000', 'C1303001', 'C1303002', 'C1303003', 'C1303004', 'C1303005', 'C1303006', 'C1303007', 'C1303008', 'C1303009', 'C1303010', 'C1303011', 'C1303012', 'C1303013', 'C1304000', 'C1304001', 'C1304002', 'C1304003', 'C1304004', 'C1305000', 'C1306000', 'C1307000', 'C1308000', 'C1309000', 'C1310000', 'C1311000', 'C1312000', 'C1313000', 'C1314000', 'C1315000', 'C1315001', 'C1315002', 'C1315003', 'C1315004', 'C1316000', 'C1316001', 'C1317000', 'C1318000', 'C1319000', 'C1320000', 'C1321000', 'C1322000', 'C1323000', 'C1400000', 'C1401000', 'C1402000', 'C1403000', 'C1404000', 'C1405000', 'C1405001', 'C1405002', 'C1405003', 'C1405004', 'C1406000', 'C1406001', 'C1406002', 'C1406003', 'C1407000', 'C1408000', 'C1408001', 'C1408002', 'C1409000', 'C1409001', 'C1409002', 'C1409003', 'C1500000', 'C1501000', 'C1502000', 'C1503000', 'C1504000', 'C1505000', 'C1506000', 'C1507000', 'C1508000', 'C1509000', 'C1510000', 'C1511000', 'C1512000', 'C1513000', 'C1600000', 'C1601000', 'C1602000', 'C1602001', 'C1602002', 'C1602003', 'C1602004', 'C1602005', 'C1602006', 'C1602007', 'C1602008', 'C1602009', 'C1602010', 'C1602011', 'C1602012', 'C1602013', 'C1602014', 'C1603000', 'C1603001', 'C1603002', 'C1604000', 'C1604001', 'C1604002', 'C1604003', 'C1604004', 'C1605000', 'C1605001', 'C1605002', 'C1606000', 'C1607000', 'C1607001', 'C1607002', 'C1607003', 'C1607004', 'C1607005', 'C1607006', 'C1607007', 'C1608000', 'C1608001', 'C1608002', 'C1608003', 'C1608004', 'C1608005', 'C1608006', 'C1608007', 'C1609000', 'C1609001', 'C1609002', 'C1609003', 'C1609004', 'C1700000', 'C1701000', 'C1702000', 'C1703000', 'C1704000', 'C1705000', 'C1800000', 'C1801000', 'C1802000', 'C1803000', 'C1803001', 'C1803002', 'C1803003', 'C1803004', 'C1803005', 'C1803006', 'C1803007', 'C1804000', 'C1805000', 'C1805001', 'C1805002', 'C1805003', 'C1805004', 'C1805005', 'C1805006', 'C1806000', 'C1806001', 'C1806002', 'C1806003', 'C1806004', 'C1806005', 'C1806006', 'C1806007', 'C1806008', 'C1900000', 'C1901000', 'C1901001', 'C1902000', 'C1902001', 'C1903000', 'C1903001', 'C1903002', 'C1903003', 'C1903004', 'C1903005', 'C1904000', 'C1904001', 'C1904002', 'C1905000', 'C1906000', 'C1906001', 'C2000000', 'C2100000', 'C2101000', 'C2102000', 'C2103000', 'C2104000', 'C2105000', 'C2200000', 'C2201000', 'C2202000', 'C2203000', 'C2204000', 'C2205000', 'C2300000', 'C2301000', 'C2302000', 'C2303000', 'C2304000', 'C2305000', 'C2306000', 'C2307000', 'C2308000', 'C2309000', 'C2310000', 'C2311000', 'C2312000', 'C2313000', 'C2314000', 'C2315000', 'C2316000', 'C2317000', 'C2318000', 'C2319000', 'C2320000', 'C2321000', 'C2322000', 'C2323000', 'C2324000', 'C2325000', 'C2326000', 'C2327000', 'C2328000', 'C2329000', 'C2330000', 'C2331000', 'C2332000', 'C2333000', 'C2334000', 'C2335000', 'C2336000', 'C2337000', 'C2338000', 'C2339000', 'C2340000', 'C2341000', 'C2342000', 'C2343000', 'C2344000', 'C2345000', 'C2346000', 'C2347000', 'C2348000', 'C2349000', 'C2350000', 'C2351000', 'C2352000', 'C2400000', 'C2401000', 'C2401001', 'C2401002', 'C2401003', 'C2401004', 'C2401005', 'C2401006', 'C2401007', 'C2401008', 'C2401009', 'C2401010', 'C2401011', 'C2401012', 'C2401013', 'C2401014', 'C2401015', 'C2401016', 'C2401017', 'C2401018', 'C2401019', 'C2401020', 'C2401021', 'C2401022', 'C2401023', 'C2401024', 'C2402000', 'C2402001', 'C2402002', 'C2402003', 'C2402004', 'C2402005', 'C2402006', 'C2402007', 'C2402008', 'C2402009', 'C2402010', 'C2402011', 'C2402012', 'C2402013', 'C2402014', 'C2402015', 'C2402016', 'C2402017', 'C2402018', 'C2402019', 'C2402020', 'C2403000', 'C2404000', 'C2404001', 'C2404002', 'C2404003', 'C2500000', 'C2501000', 'C2502000', 'C2503000', 'C2504000', 'C2505000', 'C2506000', 'C2507000', 'C2508000', 'C2509000', 'C2510000', 'C2511000', 'C2512000', 'C2513000', 'C2514000', 'C2515000', 'C2516000', 'C2517000', 'C2518000', 'C2519000', 'C2520000', 'C2521000', 'C2522000', 'C2523000', 'C2524000', 'C2525000', 'C2526000', 'C2527000', 'C2600000', 'C2601000', 'C2602000', 'C2603000', 'C2604000', 'C2605000', 'C2606000', 'C2607000', 'C2608000', 'C2609000', 'C2610000', 'C2611000', 'C2612000', 'C2613000', 'C2614000', 'C2615000', 'C2616000', 'C2617000', 'C2618000', 'C2619000', 'C2620000', 'C2621000', 'C2700000', 'C2800000', 'C2900000', 'C3000000', 'C3100000', 'C3200000', 'C3300000', 'C3400000', 'C3500000', 'C4000000', 'C4100000', 'C4200000', 'C5000000'
];

type Note = {
  id: string;
  type: string;
  rKod: string;
  cKod: string;
  fKod: string;
  kaynakAdı?: string;
  yazar?: string;
  metin: string;
  sayfa?: string;
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

  const handleDelete = async (noteId: string) => {
    const res = await fetch('/api/notes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: noteId }),
    });

    if (res.ok) {
      alert('Not başarıyla silindi!');
      fetchNotes(); // Notlar listesini yeniden çek
    } else {
      alert('Silme hatası!');
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
        anahtarKelimeler: newNote.anahtarKelimeler.split(',').map(kw => kw.trim()),
        ...newNote[sourceType.replace(/\s+/g, '') as keyof typeof newNote]
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
    <div className="container">
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
        
        <div>
          <label>C-kod:</label>
          <select value={newNote.cKod} onChange={e => handleFieldChange('genel', 'cKod', e.target.value)}>
            <option value="">C-kod Seçin...</option>
            {C_CODES.map(code => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>

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
              <button className="delete-button" onClick={() => handleDelete(note.id)}>Sil</button>
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