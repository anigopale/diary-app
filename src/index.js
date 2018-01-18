import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';

import './index.css';
import App from './App';
import reducers from './reducers';
import db from './db';
import { SET_PASS } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

db.key.get(1)
  .then((response) => {
    console.log(response);
    if(response) {
      if(response.key)
        store.dispatch({ type: SET_PASS });
    }
  });


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
