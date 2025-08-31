import Redis from 'ioredis';
import { NextResponse } from 'next/server';

// Ortam değişkeninden Redis URL'ini al
const redis = new Redis(process.env.REDIS_URL);

// POST isteği: Yeni bir not kaydetmek için
export async function POST(request) {
  try {
    const { type, rKod, cKod, fKod, kaynakAdı, yazar, metin, sayfa, anahtarKelimeler } = await request.json();

    const newNote = {
      id: Date.now().toString(),
      type,
      rKod,
      cKod,
      fKod,
      kaynakAdı,
      yazar,
      metin,
      sayfa,
      anahtarKelimeler,
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