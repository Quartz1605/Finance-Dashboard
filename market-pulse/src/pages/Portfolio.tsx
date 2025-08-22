import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, PieChart as PieChartIcon } from 'lucide-react';
import { Container, Card, Text, theme } from '../styles/styled';
import { formatCurrency, formatPercentage } from '../utils/mockData';

const PortfolioContainer = styled.div`
  padding: 2rem 0;
`;

const SummarySection = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const SummaryCard = styled(Card)`
  text-align: center;
`;

const PortfolioValue = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: 1rem;
`;

const PortfolioGain = styled.div<{ positive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.positive ? theme.colors.success : theme.colors.error};
`;

const ChartCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChartTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const HoldingsSection = styled.div``;

const HoldingsTable = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 80px 100px 120px 120px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
  font-weight: 600;
  font-size: 0.875rem;
  color: ${theme.colors.textSecondary};
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 80px 100px 120px 120px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${theme.colors.border};
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.colors.surfaceHover};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const StockInfo = styled.div``;

const StockSymbol = styled.div`
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: 0.25rem;
`;

const StockName = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.textSecondary};
`;

const TableCell = styled.div<{ align?: 'left' | 'center' | 'right' }>`
  display: flex;
  align-items: center;
  justify-content: ${props => {
    switch (props.align) {
      case 'center': return 'center';
      case 'right': return 'flex-end';
      default: return 'flex-start';
    }
  }};
  font-weight: 500;
  color: ${theme.colors.text};
`;

const GainLossCell = styled(TableCell)<{ positive?: boolean }>`
  color: ${props => props.positive ? theme.colors.success : theme.colors.error};
  font-weight: 600;
`;

// Mock portfolio data
const portfolioData = {
  totalValue: 12360.60,
  totalGainLoss: 1501.85,
  gainLossPercent: 13.83
};

const holdings = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 15, price: 187.32, value: 2809.80, gainLoss: 548.55, gainLossPercent: 24.26 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 8, price: 402.65, value: 3221.20, gainLoss: 179.20, gainLossPercent: 5.89 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 5, price: 950.02, value: 4750.10, gainLoss: 647.60, gainLossPercent: 15.79 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 10, price: 157.95, value: 1579.50, gainLoss: 126.50, gainLossPercent: 8.71 }
];

const sectorData = [
  { name: 'Technology', value: 45, color: theme.colors.primary },
  { name: 'Healthcare', value: 20, color: theme.colors.secondary },
  { name: 'Finance', value: 15, color: theme.colors.warning },
  { name: 'Consumer', value: 12, color: theme.colors.error },
  { name: 'Energy', value: 8, color: '#9333EA' }
];

export const Portfolio: React.FC = () => {
  const isPositive = portfolioData.gainLossPercent > 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.sm
        }}>
          <Text>{payload[0].name}: {payload[0].value}%</Text>
        </div>
      );
    }
    return null;
  };

  return (
    <PortfolioContainer>
      <Container>
        <Text size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>Portfolio</Text>

        <SummarySection>
          <SummaryCard>
            <Text size="lg" color={theme.colors.textSecondary} weight="medium" style={{ marginBottom: '1rem' }}>
              Portfolio Summary
            </Text>
            <Text size="sm" color={theme.colors.textMuted} style={{ marginBottom: '0.5rem' }}>
              Total Value
            </Text>
            <PortfolioValue>{formatCurrency(portfolioData.totalValue)}</PortfolioValue>
            <Text size="sm" color={theme.colors.textMuted} style={{ marginBottom: '0.5rem' }}>
              Total Gain/Loss
            </Text>
            <PortfolioGain positive={isPositive}>
              {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              {formatCurrency(portfolioData.totalGainLoss)} ({formatPercentage(portfolioData.gainLossPercent)})
            </PortfolioGain>
          </SummaryCard>

          <ChartCard>
            <ChartTitle>
              <PieChartIcon size={20} color={theme.colors.textSecondary} />
              <Text weight="semibold">Sector Allocation</Text>
            </ChartTitle>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
              {sectorData.map((sector, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <div style={{ 
                    width: '12px', 
                    height: '12px', 
                    backgroundColor: sector.color, 
                    borderRadius: '2px' 
                  }} />
                  <Text size="xs" color={theme.colors.textSecondary}>{sector.name}</Text>
                </div>
              ))}
            </div>
          </ChartCard>
        </SummarySection>

        <HoldingsSection>
          <Text size="xl" weight="bold" style={{ marginBottom: '1rem' }}>Holdings</Text>
          
          <HoldingsTable>
            <TableHeader>
              <div>Symbol</div>
              <div>Name</div>
              <div>Shares</div>
              <div>Price</div>
              <div>Value</div>
              <div>Gain/Loss</div>
            </TableHeader>
            
            {holdings.map((holding) => (
              <TableRow key={holding.symbol}>
                <StockInfo>
                  <StockSymbol>{holding.symbol}</StockSymbol>
                  <StockName>{holding.name}</StockName>
                </StockInfo>
                <TableCell>
                  <StockName>{holding.name}</StockName>
                </TableCell>
                <TableCell align="center">{holding.shares}</TableCell>
                <TableCell align="right">{formatCurrency(holding.price)}</TableCell>
                <TableCell align="right">{formatCurrency(holding.value)}</TableCell>
                <GainLossCell align="right" positive={holding.gainLoss > 0}>
                  {formatCurrency(holding.gainLoss)} ({formatPercentage(holding.gainLossPercent)})
                </GainLossCell>
              </TableRow>
            ))}
          </HoldingsTable>
        </HoldingsSection>
      </Container>
    </PortfolioContainer>
  );
};
