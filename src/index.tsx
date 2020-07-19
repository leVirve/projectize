import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import './index.css';
import App from './App';
import Demo from './Demo';
import * as serviceWorker from './serviceWorker';

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
      main: '#F092A0',
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

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <div>
      <CssBaseline />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <Route path="/" exact component={App} />
          <Route path="/demo" component={Demo} />
        </div>
      </BrowserRouter>
    </div>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
