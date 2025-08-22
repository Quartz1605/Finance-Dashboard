import React from 'react';
import styled from 'styled-components';
import { Card, Text, theme } from '../styles/styled';
import { type NewsItem, formatDate } from '../utils/mockData';
import { ExternalLink, Clock } from 'lucide-react';

const NewsContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const NewsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg};
`;

const NewsGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.lg};
`;

const NewsCard = styled(Card)`
  display: flex;
  gap: ${theme.spacing.lg};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
    background: ${theme.colors.surfaceHover};
  }
`;

const NewsImage = styled.div<{ $backgroundImage?: string }>`
  width: 120px;
  height: 80px;
  flex-shrink: 0;
  background: ${props => props.$backgroundImage 
    ? `url(${props.$backgroundImage})` 
    : theme.colors.background};
  background-size: cover;
  background-position: center;
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.textMuted};
`;

const NewsContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const NewsTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NewsSummary = styled.div`
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.md};
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NewsFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

const NewsSource = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const SourceName = styled.span`
  color: ${theme.colors.primary};
  font-weight: 500;
  font-size: 0.875rem;
`;

const NewsTime = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
`;

const RelatedSymbols = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.sm};
`;

const SymbolTag = styled.span`
  background: rgba(66, 133, 244, 0.1);
  color: ${theme.colors.primary};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
`;

interface NewsProps {
  news: NewsItem[];
}

export const News: React.FC<NewsProps> = ({ news }) => {
  const handleNewsClick = (item: NewsItem) => {
    if (item.url !== '#') {
      window.open(item.url, '_blank');
    }
  };

  return (
    <NewsContainer>
      <NewsHeader>
        <Text size="xl" weight="bold">Market News</Text>
      </NewsHeader>

      <NewsGrid>
        {news.map((item) => (
          <NewsCard
            key={item.id}
            onClick={() => handleNewsClick(item)}
            hover
          >
            <NewsImage $backgroundImage={item.imageUrl}>
              {!item.imageUrl && <ExternalLink size={24} />}
            </NewsImage>

            <NewsContent>
              <NewsTitle>{item.title}</NewsTitle>
              <NewsSummary>{item.summary}</NewsSummary>
              
              {item.relatedSymbols && item.relatedSymbols.length > 0 && (
                <RelatedSymbols>
                  {item.relatedSymbols.map((symbol) => (
                    <SymbolTag key={symbol}>{symbol}</SymbolTag>
                  ))}
                </RelatedSymbols>
              )}

              <NewsFooter>
                <NewsSource>
                  <SourceName>{item.source}</SourceName>
                </NewsSource>
                <NewsTime>
                  <Clock size={14} />
                  {formatDate(item.publishedAt)}
                </NewsTime>
              </NewsFooter>
            </NewsContent>
          </NewsCard>
        ))}
      </NewsGrid>
    </NewsContainer>
  );
};
