import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Sidebar, Segment, Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions';

export default class Mmenu extends Component {

    state = { visible: false }

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
      <div>
        <Segment inverted>
          <h1>Diary App</h1>

          <Button onClick={() => {this.setState({ visible: !this.state.visible})}}></Button>
          <Sidebar.Pushable as={Segment}>

            <Sidebar as={Menu} visible={this.state.visible} animation='overlay' width='thin' vertical>
              {this.renderItems()}
              <Menu.Item
                >
                Log out
              </Menu.Item>
            </Sidebar>


            <Sidebar.Pusher>
              <Segment basic>
                <Container text>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Container>
              </Segment>
            </Sidebar.Pusher>

          </Sidebar.Pushable>
        </Segment>
      </div>
    )
  }
}
