# MarketPulse - Modern Finance Dashboard

A comprehensive financial market dashboard built with React, TypeScript, and modern web technologies. This application provides real-time market data visualization, portfolio tracking, and financial analysis tools that matches the Market Mosaic design from the provided screenshots.

## 🚀 Features

### 🏠 Dashboard
- Market overview cards (Market Cap, Trading Volume, Top Gainer/Loser)
- Interactive watchlist with real-time stock prices
- Stock price charts with multiple timeframes
- Market news feed with related symbols
- Global market indices
- Currency exchange rates

### 📈 Stocks
- Comprehensive stock listings with detailed metrics
- Real-time price updates and percentage changes
- Interactive mini-charts for each stock
- Search functionality
- Volume, market cap, P/E ratios, and dividend yields
- 52-week high/low indicators

### 🌍 Markets
- Global market indices overview
- Regional performance tracking
- Today's high/low and volume data
- Real-time updates with color-coded performance indicators

### 💼 Portfolio
- Portfolio summary with total value and gains/losses
- Holdings table with detailed position information
- Sector allocation pie chart
- Performance tracking with visual indicators

### 📊 Performance
- Portfolio vs S&P 500 comparison charts
- Total return metrics
- Monthly performance breakdown
- Historical performance visualization

### 💱 Currencies
- Real-time currency exchange rates
- Interactive currency converter
- Multiple currency pair tracking
- Live rate updates with change indicators

### 🌐 Global
- Regional market performance overview
- Economic calendar with upcoming events
- Country-specific market data
- Impact level indicators for economic events

### ⚙️ Settings
- Account management
- Notification preferences
- Display settings (Dark mode, Compact view)
- Security and regional settings

## 🛠 Tech Stack

### Core Technologies
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **React Router Dom** - Client-side routing

### Styling & UI
- **Styled Components** - CSS-in-JS styling solution
- **Lucide React** - Modern icon library
- **Responsive Design** - Mobile-first approach

### Data Visualization
- **Recharts** - Composable charting library
- **Interactive Charts** - Line charts, pie charts, and more
- **Real-time Updates** - Live data visualization

## 🚦 Getting Started

### Installation

1. **Navigate to project directory**
   ```bash
   cd market-pulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header.tsx       # Navigation header with market status
│   ├── MarketOverview.tsx # Market summary cards
│   ├── Watchlist.tsx    # Stock watchlist cards
│   ├── StockChart.tsx   # Interactive price charts
│   ├── News.tsx         # Market news feed
│   ├── GlobalIndices.tsx # Global market data
│   └── CurrencyExchange.tsx # Currency rates
├── pages/               # Main application pages
│   ├── Dashboard.tsx    # Main dashboard page
│   ├── Stocks.tsx       # Stock listings page
│   ├── Markets.tsx      # Market overview page
│   ├── Portfolio.tsx    # Portfolio management
│   ├── Performance.tsx  # Performance analytics
│   ├── Currencies.tsx   # Currency exchange
│   ├── Global.tsx       # Global markets
│   └── Settings.tsx     # User settings
├── styles/              # Styling and theme
│   └── styled.ts        # Styled components and theme
├── utils/               # Utilities and data
│   └── mockData.ts      # Mock data and utilities
└── App.tsx              # Main application component
```

## 📊 Data Features

All data is mocked for demonstration purposes with realistic market behavior simulation:

- **Real-time Updates**: 
  - Stock prices update every 5 seconds
  - Market indices update every 8 seconds  
  - Currency rates update every 10 seconds
- **Mock Data Includes**:
  - **Stocks**: AAPL, MSFT, GOOGL, AMZN, NVDA, TSLA, META, V
  - **Indices**: S&P 500, Dow Jones, NASDAQ, Nikkei 225, FTSE 100, DAX
  - **Currencies**: Major forex pairs (EUR/USD, USD/JPY, GBP/USD, etc.)
  - **News**: Market news with related symbols and timestamps

## 🎨 Design Features

- **Dark Theme**: Professional dark theme matching modern trading platforms
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Interactive Elements**: Hover effects, smooth animations, and transitions
- **Color-coded Data**: Green for gains, red for losses, visual indicators
- **Clean Typography**: Easy-to-read fonts and proper information hierarchy
- **Modern Cards**: Clean card layouts with subtle shadows and borders

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Customization

### Theme Configuration
The application uses a centralized theme system in `src/styles/styled.ts`:

```typescript
export const theme = {
  colors: {
    primary: '#4285f4',
    secondary: '#34a853', 
    success: '#10b981',
    error: '#ef4444',
    background: '#0a0a0a',
    surface: '#1a1a1a',
    // ... more colors
  }
}
```

### Adding New Data
Modify `src/utils/mockData.ts` to customize:
- Stock symbols and company data
- Market indices and regions
- Currency pairs and exchange rates
- News articles and market events

## 🌟 Key Components

### Header Navigation
- Sticky header with all navigation links
- Search functionality for stocks and indices
- Real-time market status indicator
- User profile section

### Market Overview Cards  
- Large metric cards for market cap and trading volume
- Top gainer/loser identification
- Color-coded performance indicators
- Real-time updates with smooth animations

### Watchlist
- Card-based layout for easy scanning
- Company logos and brand colors
- Real-time price updates
- Volume, market cap, and last updated info

### Stock Charts
- Interactive line charts with Recharts
- Multiple timeframe selection (1D, 1W, 1M, etc.)
- Custom tooltips and hover effects
- Responsive design

### Portfolio Management
- Summary cards with total value and gains
- Detailed holdings table
- Sector allocation pie chart
- Performance tracking

## 🎯 Future Enhancements

- [ ] Real API integration (Alpha Vantage, Yahoo Finance)
- [ ] User authentication and data persistence
- [ ] Advanced charting with technical indicators
- [ ] Push notifications for price alerts
- [ ] Export functionality for portfolio data
- [ ] Advanced filtering and sorting options
- [ ] Watchlist customization
- [ ] Social trading features

## 📄 License

MIT License - This project is open source and available for educational and commercial use.

## 🙏 Acknowledgments

- Built with modern React and TypeScript best practices
- Inspired by professional trading platforms like Bloomberg Terminal
- Uses open-source libraries and follows accessibility guidelines
- Designed to replicate the Market Mosaic interface from provided screenshots
