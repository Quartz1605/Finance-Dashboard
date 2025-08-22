import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles/styled';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Stocks } from './pages/Stocks';
import { Markets } from './pages/Markets';
import { Portfolio } from './pages/Portfolio';
import { Performance } from './pages/Performance';
import { Currencies } from './pages/Currencies';
import { Global } from './pages/Global';
import { Settings } from './pages/Settings';

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Header />
          <MainContent>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/stocks" element={<Stocks />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/currencies" element={<Currencies />} />
              <Route path="/global" element={<Global />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </MainContent>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
