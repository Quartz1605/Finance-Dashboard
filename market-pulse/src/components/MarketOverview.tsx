import React from 'react';
import styled from 'styled-components';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { Card, Text, theme } from '../styles/styled';
import { formatNumber, formatPercentage } from '../services/websocket';

const MarketOverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const MetricCard = styled(Card)`
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.color || theme.colors.primary};
  }
`;

const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
`;

const MetricIcon = styled.div<{ color?: string }>`
  width: 40px;
  height: 40px;
  background: ${props => `${props.color || theme.colors.primary}20`};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color || theme.colors.primary};
`;

const MetricValue = styled.div`
  margin-bottom: ${theme.spacing.sm};
`;

const MetricChange = styled.div<{ positive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${props => props.positive ? theme.colors.success : theme.colors.error};
  font-size: 0.875rem;
  font-weight: 500;
`;

const TopMoversGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const MoverCard = styled(Card)`
  padding: ${theme.spacing.lg};
`;

const MoverHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.text};
`;

const StockItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid ${theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const StockInfo = styled.div`
  flex: 1;
`;

const StockSymbol = styled.div`
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs};
`;

const StockName = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.textSecondary};
`;

const StockChange = styled.div<{ positive?: boolean }>`
  text-align: right;
  color: ${props => props.positive ? theme.colors.success : theme.colors.error};
  font-weight: 600;
`;

interface MarketOverviewProps {
  marketCap: number;
  tradingVolume: number;
  topGainer: {
    symbol: string;
    name: string;
    changePercent: number;
  };
  topLoser: {
    symbol: string;
    name: string;
    changePercent: number;
  };
  topStocks: Array<{
    symbol: string;
    name: string;
    changePercent: number;
  }>;
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({
  marketCap,
  tradingVolume,
  topGainer,
  topLoser,
  topStocks
}) => {
  const marketCapChange = 0.47;
  const volumeChange = 12.3;

  return (
    <>
      <MarketOverviewGrid>
        <MetricCard color={theme.colors.primary}>
          <MetricHeader>
            <Text size="sm" color={theme.colors.textSecondary} weight="medium">
              Market Cap
            </Text>
            <MetricIcon color={theme.colors.primary}>
              <BarChart3 size={20} />
            </MetricIcon>
          </MetricHeader>
          <MetricValue>
            <Text size="2xl" weight="bold">
              {formatNumber(marketCap)}
            </Text>
          </MetricValue>
          <MetricChange positive={marketCapChange > 0}>
            <TrendingUp size={16} />
            {formatPercentage(marketCapChange)}
          </MetricChange>
        </MetricCard>

        <MetricCard color={theme.colors.secondary}>
          <MetricHeader>
            <Text size="sm" color={theme.colors.textSecondary} weight="medium">
              Trading Volume
            </Text>
            <MetricIcon color={theme.colors.secondary}>
              <BarChart3 size={20} />
            </MetricIcon>
          </MetricHeader>
          <MetricValue>
            <Text size="2xl" weight="bold">
              {formatNumber(tradingVolume)}
            </Text>
          </MetricValue>
          <MetricChange positive={volumeChange > 0}>
            <TrendingUp size={16} />
            {formatPercentage(volumeChange)}
            <Text size="sm" color={theme.colors.textMuted}>
              Today's volume
            </Text>
          </MetricChange>
        </MetricCard>

        <MetricCard color={theme.colors.success}>
          <MetricHeader>
            <Text size="sm" color={theme.colors.textSecondary} weight="medium">
              Top Gainer
            </Text>
            <MetricIcon color={theme.colors.success}>
              <TrendingUp size={20} />
            </MetricIcon>
          </MetricHeader>
          <MetricValue>
            <Text size="2xl" weight="bold">
              {topGainer.symbol}
            </Text>
          </MetricValue>
          <MetricChange positive={true}>
            <TrendingUp size={16} />
            {formatPercentage(topGainer.changePercent)}
            <Text size="sm" color={theme.colors.textMuted}>
              {topGainer.name}
            </Text>
          </MetricChange>
        </MetricCard>

        <MetricCard color={theme.colors.error}>
          <MetricHeader>
            <Text size="sm" color={theme.colors.textSecondary} weight="medium">
              Top Loser
            </Text>
            <MetricIcon color={theme.colors.error}>
              <TrendingDown size={20} />
            </MetricIcon>
          </MetricHeader>
          <MetricValue>
            <Text size="2xl" weight="bold">
              {topLoser.symbol}
            </Text>
          </MetricValue>
          <MetricChange positive={false}>
            <TrendingDown size={16} />
            {formatPercentage(Math.abs(topLoser.changePercent))}
            <Text size="sm" color={theme.colors.textMuted}>
              {topLoser.name}
            </Text>
          </MetricChange>
        </MetricCard>
      </MarketOverviewGrid>

      <TopMoversGrid>
        <MoverCard>
          <MoverHeader>
            <TrendingUp color={theme.colors.success} />
            <Text weight="semibold">Top Gainers</Text>
          </MoverHeader>
          {topStocks.filter(stock => stock.changePercent > 0).slice(0, 4).map((stock) => (
            <StockItem key={stock.symbol}>
              <StockInfo>
                <StockSymbol>{stock.symbol}</StockSymbol>
                <StockName>{stock.name}</StockName>
              </StockInfo>
              <StockChange positive={true}>
                {formatPercentage(stock.changePercent)}
              </StockChange>
            </StockItem>
          ))}
        </MoverCard>

        <MoverCard>
          <MoverHeader>
            <TrendingDown color={theme.colors.error} />
            <Text weight="semibold">Top Losers</Text>
          </MoverHeader>
          {topStocks.filter(stock => stock.changePercent < 0).slice(0, 4).map((stock) => (
            <StockItem key={stock.symbol}>
              <StockInfo>
                <StockSymbol>{stock.symbol}</StockSymbol>
                <StockName>{stock.name}</StockName>
              </StockInfo>
              <StockChange positive={false}>
                {formatPercentage(stock.changePercent)}
              </StockChange>
            </StockItem>
          ))}
        </MoverCard>
      </TopMoversGrid>
    </>
  );
};
