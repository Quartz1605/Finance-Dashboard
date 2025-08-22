import React from 'react';
import styled from 'styled-components';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, Text, theme } from '../styles/styled';
import { type CurrencyPair } from '../utils/mockData';

const CurrencyContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const CurrencyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg};
`;

const CurrencyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
`;

const CurrencyCard = styled(Card)`
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

const CurrencyPairInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
`;

const PairSymbol = styled.div`
  font-weight: 700;
  font-size: 1.125rem;
  color: ${theme.colors.text};
`;

const CurrencyNames = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 0.875rem;
  color: ${theme.colors.textSecondary};
`;

const CurrencyArrow = styled.div`
  color: ${theme.colors.textMuted};
`;

const RateSection = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const CurrentRate = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs};
`;

const RateChange = styled.div<{ positive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${props => props.positive ? theme.colors.success : theme.colors.error};
  font-weight: 600;
`;

interface CurrencyExchangeProps {
  currencies: CurrencyPair[];
}

export const CurrencyExchange: React.FC<CurrencyExchangeProps> = ({ currencies }) => {
  const getCurrencyColor = (symbol: string) => {
    const colors = {
      'EUR/USD': '#007AFF',
      'USD/JPY': '#FF3B30',
      'GBP/USD': '#30D158',
      'USD/CAD': '#FF9500',
      'USD/CHF': '#AF52DE',
      'AUD/USD': '#FF2D92'
    };
    return colors[symbol as keyof typeof colors] || theme.colors.primary;
  };

  const formatRate = (rate: number) => {
    return rate < 1 ? rate.toFixed(4) : rate.toFixed(2);
  };

  const formatChange = (change: number) => {
    const formatted = Math.abs(change).toFixed(4);
    return change > 0 ? `+${formatted}` : `-${formatted}`;
  };

  const formatChangePercent = (percent: number) => {
    return `${percent > 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  return (
    <CurrencyContainer>
      <CurrencyHeader>
        <Text size="xl" weight="bold">Currency Exchange</Text>
      </CurrencyHeader>

      <CurrencyGrid>
        {currencies.map((currency) => {
          const isPositive = currency.changePercent > 0;
          const currencyColor = getCurrencyColor(currency.symbol);

          return (
            <CurrencyCard key={currency.symbol} color={currencyColor}>
              <CurrencyPairInfo>
                <PairSymbol>{currency.symbol}</PairSymbol>
              </CurrencyPairInfo>

              <CurrencyNames>
                <span>{currency.fromCurrency}</span>
                <CurrencyArrow>→</CurrencyArrow>
                <span>{currency.toCurrency}</span>
              </CurrencyNames>

              <RateSection>
                <CurrentRate>{formatRate(currency.rate)}</CurrentRate>
                <RateChange positive={isPositive}>
                  {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {formatChange(currency.change)} ({formatChangePercent(currency.changePercent)})
                </RateChange>
              </RateSection>
            </CurrencyCard>
          );
        })}
      </CurrencyGrid>
    </CurrencyContainer>
  );
};
