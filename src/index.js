
import './util/polyfill';
import './style/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './component/App';
import reducer, { initialize } from './reducer/index';

const $root = document.getElementById('root');

// setup redux store
const store = createStore(reducer);
initialize(store.dispatch);

// creates and renders DOM content
ReactDOM.render((
  <Provider store={ store }>
    <App/>
  </Provider>
), $root);
