import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Auth from './components/auth';
import { Container } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route path="/" component={Auth}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
