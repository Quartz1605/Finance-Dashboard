# Market Pulse - Real-time Finance Dashboard

A modern, real-time finance dashboard built with React and Node.js, featuring live WebSocket updates for stock prices, market indices, currencies, and financial news.

## 🚀 Features

- **Real-time Data Updates**: Stock prices update every 3 seconds via WebSocket
- **Market Indices**: Live tracking of S&P 500, NASDAQ, Dow Jones, and international indices
- **Currency Exchange**: Real-time forex rates with automatic updates
- **Interactive Charts**: Recharts integration for stock price visualization
- **News Feed**: Latest financial news with related stock symbols
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Theme**: Professional dark theme optimized for financial data

## 🏗️ Architecture

### Frontend (React + TypeScript + Vite)
- **Location**: `/market-pulse`
- **Framework**: React 18 with TypeScript
- **Styling**: styled-components with custom theme system
- **Charts**: Recharts for data visualization
- **Real-time**: Socket.IO client for WebSocket connections
- **State Management**: React Hooks with custom data hooks

### Backend (Node.js + Express + Socket.IO)
- **Location**: `/market-pulse-backend`
- **Framework**: Express.js with Socket.IO
- **Real-time Updates**: WebSocket broadcasts for live data
- **REST API**: RESTful endpoints for initial data loading
- **Data Simulation**: Realistic market data fluctuations

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Setup

1. **Clone and install dependencies**:
   ```bash
   # Install frontend dependencies
   cd market-pulse
   npm install
   
   # Install backend dependencies  
   cd ../market-pulse-backend
   npm install
   ```

2. **Start the Backend Server** (Port 3001):
   ```bash
   cd market-pulse-backend
   npm start
   ```
   You should see:
   ```
   🚀 Market Pulse Backend running on port 3001
   📊 WebSocket server ready for real-time updates
   🔗 Frontend should connect to: http://localhost:3001
   ```

3. **Start the Frontend** (Port 5173):
   ```bash
   cd market-pulse
   npm run dev
   ```
   You should see:
   ```
   VITE v7.1.3  ready in 381 ms
   ➜  Local:   http://localhost:5173/
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 📊 Real-time Data Flow

### Update Frequencies
- **Stocks**: Every 3 seconds
- **Market Indices**: Every 5 seconds  
- **Currencies**: Every 7 seconds
- **Crypto**: Every 4 seconds
- **News**: Static (loaded once)

### WebSocket Events
- `stocks-update`: Real-time stock price changes
- `indices-update`: Market indices updates
- `currencies-update`: Forex rate changes
- `cryptos-update`: Cryptocurrency prices
- `news-update`: News feed updates

## 🔌 API Endpoints

### REST API (Backend: http://localhost:3001)
- `GET /health` - Server health check
- `GET /api/stocks` - All stock data
- `GET /api/stock/:symbol` - Individual stock data
- `GET /api/indices` - Market indices
- `GET /api/currencies` - Currency pairs
- `GET /api/cryptos` - Cryptocurrency data
- `GET /api/news` - Financial news

### WebSocket Connection
The frontend automatically connects to `ws://localhost:3001` for real-time updates.

## 🎯 Testing the Setup

Run the backend connection test:
```bash
node test-backend.js
```

This will verify all API endpoints are working and show sample data.

## 📱 Pages & Components

### Pages
- **Dashboard** - Main overview with all widgets
- **Stocks** - Detailed stock listings with search
- **Markets** - Global market indices
- **Portfolio** - Portfolio management (mock data)
- **Performance** - Analytics dashboard
- **Currencies** - Forex exchange rates
- **Global** - International markets
- **Settings** - User preferences

### Key Components
- **MarketOverview** - Market summary cards
- **Watchlist** - Stock watchlist with real-time prices
- **StockChart** - Interactive price charts
- **GlobalIndices** - Market indices display
- **CurrencyExchange** - Forex rates and calculator
- **News** - Financial news feed

## 🔧 Development

### Adding New Stocks
Edit `/market-pulse-backend/server.js` and add to the `mockStocks` array:

```javascript
{
  symbol: 'SYMBOL',
  name: 'Company Name',
  price: 100.00,
  change: 1.50,
  changePercent: 1.52,
  volume: 1000000,
  marketCap: 1000000000000,
  lastUpdated: new Date()
}
```

### Customizing Update Intervals
Modify the `setInterval` calls in `/market-pulse-backend/server.js`:

```javascript
// Update stocks every 3 seconds (3000ms)
setInterval(() => {
  updateStockPrices();
  io.emit('stocks-update', currentStocks);
}, 3000);
```

### Frontend Data Hooks
Use the WebSocket hooks in your components:

```typescript
import { useStockData, useMarketIndices } from '../services/websocket';

const { stocks, loading, error } = useStockData();
const { indices } = useMarketIndices();
```

## 🚀 Production Deployment

### Backend Deployment
1. Set environment variables:
   ```bash
   export PORT=3001
   export NODE_ENV=production
   ```

2. Update CORS settings in `server.js` for your production domain

### Frontend Deployment
1. Update the backend URL in `/src/services/websocket.ts`:
   ```typescript
   const BACKEND_URL = 'https://your-backend-domain.com';
   ```

2. Build and deploy:
   ```bash
   npm run build
   ```

## 🐛 Troubleshooting

### Common Issues

1. **WebSocket Connection Failed**
   - Ensure backend is running on port 3001
   - Check firewall settings
   - Verify CORS configuration

2. **No Real-time Updates**
   - Check browser console for WebSocket errors
   - Ensure both servers are running
   - Verify network connectivity

3. **Data Not Loading**
   - Test API endpoints with `node test-backend.js`
   - Check browser network tab for failed requests
   - Verify backend console for errors

### Debug Commands
```bash
# Test backend health
curl http://localhost:3001/health

# Test stock data
curl http://localhost:3001/api/stocks

# Run connection test
node test-backend.js
```

## 📊 Data Structure

### Stock Interface
```typescript
interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  lastUpdated: Date;
}
```

## 🎉 Success! 

Your Market Pulse dashboard is now running with real-time data updates! 

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **Real-time Updates**: Active via WebSocket
- **API Documentation**: Available at backend endpoints

Watch your stock prices update every 3 seconds and enjoy your professional finance dashboard! 📈💹
