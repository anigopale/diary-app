import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { logout } from '../../actions';

class Diary extends Component {

  handleLogout() {
    this.props.userLogout();
  }

  render() {
    return (
      <div>
        <Button onClick={this.props.logout.bind(this)} floated="right">Logout</Button>
        <h1>Diary App</h1>
      </div>
    );
  }
}

export default connect(null, { logout })(Diary);
