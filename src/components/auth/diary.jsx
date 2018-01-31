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
  Container,
  Grid
} from 'semantic-ui-react';


export default class Diary extends Component {

  state = { visible: false, height: window.innerHeight - 50 }

  componentDidMount() {
    this.setState({ height: window.innerHeight - 50 });
  }


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
            <Segment basic inverted>
              <Grid>
                <Grid.Column width={4}>
                  <Header as="h1" inverted>Diary app</Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Dmenu vertical={false} />
                </Grid.Column>
              </Grid>

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
                  <Header as="h2" inverted><Icon name="user" />{localStorage.getItem('user')}</Header>
                  <Dmenu vertical={true} />
                </Sidebar>
            </Responsive>

            <Sidebar.Pusher>
              {this.renderContent()}
            </Sidebar.Pusher>
          </Sidebar.Pushable>



      </div>
    );
  }
}
