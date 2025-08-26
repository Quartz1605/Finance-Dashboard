// Utility functions for price simulation and market data updates

// Utility function to update stock prices with realistic fluctuations
export function updateStockPrices(stocks) {
  return stocks.map(stock => {
    const changeAmount = (Math.random() - 0.5) * (stock.price * 0.01);
    const newPrice = Math.max(stock.price + changeAmount, 0.01);
    const newChange = stock.change + changeAmount;
    const newChangePercent = (newChange / (newPrice - newChange)) * 100;
    
    return {
      ...stock,
      price: parseFloat(newPrice.toFixed(2)),
      change: parseFloat(newChange.toFixed(2)),
      changePercent: parseFloat(newChangePercent.toFixed(2)),
      lastUpdated: new Date()
    };
  });
}

export function updateMarketIndices(indices) {
  return indices.map(index => {
    const changeAmount = (Math.random() - 0.5) * (index.value * 0.0015);
    const newValue = Math.max(index.value + changeAmount, 0.01);
    const newChange = index.change + changeAmount;
    const newChangePercent = (newChange / (newValue - newChange)) * 100;
    
    return {
      ...index,
      value: parseFloat(newValue.toFixed(2)),
      change: parseFloat(newChange.toFixed(2)),
      changePercent: parseFloat(newChangePercent.toFixed(2)),
      lastUpdated: new Date()
    };
  });
}

export function updateCurrencies(currencies) {
  return currencies.map(currency => {
    const changeAmount = (Math.random() - 0.5) * (currency.rate * 0.0008);
    const newRate = Math.max(currency.rate + changeAmount, 0.0001);
    const newChange = currency.change + changeAmount;
    const newChangePercent = (newChange / (newRate - newChange)) * 100;
    
    return {
      ...currency,
      rate: parseFloat(newRate.toFixed(4)),
      change: parseFloat(newChange.toFixed(4)),
      changePercent: parseFloat(newChangePercent.toFixed(2)),
      lastUpdated: new Date()
    };
  });
}

export function updateCryptos(cryptos) {
  return cryptos.map(crypto => {
    const volatilityFactor = crypto.symbol === 'BTC' || crypto.symbol === 'ETH' ? 0.005 : 0.012;
    const changeAmount = (Math.random() - 0.5) * (crypto.price * volatilityFactor);
    const newPrice = Math.max(crypto.price + changeAmount, 0.000001);
    const newChange = crypto.change + changeAmount;
    const newChangePercent = (newChange / (newPrice - newChange)) * 100;
    
    return {
      ...crypto,
      price: parseFloat(newPrice.toFixed(crypto.price < 1 ? 4 : 2)),
      change: parseFloat(newChange.toFixed(crypto.price < 1 ? 4 : 2)),
      changePercent: parseFloat(newChangePercent.toFixed(2)),
      lastUpdated: new Date()
    };
  });
}
