import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Demo from './Demo';
import * as serviceWorker from './serviceWorker';

// const Message = React.createClass({
//   render() {
//     return <h3>Message {this.props.params.id}</h3>
//   }
// })

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <BrowserRouter>
      <Route exact path="/" component={App}></Route>
      <Route exact path="/demo" component={Demo}></Route>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
