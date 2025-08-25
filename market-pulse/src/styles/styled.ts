import styled, { createGlobalStyle } from 'styled-components';

// Global styles
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    font-family: 'Palatino Linotype', 'Libre Baskerville', 'Book Antiqua', Palatino, serif;
  }

  body {
    font-family: 'Palatino Linotype', 'Libre Baskerville', 'Book Antiqua', Palatino, serif;
    background-color: #0a0a0a;
    color: #ffffff;
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Palatino Linotype', 'Libre Baskerville', 'Book Antiqua', Palatino, serif;
  }

  input, button, textarea, select {
    font-family: 'Palatino Linotype', 'Libre Baskerville', 'Book Antiqua', Palatino, serif;
  }

  #root {
    min-height: 100vh;
  }
`;

// Theme
export const theme = {
  colors: {
    primary: '#4285f4',
    secondary: '#34a853',
    danger: '#ea4335',
    warning: '#fbbc05',
    background: '#0a0a0a',
    surface: '#1a1a1a',
    surfaceHover: '#2a2a2a',
    border: '#333333',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    textMuted: '#666666',
    success: '#10b981',
    error: '#ef4444',
    chart: {
      primary: '#4285f4',
      secondary: '#34a853',
      tertiary: '#fbbc05',
      quaternary: '#ea4335',
      grid: '#333333'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem'
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

// Common styled components
export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: 0 ${theme.spacing.xl};
  }
`;

export const Card = styled.div<{ padding?: string; hover?: boolean }>`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${props => props.padding || theme.spacing.lg};
  transition: all 0.2s ease;

  ${props => props.hover && `
    &:hover {
      background: ${theme.colors.surfaceHover};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.md};
    }
  `}
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'ghost' }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary};
          color: white;
          &:hover { background: #3367d6; }
        `;
      case 'secondary':
        return `
          background: ${theme.colors.surface};
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.border};
          &:hover { background: ${theme.colors.surfaceHover}; }
        `;
      default:
        return `
          background: transparent;
          color: ${theme.colors.textSecondary};
          &:hover { 
            color: ${theme.colors.text};
            background: ${theme.colors.surface};
          }
        `;
    }
  }}
`;

export const Grid = styled.div<{ columns?: number; gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 'auto-fit'}, minmax(300px, 1fr));
  gap: ${props => props.gap || theme.spacing.lg};
`;

export const Flex = styled.div<{ 
  direction?: 'row' | 'column';
  align?: string;
  justify?: string;
  gap?: string;
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'stretch'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap || '0'};
  ${props => props.wrap && 'flex-wrap: wrap;'}
`;

export const Text = styled.span<{ 
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
}>`
  font-size: ${props => {
    switch (props.size) {
      case 'xs': return '0.75rem';
      case 'sm': return '0.875rem';
      case 'md': return '1rem';
      case 'lg': return '1.125rem';
      case 'xl': return '1.25rem';
      case '2xl': return '1.5rem';
      default: return '1rem';
    }
  }};
  font-weight: ${props => {
    switch (props.weight) {
      case 'normal': return '400';
      case 'medium': return '500';
      case 'semibold': return '600';
      case 'bold': return '700';
      default: return '400';
    }
  }};
  color: ${props => props.color || theme.colors.text};
`;

export const Badge = styled.span<{ variant?: 'success' | 'error' | 'warning' | 'info' }>`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;

  ${props => {
    switch (props.variant) {
      case 'success':
        return `
          background: rgba(16, 185, 129, 0.1);
          color: ${theme.colors.success};
        `;
      case 'error':
        return `
          background: rgba(239, 68, 68, 0.1);
          color: ${theme.colors.error};
        `;
      case 'warning':
        return `
          background: rgba(251, 188, 5, 0.1);
          color: ${theme.colors.warning};
        `;
      default:
        return `
          background: rgba(66, 133, 244, 0.1);
          color: ${theme.colors.primary};
        `;
    }
  }}
`;

export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${theme.colors.border};
  border-top: 2px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const SkeletonLoader = styled.div<{ width?: string; height?: string }>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '1rem'};
  background: linear-gradient(90deg, ${theme.colors.surface} 25%, ${theme.colors.surfaceHover} 50%, ${theme.colors.surface} 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: ${theme.borderRadius.sm};

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  font-size: 0.875rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  option {
    background: ${theme.colors.surface};
    color: ${theme.colors.text};
  }
`;

export const Switch = styled.label<{ checked?: boolean }>`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  cursor: pointer;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.checked ? theme.colors.primary : theme.colors.border};
    transition: 0.4s;
    border-radius: 24px;

    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: ${props => props.checked ? '27px' : '3px'};
      bottom: 3px;
      background: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }
`;
