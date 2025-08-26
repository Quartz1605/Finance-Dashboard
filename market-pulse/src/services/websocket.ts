// Note: Socket.io imports removed as we now use REST API polling for Vercel compatibility
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

// API configuration - Use relative paths for Vercel deployment
const BACKEND_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

// Polling intervals for different data types
const POLLING_INTERVALS = {
  stocks: 3000,
  indices: 5000,
  currencies: 7000,
  cryptos: 4000,
  news: 60000, // News updates less frequently
};

// Real-time hooks using REST API polling for Vercel deployment
export function useStockData() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/stocks`);
        if (!response.ok) throw new Error('Failed to fetch stocks');
        const data = await response.json();
        setStocks(data.map((stock: any) => ({
          ...stock,
          lastUpdated: new Date(stock.lastUpdated)
        })));
        setLoading(false);
        setError(null);
      } catch (err) {
        setError('Failed to fetch stock data');
        setLoading(false);
      }
    };

    // Initial fetch
    fetchStocks();
    
    // Set up polling
    const interval = setInterval(fetchStocks, POLLING_INTERVALS.stocks);
    
    return () => clearInterval(interval);
  }, []);
  
  return { stocks, loading, error };
}

export function useMarketIndices() {
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchIndices = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/indices`);
        if (!response.ok) throw new Error('Failed to fetch indices');
        const data = await response.json();
        setIndices(data.map((index: any) => ({
          ...index,
          lastUpdated: new Date(index.lastUpdated)
        })));
        setLoading(false);
        setError(null);
      } catch (err) {
        setError('Failed to fetch indices data');
        setLoading(false);
      }
    };

    // Initial fetch
    fetchIndices();
    
    // Set up polling
    const interval = setInterval(fetchIndices, POLLING_INTERVALS.indices);
    
    return () => clearInterval(interval);
  }, []);
  
  return { indices, loading, error };
}

export function useCurrencyPairs() {
  const [currencies, setCurrencies] = useState<CurrencyPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/currencies`);
        if (!response.ok) throw new Error('Failed to fetch currencies');
        const data = await response.json();
        setCurrencies(data.map((currency: any) => ({
          ...currency,
          lastUpdated: new Date(currency.lastUpdated)
        })));
        setLoading(false);
        setError(null);
      } catch (err) {
        setError('Failed to fetch currency data');
        setLoading(false);
      }
    };

    // Initial fetch
    fetchCurrencies();
    
    // Set up polling
    const interval = setInterval(fetchCurrencies, POLLING_INTERVALS.currencies);
    
    return () => clearInterval(interval);
  }, []);
  
  return { currencies, loading, error };
}

export function useCryptoData() {
  const [cryptos, setCryptos] = useState<Cryptocurrency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/cryptos`);
        if (!response.ok) throw new Error('Failed to fetch cryptos');
        const data = await response.json();
        setCryptos(data.map((crypto: any) => ({
          ...crypto,
          lastUpdated: new Date(crypto.lastUpdated)
        })));
        setLoading(false);
        setError(null);
      } catch (err) {
        setError('Failed to fetch crypto data');
        setLoading(false);
      }
    };

    // Initial fetch
    fetchCryptos();
    
    // Set up polling
    const interval = setInterval(fetchCryptos, POLLING_INTERVALS.cryptos);
    
    return () => clearInterval(interval);
  }, []);
  
  return { cryptos, loading, error };
}

export function useNewsData() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/news`);
        if (!response.ok) throw new Error('Failed to fetch news');
        const data = await response.json();
        setNews(data.map((item: any) => ({
          ...item,
          publishedAt: new Date(item.publishedAt)
        })));
        setLoading(false);
        setError(null);
      } catch (err) {
        setError('Failed to fetch news data');
        setLoading(false);
      }
    };

    // Initial fetch
    fetchNews();
    
    // Set up polling (news updates less frequently)
    const interval = setInterval(fetchNews, POLLING_INTERVALS.news);
    
    return () => clearInterval(interval);
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
