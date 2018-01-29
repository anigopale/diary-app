import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Dmenu from './diary-menu';
import Mmenu from './mmenu';
import Settings from './settings';
import CalendarView from './calendar-view';
import Editor from './editor';
import { Link, Route, Switch } from 'react-router-dom';
import {
  Header,
  Segment,
  Sidebar,
  Menu,
  Responsive,
  Divider,
  Icon,
  Container
} from 'semantic-ui-react';


export default class Diary extends Component {

  state = { visible: false, height: window.innerHeight - 50 }

  componentDidMount() {
    this.setState({ height: window.innerHeight - 50 });
  }

  renderItems() {

    return [
      <Link to='/'>
        <Menu.Item
          >
          Home
        </Menu.Item>
      </Link>,
      <Link to='/settings'>
        <Menu.Item
          >
          Settings
        </Menu.Item>
      </Link>,
      <Menu.Item
        position="right"
        onClick={() => {this.props.logout()}}
        >
        Log out
      </Menu.Item>
    ];

  };

  renderContent() {
    return (
      <div>
        <Switch>
          <Route path="/settings" component={Settings} />
          <Route path="/editor" component={Editor} />
          <Route path="/" component={CalendarView} />
        </Switch>
      </div>
    )
  }

  handleLogout() {
    this.props.userLogout();
  }

  render() {

    return (
      <div>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Segment inverted>
              <Divider hidden />
              <Header as="h1" inverted>Diary app</Header>
              <Dmenu vertical={false} />
            </Segment>
          </Responsive>

          <Responsive {...Responsive.onlyMobile}>
            <Segment inverted>
              <Icon name="sidebar" size="big" onClick={() => {this.setState({ visible: !this.state.visible })}} />
            </Segment>
          </Responsive>


          <Sidebar.Pushable>
            <Responsive {...Responsive.onlyMobile}>
                <Sidebar visible={this.state.visible} animation="overlay" inverted onClick={()=>{this.setState({ visible: false })}} as={Segment}>
                  <Header as="h1" textAlign="center" inverted>Diary app</Header>
                  <Dmenu vertical={true} />
                </Sidebar>
            </Responsive>

            <Sidebar.Pusher>
              <Segment style={{ minHeight: this.state.height }}>
                <Divider hidden />
                {this.renderContent()}
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>



      </div>
    );
  }
}
