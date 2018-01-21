import React, { Component } from 'react';
import DeleteAcc from './delete-acc';
import ChangePass from './change-pass';
import { Route } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';

export default class Settings extends Component {

  renderSettings() {
    return (
      <div>
        <Route path="/settings/delete" component={DeleteAcc}/>
        <Route path="/settings/change" component={ChangePass}/>
      </div>
    )
  }

  render() {
    return (
      <Container>
        <Menu>
          <Menu.Item>
            Delete Account
          </Menu.Item>
          <Menu.Item>
            Change Password
          </Menu.Item>
        </Menu>
        {this.renderSettings()}
      </Container>
    )
  }
}
