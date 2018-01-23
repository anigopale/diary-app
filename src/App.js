import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';

import Auth from './components/auth';
import Login from './components/login';
import Signup from './components/signup';
import ResetApp from './components/reset-app';
import { Container } from 'semantic-ui-react';
import history from './actions/history';

class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/reset" component={ResetApp} />
              <Route path="/" component={Auth}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
