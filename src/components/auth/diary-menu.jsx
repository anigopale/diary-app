import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Sidebar, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions';

class Dmenu extends Component {

  items = [
    { key: "/", name: "Home" },
    { key: "/settings", name: "Settings" }
  ];

  renderItems() {
    return this.items.map((item) => {
      return (
        <Link to={item.key}>
          <Menu.Item
            >
            {item.name}
          </Menu.Item>
        </Link>
      )
    })
  }

  render() {
    return (
      <Segment inverted>
        <h1>Diary App</h1>
        <Menu inverted>
          {this.renderItems()}
          <Menu.Item
            position="right"
            onClick={() => {this.props.logout()}}
            >
            Log out
          </Menu.Item>
        </Menu>
      </Segment>

    )
  }
}

export default connect(null, { logout })(Dmenu);
