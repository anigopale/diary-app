import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Sidebar, Segment, Button, Icon, Responsive, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions';
import history from '../../actions/history';

class Dmenu extends Component {



  renderItems() {

    return [
      <Link to='/' key={1}>
        <Menu.Item
          >
          <Icon name="home" />Home
        </Menu.Item>
      </Link>,

      <Responsive {...Responsive.onlyMobile}>
        <Link to='/settings' key={2}>
          <Menu.Item
            >
            <Icon name="settings" />Settings
          </Menu.Item>
        </Link>
      </Responsive>,

        <Menu.Item
          key={3}
          position="right"
          onClick={() => {this.props.logout()}}
          >
          <Responsive {...Responsive.onlyMobile}>
            <Icon name="log out" />Logout
          </Responsive>
        </Menu.Item>,

        <Menu.Item
          key={3}
          position="right"
          >
          <Responsive minWidth={Responsive.onlyTablet.minWidth} position="right">
            <Dropdown text={localStorage.getItem('user')} icon='user' floating labeled button className='icon'>
              <Dropdown.Menu>
                <Dropdown.Item icon="settings" text="Settings" onClick={() => {history.push('/settings')}} />
                <Dropdown.Item onClick={() => {this.props.logout()}} icon="log out" text="Logout" />
              </Dropdown.Menu>
            </Dropdown>
        </Responsive>
        </Menu.Item>
    ];

  };




  render() {
    return (
      <Menu inverted vertical={this.props.vertical}>
        {this.renderItems()}
      </Menu>
    )
  }
}

export default connect(null, { logout })(Dmenu);
