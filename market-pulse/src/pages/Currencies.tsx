import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowUpRight, ArrowDownRight, ArrowRightLeft } from 'lucide-react';
import { Container, Card, Text, Input, Select, Button, theme } from '../styles/styled';
import { mockCurrencies, useCurrencyPairs } from '../utils/mockData';

const CurrenciesContainer = styled.div`
  padding: 2rem 0;
`;

const CurrenciesGrid = styled.div`
  display: grid;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ExchangeRatesSection = styled.div`
  margin-bottom: 3rem;
`;

const RatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const CurrencyCard = styled(Card)<{ color?: string }>`
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
  margin-bottom: 1rem;
`;

const PairSymbol = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
  color: ${theme.colors.text};
`;

const CurrencyNames = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${theme.colors.textSecondary};
  margin-bottom: 1rem;
`;

const RateSection = styled.div`
  margin-bottom: 1rem;
`;

const CurrentRate = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: 0.5rem;
`;

const RateChange = styled.div<{ positive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.positive ? theme.colors.success : theme.colors.error};
  font-weight: 600;
`;

const ConverterSection = styled.div``;

const ConverterCard = styled(Card)`
  max-width: 600px;
  margin: 0 auto;
`;

const ConverterTitle = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const ConverterForm = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const ConverterRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;
  align-items: end;
`;

const SwapButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin: 0 auto;
  border-radius: 50%;
  padding: 0;
`;

const ConversionResult = styled.div`
  background: rgba(66, 133, 244, 0.1);
  border: 1px solid rgba(66, 133, 244, 0.2);
  border-radius: ${theme.borderRadius.md};
  padding: 1rem;
  text-align: center;
  margin-top: 1rem;
`;

const ResultValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: 0.25rem;
`;

const ResultLabel = styled.div`
  color: ${theme.colors.textSecondary};
  font-size: 0.875rem;
`;

export const Currencies: React.FC = () => {
  const currencies = useCurrencyPairs(mockCurrencies, 10000);
  
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('1000');

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

  const getConversionRate = () => {
    const pair = currencies.find(c => 
      (c.fromCurrency === fromCurrency && c.toCurrency === toCurrency) ||
      (c.fromCurrency === toCurrency && c.toCurrency === fromCurrency)
    );
    
    if (pair) {
      return pair.fromCurrency === fromCurrency ? pair.rate : 1 / pair.rate;
    }
    
    // Default rate for demonstration
    return 1.0834;
  };

  const calculateConversion = () => {
    const rate = getConversionRate();
    return (parseFloat(amount || '0') * rate).toFixed(2);
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const currencyOptions = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'CHF', 'AUD'];

  return (
    <CurrenciesContainer>
      <Container>
        <Text size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>Currency Exchange</Text>

        <CurrenciesGrid>
          <ExchangeRatesSection>
            <Text size="xl" weight="bold" style={{ marginBottom: '1.5rem' }}>Exchange Rates</Text>
            
            <RatesGrid>
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
                      <span>→</span>
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
            </RatesGrid>
          </ExchangeRatesSection>

          <ConverterSection>
            <ConverterCard>
              <ConverterTitle>
                <Text size="xl" weight="bold">Currency Converter</Text>
              </ConverterTitle>

              <ConverterForm>
                <ConverterRow>
                  <Select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                    {currencyOptions.map(currency => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </Select>
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </ConverterRow>

                <SwapButton onClick={swapCurrencies} variant="primary">
                  <ArrowRightLeft size={20} />
                </SwapButton>

                <ConverterRow>
                  <Select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                    {currencyOptions.map(currency => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </Select>
                  <Input
                    type="text"
                    value={calculateConversion()}
                    disabled
                    style={{ background: theme.colors.background }}
                  />
                </ConverterRow>

                <ConversionResult>
                  <ResultValue>
                    {amount} {fromCurrency} = {calculateConversion()} {toCurrency}
                  </ResultValue>
                  <ResultLabel>
                    1 {fromCurrency} = {getConversionRate().toFixed(4)} {toCurrency}
                  </ResultLabel>
                </ConversionResult>
              </ConverterForm>
            </ConverterCard>
          </ConverterSection>
        </CurrenciesGrid>
      </Container>
    </CurrenciesContainer>
  );
};
