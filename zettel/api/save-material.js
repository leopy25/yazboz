import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Sadece POST isteği kabul edilir.' });
  }
  try {
    await client.connect();
    const database = client.db('zettel-db');
    const collection = database.collection('materials');
    const data = req.body;
    const rCode = data['R-Kod'];

    await collection.updateOne(
      { 'R-Kod': rCode },
      { $set: data },
      { upsert: true }
    );

    res.status(200).json({ success: true, message: 'Materyal başarıyla kaydedildi.' });
  } catch (error) {
    res.status(500).json({ message: 'Kaydetme hatası.', error });
  } finally {
    await client.close();
  }
}