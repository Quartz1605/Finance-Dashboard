import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Globe, 
  PieChart, 
  Activity, 
  Search, 
  DollarSign,
  Settings,
  Home,
  Bell
} from 'lucide-react';
import { theme } from '../styles/styled';

const HeaderContainer = styled.header`
  background: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.border};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    flex-wrap: wrap;
    gap: ${theme.spacing.sm};
  }

  @media (max-width: 480px) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.text};
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  width: 400px;

  @media (max-width: ${theme.breakpoints.md}) {
    width: 300px;
  }

  @media (max-width: 480px) {
    width: 100%;
    order: 3;
    flex-basis: 100%;
    margin-top: ${theme.spacing.sm};
  }

  input {
    background: transparent;
    border: none;
    outline: none;
    color: ${theme.colors.text};
    width: 100%;
    margin-left: ${theme.spacing.sm};

    &::placeholder {
      color: ${theme.colors.textMuted};
    }
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const NotificationButton = styled.button`
  background: transparent;
  border: none;
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    color: ${theme.colors.text};
    background: ${theme.colors.background};
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.colors.background};
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  background: ${theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  padding: 0 ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.lg};
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: 480px) {
    padding: 0 ${theme.spacing.md};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};

  @media (max-width: ${theme.breakpoints.md}) {
    flex-wrap: nowrap;
    min-width: max-content;
  }
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  text-decoration: none;
  color: ${props => props.$active ? theme.colors.text : theme.colors.textSecondary};
  font-weight: ${props => props.$active ? '600' : '400'};
  border-bottom: 2px solid ${props => props.$active ? theme.colors.primary : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    color: ${theme.colors.text};
    background: ${theme.colors.background};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const MarketStatus = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-left: auto;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: rgba(16, 185, 129, 0.1);
  border-radius: ${theme.borderRadius.md};
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  background: ${theme.colors.success};
  border-radius: 50%;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const StatusText = styled.span`
  font-size: 0.875rem;
  color: ${theme.colors.success};
  font-weight: 500;
`;

const navItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/stocks', label: 'Stocks', icon: TrendingUp },
  { path: '/markets', label: 'Markets', icon: BarChart3 },
  { path: '/portfolio', label: 'Portfolio', icon: PieChart },
  { path: '/performance', label: 'Performance', icon: Activity },
  { path: '/currencies', label: 'Currencies', icon: DollarSign },
  { path: '/global', label: 'Global', icon: Globe },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Header: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <HeaderContainer>
      <TopBar>
        <Logo>
          <BarChart3 color={theme.colors.primary} />
          MarketPulse
        </Logo>
        
        <SearchBar>
          <Search size={18} color={theme.colors.textMuted} />
          <input
            type="text"
            placeholder="Search stocks, indices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>

        <UserActions>
          <NotificationButton>
            <Bell size={20} />
          </NotificationButton>
          <UserProfile>
            <Avatar>JS</Avatar>
            <span style={{ color: theme.colors.text, fontSize: '0.875rem' }}>
              John Smith
            </span>
          </UserProfile>
        </UserActions>
      </TopBar>

      <Navigation>
        <NavLinks>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                $active={isActive}
              >
                <Icon />
                {item.label}
              </NavLink>
            );
          })}
        </NavLinks>

        <MarketStatus>
          <StatusDot />
          <StatusText>Markets are open</StatusText>
          <StatusText>Closes in 3h 45m</StatusText>
        </MarketStatus>
      </Navigation>
    </HeaderContainer>
  );
};
