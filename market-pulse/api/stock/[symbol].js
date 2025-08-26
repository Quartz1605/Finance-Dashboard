import { mockStocks } from '../_data/mockData.js';
import { updateStockPrices } from '../_utils/priceSimulator.js';

// Store current data (in a real app, this would be in a database)
let currentStocks = [...mockStocks];

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
    const { symbol } = req.query;
    
    // Update stock prices for real-time simulation
    currentStocks = updateStockPrices(currentStocks);
    
    const stock = currentStocks.find(s => s.symbol === symbol.toUpperCase());
    
    if (!stock) {
      res.status(404).json({ error: 'Stock not found' });
      return;
    }

    res.status(200).json(stock);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
