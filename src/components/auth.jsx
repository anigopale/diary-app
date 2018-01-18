import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './login';
import SetPass from './set_password';

class Auth extends Component {

  renderComponents() {
    if(this.props.passSet) {
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

function mapStateToProps({ passSet }) {
  return { passSet };
}

export default connect(mapStateToProps)(Auth);
