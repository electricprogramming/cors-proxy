import fetch from 'node-fetch';
export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing "url" query parameter' });
  }
  try {
    const response = await fetch(targetUrl);
    try {
      var data = await response.json());
    } catch {
      var data = await response.text();
    }
    const headers = response.headers;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', headers.get('content-type') || 'application/json');
    res.status(response.status).send(data);
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch target URL', details: error.message });
  }
}
