import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './login';
import Signup from './signup';
import Diary from './auth/diary';
import { Route } from 'react-router-dom';

class Auth extends Component {

  render() {
    return (
      <div>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup}/>
      </div>
    )
  }
}

function mapStateToProps({ passSet, login }) {
  return { passSet, login };
}

export default connect(mapStateToProps)(Auth);
