import React from 'react';
import styled from 'styled-components';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Container, Card, Text, theme } from '../styles/styled';
import { 
  mockIndices, 
  useMarketIndices, 
  formatNumber, 
  formatPercentage, 
  formatDate,
  type MarketIndex
} from '../utils/mockData';

const MarketsContainer = styled.div`
  padding: 2rem 0;
`;

const MarketsHeader = styled.div`
  margin-bottom: 2rem;
`;

const MarketsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
`;

const MarketCard = styled(Card)<{ color?: string }>`
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
    background: ${theme.colors.surfaceHover};
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

const MarketHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const MarketInfo = styled.div`
  flex: 1;
`;

const MarketSymbol = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: 0.5rem;
`;

const MarketName = styled.div`
  color: ${theme.colors.textSecondary};
  margin-bottom: 0.25rem;
`;

const MarketRegion = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.textMuted};
`;

const MarketValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: 1rem;
`;

const MarketChange = styled.div<{ positive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.positive ? theme.colors.success : theme.colors.error};
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
`;

const MarketMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${theme.colors.border};
`;

const MetricItem = styled.div`
  text-align: center;
`;

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

const LastUpdated = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${theme.colors.textMuted};
  margin-top: 1rem;
`;

export const Markets: React.FC = () => {
  const indices = useMarketIndices(mockIndices, 8000);

  const getRegionColor = (region: string) => {
    const colors = {
      'United States': '#007AFF',
      'Japan': '#FF3B30',
      'United Kingdom': '#30D158',
      'Germany': '#FF9500',
      'Canada': '#AF52DE',
      'France': '#FF2D92'
    };
    return colors[region as keyof typeof colors] || theme.colors.primary;
  };

  // Mock additional metrics
  const generateMetrics = (index: MarketIndex) => ({
    high: (index.value * 1.05).toFixed(2),
    low: (index.value * 0.95).toFixed(2),
    volume: formatNumber(Math.random() * 1000000000 + 100000000)
  });

  return (
    <MarketsContainer>
      <Container>
        <MarketsHeader>
          <Text size="2xl" weight="bold">Markets Overview</Text>
        </MarketsHeader>

        <MarketsGrid>
          {indices.map((index) => {
            const isPositive = index.changePercent > 0;
            const regionColor = getRegionColor(index.region);
            const metrics = generateMetrics(index);

            return (
              <MarketCard key={index.symbol} color={regionColor}>
                <MarketHeader>
                  <MarketInfo>
                    <MarketSymbol>{index.symbol}</MarketSymbol>
                    <MarketName>{index.name}</MarketName>
                    <MarketRegion>{index.region}</MarketRegion>
                  </MarketInfo>
                </MarketHeader>

                <MarketValue>
                  {formatNumber(index.value).replace('$', '')}
                </MarketValue>

                <MarketChange positive={isPositive}>
                  {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  {formatNumber(Math.abs(index.change)).replace('$', '')} ({formatPercentage(index.changePercent)})
                </MarketChange>

                <MarketMetrics>
                  <MetricItem>
                    <MetricLabel>Today's High</MetricLabel>
                    <MetricValue>{metrics.high}</MetricValue>
                  </MetricItem>
                  <MetricItem>
                    <MetricLabel>Today's Low</MetricLabel>
                    <MetricValue>{metrics.low}</MetricValue>
                  </MetricItem>
                  <MetricItem>
                    <MetricLabel>Volume</MetricLabel>
                    <MetricValue>{metrics.volume}</MetricValue>
                  </MetricItem>
                </MarketMetrics>

                <LastUpdated>
                  <Clock size={14} />
                  Last updated {formatDate(index.lastUpdated)}
                </LastUpdated>
              </MarketCard>
            );
          })}
        </MarketsGrid>
      </Container>
    </MarketsContainer>
  );
};
