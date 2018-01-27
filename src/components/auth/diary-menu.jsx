import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Sidebar, Segment, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions';

class Dmenu extends Component {



  renderItems() {

    return [
      <Link to='/' key={1}>
        <Menu.Item
          >
          <Icon name="home" />Home
        </Menu.Item>
      </Link>,
      <Link to='/settings' key={2}>
        <Menu.Item
          >
          <Icon name="settings" />Settings
        </Menu.Item>
      </Link>,
      <Menu.Item
        key={3}
        position="right"
        onClick={() => {this.props.logout()}}
        >
        <Icon name="log out" />Logout
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
