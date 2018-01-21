import React, { Component } from 'react';
import { connect } from 'react-redux';
import Diary from './auth/diary';

class Auth extends Component {
  renderComponents() {
    if(this.props.loggedin) {
      return (
        <Diary />
      )
    }
    return (
      <div>
        you must be logged in
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
