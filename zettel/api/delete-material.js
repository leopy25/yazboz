import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Sadece DELETE isteği kabul edilir.' });
  }
  try {
    await client.connect();
    const database = client.db('zettel-db');
    const collection = database.collection('materials');
    const data = req.body;
    const rCode = data['rCode'];

    await collection.deleteOne({ 'R-Kod': rCode });

    res.status(200).json({ success: true, message: 'Materyal başarıyla silindi.' });
  } catch (error) {
    res.status(500).json({ message: 'Silme hatası.', error });
  } finally {
    await client.close();
  }
}