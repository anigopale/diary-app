import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Dmenu from './diary-menu';
import Mmenu from './mmenu';
import { Link } from 'react-router-dom';
import { Segment, Sidebar, Menu, Responsive } from 'semantic-ui-react';

export default class Diary extends Component {

  state = { visible: false }

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


  handleLogout() {
    this.props.userLogout();
  }

  render() {

    return (
      <div>
          <Responsive minWidth={720}>
            <Dmenu />
          </Responsive>

        <Responsive maxWidth={720} inverted as={Segment}>
          <Mmenu />
        </Responsive>

      </div>
    );
  }
}
