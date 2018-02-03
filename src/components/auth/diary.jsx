import React, { Component } from 'react';
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
  Grid,
  Button
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
            <Segment basic>
              <Grid>
                <Grid.Row id="custom-color-1"  verticalAlign="middle">
                <Grid.Column width={4} id="custom-color-1">
                  <Link to="/">
                      <Header size="huge" textAlign="center" inverted id="custom-color-1">Diary app</Header>
                  </Link>
                </Grid.Column>
                <Grid.Column width={12}>
                  <Dmenu vertical={false} />
                </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>

          </Responsive>

          <Responsive {...Responsive.onlyMobile}>
            <Segment inverted basic id="custom-color-1">
              <Icon name="sidebar" size="big" onClick={() => {this.setState({ visible: !this.state.visible })}} />
            </Segment>
          </Responsive>


          <Sidebar.Pushable>
            <Responsive {...Responsive.onlyMobile}>
                <Sidebar visible={this.state.visible} animation="overlay" inverted onClick={()=>{this.setState({ visible: false })}} as={Segment} id="custom-color-1">
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
