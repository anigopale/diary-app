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
import { LOGIN, GOOGLE_SIGNIN } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

if(localStorage.getItem('key')) {
  store.dispatch({
    type: LOGIN
  })
}
if(localStorage.getItem('googleSignin')) {
  store.dispatch({
    type: GOOGLE_SIGNIN
  })
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
