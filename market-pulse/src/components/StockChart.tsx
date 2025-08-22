import React, { useState } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, Button, Text, theme } from '../styles/styled';
import { generatePriceHistory, formatCurrency } from '../utils/mockData';

const ChartContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg};
`;

const ChartTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const StockSymbol = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.text};
`;

const StockPrice = styled.div`
  font-size: 1.25rem;
  color: ${theme.colors.textSecondary};
`;

const IntervalButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  background: ${theme.colors.background};
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.md};
`;

const IntervalButton = styled(Button)<{ active?: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: 0.875rem;
  background: ${props => props.active ? theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : theme.colors.textSecondary};
  
  &:hover {
    background: ${props => props.active ? theme.colors.primary : theme.colors.surface};
    color: ${props => props.active ? 'white' : theme.colors.text};
  }
`;

const ChartCard = styled(Card)`
  height: 400px;
  padding: ${theme.spacing.lg};
`;

const CustomTooltip = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm};
`;

interface StockChartProps {
  symbol: string;
  currentPrice: number;
  data?: Array<{ date: string; price: number }>;
}

const intervals = [
  { label: '1D', value: '1D' },
  { label: '1W', value: '1W' },
  { label: '1M', value: '1M' },
  { label: '3M', value: '3M' },
  { label: '1Y', value: '1Y' },
  { label: 'All', value: 'ALL' },
];

export const StockChart: React.FC<StockChartProps> = ({
  symbol = 'AAPL',
  currentPrice = 187.32,
  data
}) => {
  const [activeInterval, setActiveInterval] = useState('1M');

  // Generate mock data if none provided
  const chartData = data || generatePriceHistory(30, currentPrice, 2).map((price, index) => ({
    date: new Date(Date.now() - (29 - index) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    price
  }));

  const CustomTooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltip>
          <Text size="sm" color={theme.colors.textMuted}>{label}</Text>
          <Text weight="semibold" color={theme.colors.text}>
            {formatCurrency(payload[0].value)}
          </Text>
        </CustomTooltip>
      );
    }
    return null;
  };

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>
          <StockSymbol>{symbol}</StockSymbol>
          <StockPrice>{formatCurrency(currentPrice)}</StockPrice>
        </ChartTitle>
        
        <IntervalButtons>
          {intervals.map((interval) => (
            <IntervalButton
              key={interval.value}
              active={activeInterval === interval.value}
              onClick={() => setActiveInterval(interval.value)}
            >
              {interval.label}
            </IntervalButton>
          ))}
        </IntervalButtons>
      </ChartHeader>

      <ChartCard>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={theme.colors.border}
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: theme.colors.textMuted, fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: theme.colors.textMuted, fontSize: 12 }}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip content={<CustomTooltipContent />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke={theme.colors.primary}
              strokeWidth={2}
              dot={false}
              activeDot={{ 
                r: 4, 
                stroke: theme.colors.primary, 
                strokeWidth: 2,
                fill: theme.colors.background
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </ChartContainer>
  );
};
