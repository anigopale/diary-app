import React, { Component } from 'react';
import DeleteAcc from './delete-acc';
import ChangePass from './change-pass';
import { Route } from 'react-router-dom';
import { Menu, Container, Responsive, Sidebar, Segment, Grid } from 'semantic-ui-react';

export default class Settings extends Component {

  renderSettings() {
    return (
      <div>
        <Route path="/settings/delete" component={DeleteAcc}/>
        <Route path="/settings/change" component={ChangePass}/>
      </div>
    )
  }

  renderSettingsMenu() {
    return [

        <Menu.Item>
          Delete Account
        </Menu.Item>,
        <Menu.Item>
          Change Password
        </Menu.Item>

    ]
  }


  render() {
    return (
      <Container>
        <Responsive maxWidth={720}>
          <Menu>
            {this.renderSettingsMenu()}
          </Menu>
          {this.renderSettings()}
        </Responsive>

        <Responsive minWidth={720}>
          <Grid>
            <Grid.Column width={4}>
              <Menu vertical>
                {this.renderSettingsMenu()}
              </Menu>
            </Grid.Column>
            <Grid.Column width={12} stretched>
              <Segment>
                {this.renderSettings()}
              </Segment>
            </Grid.Column>
          </Grid>
        </Responsive>

      </Container>
    )
  }
}
