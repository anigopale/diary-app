import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './login';
import SetPass from './set_password';
import Diary from './auth/diary';

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
        {this.renderComponents()}
      </div>
    )
  }
}

function mapStateToProps({ passSet, login }) {
  return { passSet, login };
}

export default connect(mapStateToProps)(Auth);
