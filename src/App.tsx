import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import MainPage from './pages/main';
import DemoPage from './pages/demo';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Source Sans Pro',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#666',
    },
    secondary: {
      main: '#7777ce',
    },
  },
});

// for mobile phone
theme.typography.h3 = {
  fontSize: '1.65rem',
  lineHeight: '1.167',
  fontWeight: 400,
  fontFamily: theme.typography.fontFamily,
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
};
theme.typography.h6 = {
  fontSize: '1.0rem',
  lineHeight: '1.6',
  fontWeight: 500,
  fontFamily: theme.typography.fontFamily,
  [theme.breakpoints.up('md')]: {
    fontSize: '1.25rem',
  },
};

function App(): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <CssBaseline />
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div>
            <Route path="/" exact component={MainPage} />
            <Route path="/demo" component={DemoPage} />
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
