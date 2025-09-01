import Redis from 'ioredis';
import { NextResponse } from 'next/server';

const redis = new Redis(process.env.REDIS_URL);

export async function POST(request) {
  try {
    const { rKodId, sayfa, metin } = await request.json();
    const newQuote = {
      id: Date.now().toString(),
      rKodId,
      sayfa,
      metin,
      anahtarKelimeler: [],
    };
    await redis.hset(`quotes:${rKodId}`, { [newQuote.id]: JSON.stringify(newQuote) });
    return NextResponse.json({ message: 'Alıntı başarıyla kaydedildi!', quote: newQuote });
  } catch (error) {
    return NextResponse.json({ error: 'Alıntı kaydedilemedi.' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const rKodId = searchParams.get('rKodId');
    if (!rKodId) {
      return NextResponse.json({ error: 'rKodId parametresi eksik.' }, { status: 400 });
    }
    const allQuotes = await redis.hgetall(`quotes:${rKodId}`);
    const quotesArray = Object.values(allQuotes).map(quote => JSON.parse(quote));
    return NextResponse.json(quotesArray);
  } catch (error) {
    return NextResponse.json({ error: 'Alıntılar alınamadı.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id, rKodId } = await request.json();
    await redis.hdel(`quotes:${rKodId}`, id);
    return NextResponse.json({ message: 'Alıntı başarıyla silindi!' });
  } catch (error) {
    return NextResponse.json({ error: 'Alıntı silinemedi.' }, { status: 500 });
  }
}