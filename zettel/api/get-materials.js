import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Sadece GET isteği kabul edilir.' });
  }
  try {
    await client.connect();
    const database = client.db('zettel-db'); 
    const collection = database.collection('materials');
    const materials = await collection.find({}).toArray();

    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: 'Veri çekme hatası.', error });
  } finally {
    await client.close();
  }
}