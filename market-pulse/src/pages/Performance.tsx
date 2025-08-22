import React from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Container, Card, Text, theme } from '../styles/styled';
import { formatCurrency, formatPercentage } from '../utils/mockData';

const PerformanceContainer = styled.div`
  padding: 2rem 0;
`;

const PerformanceGrid = styled.div`
  display: grid;
  gap: 2rem;
`;

const ChartCard = styled(Card)`
  height: 400px;
`;

const ChartHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
`;

const MetricCard = styled(Card)`
  text-align: center;
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: 0.5rem;
`;

const MetricLabel = styled.div`
  color: ${theme.colors.textSecondary};
  font-weight: 500;
`;

const LegendContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LegendColor = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: ${props => props.color};
`;

const MonthlyReturnsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
`;

const MonthCard = styled(Card)<{ positive?: boolean }>`
  text-align: center;
  padding: 1rem;
  background: ${props => props.positive 
    ? `rgba(16, 185, 129, 0.1)` 
    : `rgba(239, 68, 68, 0.1)`
  };
  border-color: ${props => props.positive 
    ? theme.colors.success 
    : theme.colors.error
  };
`;

const MonthName = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.textSecondary};
  margin-bottom: 0.5rem;
`;

const MonthReturn = styled.div<{ positive?: boolean }>`
  font-weight: 600;
  color: ${props => props.positive ? theme.colors.success : theme.colors.error};
`;

// Mock performance data
const performanceData = [
  { date: '2025-07-25', portfolio: 946.48, sp500: 946.48 },
  { date: '2025-07-27', portfolio: 896.48, sp500: 918.32 },
  { date: '2025-07-29', portfolio: 1046.48, sp500: 982.45 },
  { date: '2025-07-31', portfolio: 1096.48, sp500: 1019.67 },
  { date: '2025-08-02', portfolio: 1046.48, sp500: 1008.23 },
  { date: '2025-08-04', portfolio: 1196.48, sp500: 1121.89 },
  { date: '2025-08-06', portfolio: 1146.48, sp500: 1089.45 },
  { date: '2025-08-08', portfolio: 1346.48, sp500: 1245.67 },
  { date: '2025-08-10', portfolio: 1296.48, sp500: 1211.23 },
  { date: '2025-08-12', portfolio: 1396.48, sp500: 1298.89 },
  { date: '2025-08-14', portfolio: 1346.48, sp500: 1256.45 },
  { date: '2025-08-16', portfolio: 1446.48, sp500: 1334.67 },
  { date: '2025-08-18', portfolio: 1496.48, sp500: 1378.23 },
  { date: '2025-08-20', portfolio: 1546.48, sp500: 1421.89 },
  { date: '2025-08-22', portfolio: 1596.48, sp500: 1465.45 }
];

const monthlyReturns = [
  { month: 'Jan', return: -0.15 },
  { month: 'Feb', return: 3.40 },
  { month: 'Mar', return: 1.80 },
  { month: 'Apr', return: -2.10 },
  { month: 'May', return: 4.20 },
  { month: 'Jun', return: 2.75 }
];

export const Performance: React.FC = () => {
  const totalReturn = 14.94;
  const initialValue = 10858.75;
  const currentValue = 12360.60;
  const absoluteReturn = currentValue - initialValue;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.sm
        }}>
          <Text size="sm" color={theme.colors.textMuted}>{label}</Text>
          {payload.map((item: any, index: number) => (
            <div key={index}>
              <Text size="sm" color={item.color} weight="semibold">
                {item.name}: {formatCurrency(item.value)}
              </Text>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <PerformanceContainer>
      <Container>
        <Text size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>Performance</Text>

        <MetricsGrid>
          <MetricCard>
            <MetricValue>{formatPercentage(totalReturn)}</MetricValue>
            <MetricLabel>Total Return</MetricLabel>
          </MetricCard>
          <MetricCard>
            <MetricValue>{formatCurrency(initialValue)}</MetricValue>
            <MetricLabel>Initial Value</MetricLabel>
          </MetricCard>
          <MetricCard>
            <MetricValue>{formatCurrency(absoluteReturn)}</MetricValue>
            <MetricLabel>Absolute Return</MetricLabel>
          </MetricCard>
        </MetricsGrid>

        <PerformanceGrid>
          <ChartCard>
            <ChartHeader>
              <Text size="lg" weight="semibold">Portfolio Performance</Text>
              <LegendContainer>
                <LegendItem>
                  <LegendColor color={theme.colors.primary} />
                  <Text size="sm" color={theme.colors.textSecondary}>Your Portfolio</Text>
                </LegendItem>
                <LegendItem>
                  <LegendColor color={theme.colors.success} />
                  <Text size="sm" color={theme.colors.textSecondary}>S&P 500</Text>
                </LegendItem>
              </LegendContainer>
            </ChartHeader>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
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
                  tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="portfolio"
                  stroke={theme.colors.primary}
                  strokeWidth={3}
                  dot={false}
                  name="Your Portfolio"
                />
                <Line
                  type="monotone"
                  dataKey="sp500"
                  stroke={theme.colors.success}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="S&P 500"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <Card>
            <Text size="lg" weight="semibold" style={{ marginBottom: '1.5rem' }}>
              Monthly Returns (%)
            </Text>
            <MonthlyReturnsGrid>
              {monthlyReturns.map((month) => (
                <MonthCard key={month.month} positive={month.return > 0}>
                  <MonthName>{month.month}</MonthName>
                  <MonthReturn positive={month.return > 0}>
                    {formatPercentage(month.return)}
                  </MonthReturn>
                </MonthCard>
              ))}
            </MonthlyReturnsGrid>
          </Card>
        </PerformanceGrid>
      </Container>
    </PerformanceContainer>
  );
};
