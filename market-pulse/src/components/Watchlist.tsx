import React from 'react';
import styled from 'styled-components';
import { TrendingUp, TrendingDown, BarChart3, Clock } from 'lucide-react';
import { Card, Text, theme } from '../styles/styled';
import { type Stock, formatCurrency, formatPercentage, formatNumber } from '../services/websocket';

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date);
};

const WatchlistContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const WatchlistHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: ${theme.spacing.lg};
`;

const WatchlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.lg};
`;

const StockCard = styled(Card)`
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.color || theme.colors.primary};
    border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
  }
`;

const StockHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
`;

const StockSymbol = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const SymbolIcon = styled.div<{ color?: string }>`
  width: 36px;
  height: 36px;
  background: ${props => `${props.color || theme.colors.primary}20`};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color || theme.colors.primary};
  font-weight: bold;
  font-size: 0.875rem;
`;

const StockInfo = styled.div`
  flex: 1;
  margin-left: ${theme.spacing.sm};
`;

const StockName = styled.div`
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs};
`;

const CompanyName = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.textSecondary};
`;

const PriceSection = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const CurrentPrice = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs};
`;

const PriceChange = styled.div<{ positive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${props => props.positive ? theme.colors.success : theme.colors.error};
  font-weight: 600;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const MetricItem = styled.div`
  text-align: left;
`;

const MetricLabel = styled.div`
  font-size: 0.75rem;
  color: ${theme.colors.textMuted};
  margin-bottom: ${theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;

const MetricValue = styled.div`
  font-weight: 600;
  color: ${theme.colors.text};
`;

const LastUpdated = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.75rem;
  color: ${theme.colors.textMuted};
  margin-top: ${theme.spacing.sm};
`;

interface WatchlistProps {
  stocks: Stock[];
}

export const Watchlist: React.FC<WatchlistProps> = ({ stocks }) => {
  const getStockColor = (symbol: string) => {
    const colors = {
      'AAPL': '#007AFF',
      'MSFT': '#00BCF2',
      'GOOGL': '#4285F4',
      'AMZN': '#FF9500',
      'NVDA': '#76B900',
      'TSLA': '#E31E24',
      'META': '#1877F2',
      'V': '#1A1F71'
    };
    return colors[symbol as keyof typeof colors] || theme.colors.primary;
  };

  return (
    <WatchlistContainer>
      <WatchlistHeader>
        <Text size="xl" weight="bold">Watchlist</Text>
      </WatchlistHeader>
      
      <WatchlistGrid>
        {stocks.map((stock) => {
          const isPositive = stock.changePercent > 0;
          const stockColor = getStockColor(stock.symbol);
          
          return (
            <StockCard key={stock.symbol} color={stockColor}>
              <StockHeader>
                <StockSymbol>
                  <SymbolIcon color={stockColor}>
                    {stock.symbol.substring(0, 2)}
                  </SymbolIcon>
                  <StockInfo>
                    <StockName>{stock.symbol}</StockName>
                    <CompanyName>{stock.name}</CompanyName>
                  </StockInfo>
                </StockSymbol>
                <BarChart3 size={20} color={theme.colors.textMuted} />
              </StockHeader>

              <PriceSection>
                <CurrentPrice>{formatCurrency(stock.price)}</CurrentPrice>
                <PriceChange positive={isPositive}>
                  {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {formatCurrency(Math.abs(stock.change))} ({formatPercentage(stock.changePercent)})
                </PriceChange>
              </PriceSection>

              <MetricsGrid>
                <MetricItem>
                  <MetricLabel>Volume</MetricLabel>
                  <MetricValue>{formatNumber(stock.volume)}</MetricValue>
                </MetricItem>
                <MetricItem>
                  <MetricLabel>Market Cap</MetricLabel>
                  <MetricValue>{formatNumber(stock.marketCap)}</MetricValue>
                </MetricItem>
              </MetricsGrid>

              <LastUpdated>
                <Clock size={12} />
                Updated {formatDate(stock.lastUpdated)}
              </LastUpdated>
            </StockCard>
          );
        })}
      </WatchlistGrid>
    </WatchlistContainer>
  );
};
