import express from 'express';
import cors from 'cors';
import { mockStocks, mockIndices, mockCurrencies, mockNews, mockCryptos } from './api/_data/mockData.js';
import { updateStockPrices, updateMarketIndices, updateCurrencies, updateCryptos } from './api/_utils/priceSimulator.js';

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Store current data
let currentStocks = [...mockStocks];
let currentIndices = [...mockIndices];
let currentCurrencies = [...mockCurrencies];
let currentCryptos = [...mockCryptos];

// API Routes - exactly matching the Vercel serverless functions

// Stocks endpoint
app.get('/api/stocks', (req, res) => {
  currentStocks = updateStockPrices(currentStocks);
  res.json(currentStocks);
});

// Indices endpoint
app.get('/api/indices', (req, res) => {
  currentIndices = updateMarketIndices(currentIndices);
  res.json(currentIndices);
});

// Currencies endpoint
app.get('/api/currencies', (req, res) => {
  currentCurrencies = updateCurrencies(currentCurrencies);
  res.json(currentCurrencies);
});

// Cryptos endpoint
app.get('/api/cryptos', (req, res) => {
  currentCryptos = updateCryptos(currentCryptos);
  res.json(currentCryptos);
});

// News endpoint
app.get('/api/news', (req, res) => {
  res.json(mockNews);
});

// Individual stock endpoint
app.get('/api/stock/:symbol', (req, res) => {
  const { symbol } = req.params;
  currentStocks = updateStockPrices(currentStocks);
  const stock = currentStocks.find(s => s.symbol === symbol.toUpperCase());
  
  if (!stock) {
    return res.status(404).json({ error: 'Stock not found' });
  }

  res.json(stock);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Market Pulse API (Development)'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Development API server running on port ${PORT}`);
  console.log(`📊 API endpoints available at: http://localhost:${PORT}/api/*`);
  console.log(`🔗 Frontend should connect to: http://localhost:${PORT}`);
});
