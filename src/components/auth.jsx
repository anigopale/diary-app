import React, { Component } from 'react';
import { connect } from 'react-redux';
import Diary from './auth/diary';
import Landing from './landing';

class Auth extends Component {
  renderComponents() {
    if(this.props.loggedin) {
      return (
        <Diary />
      )
    }
    return (
      <div>
        <Landing />
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderComponents()}
      </div>
    )
  }
}

function mapStateToProps({ loggedin }) {
  return { loggedin };
}

export default connect(mapStateToProps)(Auth);
