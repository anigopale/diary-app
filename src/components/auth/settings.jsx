import React, { Component } from 'react';
import DeleteAcc from './delete-acc';
import ChangePass from './change-pass';
import ExportCal from './export-cal';
import { Route, Switch, Link } from 'react-router-dom';
import { Menu, Container, Responsive, Sidebar, Segment, Grid } from 'semantic-ui-react';

export default class Settings extends Component {

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
      return (
        <Link to={item.link}>
          <Menu.Item name={item.name} active={this.props.history.location.pathname === item.link} />
        </Link>
      )
    });
  }


  render() {
    return (
      <Container>

          <Menu pointing secondary>
            {this.renderSettingsMenu()}
          </Menu>
          <Container>
            {this.renderSettings()}
          </Container>

      </Container>
    )
  }
}


const Sett = () => {
  return <div>Manage your account</div>
}
