import Redis from 'ioredis';
import { NextResponse } from 'next/server';

// Ortam değişkeninden Redis URL'ini al
const redis = new Redis(process.env.REDIS_URL);

// Yardımcı fonksiyon: R-kod oluşturma
function generateRCode() {
  const now = new Date();
  const gg = String(now.getDate()).padStart(2, '0');
  const aa = String(now.getMonth() + 1).padStart(2, '0');
  const yy = String(now.getFullYear()).slice(-2);
  const ss = String(now.getHours()).padStart(2, '0');
  const dd = String(now.getMinutes()).padStart(2, '0');
  return `R${gg}${aa}${yy}-${ss}${dd}`;
}

// POST isteği: Yeni bir not kaydetmek için
export async function POST(request) {
  try {
    const data = await request.json();
    let rKod = data.rKod;

    // Eğer R-kod boşsa, otomatik olarak oluştur
    if (!rKod) {
      rKod = generateRCode();
    }

    const newNote = {
      id: Date.now().toString(),
      type: data.type,
      rKod,
      cKod: data.cKod,
      fKod: data.fKod,
      metin: data.metin,
      kaynakAdı: data.kaynakAdı,
      yazar: data.yazar,
      sayfa: data.sayfa,
      anahtarKelimeler: data.anahtarKelimeler,
    };

    await redis.hset('notes', { [newNote.id]: JSON.stringify(newNote) });

    return NextResponse.json({ message: 'Not başarıyla kaydedildi!', note: newNote });
  } catch (error) {
    console.error('Kaydetme hatası:', error);
    return NextResponse.json({ error: 'Not kaydedilemedi.' }, { status: 500 });
  }
}

// GET isteği: Tüm notları çekmek için
export async function GET() {
  try {
    const allNotes = await redis.hgetall('notes');
    const notesArray = Object.values(allNotes).map(note => JSON.parse(note));
    return NextResponse.json(notesArray);
  } catch (error) {
    console.error('Veri çekme hatası:', error);
    return NextResponse.json({ error: 'Notlar alınamadı.' }, { status: 500 });
  }
}

// DELETE isteği: Bir notu silmek için
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    await redis.hdel('notes', id);

    return NextResponse.json({ message: 'Not başarıyla silindi!' });
  } catch (error) {
    console.error('Silme hatası:', error);
    return NextResponse.json({ error: 'Not silinemedi.' }, { status: 500 });
  }
}