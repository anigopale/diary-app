import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Auth from './components/auth';
import Login from './components/login';
import Signup from './components/signup';
import { Container } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Auth}/>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
