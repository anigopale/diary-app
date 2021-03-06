import React, { Component } from 'react';
import { connect } from 'react-redux';
import DeleteAcc from './delete-acc';
import ChangePass from './change-pass';
import ExportCal from './export-cal';
import { Route, Switch, Link } from 'react-router-dom';
import { Menu, Container, Responsive, Sidebar, Segment, Grid, Divider, Header } from 'semantic-ui-react';

class Settings extends Component {

  settings = [
    { link: "/settings/delete", name: "Delete Account" },
    { link: "/settings/change", name: "Change Password" },
    { link: "/settings/export", name: "Export Calendar" }
  ]

  renderSettings() {
    return (
      <Switch>
        <Route path="/settings/delete" component={DeleteAcc}/>
        <Route path="/settings/change" component={ChangePass}/>
        <Route path="/settings/export" component={ExportCal} />
        <Route path="/settings" component={Sett} />
      </Switch>
    )
  }

  renderSettingsMenu() {
    return this.settings.map((item) => {
      if(this.props.google_auth && item.name === "Change Password") {
        return <Menu.Item name={item.name} disabled />
      }
      return (
        <Link to={item.link}>
          <Menu.Item
            name={item.name}
            active={this.props.history.location.pathname === item.link}
            />
        </Link>
      )
    });
  }


  render() {
    return (
      <Grid stackable>
        <Grid.Column width={4} id="custom-color-1">
          <Divider hidden />
          <Segment basic>
            <Menu vertical secondary inverted fluid id="custom-color-1">
              {this.renderSettingsMenu()}
            </Menu>
          </Segment>
        </Grid.Column>
        <Grid.Column width={12} style={{ minHeight: window.innerHeight }} >
          <Segment basic>
            <Container>
              <Divider hidden />
              <Header size="huge">Settings</Header>
              <Divider />
                <Container>
                  {this.renderSettings()}
                </Container>

            </Container>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}


const Sett = () => {
  return <div>Manage your account</div>
}

function mapStateToProps({ google_auth }) {
  return { google_auth }
}

export default connect(mapStateToProps)(Settings);
