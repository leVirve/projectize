import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
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

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <div>
      <CssBaseline />
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Route exact path="/" component={App}></Route>
        <Route exact path="/demo" component={Demo}></Route>
      </HashRouter>
    </div>
  </ThemeProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
