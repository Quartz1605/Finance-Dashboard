import { mockCurrencies } from './_data/mockData.js';
import { updateCurrencies } from './_utils/priceSimulator.js';

// Store current data (in a real app, this would be in a database)
let currentCurrencies = [...mockCurrencies];

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Simulate real-time price updates
    currentCurrencies = updateCurrencies(currentCurrencies);
    res.status(200).json(currentCurrencies);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
