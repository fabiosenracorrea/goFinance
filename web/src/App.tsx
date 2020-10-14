import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppProvider from './hooks';

import Routes from './routes';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AppProvider>
      <Router>
        <Routes />
      </Router>
    </AppProvider>
  </>
);

export default App;
