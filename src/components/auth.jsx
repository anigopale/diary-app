import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './login';
import SetPass from './set_password';
import Signup from './signup';
import Diary from './auth/diary';
import { Route } from 'react-router-dom';

class Auth extends Component {

  renderComponents() {
    if(this.props.passSet) {
      if(this.props.login) {
        return <Diary />;
      }
      return <Login />;
    }
    return <SetPass />;
  }



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
