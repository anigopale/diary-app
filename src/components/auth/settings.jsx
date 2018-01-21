import React, { Component } from 'react';
import DeleteAcc from './delete-acc';
import ChangePass from './change-pass';
import { Route, Link } from 'react-router-dom';
import { Menu, Container, Responsive, Sidebar, Segment, Grid } from 'semantic-ui-react';

export default class Settings extends Component {

  renderSettings() {
    return (
      <div>
        <Route path="/settings/delete" component={DeleteAcc}/>
        <Route path="/settings/change" component={ChangePass}/>
        <Route exact path="/settings" component={Sett} />
      </div>
    )
  }

  renderSettingsMenu() {
    return [
        <Link to="/settings/delete">
          <Menu.Item>
            Delete Account
          </Menu.Item>
        </Link>,
        <Link to="/settings/change">
          <Menu.Item>
            Change Password
          </Menu.Item>
        </Link>
    ];
  }


  render() {
    return (
      <Container>
        <Responsive maxWidth={767}>
          <Menu>
            {this.renderSettingsMenu()}
          </Menu>
          <Container text>
            {this.renderSettings()}
          </Container>
        </Responsive>

        <Responsive minWidth={768}>
          <Grid>
            <Grid.Column width={4}>
              <Menu fluid vertical tabular>
                {this.renderSettingsMenu()}
              </Menu>
            </Grid.Column>
            <Grid.Column width={10} stretched>
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


const Sett = () => {
  return <div>Manage your account</div>
}
