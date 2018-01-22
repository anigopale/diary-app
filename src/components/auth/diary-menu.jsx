import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Sidebar, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions';

class Dmenu extends Component {



  renderItems() {

    return [
      <Link to='/'>
        <Menu.Item
          >
          Home
        </Menu.Item>
      </Link>,
      <Link to='/settings'>
        <Menu.Item
          >
          Settings
        </Menu.Item>
      </Link>,
      <Menu.Item
        position="right"
        onClick={() => {this.props.logout()}}
        >
        Log out
      </Menu.Item>
    ];

  };




  render() {
    return (
      <Menu inverted vertical={this.props.vertical}>
        {this.renderItems()}
      </Menu>
    )
  }
}

export default connect(null, { logout })(Dmenu);
