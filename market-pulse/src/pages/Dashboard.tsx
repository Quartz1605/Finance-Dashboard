import React from 'react';
import styled from 'styled-components';
import { Container } from '../styles/styled';
import { MarketOverview } from '../components/MarketOverview';
import { Watchlist } from '../components/Watchlist';
import { StockChart } from '../components/StockChart';
import { News } from '../components/News';
import { GlobalIndices } from '../components/GlobalIndices';
import { CurrencyExchange } from '../components/CurrencyExchange';
import { 
  useStockData,
  useMarketIndices,
  useCurrencyPairs,
  useNewsData
} from '../services/websocket';

const DashboardContainer = styled.div`
  padding: 2rem 0;
`;

const DashboardGrid = styled.div`
  display: grid;
  gap: 2rem;
`;

export const Dashboard: React.FC = () => {
  // Use real-time data hooks
  const { stocks, loading: stocksLoading, error: stocksError } = useStockData();
  const { indices, loading: indicesLoading, error: indicesError } = useMarketIndices();
  const { currencies, loading: currenciesLoading, error: currenciesError } = useCurrencyPairs();
  const { news, loading: newsLoading, error: newsError } = useNewsData();

  if (stocksLoading || indicesLoading || currenciesLoading || newsLoading) {
    return (
      <DashboardContainer>
        <Container>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            Loading market data...
          </div>
        </Container>
      </DashboardContainer>
    );
  }

  if (stocksError || indicesError || currenciesError || newsError) {
    return (
      <DashboardContainer>
        <Container>
          <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
            Error loading market data: {stocksError || indicesError || currenciesError || newsError}
          </div>
        </Container>
      </DashboardContainer>
    );
  }

  // Calculate market overview metrics
  const totalMarketCap = stocks.reduce((sum, stock) => sum + stock.marketCap, 0);
  const totalTradingVolume = stocks.reduce((sum, stock) => sum + (stock.volume * stock.price), 0);
  
  // Find top gainer and loser
  const sortedByChange = [...stocks].sort((a, b) => b.changePercent - a.changePercent);
  const topGainer = sortedByChange[0];
  const topLoser = sortedByChange[sortedByChange.length - 1];

  const topStocks = stocks.map(stock => ({
    symbol: stock.symbol,
    name: stock.name,
    changePercent: stock.changePercent
  }));

  return (
    <DashboardContainer>
      <Container>
        <DashboardGrid>
          {/* Market Overview Cards */}
          <MarketOverview
            marketCap={totalMarketCap}
            tradingVolume={totalTradingVolume}
            topGainer={{
              symbol: topGainer.symbol,
              name: topGainer.name,
              changePercent: topGainer.changePercent
            }}
            topLoser={{
              symbol: topLoser.symbol,
              name: topLoser.name,
              changePercent: topLoser.changePercent
            }}
            topStocks={topStocks}
          />

          {/* Watchlist */}
          <Watchlist stocks={stocks} />

          {/* Stock Chart */}
          <StockChart 
            symbol="AAPL"
            currentPrice={stocks.find(s => s.symbol === 'AAPL')?.price || 187.32}
          />

          {/* Global Indices */}
          <GlobalIndices indices={indices} />

          {/* Currency Exchange */}
          <CurrencyExchange currencies={currencies} />

          {/* News Feed */}
          <News news={news} />
        </DashboardGrid>
      </Container>
    </DashboardContainer>
  );
};
