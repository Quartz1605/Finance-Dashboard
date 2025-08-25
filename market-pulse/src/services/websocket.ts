import { io, Socket } from 'socket.io-client';
import { useState, useEffect } from 'react';

// Import existing interfaces from your mockData.ts
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  lastUpdated: Date;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  region: string;
  lastUpdated: Date;
}

export interface CurrencyPair {
  symbol: string;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  change: number;
  changePercent: number;
  lastUpdated: Date;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  imageUrl?: string;
  publishedAt: Date;
  relatedSymbols?: string[];
}

export interface Cryptocurrency {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  volume: number;
  supply: number;
  lastUpdated: Date;
}

// WebSocket connection
const BACKEND_URL = 'http://localhost:3001';
let socket: Socket | null = null;

const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io(BACKEND_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    
    socket.on('connect', () => {
      console.log('✅ Connected to Market Pulse backend');
    });
    
    socket.on('disconnect', () => {
      console.log('❌ Disconnected from Market Pulse backend');
    });
    
    socket.on('connect_error', (error: any) => {
      console.error('🔥 Connection error:', error.message);
    });
  }
  return socket;
};

// Real-time hooks using WebSocket data
export function useStockData() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const socketConnection = initializeSocket();
    
    // Listen for stock updates
    socketConnection.on('stocks-update', (data: any[]) => {
      setStocks(data.map((stock: any) => ({
        ...stock,
        lastUpdated: new Date(stock.lastUpdated)
      })));
      setLoading(false);
      setError(null);
    });
    
    // Handle connection errors
    socketConnection.on('connect_error', () => {
      setError('Failed to connect to market data server');
      setLoading(false);
    });
    
    // Request initial data if already connected
    if (socketConnection.connected) {
      // Fetch initial data via REST API as fallback
      fetch(`${BACKEND_URL}/api/stocks`)
        .then(res => res.json())
        .then((data: any[]) => {
          setStocks(data.map((stock: any) => ({
            ...stock,
            lastUpdated: new Date(stock.lastUpdated)
          })));
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch initial stock data');
          setLoading(false);
        });
    }
    
    return () => {
      if (socketConnection) {
        socketConnection.off('stocks-update');
        socketConnection.off('connect_error');
      }
    };
  }, []);
  
  return { stocks, loading, error };
}

export function useMarketIndices() {
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const socketConnection = initializeSocket();
    
    socketConnection.on('indices-update', (data: any[]) => {
      setIndices(data.map((index: any) => ({
        ...index,
        lastUpdated: new Date(index.lastUpdated)
      })));
      setLoading(false);
      setError(null);
    });
    
    socketConnection.on('connect_error', () => {
      setError('Failed to connect to market data server');
      setLoading(false);
    });
    
    if (socketConnection.connected) {
      fetch(`${BACKEND_URL}/api/indices`)
        .then(res => res.json())
        .then((data: any[]) => {
          setIndices(data.map((index: any) => ({
            ...index,
            lastUpdated: new Date(index.lastUpdated)
          })));
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch initial indices data');
          setLoading(false);
        });
    }
    
    return () => {
      if (socketConnection) {
        socketConnection.off('indices-update');
        socketConnection.off('connect_error');
      }
    };
  }, []);
  
  return { indices, loading, error };
}

export function useCurrencyPairs() {
  const [currencies, setCurrencies] = useState<CurrencyPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const socketConnection = initializeSocket();
    
    socketConnection.on('currencies-update', (data: any[]) => {
      setCurrencies(data.map((currency: any) => ({
        ...currency,
        lastUpdated: new Date(currency.lastUpdated)
      })));
      setLoading(false);
      setError(null);
    });
    
    socketConnection.on('connect_error', () => {
      setError('Failed to connect to market data server');
      setLoading(false);
    });
    
    if (socketConnection.connected) {
      fetch(`${BACKEND_URL}/api/currencies`)
        .then(res => res.json())
        .then((data: any[]) => {
          setCurrencies(data.map((currency: any) => ({
            ...currency,
            lastUpdated: new Date(currency.lastUpdated)
          })));
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch initial currency data');
          setLoading(false);
        });
    }
    
    return () => {
      if (socketConnection) {
        socketConnection.off('currencies-update');
        socketConnection.off('connect_error');
      }
    };
  }, []);
  
  return { currencies, loading, error };
}

export function useCryptoData() {
  const [cryptos, setCryptos] = useState<Cryptocurrency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const socketConnection = initializeSocket();
    
    socketConnection.on('cryptos-update', (data: any[]) => {
      setCryptos(data.map((crypto: any) => ({
        ...crypto,
        lastUpdated: new Date(crypto.lastUpdated)
      })));
      setLoading(false);
      setError(null);
    });
    
    socketConnection.on('connect_error', () => {
      setError('Failed to connect to market data server');
      setLoading(false);
    });
    
    if (socketConnection.connected) {
      fetch(`${BACKEND_URL}/api/cryptos`)
        .then(res => res.json())
        .then((data: any[]) => {
          setCryptos(data.map((crypto: any) => ({
            ...crypto,
            lastUpdated: new Date(crypto.lastUpdated)
          })));
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch initial crypto data');
          setLoading(false);
        });
    }
    
    return () => {
      if (socketConnection) {
        socketConnection.off('cryptos-update');
        socketConnection.off('connect_error');
      }
    };
  }, []);
  
  return { cryptos, loading, error };
}

export function useNewsData() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const socketConnection = initializeSocket();
    
    socketConnection.on('news-update', (data: any[]) => {
      setNews(data.map((item: any) => ({
        ...item,
        publishedAt: new Date(item.publishedAt)
      })));
      setLoading(false);
      setError(null);
    });
    
    socketConnection.on('connect_error', () => {
      setError('Failed to connect to market data server');
      setLoading(false);
    });
    
    if (socketConnection.connected) {
      fetch(`${BACKEND_URL}/api/news`)
        .then(res => res.json())
        .then((data: any[]) => {
          setNews(data.map((item: any) => ({
            ...item,
            publishedAt: new Date(item.publishedAt)
          })));
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch news data');
          setLoading(false);
        });
    }
    
    return () => {
      if (socketConnection) {
        socketConnection.off('news-update');
        socketConnection.off('connect_error');
      }
    };
  }, []);
  
  return { news, loading, error };
}

// Utility functions (keep existing ones)
export const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (number: number) => {
  if (number >= 1e12) {
    return (number / 1e12).toFixed(1) + 'T';
  }
  if (number >= 1e9) {
    return (number / 1e9).toFixed(1) + 'B';
  }
  if (number >= 1e6) {
    return (number / 1e6).toFixed(1) + 'M';
  }
  if (number >= 1e3) {
    return (number / 1e3).toFixed(1) + 'K';
  }
  return number.toLocaleString();
};

export const formatPercentage = (percentage: number) => {
  return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
};

// API functions for direct REST calls
export const stockAPI = {
  getAll: () => fetch(`${BACKEND_URL}/api/stocks`).then(res => res.json()),
  getBySymbol: (symbol: string) => fetch(`${BACKEND_URL}/api/stock/${symbol}`).then(res => res.json()),
};

export const marketAPI = {
  getIndices: () => fetch(`${BACKEND_URL}/api/indices`).then(res => res.json()),
  getCurrencies: () => fetch(`${BACKEND_URL}/api/currencies`).then(res => res.json()),
  getCryptos: () => fetch(`${BACKEND_URL}/api/cryptos`).then(res => res.json()),
  getNews: () => fetch(`${BACKEND_URL}/api/news`).then(res => res.json()),
};

// Export the socket instance for advanced use cases
export { socket };
