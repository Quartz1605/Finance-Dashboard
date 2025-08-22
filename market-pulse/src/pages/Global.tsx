import React from 'react';
import styled from 'styled-components';
import { TrendingUp, TrendingDown, Calendar, AlertCircle } from 'lucide-react';
import { Container, Card, Text, Badge, theme } from '../styles/styled';

const GlobalContainer = styled.div`
  padding: 2rem 0;
`;

const GlobalGrid = styled.div`
  display: grid;
  gap: 2rem;
`;

const RegionalSection = styled.div`
  margin-bottom: 3rem;
`;

const RegionalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RegionCard = styled(Card)`
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
    background: ${theme.colors.surfaceHover};
  }
`;

const RegionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const RegionName = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${theme.colors.text};
`;

const RegionPerformance = styled.div<{ positive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.positive ? theme.colors.success : theme.colors.error};
  font-weight: 600;
`;

const EconomicCalendarSection = styled.div``;

const CalendarCard = styled(Card)`
  overflow-x: auto;
`;

const CalendarTable = styled.div`
  min-width: 800px;
`;

const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: 100px 150px 1fr 100px;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${theme.colors.border};
  font-weight: 600;
  font-size: 0.875rem;
  color: ${theme.colors.textSecondary};
`;

const CalendarRow = styled.div`
  display: grid;
  grid-template-columns: 100px 150px 1fr 100px;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${theme.colors.border};
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.colors.surfaceHover};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const EventTime = styled.div`
  color: ${theme.colors.textSecondary};
  font-weight: 500;
`;

const EventRegion = styled.div`
  color: ${theme.colors.text};
  font-weight: 500;
`;

const EventName = styled.div`
  color: ${theme.colors.text};
`;

const ImpactBadge = styled(Badge)<{ impact: string }>`
  ${props => {
    switch (props.impact.toLowerCase()) {
      case 'high':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: ${theme.colors.error};
        `;
      case 'medium':
        return `
          background: rgba(251, 188, 5, 0.1);
          color: ${theme.colors.warning};
        `;
      default:
        return `
          background: rgba(107, 114, 128, 0.1);
          color: ${theme.colors.textMuted};
        `;
    }
  }}
`;

// Mock regional data
const regionalData = [
  { region: 'North America', countries: ['United States', 'Canada'], performance: 0.68, trend: 'up' },
  { region: 'Europe', countries: ['United Kingdom', 'Germany', 'France', 'Switzerland'], performance: 0.67, trend: 'up' },
  { region: 'Asia-Pacific', countries: ['Japan', 'China', 'Hong Kong', 'Australia'], performance: -0.41, trend: 'down' }
];

const countryPerformance = [
  { country: 'United States', performance: 0.68 },
  { country: 'Canada', performance: 0.0 },
  { country: 'United Kingdom', performance: 0.67 },
  { country: 'Germany', performance: -0.13 },
  { country: 'France', performance: 0.0 },
  { country: 'Switzerland', performance: 0.0 },
  { country: 'Japan', performance: -0.41 },
  { country: 'China', performance: 0.0 },
  { country: 'Hong Kong', performance: 0.0 },
  { country: 'Australia', performance: 0.0 }
];

const economicEvents = [
  { time: '08:30 AM', region: 'United States', event: 'Non-Farm Payrolls', impact: 'High' },
  { time: '10:00 AM', region: 'Eurozone', event: 'ECB Interest Rate Decision', impact: 'High' },
  { time: '02:00 PM', region: 'United Kingdom', event: 'GDP (QoQ)', impact: 'Medium' },
  { time: '04:30 PM', region: 'Japan', event: 'Industrial Production', impact: 'Low' },
  { time: '09:00 AM', region: 'Germany', event: 'Inflation Rate (YoY)', impact: 'Medium' },
  { time: '11:30 AM', region: 'Canada', event: 'Employment Rate', impact: 'Medium' }
];

export const Global: React.FC = () => {
  const formatPerformance = (performance: number) => {
    return `${performance > 0 ? '+' : ''}${performance.toFixed(2)}%`;
  };

  return (
    <GlobalContainer>
      <Container>
        <Text size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          World Markets Overview
        </Text>

        <GlobalGrid>
          <RegionalSection>
            <Text size="xl" weight="bold" style={{ marginBottom: '1.5rem' }}>
              Regional Performance
            </Text>

            <RegionalGrid>
              {regionalData.map((region) => (
                <RegionCard key={region.region}>
                  <RegionHeader>
                    <RegionName>{region.region}</RegionName>
                    <RegionPerformance positive={region.performance > 0}>
                      {region.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      {formatPerformance(region.performance)}
                    </RegionPerformance>
                  </RegionHeader>

                  <div>
                    {region.countries.map((country) => {
                      const countryData = countryPerformance.find(c => c.country === country);
                      const performance = countryData?.performance || 0;
                      
                      return (
                        <div key={country} style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          padding: '0.5rem 0',
                          borderBottom: `1px solid ${theme.colors.border}`,
                          fontSize: '0.875rem'
                        }}>
                          <span style={{ color: theme.colors.textSecondary }}>{country}</span>
                          <span style={{ 
                            color: performance === 0 ? theme.colors.textMuted : 
                                   performance > 0 ? theme.colors.success : theme.colors.error,
                            fontWeight: '500'
                          }}>
                            {performance === 0 ? 'N/A' : formatPerformance(performance)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </RegionCard>
              ))}
            </RegionalGrid>
          </RegionalSection>

          <EconomicCalendarSection>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Calendar size={24} color={theme.colors.textSecondary} />
              <Text size="xl" weight="bold">Economic Calendar</Text>
            </div>

            <CalendarCard>
              <CalendarTable>
                <CalendarHeader>
                  <div>Time</div>
                  <div>Region</div>
                  <div>Event</div>
                  <div>Impact</div>
                </CalendarHeader>

                {economicEvents.map((event, index) => (
                  <CalendarRow key={index}>
                    <EventTime>{event.time}</EventTime>
                    <EventRegion>{event.region}</EventRegion>
                    <EventName>{event.event}</EventName>
                    <div>
                      <ImpactBadge impact={event.impact}>
                        {event.impact === 'High' && <AlertCircle size={12} />}
                        {event.impact}
                      </ImpactBadge>
                    </div>
                  </CalendarRow>
                ))}
              </CalendarTable>
            </CalendarCard>
          </EconomicCalendarSection>
        </GlobalGrid>
      </Container>
    </GlobalContainer>
  );
};
