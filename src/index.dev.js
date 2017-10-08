
import './style/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import App from './component/App';
import reducer, { initialize } from './reducer/index';

const $root = document.getElementById('root');

// setup redux store
const store = createStore(reducer);
initialize(store.dispatch);

// creates and renders DOM content
const render = App => {
  ReactDOM.render(
    <Provider store={ store }>
      <AppContainer>
        <App/>
      </AppContainer>
    </Provider>,
    $root
  );
};

render(App);

// enables hot module replacement
if (module.hot) {
  module.hot.accept('./component/App', () => {
    const NewApp = require('./component/App').default;
    render(NewApp);
  });
}
