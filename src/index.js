import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import GithubCorner from 'react-github-corner';
import { StickyContainer, Sticky } from 'react-sticky';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import './index.css';
import App from './App';
import Demo from './Demo';
import { project } from './variable'
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
    <StickyContainer>
      <Sticky>
        {({ style }) => <GithubCorner style={style} href={project.githubPage} />}
      </Sticky>
      <CssBaseline />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route exact path="/" component={App}></Route>
        <Route exact path="/demo" component={Demo}></Route>
      </BrowserRouter>
    </StickyContainer>
  </ThemeProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
