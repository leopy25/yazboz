import fetch from 'node-fetch';

export default async function handler(request, response) {
  // GET, POST, DELETE ve OPTIONS metotlarına izin veriyoruz
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS preflight isteğini yönetiyoruz
  if (request.method === 'OPTIONS') {
    return response.status(200).send();
  }

  // Apps Script URL'nizi buraya yapıştırın.
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyCBkpzzpA83WfOTFh0Le0pafwYEFYjSz8cXAl1oBXRUxx3-W5Cy7ZI_xEfrj1kIUBN/exec';

  try {
    const fetchOptions = {
      method: request.method,
      headers: {
        'Content-Type': request.headers['content-type'] || 'application/json',
      },
    };

    // Yalnızca POST ve DELETE istekleri için body'yi ekliyoruz
    if (request.method === 'POST' || request.method === 'DELETE') {
      fetchOptions.body = JSON.stringify(request.body);
    }

    // Apps Script'e isteği yönlendiriyoruz
    const googleResponse = await fetch(SCRIPT_URL, fetchOptions);
    const data = await googleResponse.json();

    // Apps Script'ten gelen veriyi CORS başlıkları ile döndürüyoruz
    return response.status(googleResponse.status).json(data);
  } catch (error) {
    console.error('Proxy hatası:', error);
    return response.status(500).json({ success: false, message: 'Proxy işlemi sırasında bir hata oluştu.' });
  }
}