import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Dmenu from './diary-menu';
import Mmenu from './mmenu';
import Settings from './settings';
import { Link, Route } from 'react-router-dom';
import { Segment, Sidebar, Menu, Responsive, Divider } from 'semantic-ui-react';

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

  renderContent() {
    return <Route path="/settings" component={Settings} />
  }

  handleLogout() {
    this.props.userLogout();
  }

  render() {

    return (
      <div>
          <Responsive>
            <Dmenu />
          </Responsive>
          <Divider hidden />
          {this.renderContent()}
      </div>
    );
  }
}
