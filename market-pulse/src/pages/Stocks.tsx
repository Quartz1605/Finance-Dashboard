import React, { useState } from 'react';
import styled from 'styled-components';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Search } from 'lucide-react';
import { Container, Card, Text, Input, theme } from '../styles/styled';
import { 
  mockStocks, 
  useStockData, 
  formatCurrency, 
  formatPercentage, 
  formatNumber,
  generatePriceHistory,
  type Stock
} from '../utils/mockData';

const StocksContainer = styled.div`
  padding: 2rem 0;
`;

const StocksHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
  
  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.textMuted};
  }

  input {
    padding-left: 40px;
  }
`;

const StocksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.25rem;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const StockCard = styled(Card)`
  display: flex;
  gap: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 1.5rem;
  overflow: hidden;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
    background: ${theme.colors.surfaceHover};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const StockInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StockHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.6rem;
`;

const StockSymbol = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.text};
`;

const StockName = styled.div`
  color: ${theme.colors.textSecondary};
`;

const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 0.6rem;
`;

const CurrentPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.text};
`;

const PriceChange = styled.div<{ positive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.positive ? theme.colors.success : theme.colors.error};
  font-weight: 600;
  font-size: 1.125rem;
`;

const StockMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
`;

const MetricItem = styled.div``;

const MetricLabel = styled.div`
  font-size: 0.75rem;
  color: ${theme.colors.textMuted};
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;

const MetricValue = styled.div`
  font-weight: 600;
  color: ${theme.colors.text};
`;

const StockChart = styled.div`
  width: 300px;
  height: 120px;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    height: 200px;
    flex-shrink: 1;
  }

  @media (max-width: 480px) {
    height: 150px;
  }
`;

const WeekRange = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: ${theme.colors.textSecondary};
  width: 100%;
  overflow: hidden;
`;

const RangeBar = styled.div`
  flex: 1;
  height: 4px;
  background: ${theme.colors.border};
  border-radius: 2px;
  position: relative;
  max-width: 100%;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 30%;
    width: 4px;
    height: 100%;
    background: ${theme.colors.primary};
    border-radius: 2px;
  }
`;

export const Stocks: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const stocks = useStockData(mockStocks, 5000);

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateMockChartData = (price: number) => {
    return generatePriceHistory(7, price, 1.5).map((value, index) => ({
      x: index,
      y: value
    }));
  };

  const MiniChart: React.FC<{ data: Array<{x: number, y: number}>, positive: boolean }> = ({ data, positive }) => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="y"
          stroke={positive ? theme.colors.success : theme.colors.error}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <StocksContainer>
      <Container>
        <StocksHeader>
          <Text size="2xl" weight="bold">All Stocks</Text>
          <SearchContainer>
            <Search size={18} />
            <Input
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>
        </StocksHeader>

        <StocksGrid>
          {filteredStocks.map((stock: Stock) => {
            const isPositive = stock.changePercent > 0;
            const chartData = generateMockChartData(stock.price);
            const weekLow = stock.price * 0.85;
            const weekHigh = stock.price * 1.15;

            return (
              <StockCard key={stock.symbol}>
                <StockInfo>
                  <StockHeader>
                    <StockSymbol>{stock.symbol}</StockSymbol>
                    <StockName>{stock.name}</StockName>
                  </StockHeader>

                  <PriceInfo>
                    <CurrentPrice>{formatCurrency(stock.price)}</CurrentPrice>
                    <PriceChange positive={isPositive}>
                      {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                      {formatCurrency(Math.abs(stock.change))} ({formatPercentage(stock.changePercent)})
                    </PriceChange>
                  </PriceInfo>

                  <StockMetrics>
                    <MetricItem>
                      <MetricLabel>Volume</MetricLabel>
                      <MetricValue>{formatNumber(stock.volume)}</MetricValue>
                    </MetricItem>
                    <MetricItem>
                      <MetricLabel>Market Cap</MetricLabel>
                      <MetricValue>{formatNumber(stock.marketCap)}</MetricValue>
                    </MetricItem>
                    <MetricItem>
                      <MetricLabel>P/E Ratio</MetricLabel>
                      <MetricValue>{(15 + Math.random() * 20).toFixed(2)}</MetricValue>
                    </MetricItem>
                    <MetricItem>
                      <MetricLabel>Dividend Yield</MetricLabel>
                      <MetricValue>{(Math.random() * 3).toFixed(2)}%</MetricValue>
                    </MetricItem>
                  </StockMetrics>

                  <WeekRange>
                    <span>{formatCurrency(weekLow)}</span>
                    <RangeBar />
                    <span>{formatCurrency(weekHigh)}</span>
                  </WeekRange>
                </StockInfo>

                <StockChart>
                  <MiniChart data={chartData} positive={isPositive} />
                </StockChart>
              </StockCard>
            );
          })}
        </StocksGrid>
      </Container>
    </StocksContainer>
  );
};
