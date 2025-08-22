import React from 'react';
import styled from 'styled-components';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, Text, theme } from '../styles/styled';
import { type MarketIndex, formatNumber, formatPercentage } from '../utils/mockData';

const GlobalMarketsContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const GlobalMarketsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg};
`;

const GlobalMarketsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
`;

const IndexCard = styled(Card)`
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
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

const IndexHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
`;

const IndexInfo = styled.div`
  flex: 1;
`;

const IndexSymbol = styled.div`
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs};
`;

const IndexName = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.textSecondary};
`;

const IndexRegion = styled.div`
  font-size: 0.75rem;
  color: ${theme.colors.textMuted};
  margin-top: ${theme.spacing.xs};
`;

const IndexValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
`;

const IndexChange = styled.div<{ positive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${props => props.positive ? theme.colors.success : theme.colors.error};
  font-weight: 600;
`;

interface GlobalIndicesProps {
  indices: MarketIndex[];
}

export const GlobalIndices: React.FC<GlobalIndicesProps> = ({ indices }) => {
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

  return (
    <GlobalMarketsContainer>
      <GlobalMarketsHeader>
        <Text size="xl" weight="bold">Global Markets</Text>
      </GlobalMarketsHeader>

      <GlobalMarketsGrid>
        {indices.map((index) => {
          const isPositive = index.changePercent > 0;
          const regionColor = getRegionColor(index.region);

          return (
            <IndexCard key={index.symbol} color={regionColor}>
              <IndexHeader>
                <IndexInfo>
                  <IndexSymbol>{index.symbol}</IndexSymbol>
                  <IndexName>{index.name}</IndexName>
                  <IndexRegion>{index.region}</IndexRegion>
                </IndexInfo>
              </IndexHeader>

              <IndexValue>
                {formatNumber(index.value).replace('$', '')}
              </IndexValue>

              <IndexChange positive={isPositive}>
                {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {formatNumber(Math.abs(index.change)).replace('$', '')} ({formatPercentage(index.changePercent)})
              </IndexChange>
            </IndexCard>
          );
        })}
      </GlobalMarketsGrid>
    </GlobalMarketsContainer>
  );
};
